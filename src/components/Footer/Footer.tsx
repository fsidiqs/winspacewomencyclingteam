import React from 'react';
import styles from './Footer.module.css';
import { useLanguage } from '../../context/LanguageContext';

const navLabels = {
    EN: {
        home: 'HOME',
        about: 'ABOUT US',
        team: 'THE TEAM',
        equipment: 'EQUIPMENT',
        blogs: 'NEWSROOM',
        races: 'RACES',
        gallery: 'GALLERY',
        contacts: 'CONTACTS',
        copyright: 'WOS © 2025. All rights reserved.'
    },
    FR: {
        home: 'ACCUEIL',
        about: 'À PROPOS',
        team: "L'ÉQUIPE",
        equipment: 'ÉQUIPEMENT',
        blogs: 'ACTUALITÉS',
        races: 'COURSES',
        gallery: 'GALERIE',
        contacts: 'CONTACT',
        copyright: 'WOS © 2025. Tous droits réservés.'
    }
};

const navLinksConfig = [
    { key: 'home', href: '/' },
    { key: 'about', href: '/about-us' },
    { key: 'team', href: '/the-team' },
    { key: 'equipment', href: '/equipment' },
    { key: 'blogs', href: '/posts' },
    { key: 'races', href: '/races' },
    { key: 'gallery', href: '/gallery' },
    { key: 'contacts', href: '/contacts' },
];

const socialLinks = [
    { href: 'https://www.facebook.com/winspacewomencyclingteam', label: 'Facebook', icon: 'fa-facebook' },
    { href: 'https://x.com/WinspaceCycling', label: 'X', d: 'M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z' },
    { href: 'https://www.instagram.com/winspacewomencyclingteam/', label: 'Instagram', icon: 'fa-instagram' },
    { href: 'https://www.tiktok.com/@winspacewomencyclingteam', label: 'TikTok', d: 'M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z' }, // TikTok icon fallback
];

// Add Font Awesome CDN to head if not present
if (typeof document !== 'undefined' && !document.querySelector('link[href*="font-awesome"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
    document.head.appendChild(link);
}

export default function Footer() {
    const { language } = useLanguage();
    const labels = navLabels[language];

    // Helper to render icon based on props
    function renderSocialIcon(social: typeof socialLinks[number]) {
        if (social.icon) {
            return (
                <i className={`fa ${social.icon}`} style={{ fontSize: 20, verticalAlign: 'middle' }}></i>
            );
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
        <footer className={`${styles.footer} component-padding`}>
            <div className={styles.footerLogo}>WOS</div>
            <nav className={styles.footerNav}>
                {navLinksConfig.map((link) => (
                    <a key={link.key} href={link.href}>{labels[link.key as keyof typeof labels]}</a>
                ))}
            </nav>
            <div className={styles.footerSocial}>
                {socialLinks.map((social) => (
                    <a key={social.label} href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer">
                        {renderSocialIcon(social)}
                    </a>
                ))}
            </div>
            <div className={styles.footerCopy}>{labels.copyright}</div>
        </footer>
    );
}
