import { useEffect, useState } from "react";
import styles from "./CybersecurityNews.module.css";
import { vt323 } from "../../utils/fonts";
import Image from "next/image"; // Import the next/image component for optimized image loading

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
}

interface NewsResponse {
  articles: Article[];
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

        const data = (await response.json()) as NewsResponse; 

        const filteredArticles = data.articles
          .filter((article: Article) => 
            article.urlToImage &&
            article.urlToImage.trim() !== "" &&
            /\.(jpg|jpeg|png|gif|webp)$/i.test(article.urlToImage)
          )
          .slice(0, 3);

        setArticles(filteredArticles);
      } catch (err) {
        setError("Error fetching cybersecurity news");
        console.error(err); 
      } finally {
        setLoading(false);
      }
    };

    void fetchNews(); 
  }, []); 

  if (loading) return (
    <div className={`${styles.loading} ${vt323.className}`}>
      <div className={styles.loading_spinner}></div>
      <p>Loading latest threats...</p>
    </div>
  );

  if (error) return (
    <div className={`${styles.error} ${vt323.className}`}>
      <p>{error}</p>
    </div>
  );

  return (
    <section className={`${styles.cybernews} ${vt323.className}`}>
      <header className={styles.header}>
        <h2>
          <span className={styles.title_highlight}>CYBER</span>SECURITY ALERTS
        </h2>
        <div className={styles.title_underline}></div>
      </header>

      <div className={styles.news_grid}>
        {articles.map((article, index) => (
          <article key={index} className={styles.news_card}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <div className={styles.image_container}>
                <Image
                  src={article.urlToImage ?? '/default-image.jpg'} // Fallback image if urlToImage is null
                  alt={article.title}
                  className={styles.news_image}
                  width={500} 
                  height={300} 
                />
                <div className={styles.image_overlay}>
                  <p>{article.description}</p>
                  <span className={styles.read_more}>READ MORE →</span>
                </div>
              </div>
              <h3>{article.title}</h3>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
