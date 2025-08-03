import styles from './Gallery.module.css';
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useLanguage } from '../../context/LanguageContext';
import { getImageUrl } from '@/lib/cleanUrl';

type GalleryItem = {
    id: number;
    image_path: string;
    caption: string | null;
    user_id: number;
    created_at: string;
    updated_at: string;
};

const IMAGES_PER_LOAD = 10;

const API_HOST = import.meta.env.VITE_API_HOST;
const GALLERY_ENDPOINT = `${API_HOST}/api/get-gallery`;

export default function Gallery() {
    const [gallery, setGallery] = useState<GalleryItem[]>([]);
    const [visibleCount, setVisibleCount] = useState(IMAGES_PER_LOAD);
    const [fullscreenImg, setFullscreenImg] = useState<string | null>(null);

    useEffect(() => {
        fetch(GALLERY_ENDPOINT)
            .then((res) => res.json())
            .then((data) => {
                // Sort by created_at ascending (oldest first)
                // const sorted = data.sort((a: GalleryItem, b: GalleryItem) => new Date(b.created_at).getTime() - new Date(b.created_at).getTime());
                setGallery(data);
            })
            .catch((err) => console.error('Failed to fetch gallery:', err));
    }, []);

    const handleScroll = useCallback(() => {
        if (
            window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
            visibleCount < gallery.length
        ) {
            setVisibleCount((prev) => Math.min(prev + IMAGES_PER_LOAD, gallery.length));
        }
    }, [visibleCount, gallery.length]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

   
    return (
        <section className="component-padding max-width">
            <div className={styles.container}>
                {gallery.slice(0, visibleCount).map((item, idx) => {
                    // let extraClass = '';
                    // if (idx % 12 === 1 || idx % 12 === 7) extraClass = styles.vertical;
                    // else if (idx % 12 === 2 || idx % 12 === 9 || idx % 12 === 13) extraClass = styles.horizontal;
                    // else if (idx % 12 === 5 || idx % 12 === 11) extraClass = styles.big;

                    return (
                        <a
                            href={getImageUrl(item.image_path)}
                            // className={extraClass}
                            key={item.id}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={e => {
                                e.preventDefault();
                                setFullscreenImg(getImageUrl(item.image_path));
                            }}
                        >
                            <img
                                src={getImageUrl(item.image_path)}
                                alt={item.caption || `Gallery ${item.id}`}
                                loading="lazy"
                            />
                        </a>
                    );
                })}
            </div>
            {fullscreenImg && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        background: 'rgba(0,0,0,0.85)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10000,
                        cursor: 'zoom-out',
                    }}
                    onClick={() => setFullscreenImg(null)}
                >
                    <img
                        src={fullscreenImg}
                        alt="Fullscreen preview"
                        style={{
                            maxWidth: '90vw',
                            maxHeight: '90vh',
                            boxShadow: '0 0 32px #000',
                            borderRadius: 8,
                            cursor: 'zoom-out', // Make sure cursor is pointer for image too
                        }}
                        onClick={() => setFullscreenImg(null)}
                    />
                </div>
            )}
        </section>
    );
};
