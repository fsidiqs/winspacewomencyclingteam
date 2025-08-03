import { getImageUrl } from '@/lib/cleanUrl';
import { useNavigate } from 'react-router';
import styles from './ManagementSection.module.css';
import { ManagementStaffType } from '../ManagementStaff/ManagementStaff';



interface ManagementSectionProps {
  title: string;
  subtitle: string;
  staff: ManagementStaffType[];
}

const ManagementSection = ({ title, subtitle, staff }: ManagementSectionProps) => {
  const navigate = useNavigate();
  return (
    <section className={`${styles.teamSectionWrapper} component-padding`}>
      <div className={styles.teamSection}>
        <div className={styles.teamHeader}>
          <div className='section-title'>{title}</div>
          <div className='section-subtitle'>{subtitle}</div>
        </div>
        <div className={styles.teamGrid}>
          {staff.map((member) => (
            <div
              className={styles.teamCard}
              key={member.id}
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/management-staff/${member.id}`)}
            >
              <img src={getImageUrl(member.photo)} alt={member.alt} className={styles.teamImg} />
              <div className={styles.teamInfo}>
                <h2>{member.name}</h2>
                <p>{member.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ManagementSection;
