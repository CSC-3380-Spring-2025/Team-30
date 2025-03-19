import { useEffect, useState } from "react";
import styles from "./CybersecurityNews.module.css";

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
}

export default function CybersecurityNews() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("/api/cybersecurity-news");
        if (!response.ok) throw new Error("Failed to fetch news");

        const data = await response.json();

        // Filter articles that have valid images
        const filteredArticles = data.articles
          .filter(
            (article: Article) =>
              article.urlToImage &&
              article.urlToImage.trim() !== "" &&
              /\.(jpg|jpeg|png|gif)$/i.test(article.urlToImage)
          )
          .slice(0, 5); // Show top 5 articles

        setArticles(filteredArticles);
      } catch (err) {
        setError("Error fetching news");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p>Loading cybersecurity news...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.news_container}>
      <h2>Cybersecurity News</h2>
      <div className={styles.news_list}>
        {articles.map((article, index) => (
          <div key={index} className={styles.news_item}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <div className={styles.news_image_container}>
                <img
                  src={article.urlToImage!}
                  alt={article.title}
                  className={styles.news_image}
                />
                <div className={styles.news_description}>
                  <p>{article.description}</p>
                </div>
              </div>
            </a>
            <h3 className={styles.news_title}>{article.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
