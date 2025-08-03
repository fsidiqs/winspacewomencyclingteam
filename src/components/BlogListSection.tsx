import React from "react";
import { useNavigate } from "react-router";
import styles from "./BlogListSection.module.css";

export interface Blog {
  id: number;
  image: string;
  date: string;
  title: string;
}

interface BlogListSectionProps {
  posts: Blog[];
}

const API_HOST = import.meta.env.VITE_API_HOST || "http://localhost:8000";



const BlogListSection: React.FC<BlogListSectionProps> = ({ posts }) => {
  const navigate = useNavigate();
  return (
    <section className={styles.blogListSection}>
      <div className={styles.blogGrid}>
        {posts.map((blog) => (
          <div
            className={styles.blogCard}
            key={blog.id}
            onClick={() => navigate(`/posts/${blog.id}/${blog.title.replace(/\s+/g, "-").toLowerCase()}`)}
            style={{ cursor: "pointer" }}
          >
            <div className={styles.blogImageWrapper}>
              <img
                src={blog.image}
                alt={blog.title}
                className={styles.blogImage}
              />
            </div>
            <div className={styles.blogCardContent}>
              <span className={styles.trending}>TRENDING</span>
              <span className={styles.date}>{blog.date}</span>
              <h2 className={styles.title}>{blog.title}</h2>
              <span className={styles.arrow}>&rarr;</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogListSection;
