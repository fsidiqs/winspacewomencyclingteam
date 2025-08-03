import React, { useState } from "react";
import styles from "./NavigationTransparent.module.css";
import { useLanguage } from '../../context/LanguageContext';

const langOptions = [
  { value: 'EN', label: 'English' },
  { value: 'FR', label: 'Français' },
];

const navLabels = {
  EN: {
    home: 'HOME',
    about: 'ABOUT US',
    team: 'THE TEAM',
    ridersAndStaff: 'RIDERS & STAFF',
    equipment: 'EQUIPMENT',
    blogs: 'NEWSROOM',
    races: 'RACES CALENDAR',
    gallery: 'GALLERY',
    reviews: 'PRESS ARTICLE',
    contacts: 'CONTACTS',
    season: 'SEASON',
    partners: 'PARTNERS',
  },
  FR: {
    home: 'ACCUEIL',
    about: 'À PROPOS',
    team: 'L\'ÉQUIPE',
    ridersAndStaff: 'COUREURS & STAFF',
    equipment: 'ÉQUIPEMENT',
    blogs: 'ACTUALITÉS',
    races: 'CALENDRIER DES COURSES',
    gallery: 'GALERIE',
    reviews: 'ARTICLE DE PRESSE',
    contacts: 'CONTACTS',
    season: 'SAISON',
    partners: 'PARTENAIRES',
  },
};

const NavigationTransparent: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  function handleDropdown(name: string) {
    setOpenDropdown(openDropdown === name ? null : name);
  }

  const labels = navLabels[language];
  return (
    <nav className={styles.mainNavbar}>
      <a href="/" className={styles.navbarLogo} style={{ textDecoration: 'none' }}>
        <img
          src="http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/01/WOS-BLUE.png"
          alt="WOS Logo"

        />
        <div className={styles.navbarLogoText} style={{ display: "none" }}>
          <span>WINSPACE</span>
          <br />
          <span>ORANGE SEAL</span>
        </div>
      </a>
      <div className={styles.navbarLinksWrapper}>
        <ul className={styles.navbarLinks}>
          <li><a href="/">{labels.home}</a></li>
          <li style={{ position: 'relative' }}>
            <a id="team-dropdown" onClick={() => handleDropdown('team')}>{labels.team}</a>
            {openDropdown === 'team' && (
              <div className={styles.dropdownMenu}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <a href="/about-us">
                  <div className={styles.dropdownItem}>{labels.about}</div>
                </a>
                <a href="/the-team">
                  <div className={styles.dropdownItem}>{labels.ridersAndStaff}</div>
                </a>
              </div>
            )}
          </li>
          <li style={{ position: 'relative' }}>
            <a id="season-dropdown" onClick={() => handleDropdown('season')}>{labels.season}</a>
            {openDropdown === 'season' && (
              <div className={styles.dropdownMenu}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <a href="/races">
                  <div className={styles.dropdownItem}>{labels.races}</div>
                </a>
                <a href="/posts">
                  <div className={styles.dropdownItem}>{labels.blogs}</div>
                </a>
                <a href="/gallery">
                  <div className={styles.dropdownItem}>{labels.gallery}</div>
                </a>
                <a href="/reviews">
                  <div className={styles.dropdownItem}>{labels.reviews}</div>
                </a>
              </div>
            )}
          </li>
          <li style={{ position: 'relative' }}>
            <a id="partner-dropdown" onClick={() => handleDropdown('partner')}>{labels.partners}</a>
            {openDropdown === 'partner' && (
              <div className={styles.dropdownMenu}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <a href="/equipment">
                  <div className={styles.dropdownItem}>{labels.equipment}</div>
                </a>
              </div>
            )}
          </li>

          <li><a href="/contacts">{labels.contacts}</a></li>
        </ul>



        <div className={styles.navbarLang}>
          <select value={language} onChange={e => setLanguage(e.target.value as 'EN' | 'FR')}>
            {langOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

      </div>

    </nav>
  );
};

export default NavigationTransparent;
