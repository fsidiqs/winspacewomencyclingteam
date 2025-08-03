import React, { useEffect, useState } from 'react';
import './RelatedBlog.css';
import { useLanguage } from '../context/LanguageContext';
import { cleanUrl, getImageUrl } from '../lib/cleanUrl';
import { useNavigate } from 'react-router';

interface RelatedPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
}

interface RelatedBlogProps {
  currentPostId: number;
}

const API_LIMIT = 2;

const RelatedBlog: React.FC<RelatedBlogProps> = ({ currentPostId }) => {
  const { language } = useLanguage();
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    const fetchRelated = async () => {
      try {
        const host = import.meta.env.VITE_API_HOST;
        const res = await fetch(`${host}/api/posts/latest?limit=${API_LIMIT + 1}` , { signal: controller.signal });
        const data = await res.json();
        const mapped: RelatedPost[] = (data.data || [])
          .filter((item: any) => item.id !== currentPostId)
          .slice(0, API_LIMIT)
          .map((item: any) => ({
            id: item.id,
            title: language === 'FR' ? item.post_title_fr || item.post_title_en || '' : item.post_title_en || item.post_title_fr || '',
            excerpt: item.excerpt || '',
            image: item.photo ? item.photo : 'https://via.placeholder.com/400x250?text=No+Image',
            date: new Date(item.created_at).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            }),
            readTime: item.read_time ? String(item.read_time) : '5',
          }));
        setRelatedPosts(mapped);
      } catch (e) {
        setRelatedPosts([]);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    fetchRelated();
    return () => controller.abort();
  }, [language, currentPostId]);

  return (
    <section className="related-blog">
      <h2 className="related-title">Related Articles</h2>
      <div className="related-posts-grid">
        {loading ? (
          Array.from({ length: API_LIMIT }).map((_, i) => (
            <div key={i} className="related-post-card" style={{ background: '#f3f3f3', minHeight: 320, borderRadius: 12 }} />
          ))
        ) : (
          relatedPosts.map((post) => (
            <article
              key={post.id}
              className="related-post-card"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/posts/${post.id}/${post.title.replace(/\s+/g, "-").toLowerCase()}`)}
            >
              <div className="related-post-image">
                <img src={getImageUrl(post.image)} alt={post.title} />
              </div>
              <div className="related-post-content">
                <h3 className="related-post-title">{post.title}</h3>
                <p className="related-post-excerpt">{post.excerpt}</p>
                <div className="related-post-meta">
                  <span className="related-post-date">{post.date}</span>
                  {/* <span className="related-post-read-time">{post.readTime} min read</span> */}
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
};

export default RelatedBlog;
