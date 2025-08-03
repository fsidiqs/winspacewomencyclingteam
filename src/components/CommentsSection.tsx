import React, { useState, useEffect } from 'react';
import './CommentsSection.css';
import { formatDate } from '../lib/formatDate';

interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
  avatar: string;
}

interface CommentsSectionProps {
  postId: number;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([
    // {
    //   id: 1,
    //   author: "Sarah Johnson",
    //   content: "This is a fantastic article! The explanations are clear and the examples are very helpful. Thank you for sharing your knowledge.",
    //   date: "2 days ago",
    //   avatar: "https://images.unsplash.com/photo-1494790108755-2616b9c9b516?w=40&h=40&fit=crop&crop=face"
    // },
    // {
    //   id: 2,
    //   author: "Mike Chen",
    //   content: "I've been struggling with this concept for weeks, and your post finally made it click for me. Excellent work!",
    //   date: "1 day ago",
    //   avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
    // },
    // {
    //   id: 3,
    //   author: "Emily Rodriguez",
    //   content: "Great insights! I'd love to see a follow-up post diving deeper into advanced techniques.",
    //   date: "12 hours ago",
    //   avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
    // }
  ]);

  const [newComment, setNewComment] = useState({
    author: '',
    email: '',
    content: ''
  });

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const API_HOST = import.meta.env.VITE_API_HOST || 'http://localhost:8000';
        const res = await fetch(`${API_HOST}/api/posts/${postId}/comments`);
        if (!res.ok) throw new Error('Failed to fetch comments');
        const data = await res.json();
        // Map API response to Comment[]
        const mapped = (Array.isArray(data) ? data : []).map((item: any) => ({
          id: item.id,
          author: item.name || 'Anonymous',
          content: item.comment,
          date: formatDate(item.created_at || ''),
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face',
        }));
        setComments(mapped);
      } catch (err) {
        // Optionally handle error
      }
    };
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.author.trim() && newComment.email.trim() && newComment.content.trim()) {
      try {
        const API_HOST = import.meta.env.VITE_API_HOST || 'http://localhost:8000';
        await fetch(`${API_HOST}/api/posts/${postId}/comments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            comment: newComment.content,
            email: newComment.email,
            name: newComment.author
          })
        });
      } catch (err) {
        // Optionally handle error
      }
      const comment: Comment = {
        id: comments.length + 1,
        author: newComment.author,
        content: newComment.content,
        date: formatDate(new Date().toISOString()),
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face"
      };
      setComments([...comments, comment]);
      setNewComment({ author: '', email: '', content: '' });
    }
  };

  return (
    <section className="comments-section">
      <h2 className="comments-title">Comments ({comments.length})</h2>
      
      {/* Comment Form */}
      <form className="comment-form" onSubmit={handleSubmit}>
        <h3>Leave a Comment</h3>
        <div className="form-group">
          <input
            type="text"
            placeholder="Your Name"
            value={newComment.author}
            onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
            className="comment-input"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Your Email"
            value={newComment.email}
            onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
            className="comment-input"
            required
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Write your comment here..."
            value={newComment.content}
            onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
            className="comment-textarea"
            rows={4}
            required
          />
        </div>
        <button type="submit" className="comment-submit-btn">
          Post Comment
        </button>
      </form>

      {/* Comments List */}
      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <div className="comment-avatar">
              <img src={comment.avatar} alt={comment.author} />
            </div>
            <div className="comment-content">
              <div className="comment-header">
                <h4 className="comment-author">{comment.author}</h4>
                <span className="comment-date">{comment.date}</span>
              </div>
              <p className="comment-text">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommentsSection;
