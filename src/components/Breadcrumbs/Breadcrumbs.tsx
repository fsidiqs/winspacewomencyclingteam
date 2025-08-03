import styles from './Breadcrumbs.module.css';
import React from 'react';

interface BreadcrumbsProps {
  title: string;
  items: string[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ title, items }) => {
  return (
    <section className={`${styles['breadcrumbs-section']}`}>
      <div className={styles['breadcrumbs-title']}>{title}</div>
      <div className={styles['breadcrumbs']}>
        {items.map((item, idx) => (
          <React.Fragment key={item + idx}>
            <span>{item}</span>
            {idx < items.length - 1 && (
              <span className={styles['separator']}>-</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default Breadcrumbs;
