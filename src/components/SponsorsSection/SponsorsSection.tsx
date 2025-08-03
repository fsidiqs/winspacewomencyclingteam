import styles from './SponsorsSection.module.css';
import React from 'react';

interface SponsorLogo {
  href: string;
  src: string;
  alt: string;
}

interface SponsorsSectionProps {
  title: string;
  subtitle: string;
  description: string;
  sponsors: SponsorLogo[];
  backgroundBlue?: boolean;
}

const SponsorsSection: React.FC<SponsorsSectionProps> = ({
  title,
  subtitle,
  description,
  sponsors,
  backgroundBlue,
}) => {
  return (
    <section className={`${styles['sponsorsSection-wrapper']} component-padding` + (backgroundBlue ? ` background-blue` : '')}>
      <div className="max-width">
        <div className={styles['sponsorsSection-content']}>
          <div className={styles['sponsorsSection-header']}>
            <span className={`section-title`}>{title}</span>
            <h2 className={`section-subtitle`}>{subtitle}</h2>
          </div>
          <div className={`section-text`}>{description}</div>
        </div>
        <div className={styles['sponsorsSection-logos']}>
          {sponsors.map((s, i) => (
            <a
              key={i}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles['sponsorsSection-logoLink']}
            >
              <img src={s.src} alt={s.alt} className={styles['sponsorsSection-logo']} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
