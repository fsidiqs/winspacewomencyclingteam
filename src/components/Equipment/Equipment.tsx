import React from "react";
import styles from "./Equipment.module.css";

interface EquipmentItem {
  image: string;
  logo: string;
  title: string;
  description: string;
  link: string;
}

interface EquipmentProps {
  equipmentData: EquipmentItem[];
  label: string;
  heading: string;
}

const Equipment: React.FC<EquipmentProps> = ({ equipmentData, label, heading }) => {
  return (
    <section className={styles.equipmentSection}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        <h2 className={styles.title}>{heading}</h2>
      </div>
      <div className={styles.cardsContainer}>
        {equipmentData.map((item, idx) => (
          <div className={styles.card} key={idx}>
            <div className={styles.imageWrapper}>
              <img src={item.image} alt={item.title} className={styles.mainImage} />
            </div>
            <div className={styles.cardContent}>
              <img src={item.logo} alt={item.title + " logo"} className={styles.brandLogo} />
              <p className={styles.cardDesc}>{item.description}</p>
              <a href={item.link} className={styles.arrowLink}>
                <span>&rarr;</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Equipment;
