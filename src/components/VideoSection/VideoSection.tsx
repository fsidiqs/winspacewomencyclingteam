import styles from './VideoSection.module.css';
import React, { useState } from 'react';

interface VideoSectionProps {
  coverImage?: string;
  videoUrl?: string;
  title?: string;
  subtitle?: string;
}

const DEFAULT_VIDEO_URL = "https://www.youtube.com/embed/OvDvRc6r6sU?si=OqyiwQGYejjDsr5q";
const DEFAULT_COVER = 'http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/05/home-video-thumbnail.jpeg';

const VideoSection: React.FC<VideoSectionProps> = ({
  coverImage = DEFAULT_COVER,
  videoUrl = DEFAULT_VIDEO_URL,
  title,
  subtitle,
}) => {
  const [modalActive, setModalActive] = useState(false);
  const [iframeSrc, setIframeSrc] = useState('');

  const handlePlay = () => {
    setIframeSrc(videoUrl+'?autoplay=1');
    setModalActive(true);
  };

  const handleClose = () => {
    setModalActive(false);
    setIframeSrc('');
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <section className={styles['video-section-wrapper']}>
      <div className={styles['video-section']}>
        <img src={coverImage} alt="PRS-RBX.2K25" className={styles['video-section__bg']} />
        <div className={styles['video-section__overlay']}>
          {title && <div className={styles['video-section__title']}>{title}</div>}
          {subtitle && <div className={styles['video-section__subtitle']}>{subtitle}</div>}
          <button className={styles['video-section__play']} onClick={handlePlay}>
            <span>PLAY</span>
          </button>
        </div>
        <div
          className={modalActive ? `${styles['video-modal']} ${styles['active']}` : styles['video-modal']}
          onClick={handleModalClick}
        >
          <div className={styles['video-modal__content']}>
            <button className={styles['video-modal__close']} onClick={handleClose}>&times;</button>
            <iframe width="560" height="315" src={videoUrl} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
