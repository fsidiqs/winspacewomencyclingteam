import React, { useState } from 'react';
import { useIsMobile } from './useIsMobile';
import styles from './MobileNavigation.module.css';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate } from 'react-router';

const fontAwesomeLink = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';

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
    reviews: 'REVIEWS',
    contacts: 'CONTACTS',
    season: 'SEASON',
    partners: 'PARTNERS',
  },
  FR: {
    home: 'ACCUEIL',
    about: 'À PROPOS',
    team: "L'ÉQUIPE",
    ridersAndStaff: 'COUREURS & STAFF',
    equipment: 'ÉQUIPEMENT',
    blogs: 'ACTUALITÉS',
    races: 'CALENDRIER DES COURSES',
    gallery: 'GALERIE',
    reviews: 'AVIS',
    contacts: 'CONTACT',
    season: 'SAISON',
    partners: 'PARTENAIRES',
  },
};

const socialLinks = [
  { href: 'https://www.facebook.com/winspacewomencyclingteam', label: 'Facebook', icon: 'fa-facebook' },
  { href: 'https://x.com/WinspaceCycling', label: 'X', d: 'M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z' },
  { href: 'https://www.instagram.com/winspacewomencyclingteam/', label: 'Instagram', icon: 'fa-instagram' },
  { href: 'https://www.tiktok.com/@winspacewomencyclingteam', label: 'TikTok', d: 'M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z' },
];

const langOptions = [
  { value: 'EN', label: 'English' },
  { value: 'FR', label: 'Français' },
];

export default function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const [dropdownsOpen, setDropdownsOpen] = useState<{ [key: string]: boolean }>({});
  const isMobile = useIsMobile(900);
  const { language, setLanguage } = useLanguage();
  const labels = navLabels[language];
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!document.querySelector(`link[href="${fontAwesomeLink}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = fontAwesomeLink;
      document.head.appendChild(link);
    }
  }, []);

  if (!isMobile) return null;

  // Helper to render icon based on props
  function renderSocialIcon(social: typeof socialLinks[number]) {
    if (social.icon) {
      return <i className={`fa ${social.icon}`}></i>;
    } else if (social.d) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ffffff" viewBox="0 0 16 16" style={{ verticalAlign: 'middle' }}>
          <path d={social.d} />
        </svg>
      );
    }
    return null;
  }

  return (
    <>
      <div className={styles.navTopbar} style={{ display: open ? 'none' : 'flex' }}>
        <img src="http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/01/WOS-WHITE.png" alt="Logo" className={styles.navLogoTopbar} onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />
        <div className={styles.navHamburger} style={{ display: open ? 'none' : 'flex' }} onClick={() => setOpen(true)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <nav className={open ? `${styles.navMenu} ${styles.navMenuOpen}` : styles.navMenu}>
        <div className={styles.navHeader}>
          <img src="http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/01/WOS-WHITE.png" alt="Logo" className={styles.navLogo} onClick={() => { setOpen(false); navigate('/'); }} style={{ cursor: 'pointer' }} />
          <span className={styles.navClose} onClick={() => setOpen(false)}>&times;</span>
        </div>
        <div className={styles.navbarLang} style={{ margin: '1rem 0', textAlign: 'center' }}>
          <select value={language} onChange={e => setLanguage(e.target.value as 'EN' | 'FR')}>
            {langOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className={styles.navLinksWrapper}>
          <ul className={styles.navLinks}>
            <li>
              <a href="/">{labels.home} <span>&rarr;</span></a>
            </li>
            <li>
              <div
                className={styles.dropdownToggle}
                onClick={() => setDropdownsOpen(prev => ({ ...prev, team: !prev.team }))}
              >
                {labels.team} <span className={styles.dropdownArrow}>&rarr;</span>
              </div>
              {dropdownsOpen.team && (
                <ul className={styles.mobileDropdown}>
                  <li><a href="/about-us">{labels.about}</a></li>
                  <li><a href="/the-team">{labels.ridersAndStaff}</a></li>
                </ul>
              )}
            </li>
            <li>
              <div
                className={styles.dropdownToggle}
                onClick={() => setDropdownsOpen(prev => ({ ...prev, season: !prev.season }))}
              >
                {labels.season} <span className={styles.dropdownArrow}>&rarr;</span>
              </div>
              {dropdownsOpen.season && (
                <ul className={styles.mobileDropdown}>
                  <li><a href="/races">{labels.races}</a></li>
                  <li><a href="/posts">{labels.blogs}</a></li>
                  <li><a href="/gallery">{labels.gallery}</a></li>
                  <li><a href="/reviews">{labels.reviews}</a></li>
                </ul>
              )}
            </li>
            <li>
              <div
                className={styles.dropdownToggle}
                onClick={() => setDropdownsOpen(prev => ({ ...prev, partner: !prev.partner }))}
              >
                {labels.partners} <span className={styles.dropdownArrow}>&rarr;</span>
              </div>
              {dropdownsOpen.partner && (
                <ul className={styles.mobileDropdown}>
                  <li><a href="/equipment">{labels.equipment}</a></li>
                </ul>
              )}
            </li>
            <li>
              <a href="/contacts">{labels.contacts} <span>&rarr;</span></a>
            </li>
          </ul>
        </div>

        <hr className={styles.navHr} />
        <div className={styles.navSocial}>
          {socialLinks.map((social, idx) => (
            <a key={social.label} href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer">
              {renderSocialIcon(social)}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
