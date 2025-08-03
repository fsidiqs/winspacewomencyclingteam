import React, { useEffect, useState } from 'react';
import styles from './ManagementStaffDetails.module.css';
import { getImageUrl } from '@/lib/cleanUrl';
import { useParams, useNavigate } from 'react-router';
import { useLanguage } from '../../context/LanguageContext';
import { apiRequest } from '../../admin/lib/api';
import { ManagementStaffType } from './ManagementStaff';
import Navigation from '../Navigation/Navigation';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import { Footer } from 'react-day-picker';

// This type should match the one used in ManagementSection


const ManagementStaffDetails: React.FC = () => {
  const { staffId } = useParams<{ staffId: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [staff, setStaff] = useState<ManagementStaffType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!staffId) return;
    setLoading(true);
    apiRequest(`/api/management-staff/${staffId}`, 'GET')
      .then((data) => {
        setStaff({
          id: data.id,
          name: data.name,
          title: data.title, // API uses 'title' for role
          photo: data.photo,
          info: {
            bio_en: data.bio_en || '',
            bio_fr: data.bio_fr || '',
          },
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [staffId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className={styles.notFound}>Error: {error}</div>;
  if (!staff) {
    return <div className={styles.notFound}>Staff member not found.</div>;
  }

  const bio = staff.info ? (language === 'FR' ? staff.info.bio_fr : staff.info.bio_en) : '';

  return (
    <>
      <Navigation />
      <Breadcrumbs
        title={staff?.name || "Management Name"}
        items={["Home", "The Team Behind", staff?.name || "Management Name"]}
      />

      <div className={`${styles.playerProfileContainer} component-padding max-width`}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>&larr; Back</button>
        <div className={styles.playerProfileGrid}>
          <div className={styles.playerImageBox}>
            <img src={getImageUrl(staff.photo)} alt={staff.name} className={styles.playerImg} />
          </div>
          <div className={styles.playerInfoBox}>
            <div className={styles.playerInfoRow}>
              <h2>Name</h2>
              <div className={styles.playerInfoValue}>{staff.name}</div>
            </div>
            <hr />
            <div className={styles.playerInfoRow}>
              <h2>Role</h2>
              <div className={styles.playerInfoValue}>{staff.title}</div>
            </div>
          </div>
        </div>
        <div className={styles.playerTabs}>
          <button className={`${styles.tab} ${styles.tabActive}`}>Bio</button>
        </div>
        <div className={styles.playerTabContent}>
          <p dangerouslySetInnerHTML={{ __html: bio }} />
        </div>
      </div>
      <Footer />

    </>
  );
};

export default ManagementStaffDetails;
