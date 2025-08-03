import React, { useEffect, useState } from "react";
import styles from "./MediaReviews.module.css";

interface MediaReviewsProps {
  currentLanguage?: string;
}

const reviewsData = [
	{
		name: "Cyclism'Actu",
		date: "2025-01-06",
		image: "http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/06/CYCLISM-ACTU.jpg",
		alt: "Cyclism'Actu On",
		link: "https://www.youtube.com/watch?v=r_rOBY4tZ8Q&t=4s",
	},
	{
		name: "DirectVelo",
		date: "2025-01-24",
		image: "http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/06/DV.jpg",
		alt: "DirectVelo Journal",
		link: "https://www.directvelo.com/actualite/118401/winspace-orange-seal-le-maillot-2025",
	},
	{
		name: "ICI Radio Canada",
		date: "2025-04-12",
		image: "http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/06/ICI-RADIO-CANADA.jpg",
		alt: "ICI Radio Canada Australia",
		link: "https://ici.radio-canada.ca/nouvelle/2155922/florence-normand-paris-roubaix",
	},
	{
		name: "Pro Cycling UK",
		date: "2025-04-25",
		image: "http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/06/PRO-CYCLING-UK.jpg",
		alt: "Pro Cycling UK CYCLING NEWS",
		link: "https://procyclinguk.com/karolina-perekitko-extends-with-winspace-orange-seal-to-the-end-of-2027/",
	},
	{
		name: "VELOCLUB.NET",
		date: "2024-12-12",
		image: "http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/06/VELO-CLUB.jpg",
		alt: "VELOCLUB.NET",
		link: "https://www.velo-club.net/interviews/interview-de-jean-christophe-barbotin-manager-de-lequipe-winspace/",
	},
	{
		name: "Sticky Bottle",
		date: "2025-04-13",
		image: "http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/06/STICKY-BOTTLE.jpg",
		alt: "Sticky Bottle Sports",
		link: "https://www.stickybottle.com/races-results/mangans-roubaix-two-punctures-but-a-class-chaotic-hell-of-the-north/",
	},
	{
		name: "Le Telegramme",
		date: "2025-01-06",
		image: "http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/06/LE-TELEGRAMME.jpg",
		alt: "Le Telegramme",
		link: "https://www.letelegramme.fr/sports/cyclisme/lentraineur-franck-renimel-passe-darkea-b-b-hotels-a-winspace-orange-seal-6735636.php",
	},
	{
		name: "Elios Media",
		date: "2025-06-18",
		image: "http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/06/elios-media.jpg",
		alt: "Elios Media",
		link: "https://www.youtube.com/watch?v=2EaGEmTJnlM",
	},
];

const MediaReviews: React.FC<MediaReviewsProps> = (props) => {
	const [reviews, setReviews] = useState(reviewsData);

	// Helper to localize date
	const formatDate = (dateStr: string) => {
		const date = new Date(dateStr);
		return new Intl.DateTimeFormat(props.currentLanguage || "en", {
			year: "numeric",
			month: "long",
			day: "numeric",
		}).format(date);
	};

	return (
		<div className={styles["reviews-grid-container"]}>
			<div className={styles["reviews-grid"]}>
				{reviews.map((review, idx) => (
					<div className={styles["review-card"]} key={idx}>
						<div className={styles["review-image-card"]}>
							{review.link ? (
								<a
									href={review.link}
									target="_blank"
									rel="noopener noreferrer"
								>
									<img
										src={review.image}
										alt={review.alt}
										className={styles["review-logo"]}
									/>
								</a>
							) : (
								<img
									src={review.image}
									alt={review.alt}
									className={styles["review-logo"]}
								/>
							)}
						</div>
						<div className={styles["review-name"]}>{review.name}</div>
						<div className={styles["review-date"]}>{formatDate(review.date)}</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default MediaReviews;
