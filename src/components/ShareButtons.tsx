import React, { useState } from 'react';
import { Share } from 'lucide-react';
import './ShareButtons.css';

interface ShareButtonsProps {
  title: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title }) => {
  const currentUrl = window.location.href;
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(currentUrl);
  const [copied, setCopied] = useState(false);

  const shareLinks = {
    twitter: `https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      setCopied(false);
    }
  };

  return (
    <div className="share-buttons">
      <div className="share-header">
        <Share size={20} />
        <span>Share this article</span>
      </div>
      <div className="share-buttons-list">
        <button 
          onClick={() => handleShare('twitter')}
          style={{ backgroundColor: 'black', color: '#fff' }}
          className="share-btn"
          aria-label="Share on X"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
          </svg>
          X
        </button>
        
        <button 
          onClick={() => handleShare('facebook')}
          className="share-btn facebook"
          aria-label="Share on Facebook"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Facebook
        </button>
        
        {/* <button 
          onClick={() => handleShare('linkedin')}
          className="share-btn linkedin"
          aria-label="Share on LinkedIn"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          LinkedIn
        </button>
        
        <button 
          onClick={() => handleShare('reddit')}
          className="share-btn reddit"
          aria-label="Share on Reddit"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
          </svg>
          Reddit
        </button> */}
        
        <button
          onClick={handleCopyLink}
          className="share-btn copy-link"
          aria-label="Copy Link"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M3.9 12a5 5 0 0 1 5-5h3a1 1 0 1 1 0 2h-3a3 3 0 1 0 0 6h3a1 1 0 1 1 0 2h-3a5 5 0 0 1-5-5zm7-1a1 1 0 0 1 1-1h3a5 5 0 1 1 0 10h-3a1 1 0 1 1 0-2h3a3 3 0 1 0 0-6h-3a1 1 0 0 1-1-1z" />
          </svg>
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
      </div>
    </div>
  );
};

export default ShareButtons;
