import BannerHero from "../components/BannerHero/BannerHero"
import EventCalendar from "../components/EventCalendar/EventCalendar"
import Footer from "../components/Footer/Footer"
import ImageTextSection from "../components/ImageTextSection/ImageTextSection"
import LatestNewsSection from "../components/LatestNewsSection/LatestNewsSection"
import MeetTheTeamSection from "../components/MeetTheTeamSection/MeetTheTeamSection"
import MobileNavigation from "../components/MobileNavigation/MobileNavigation"
import ModernCalendar from "../components/ModernCalendar/ModernCalendar"
import Navigation from "../components/Navigation/Navigation"
import NavigationHome from "../components/NavigationHome/NavigationHome"
import QuotesSection from "../components/QuotesSection/QuotesSection"
import RacesSection from "../components/RacesSection/RacesSection"
import SponsorsSection from "../components/SponsorsSection/SponsorsSection"
import VideoSection from "../components/VideoSection/VideoSection"
import WhoAreWe from "../components/WhoAreWe/WhoAreWe"
import { useLanguage } from '../components/../context/LanguageContext';

const sponsorsData = [
  { href: "/equipment", src: "http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/01/WINSPACE.png", alt: "Winspace" },
  { href: "https://orangeseal.com/", src: "http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/01/winspace-orange-seal-logo.png", alt: "Orange Seal" },
  { href: "https://www.lunwheels.cc/", src: "http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/01/LUN.png", alt: "Lún" },
  { href: "https://www.intermarche.com/", src: "http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/01/INTERMARCHE.png", alt: "Intermarché" },
  { href: "https://la.charente-maritime.fr/", src: "http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/01/LA-CHARENTE-MARITIME.png", alt: "La Charente Maritime" },
  { href: "https://autowurks.com/", src: "http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/01/AUTOWURKS.png", alt: "Auto Würks" },
  { href: "https://lefrenchcyclard.fr/", src: "http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/05/frenchCyclard.png", alt: "French Cyclard" },
  { href: "https://cycling.hutchinson.com/", src: "http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/01/HUTCHINSON.png", alt: "Hutchinson" },
];

const sponsorsContent = {
  EN: {
    title: 'SPONSORS',
    subtitle: 'OUR SPONSORS & PARTNERS',
    description:
      "We are deeply grateful to our sponsors, whose support and trust make our journey possible. At the heart of our team are incredible partners who share our vision for advancing women’s cycling and pushing the boundaries of performance and innovation. Together, they empower us to compete at the highest level and inspire the next generation of athletes.",
  },
  FR: {
    title: 'SPONSORS',
    subtitle: 'NOS SPONSORS & PARTENAIRES',
    description:
      "Nous sommes profondément reconnaissants envers nos sponsors, dont le soutien et la confiance rendent notre aventure possible. Au cœur de notre équipe se trouvent des partenaires incroyables qui partagent notre vision de faire progresser le cyclisme féminin et de repousser les limites de la performance et de l'innovation. Ensemble, ils nous permettent de concourir au plus haut niveau et d'inspirer la prochaine génération d'athlètes.",
  },
};

export default function Home() {
  const { language } = useLanguage();
  const sponsorLang = sponsorsContent[language];
  return (
    <>
      <NavigationHome />
      <BannerHero />
      <WhoAreWe />
      <SponsorsSection
        title={sponsorLang.title}
        subtitle={sponsorLang.subtitle}
        description={sponsorLang.description}
        sponsors={sponsorsData}
      />
      <RacesSection />
      <VideoSection />
      <MeetTheTeamSection />
      <LatestNewsSection />
      <QuotesSection />
      <Footer />
    </>
  )
}
