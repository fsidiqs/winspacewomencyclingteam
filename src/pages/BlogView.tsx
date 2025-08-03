import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import BlogPost from "../components/BlogPost";
import Footer from "../components/Footer/Footer";
import Navigation from "../components/Navigation/Navigation";
import { useLanguage } from "../context/LanguageContext";
import { cleanUrl } from '../lib/cleanUrl';

interface BlogApiResponse {
    id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
    photo: string;
    status: string;
    post_title_en: string;
    post_title_fr: string;
    content_en: string;
    content_fr: string;
    photo_url: string; // Added photo_url
}

const API_HOST = import.meta.env.VITE_API_HOST || 'http://localhost:8000';

const BlogView: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const { language } = useLanguage();
    const [blog, setBlog] = useState<BlogApiResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!postId) {
            setError("No blog ID provided");
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(null);
        fetch(`${API_HOST}/api/posts/${postId}`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch blog post");
                return res.json();
            })
            .then((data: BlogApiResponse) => {
                setBlog(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [postId]);

    let title = "";
    let content = ``;
    if (blog) {
        title = language === "EN" ? blog.post_title_en : blog.post_title_fr;
        content = language === "EN" ? blog.content_en : blog.content_fr;
    }

    // Always convert newlines to <br /> for rendering
    if (content) {
        content = content.replace(/\n/g, '<br />');
    }
    return (
        <>
            <Navigation />
            {loading && <div>Loading...</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}

            {blog && (
                <BlogPost
                    featuredImage={blog.photo}
                    title={title}
                    content={content}
                    author={""}
                    date={blog.created_at}
                    category={""}
                    readTime={""}
                    postId={blog.id}
                />
            )}
         
            <Footer />
        </>
    );
};

export default BlogView;
