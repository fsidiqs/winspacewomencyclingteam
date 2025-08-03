import styles from './ImageTextSection.module.css';

interface ImageTextSectionProps {
  title: string;
  subtitle: string;
  text: string;
}

const ImageTextSection = ({ title, subtitle, text }: ImageTextSectionProps) => (
  <section className={`${styles.imageTextSection} component-padding`}>
    <div className={styles.imageTextGrid}>
      <div className={styles.imageTextImg}>
        <img
          src="http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/02/about-us-image-1.png"
          alt="Team presentation"
        />
      </div>
      <div className={styles.imageTextContent}>
        <div className={`section-title`}>{title}</div>
        <div className='section-subtitle'>{subtitle}</div>
        <div className='section-text'>
          {text}
        </div>
      </div>
    </div>
  </section>
);

export default ImageTextSection;
