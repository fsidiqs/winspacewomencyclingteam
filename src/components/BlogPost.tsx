import React from 'react';
import { Share } from 'lucide-react';
import RelatedBlog from './RelatedBlog';
import CommentsSection from './CommentsSection';
import ShareButtons from './ShareButtons';
import { formatDate } from '../lib/formatDate';
import './BlogPost.css';
import { cleanUrl, getImageUrl } from '@/lib/cleanUrl';

interface BlogPostProps {
  featuredImage: string;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  postId: number; // Changed postId type to number
}

const BlogPost: React.FC<BlogPostProps> = ({
  featuredImage,
  title,
  content,
  author,
  date,
  category,
  readTime,
  postId
}) => {
  return (
    <article className="blog-post">
      <div className="blog-container">
        {/* Header Section */}
        <header className="blog-header">
          <div className="blog-meta">
            <span className="category">{category}</span>
            {/* <span className="read-time">{readTime} min read</span> */}
          </div>
          <h1 className="blog-title">{title}</h1>
          <div className="blog-author-info">
            <span className="author">By {author}</span>
            <span className="date">{formatDate(date)}</span>
          </div>
        </header>

        {/* Featured Image */}
        <div className="featured-image-container">
          <img
            src={getImageUrl(featuredImage)}
            alt={title}
            className="featured-image"
          />
        </div>

        {/* Main Content */}
        <div className="blog-content-wrapper">
          <div className="blog-content">
            <div className="content-text" dangerouslySetInnerHTML={{ __html: content }} />
          </div>

          {/* Share Buttons */}
          <ShareButtons title={title} />
        </div>

        {/* Related Blog Posts */}
        <RelatedBlog currentPostId={postId} />

        {/* Comments Section */}
        <CommentsSection postId={postId} /> {/* Pass postId to CommentsSection */}
      </div>
    </article>
  );
};

export default BlogPost;
