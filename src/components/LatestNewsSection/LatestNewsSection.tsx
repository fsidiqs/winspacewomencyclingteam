import React, { useEffect, useState } from 'react';
import styles from './LatestNewsSection.module.css';
import { cleanUrl, getImageUrl } from '../../lib/cleanUrl';
import { useNavigate } from 'react-router';

interface NewsItem {
  id: number;
  image: string;
  date: string;
  title: string;
}

const API_LIMIT = 3;

export default function LatestNewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    const fetchNews = async () => {

      try {
        const host = import.meta.env.VITE_API_HOST;
        console
        const res = await fetch(`${host}/api/posts/latest?limit=${API_LIMIT}&page=1`, { signal: controller.signal });
        const data = await res.json();
        const mappedNews: NewsItem[] = (data.data || []).map((item: any) => ({
          id: item.id,
          image: item.photo ? getImageUrl(item.photo) : 'https://via.placeholder.com/400x250?text=No+Image',
          date: new Date(item.created_at).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }),
          title: item.post_title_en || item.post_title_fr || '',
        }));
        setNews(mappedNews);
      } catch (e) {
        setNews([]);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    fetchNews();
    return () => controller.abort();
  }, []);

  return (
    <section className={`${styles.latestNewsSection} component-padding`}>
      <div className={styles.latestNewsHeader}>
        <span className={styles.latestNewsLabel}>GALLERY</span>
        <h1 className={styles.latestNewsTitle}>Latest news</h1>
      </div>
      <div className={`${styles.latestNewsCards}`}>
        {loading ? (
          Array.from({ length: API_LIMIT }).map((_, idx) => (
            <div className={styles.newsCard} key={idx} style={{ background: '#f3f3f3', minHeight: 320 }} />
          ))
        ) : (
          news.map((item) => (
            <div className={styles.newsCard} key={item.id}
              onClick={() => navigate(`/posts/${item.id}/${item.title.replace(/\s+/g, "-").toLowerCase()}`)}
              style={{ cursor: "pointer" }}

            >
              <img src={item.image} alt={item.title} className={styles.newsCardImg} />
              <div className={styles.newsCardOverlay}>
                <div className={styles.newsCardMeta}>
                  <span className={styles.newsCardTrending}>TRENDING</span>
                  <span className={styles.newsCardDot}>&bull;</span>
                  <span className={styles.newsCardDate}>{item.date}</span>
                </div>
                <h2 className={styles.newsCardTitle}>{item.title}</h2>
                <span className={styles.newsCardArrow}>&rarr;</span>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
