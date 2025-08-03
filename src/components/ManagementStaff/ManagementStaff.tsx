import React from 'react';
import { useNavigate } from 'react-router';
import styles from './ManagementStaff.module.css';
import { getImageUrl } from '@/lib/cleanUrl';

export interface ManagementStaffType {
  id: number;
  name: string;
  title: string;
  photo: string;
  alt?: string;
  info?: {
    bio_en: string;
    bio_fr: string;
  };
  status?: string; // Optional status field
}
interface ManagementStaffProps {
    title: string;
    subtitle: string;
    team: ManagementStaffType[];
}

const ManagementStaff: React.FC<ManagementStaffProps> = ({ title, subtitle, team }) => {
    const navigate = useNavigate();
    return (
        <section className={`${styles.teamSectionWrapper} component-padding`}>
            <div className={styles.teamSection}>
                <div className={styles.teamHeader}>
                    <h4>{title}</h4>
                    <h1>{subtitle}</h1>
                </div>
                <div className={styles.teamGrid}>
                    {team.map((coach, idx) => (
                        <div
                            className={styles.teamCard}
                            key={coach.id ?? coach.name + idx}
                            style={{ cursor: 'pointer' }}
                            onClick={() => coach.id && navigate(`/management-staff/${coach.id}`)}
                        >
                            <img src={getImageUrl(coach.photo)} alt={coach.alt} className={styles.teamImg} />
                            <div className={styles.teamInfo}>
                                <h2>{coach.name}</h2>
                                <p>{coach.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ManagementStaff;
