import type { NextApiRequest, NextApiResponse } from "next";
import NewsAPI from "ts-newsapi";
import levenshtein from "fast-levenshtein";
import { unstable_cache } from 'next/cache';

const apiKey = process.env.NEWSAPI_KEY;
if (!apiKey) throw new Error("NEWSAPI_KEY is not defined in .env");
const newsapi = new NewsAPI(apiKey);

// Keywords that indicate quality cybersecurity content
const QUALITY_KEYWORDS = [
  'ransomware', 'phishing', 'zero-day', 'vulnerability',
  'exploit', 'APT', 'malware', 'breach', 'CVE-',
  'patch', 'threat actor', 'cyber attack'
];

// Terms that often indicate low-quality content
const LOW_QUALITY_TERMS = [
  'sponsored', 'advertorial', 'opinion', 'guest post',
  'how to', 'tips', 'blog', 'commentary'
];

const getCyberNews = unstable_cache(
  async () => {
    try {
      // Get current date to prioritize recent news
      const currentDate = new Date();
      const oneWeekAgo = new Date(currentDate.setDate(currentDate.getDate() - 7)).toISOString();

      const response = await newsapi.getEverything({
        q: 'cybersecurity OR "data breach" OR ransomware OR hacking',
        language: 'en',
        from: oneWeekAgo,
        sortBy: 'relevancy',
        pageSize: 30,
      });

      if (response.status !== 'ok') throw new Error('Failed to fetch news');

      const filteredArticles = response.articles.filter(article => {
        // Type guard for required fields
        if (!article.title || !article.url || !article.description || !article.urlToImage) {
          return false;
        }
        
        const title = article.title.toLowerCase();
        const desc = article.description.toLowerCase();
        const url = article.url.toLowerCase();

        // Quality indicators
        const hasQualityKeywords = QUALITY_KEYWORDS.some(term => 
          title.includes(term.toLowerCase()) || 
          desc.includes(term.toLowerCase())
        );

        const hasLowQualityTerms = LOW_QUALITY_TERMS.some(term =>
          title.includes(term.toLowerCase()) ||
          desc.includes(term.toLowerCase()) ||
          url.includes(term.toLowerCase())
        );

        const hasValidImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(article.urlToImage);
        const hasGoodLength = article.description.length > 60 && 
                            article.description.length < 300;

        return (
          hasQualityKeywords &&
          !hasLowQualityTerms &&
          hasValidImage &&
          hasGoodLength
        );
      });

      // Improved deduplication with title similarity check
      const uniqueArticles = filteredArticles.reduce((acc, article) => {
        if (!article.title) return acc;
        
        const isDuplicate = acc.some(existing => {
          if (!existing.title) return false;
          const titleSimilarity = levenshtein.get(
            existing.title.toLowerCase(),
            article.title.toLowerCase()
          );
          return titleSimilarity < 20;
        });
        return isDuplicate ? acc : [...acc, article];
      }, [] as typeof filteredArticles);

      // Safe keyword counting function
      const countKeywords = (title: string | null | undefined, description: string | null | undefined): number => {
        if (!title && !description) return 0;
        
        const titleStr = title?.toLowerCase() || '';
        const descStr = description?.toLowerCase() || '';
        
        return QUALITY_KEYWORDS.filter(k => 
          titleStr.includes(k.toLowerCase()) || 
          descStr.includes(k.toLowerCase())
        ).length;
      };

      // Then in your sort function:
      const rankedArticles = [...uniqueArticles].sort((a, b) => {
        const aKeywords = countKeywords(a.title, a.description);
        const bKeywords = countKeywords(b.title, b.description);
        
        // Prefer shorter, more concise titles
        return bKeywords - aKeywords || 
              (a.title?.length || 0) - (b.title?.length || 0);
      });

      // Return top 3 articles with enhanced metadata
      return rankedArticles.slice(0, 3).map(article => {
        const sourceName = article.source?.name || 
                          (article.url ? new URL(article.url).hostname.replace('www.', '') : 'Unknown');
        return {
          title: article.title?.replace(/ - [^-]+$/, '') || 'No title',
          description: article.description || 'No description',
          url: article.url || '#',
          urlToImage: article.urlToImage || '',
          source: sourceName,
          date: article.publishedAt || new Date().toISOString()
        };
      });

    } catch (error) {
      console.error("Error fetching news:", error);
      throw error;
    }
  },
  ['cyber-news-cache'],
  { revalidate: 43200 } // 12 hours in seconds
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const articles = await getCyberNews();
    res.status(200).json({ articles });
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ 
      error: "Error fetching news",
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
