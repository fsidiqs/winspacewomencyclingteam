import styles from './OurStory.module.css';

interface OurStoryProps {
  title: string;
  subtitle: string;
  paragraphs: string[];
}

const OurStory = ({ title, subtitle, paragraphs }: OurStoryProps) => (
  <section className={`${styles.ourStoryContainer} component-padding`}>
    <div className={styles.ourStoryGrid}>
      <div className={styles.ourStoryLeft}>
        <div className='section-title'>{title}</div>
        <div className='section-subtitle'>{subtitle}</div>
      </div>
      <div className={`${styles.ourStoryRight} section-text`}>
        {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
      </div>
    </div>
  </section>
);

export default OurStory;
