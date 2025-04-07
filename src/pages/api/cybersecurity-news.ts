import type { NextApiRequest, NextApiResponse } from "next";
import NewsAPI from 'ts-newsapi'; // Import the ts-newsapi library
import levenshtein from "fast-levenshtein"; // For deduplication

// Initialize the NewsAPI client
const apiKey = process.env.NEWSAPI_KEY; // Get the API key from .env
if (!apiKey) {
  throw new Error("NEWSAPI_KEY is not defined in .env");
}

const newsapi = new NewsAPI(apiKey); // Use the API key from .env

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Fetch cybersecurity articles using ts-newsapi
    const response = await newsapi.getEverything({
      q: 'cybersecurity OR "data breach" OR ransomware OR hacking OR "cyber attack"',
      language: 'en',
      sortBy: 'publishedAt',
      pageSize: 30, // Fetch more articles to ensure we have enough
    });

    if (response.status !== 'ok') {
      throw new Error('Failed to fetch news');
    }

    // Filter articles that are cybersecurity-related
    const filteredArticles = response.articles.filter((article) => {
      if (!article.description) return false;
      
      const isCybersecurityRelated =
        article.title.toLowerCase().includes("cybersecurity") ||
        article.title.toLowerCase().includes("data breach") ||
        article.title.toLowerCase().includes("ransomware") ||
        article.title.toLowerCase().includes("hacking") ||
        article.title.toLowerCase().includes("cyber attack") ||
        article.description.toLowerCase().includes("cybersecurity") ||
        article.description.toLowerCase().includes("data breach") ||
        article.description.toLowerCase().includes("ransomware") ||
        article.description.toLowerCase().includes("hacking") ||
        article.description.toLowerCase().includes("cyber attack");

      return (
        article.title &&
        article.description &&
        article.description.length > 30 &&
        article.description.length < 500 &&
        article.url &&
        article.urlToImage &&
        /\.(jpg|jpeg|png|gif)$/i.test(article.urlToImage) &&
        isCybersecurityRelated
      );
    });

    // Deduplicate articles based on Levenshtein distance
    const deduplicateArticles = (articles: typeof response.articles, threshold: number = 10) => {
      const uniqueArticles: typeof response.articles = [];

      for (const article of articles) {
        const isDuplicate = uniqueArticles.some((uniqueArticle) => {
          const distance = levenshtein.get(
            article.title.toLowerCase().trim(),
            uniqueArticle.title.toLowerCase().trim()
          );
          return distance <= threshold; // Articles are similar if distance is below the threshold
        });

        if (!isDuplicate) {
          uniqueArticles.push(article);
        }
      }

      return uniqueArticles;
    };

    const uniqueArticles = deduplicateArticles(filteredArticles);

    // Limit to 3 articles
    const limitedArticles = uniqueArticles.slice(0, 3);

    if (limitedArticles.length < 3) {
      console.warn("Not enough unique cybersecurity articles found.");
    }

    // Return the valid cybersecurity articles
    res.status(200).json({ articles: limitedArticles });
  } catch (error) {
    // Catch and log any errors
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Error fetching news" });
  }
}