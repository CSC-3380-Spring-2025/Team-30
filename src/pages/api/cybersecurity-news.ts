import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const apiKey = process.env.NEWSAPI_KEY; // Store your NewsAPI key securely in the .env file
    if (!apiKey) {
      return res.status(400).json({ error: "API key is missing" });
    }

    // Fetch news articles related to cybersecurity
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=cybersecurity&language=en&sortBy=publishedAt&pageSize=10&apiKey=${apiKey}`
    );

    // Check if the response is successful
    if (!response.ok) throw new Error("Failed to fetch news");

    const data = await response.json();

    // Ensure that we have articles and filter out any non-article content
    const articles = data.articles.filter((article: any) => {
      // Ensure articles have a valid title, description, and URL
      // Make sure the description is within a reasonable length to be a summary (not too long)
      return (
        article.title &&
        article.description &&
        article.description.length > 30 && // Description should be at least 30 characters to be a valid summary
        article.description.length < 500 && // Ensure description is not too long (e.g., not a body of text)
        article.url &&
        article.urlToImage
      );
    });

    // Limit to 5 articles
    const limitedArticles = articles.slice(0, 3);

    if (limitedArticles.length === 0) {
      return res.status(404).json({ error: "No valid cybersecurity articles found" });
    }

    // Return the valid cybersecurity articles
    res.status(200).json({ limitedArticles });
  } catch (error) {
    // Catch and log any errors
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Error fetching news" });
  }
}
