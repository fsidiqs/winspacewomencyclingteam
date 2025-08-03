import styles from './BannerHero.module.css';
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate } from 'react-router';
import { apiRequest } from '../../admin/lib/api';
import { getImageUrl } from '@/lib/cleanUrl';

const content = {
  EN: {
    title: 'Winspace Orange Seal',
    learnMore: 'LEARN MORE',
    videoCaption: 'Behind the Scenes of the 2025 \n Paris-Roubaix - A film by LFCC',
  },
  FR: {
    title: 'Winspace Orange Seal',
    learnMore: 'EN SAVOIR PLUS',
    videoCaption: 'Dans les coulisses de \n Paris-Roubaix 2025 - film de LFCC',
  },
};

interface BannerHeroProps {
  title?: string;
  backgroundUrl?: string;
  videoThumbUrl?: string;
  onJoin?: () => void;
  onLearn?: () => void;
}

const BannerHero: React.FC<BannerHeroProps> = ({
  title,
  backgroundUrl,
  videoThumbUrl,
  onJoin,
  onLearn,
}) => {
  const { language } = useLanguage();
  const [loaded, setLoaded] = React.useState(false);
  const [showVideo, setShowVideo] = React.useState(false);
  const [bannerData, setBannerData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    apiRequest('/api/homepage/hero-banner', 'GET')
      .then(data => setBannerData(data))
      .catch(() => setBannerData(null))
      .finally(() => setLoading(false));
  }, []);

  // Fallbacks if API fails
  const defaultBg = '';
  const defaultThumb = '';
  const defaultVideo = '';
  const defaultTitle = 'Winspace Orange Seal';
  const defaultCaption = {
    EN: 'Behind the Scenes of the 2025\nParis-Roubaix - A film by LFCC',
    FR: 'Dans les coulisses de\nParis-Roubaix 2025 - film de LFCC',
  };

  const bgUrl = bannerData?.image_path ? (bannerData.image_path.startsWith('http') ? bannerData.image_path : `/storage/${bannerData.image_path.replace(/^uploads\//, 'uploads/')}`) : (backgroundUrl || defaultBg);
  const thumbUrl = bannerData?.video_thumbnail_path || videoThumbUrl || defaultThumb;
  const videoUrl = bannerData?.video_url || defaultVideo;
  const videoCaption = language === 'FR' ? (bannerData?.video_title_fr || defaultCaption.FR) : (bannerData?.video_title_en || defaultCaption.EN);
  const displayTitle = title || defaultTitle;

  return (
    <div className={styles['banner-hero']}>
      <img
        src={getImageUrl(bgUrl)}
        alt={displayTitle}
        className={`${styles['banner-hero-bg']} ${loaded ? styles['zoom-in'] : ''}`}
        onLoad={() => setLoaded(true)}
      />
      <div className={styles['banner-hero-content']}>
        <span className={styles['banner-title']}>{displayTitle}</span>
        <div className={styles['banner-hero-buttons']}>
            <button
            className={styles['join-btn']}
            onClick={() => {
              navigate('/about-us');
            }}
            >
            {language === 'FR' ? 'EN SAVOIR PLUS' : 'LEARN MORE'}
            </button>
        </div>
        <div className={styles['banner-hero-video']}>
          <img
            src={getImageUrl(thumbUrl)}
            alt="Watch trainees perform"
            className={styles['video-thumb']}
            style={{ cursor: 'pointer' }}
            onClick={() => setShowVideo(true)}
          />
          <div className={styles['video-caption']}>
            {videoCaption.split('\n').map((line: string, i: number) => (
              <span key={i}>{line}<br /></span>
            ))}
          </div>
          {showVideo && (
            <div className={styles['video-popup']} onClick={() => setShowVideo(false)}>
              <div className={styles['video-popup-inner']} onClick={e => e.stopPropagation()}>
                <iframe
                  width="560"
                  height="315"
                  src={videoUrl}
                  title="Popup Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <button className={styles['close-btn']} onClick={() => setShowVideo(false)}>×</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BannerHero;
