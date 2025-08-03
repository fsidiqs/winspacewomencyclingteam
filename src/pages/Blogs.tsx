import React, { useEffect, useState } from "react";
import BlogListSection, { type Blog } from "../components/BlogListSection";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import Footer from "../components/Footer/Footer";
import Navigation from "../components/Navigation/Navigation";
import { useLanguage } from "../context/LanguageContext";
import { cleanUrl, getImageUrl } from '../lib/cleanUrl';

const API_LIMIT = 9;

function BlogSkeletonGrid() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 24,
      margin: '32px 0',
      padding: '0 16px',
    }}>
      {Array.from({ length: API_LIMIT }).map((_, i) => (
        <div key={i} style={{ background: '#f3f3f3', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px #0001', minHeight: 320 }}>
          <div style={{ height: 180, background: '#e0e0e0', borderRadius: '12px 12px 0 0', animation: 'pulse 1.5s infinite' }} />
          <div style={{ padding: 16 }}>
            <div style={{ width: 80, height: 16, background: '#e0e0e0', borderRadius: 8, marginBottom: 8, animation: 'pulse 1.5s infinite' }} />
            <div style={{ width: 120, height: 14, background: '#e0e0e0', borderRadius: 7, marginBottom: 12, animation: 'pulse 1.5s infinite' }} />
            <div style={{ width: '100%', height: 22, background: '#e0e0e0', borderRadius: 8, marginBottom: 8, animation: 'pulse 1.5s infinite' }} />
          </div>
        </div>
      ))}
      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

const breadcrumbsContent = {
  EN: {
    title: 'NEWSROOM',
    items: ['Home', 'Newsroom']
  },
  FR: {
    title: 'ACTUALITÉS',
    items: ['Accueil', 'Actualités']
  }
};

 
const API_HOST = import.meta.env.VITE_API_HOST || "http://localhost:8000";



export default function Blogs() {
  const { language } = useLanguage();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    const fetchBlogs = async () => {
      try {
        const host = import.meta.env.VITE_API_HOST;
        const res = await fetch(`${host}/api/posts/latest?limit=${API_LIMIT}&page=${page}`, { signal: controller.signal });
        const data = await res.json();
        const mappedBlogs: Blog[] = (data.data || []).map((item: any) => ({
          id: item.id,
          image: item.photo ? getImageUrl(item.photo) : "https://via.placeholder.com/400x250?text=No+Image",
          date: new Date(item.created_at).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          title:
            language === "FR"
              ? item.post_title_fr || item.post_title_en || ""
              : item.post_title_en || item.post_title_fr || "",
        }));
        setBlogs(mappedBlogs);
        setTotalPages(data.last_page || 1);
      } catch (e) {
        if (typeof e !== 'object' || e === null || (e as any).name !== 'AbortError') {
          setBlogs([]);
          setTotalPages(1);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    fetchBlogs();
    return () => controller.abort();
  }, [language, page]);

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  const bc = breadcrumbsContent[language];

  return (
    <>
      <Navigation />
      <Breadcrumbs title={bc.title} items={bc.items} />
      {loading ? (
        <BlogSkeletonGrid />
      ) : (
        <>
          <BlogListSection posts={blogs} />
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, margin: '24px 0' }}>
            <button onClick={handlePrev} disabled={page === 1} style={{ padding: '8px 16px' }}>Previous Page</button>
            <span style={{ alignSelf: 'center' }}>Page {page} of {totalPages}</span>
            <button onClick={handleNext} disabled={page === totalPages} style={{ padding: '8px 16px' }}>Next Page</button>
          </div>
        </>
      )}
      <Footer />
    </>
  );
}
