import NewsAPI from 'ts-newsapi';

const newsapi = new NewsAPI('01f4c57d36054b9db2d30fa42fd665e5'); // Replace with your API key

export const fetchCybersecurityArticles = async () => {
  try {
    const response = await newsapi.v2.everything({
      q: 'cybersecurity OR "data breach" OR ransomware OR hacking OR "cyber attack"',
      language: 'en',
      sortBy: 'publishedAt',
      pageSize: 30, // Fetch more articles to ensure we have enough
    });

    if (response.status !== 'ok') {
      throw new Error('Failed to fetch news');
    }

    return response.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};