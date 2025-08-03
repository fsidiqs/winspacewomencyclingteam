import { getImageUrl } from '@/lib/cleanUrl';
import { useNavigate } from 'react-router';
import styles from './TeamsSection.module.css';

export interface TeamMember {
  id: number;
  name: string;
  nationality: string;
  img: string;
  alt: string;
  info?: any; // add info property, optional for compatibility
}

interface TeamsSectionProps {
  title: string;
  subtitle: string;
  team: TeamMember[];
}

const TeamsSection = ({ title, subtitle, team }: TeamsSectionProps) => {
  const navigate = useNavigate();
  return (
    <section className={`${styles.teamSectionWrapper} component-padding `}>
      <div className={styles.teamSection}>
        <div className={styles.teamHeader}>
          <div className='section-title'>{title}</div>
          <div className='section-subtitle'>{subtitle}</div>
        </div>
        <div className={styles.teamGrid}>
          {team.map((coach) => (
            <div
              className={styles.teamCard}
              key={coach.id}
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/the-team/${coach.id}`)}
            >
              <img src={getImageUrl(coach.img)} alt={coach.alt} className={styles.teamImg} />
              <div className={styles.teamInfo}>
                <h2>{coach.name}</h2>
                <p>{coach.nationality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamsSection;
