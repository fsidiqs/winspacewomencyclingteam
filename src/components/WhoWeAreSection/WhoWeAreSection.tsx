import React from "react";
import styles from "./WhoWeAreSection.module.css";

const topImage = "http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/02/about-us-image-1.png";
const bottomImage = "http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/02/about-us-image-2.png";

interface WhoWeAreSectionProps {
  title: string;
  subtitle: string;
  text: string;
}

const WhoWeAreSection: React.FC<WhoWeAreSectionProps> = ({ title, subtitle, text }) => {
    return (
        <section className={`${styles.whoWeAreSection} component-padding max-width`}>
            <div className={styles.whoWeAreGrid}>
                <div className={`${styles.whoWeAreImage} ${styles.whoWeAreImageTop}`}>
                    <img src={topImage} alt="Who We Are Top" />
                </div>
                <div className={styles.whoWeAreContent}>
                    <div className="section-title">{title}</div>
                    <div className="section-subtitle">{subtitle}</div>
                    <div className="section-text">
                        {text}
                    </div>
                </div>
                <div className={`${styles.whoWeAreImage} ${styles.whoWeAreImageBottom}`}>
                    <img src={bottomImage} alt="Who We Are Bottom" />
                </div>
            </div>
        </section>
    );
};

export default WhoWeAreSection;
