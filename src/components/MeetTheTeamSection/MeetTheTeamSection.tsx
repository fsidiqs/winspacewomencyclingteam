import React, { useRef, useEffect, useState } from 'react';
import styles from './MeetTheTeamSection.module.css';
import { useLanguage } from '../../context/LanguageContext';
import { TeamMember as BaseTeamMember } from '../TeamsSection/TeamsSection';
import { apiRequest } from '../../admin/lib/api';
import { useNavigate } from 'react-router';
import { getImageUrl } from '@/lib/cleanUrl';

// Extend TeamMember for this section to allow link and subtitle
interface TeamMember extends BaseTeamMember {
  link?: string;
  subtitle?: string;
}

const teamsContent = {
  EN: {
    title: 'THE TEAM',
    subtitle: 'MEET THE TEAM',
  },
  FR: {
    title: "L'ÉQUIPE",
    subtitle: "RENCONTREZ L'ÉQUIPE",
  }
};

const MeetTheTeamSection: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeam = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await apiRequest('/api/riders', 'GET');
        const riders = Array.isArray(data) ? data : [data];
        setTeamMembers(riders.map((rider: any) => ({
          id: rider.id,
          name: rider.name,
          nationality: rider.nationality,
          img: rider.photo,
          alt: rider.name,
          info: rider.info,
          link: rider.link || '#',
          subtitle: rider.nationality, // fallback for subtitle in card
        })));
      } catch (err) {
        setError((err as Error).message || 'Failed to fetch team');
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, [language]);

  // Mouse events
  const onMouseDown = (e: React.MouseEvent) => {
    isDown.current = true;
    if (sliderRef.current) {
      sliderRef.current.classList.add(styles.active);
      startX.current = e.pageX - sliderRef.current.offsetLeft;
      scrollLeft.current = sliderRef.current.scrollLeft;
    }
    e.preventDefault();
  };
  const onMouseLeave = () => {
    isDown.current = false;
    if (sliderRef.current) sliderRef.current.classList.remove(styles.active);
  };
  const onMouseUp = () => {
    isDown.current = false;
    if (sliderRef.current) sliderRef.current.classList.remove(styles.active);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  // Touch events
  const onTouchStart = (e: React.TouchEvent) => {
    isDown.current = true;
    if (sliderRef.current) {
      startX.current = e.touches[0].pageX - sliderRef.current.offsetLeft;
      scrollLeft.current = sliderRef.current.scrollLeft;
    }
  };
  const onTouchEnd = () => {
    isDown.current = false;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDown.current || !sliderRef.current) return;
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const scrollBy = (amount: number) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  const lang = teamsContent[language];
  return (
    <section className={styles.teamSection}>
      <div className={styles.teamHeader}>
        <p className={`section-title`}>{lang.title}</p>
        <h1 className={`section-subtitle`}>{lang.subtitle}</h1>
      </div>
      <div className={styles.teamSliderContainer}>
        {/* <button
          className={`${styles.sliderBtn} ${styles.left}`}
          aria-label="Scroll left"
          onClick={() => scrollBy(-320)}
        >
          &#8592;
        </button> */}
        <div
          className={styles.teamSlider}
          ref={sliderRef}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onTouchMove={onTouchMove}
        >
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>Loading team...</div>
          ) : error ? (
            <div style={{ color: 'red', textAlign: 'center', padding: '2rem' }}>{error}</div>
          ) : (
            teamMembers.map((member, idx) => (
              <div
                className={styles.teamMember}
                key={member.id || idx}
                onClick={() => navigate(`/the-team/${member.id}`)}
                style={{ cursor: 'pointer' }}
                title={member.alt}
              >
                <img src={getImageUrl(member.img)} alt={member.alt} />
                <p className={styles.memberName} dangerouslySetInnerHTML={{ __html: member.name }} />
                <span className={styles.memberSubtitle}>{member.subtitle || member.nationality}</span>
              </div>
            ))
          )}
        </div>
        {/* <button
          className={`${styles.sliderBtn} ${styles.right}`}
          aria-label="Scroll right"
          onClick={() => scrollBy(320)}
        >
          &#8594;
        </button> */}
      </div>
    </section>
  );
};

export default MeetTheTeamSection;
