import React, { useState } from 'react';
import styles from './Player.module.css';
import { getImageUrl } from '@/lib/cleanUrl';
import { useLanguage } from '../../context/LanguageContext';

export interface PlayerInfo {
  bio_en: string;
  bio_fr: string;
}

export interface PlayerProps {
  name: string;
  image: string;
  nationality: string;
  birthday: string;
  info: PlayerInfo;
}

const Player: React.FC<PlayerProps> = ({ name, image, nationality, birthday, info }) => {
  const [activeTab, setActiveTab] = useState('Profile');
  const { language } = useLanguage();
  const bio = language === 'FR' ? info.bio_fr : info.bio_en;

  return (
    <div className={`${styles.playerProfileContainer} component-padding max-width`}>
      <div className={styles.playerProfileGrid}>
        <div className={styles.playerImageBox}>
          <img src={getImageUrl(image)} alt={name} className={styles.playerImg} />
        </div>
        <div className={styles.playerInfoBox}>
          <div className={styles.playerInfoRow}>
            <h2>Name</h2>
            <div className={styles.playerInfoValue}>{name}</div>
          </div>
          <hr />
          <div className={styles.playerInfoRow}>
            <h2>Nationality</h2>
            <div className={styles.playerInfoValue}>{nationality}</div>
          </div>
          <hr />
          <div className={styles.playerInfoRow}>
            <h2>Date of Birth</h2>
            <div className={styles.playerInfoValue}>{birthday}</div>
          </div>
        </div>
      </div>
      <div className={styles.playerTabs}>
        <button
          className={`${styles.tab} ${activeTab === 'Profile' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('Profile')}
        >
          Bio
        </button>
      </div>
      <div className={styles.playerTabContent}>
        {activeTab === 'Profile' && (
          <p dangerouslySetInnerHTML={{ __html: bio }} />
        )}
      </div>
    </div>
  );
};

export default Player;
