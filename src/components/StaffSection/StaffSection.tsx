import styles from './StaffSection.module.css';

interface Staff {
  name: string;
  subtitle: string;
  img: string;
  alt: string;
  link: string;
}

interface StaffSectionProps {
  title: string;
  subtitle: string;
  staffs: Staff[];
}

const StaffSection = ({ title, subtitle, staffs }: StaffSectionProps) => (
  <section className={`${styles.teamSectionWrapper} component-padding `}>
    <div className={styles.teamSection}>
      <div className={styles.teamHeader}>
        <div className='section-title'>{title}</div>
        <div className='section-subtitle'>{subtitle}</div>
      </div>
      <div className={styles.teamGrid}>
        {staffs.map((staff) => (
          <div className={styles.teamCard} key={staff.name}>
            <img src={staff.img} alt={staff.alt} className={styles.teamImg} />
            <div className={styles.teamInfo}>
              <h2>{staff.name}</h2>
              <p>{staff.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StaffSection;
