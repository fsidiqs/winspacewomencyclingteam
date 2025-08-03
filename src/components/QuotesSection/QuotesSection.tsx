"use client";
import React, { useState, useEffect } from 'react';
import styles from './QuotesSection.module.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useLanguage } from '../../context/LanguageContext';
import { apiRequest } from '../../admin/lib/api';
import { getImageUrl } from '@/lib/cleanUrl';

const QuotesSection: React.FC = () => {
  const { language } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sectionData, setSectionData] = useState<any>(null);

  useEffect(() => {
    apiRequest('/api/homepage/quotes', 'GET')
      .then(data => {
        setSectionData(data);
        setLoading(false);
      })
      .catch(() => {
        setSectionData(null);
        setLoading(false);
      });
  }, []);

  if (loading || !sectionData) {
    return (
      <div className={`${styles.quotesContainer} component-padding`}>
        <div className={styles.quotesImage}>
          <Skeleton height={200} width={300} />
        </div>
        <div className={styles.quotesSection}>
          <div className={styles.quoteContent}>
            <Skeleton height={30} width={40} />
            <Skeleton height={60} count={2} />
            <Skeleton height={20} width={120} />
          </div>
          <div className={styles.quoteDots}>
            <Skeleton circle height={12} width={12} count={4} inline style={{ marginRight: 8 }} />
          </div>
        </div>
      </div>
    );
  }

  const quotes = sectionData.items || [];
  const sectionImage = sectionData.section_image;
  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % quotes.length);
  };
  const currentQuote = quotes[current];
  const quoteText = language === 'FR' ? currentQuote.content_fr : currentQuote.content_en;
  const quoteAuthor = currentQuote.person;
  const quoteRole = language === 'FR' ? currentQuote.person_title_fr : currentQuote.person_title_en;

  return (
    <div className={`${styles.quotesContainer} component-padding`}>
      <div className={styles.quotesImage}>
        <img src={getImageUrl(sectionImage)} alt="Team Photo" />
      </div>
      <div className={styles.quotesSection} onClick={handleNext} title="Click to see next quote">
        <div className={styles.quoteContent}>
          <div className={styles.quoteIcon}>&rdquo;</div>
          <div className={styles.quoteText}>{quoteText}</div>
          <div className={styles.quoteAuthor}>
            <strong>{quoteAuthor}</strong><br />
            <span>{quoteRole}</span>
          </div>
        </div>
        <div className={styles.quoteDots}>
          {quotes.map((_: any, idx: number) => (
            <span
              key={idx}
              className={idx === current ? `${styles.dot} ${styles.dotActive}` : styles.dot}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuotesSection;
