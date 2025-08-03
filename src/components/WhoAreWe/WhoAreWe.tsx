"use client";
import styles from './WhoAreWe.module.css';
import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useLanguage } from '../../context/LanguageContext';
import { apiRequest } from '../../admin/lib/api';
import { getImageUrl } from '@/lib/cleanUrl';

interface WhoAreWeProps {
  onLearnMore?: () => void;
}

const WhoAreWe: React.FC<WhoAreWeProps> = ({
  onLearnMore,
}) => {
  const { language } = useLanguage();
  const [loadingTop, setLoadingTop] = useState(true);
  const [loadingBottom, setLoadingBottom] = useState(true);
  const [sectionData, setSectionData] = useState<any>(null);

  useEffect(() => {
    apiRequest('/api/homepage/section1', 'GET')
      .then(data => setSectionData(data))
      .catch(() => setSectionData(null));
  }, []);

  if (!sectionData) {
    return (
      <section className={` ${styles['team-section-wrapper']} component-padding max-width`}>
        <div className={styles['team-section']}>
          <div className={styles['team-section__content']}>
            <Skeleton height={40} width={200} />
            <Skeleton height={30} width={180} />
            <Skeleton count={3} />
            <Skeleton height={40} width={140} />
          </div>
          <div className={styles['team-section__images']}>
            <Skeleton height={150} width={250} style={{ borderRadius: '0.6rem' }} />
            <Skeleton height={150} width={250} style={{ borderRadius: '0.6rem' }} />
          </div>
        </div>
      </section>
    );
  }
  console.log('Section 1 data:', sectionData);
  const title = language === 'FR' ? sectionData.title_fr : sectionData.title_en;
  const subtitle = language === 'FR' ? sectionData.subtitle_fr : sectionData.subtitle_en;
  const paragraph = language === 'FR' ? sectionData.paragraph_fr : sectionData.paragraph_en;
  const image1 = sectionData.image1_path;
  const image2 = sectionData.image2_path;

  return (
    <section className={` ${styles['team-section-wrapper']} component-padding max-width`}>
      <div className={`${styles['team-section']} `}>
        <div className={styles['team-section__content']}>
          <div className="section-title">{title}</div>
          <div className='section-subtitle'>{subtitle.split('\n').map((line: string, i: number) => (
            <React.Fragment key={i}>{line}<br /></React.Fragment>
          ))}</div>
          <p>{paragraph}</p>
          <button className={styles['team-section__btn']} onClick={onLearnMore}>{language === 'FR' ? 'EN SAVOIR PLUS' : 'LEARN MORE'}</button>
        </div>
        <div className={styles['team-section__images']}>
          <div className={`${styles.child} ${styles.child1}`} style={{ position: 'relative' }}>
            {loadingBottom && (
              <Skeleton height={150} width={250} style={{ position: 'absolute', top: 0, left: 0, borderRadius: '0.6rem', zIndex: 3 }} />
            )}
            <img
              src={getImageUrl(image2)}
              alt="Cyclist 1"
              className={`${styles['team-section__img']} ${styles['team-section__img--bottom']}`}
              style={loadingBottom ? { visibility: 'hidden', position: 'absolute' } : {}}
              onLoad={() => setLoadingBottom(false)}
              onError={() => setLoadingBottom(false)}
            />
          </div>
          <div className={`${styles.child} ${styles.child2}`} style={{ position: 'relative' }}>
            {loadingTop && (
              <Skeleton height={150} width={250} style={{ position: 'absolute', top: 0, left: 0, borderRadius: '0.6rem', zIndex: 3 }} />
            )}
            <img
              src={getImageUrl(image1)}
              alt="Cyclist 2"
              className={`${styles['team-section__img']} ${styles['team-section__img--top']} `}
              style={loadingTop ? { visibility: 'hidden', position: 'absolute' } : {}}
              onLoad={() => setLoadingTop(false)}
              onError={() => setLoadingTop(false)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoAreWe;
