import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import Footer from "../components/Footer/Footer";
import ImageTextSection from "../components/ImageTextSection/ImageTextSection";
import Navigation from "../components/Navigation/Navigation";
import SponsorsSection from "../components/SponsorsSection/SponsorsSection";
import StaffSection from "../components/StaffSection/StaffSection";
import TeamsSection, { TeamMember } from "../components/TeamsSection/TeamsSection";
import { useLanguage } from '../context/LanguageContext';
import React, { useEffect, useState } from "react";
import { apiRequest } from "../admin/lib/api";

const breadcrumbsContent = {
  EN: {
    title: 'THE TEAM',
    items: ['Home', 'The Team']
  },
  FR: {
    title: 'L\'ÉQUIPE',
    items: ['Accueil', 'L\'équipe']
  }
};

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

const imageTextContent = {
  EN: {
    title: 'MEET THE TEAM',
    subtitle: 'Together We are One',
    text: `Winspace Orange Seal is a vibrant UCI Women's ProTeam dedicated to elevating women's cycling on the global stage. Featuring a diverse roster of elite riders from across the globe, the team symbolizes international collaboration and excellence in competition. Powered by innovative technology from Winspace and Lún Wheels, they aim to deliver top performances in prestigious UCI events, from WorldTour classics to grand tours. Backed by committed sponsors and an exceptional support staff, Winspace Orange Seal is more than a team—it's a movement to inspire future generations of female athletes and redefine the benchmarks of the sport.`
  },
  FR: {
    title: 'RENCONTREZ L\'ÉQUIPE',
    subtitle: 'Unis pour gagner',
    text: `Winspace Orange Seal est une équipe UCI Pro féminine dynamique, dédiée à l'élévation du cyclisme féminin sur la scène mondiale. Avec un effectif diversifié de coureuses d'élite venues du monde entier, l'équipe symbolise la collaboration internationale et l'excellence en compétition. Propulsée par la technologie innovante de Winspace et Lún Wheels, elle vise les meilleures performances dans les prestigieuses épreuves UCI, des classiques WorldTour aux grands tours. Soutenue par des sponsors engagés et un staff exceptionnel, Winspace Orange Seal est plus qu'une équipe : c'est un mouvement pour inspirer les futures générations d'athlètes féminines et redéfinir les standards du sport.`
  }
};

const staffContent = {
  EN: {
    title: 'THE STAFF',
    subtitle: 'MEET THE STAFF',
    staffs: [
      { name: 'JEAN-CHRISTOPHE BARBOTIN', subtitle: 'FOUNDER AND CO-MANAGER', img: 'http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/01/jc.png', alt: 'Jean-Christophe Barbotin', link: '#' },
      { name: 'GAÏ ASSOULINE', subtitle: 'CO-MANAGER', img: 'http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/01/gai.png', alt: 'Gaï Assouline', link: '#' },
      { name: 'FRANCK RENIMEL', subtitle: 'TRAINER', img: 'http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/01/franck-1.png', alt: 'Franck Renimel', link: '#' },
      { name: 'DAMIEN POMMEREAU', subtitle: 'SPORTS DIRECTOR', img: 'http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/01/damien-1.png', alt: 'Damien Pommereau', link: '#' },
      { name: 'RENAUD CHEVALIER', subtitle: 'PRESS RELATIONS', img: 'http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/01/renaud.png', alt: 'Renaud Chevalier', link: '#' },
      { name: 'ARNAUD GUILLAUNE', subtitle: 'COMMUNITY MANAGER', img: 'http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/01/arnaud-1.png', alt: 'Arnaud Guillaune', link: '#' },
      { name: 'MAXIME GANTIER', subtitle: 'CHIEF MECHANIC', img: 'http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/01/potraits-04-04-1-1.png', alt: 'Maxime Gantier', link: '#' },
      { name: 'EYMERIC BOISSINOT', subtitle: 'MECHANIC', img: 'http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/01/emeyric.png', alt: 'Eymeric Boissinot', link: '#' },
      { name: 'MARYVONNE BARBOTIN', subtitle: 'DOCTOR', img: 'http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/01/maryvonne-barbotin.png', alt: 'Maryvonne Barbotin', link: '#' },
      { name: 'MARIE DELPEYROUX', subtitle: 'KINESYTHERAPIST', img: 'http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/01/maria.png', alt: 'Marie Delpeyroux', link: '#' },
      { name: 'NAHUEL', subtitle: 'KINESYTHERAPIST', img: 'http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/01/nahuel-1.png', alt: 'Nahuel', link: '#' },
      { name: 'PAUL BARBOTIN', subtitle: 'ASSISTANT MASSEUR', img: 'http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/01/paul.png', alt: 'Paul Barbotin', link: '#' },
    ]
  },
  FR: {
    title: 'LE STAFF',
    subtitle: 'RENCONTREZ LE STAFF',
    staffs: [
      { name: 'JEAN-CHRISTOPHE BARBOTIN', subtitle: 'FONDATEUR ET CO-MANAGER', img: 'http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/01/jc.png', alt: 'Jean-Christophe Barbotin', link: '#' },
      { name: 'GAÏ ASSOULINE', subtitle: 'CO-MANAGER', img: 'http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/01/gai.png', alt: 'Gaï Assouline', link: '#' },
      { name: 'FRANCK RENIMEL', subtitle: 'ENTRAÎNEUR', img: 'http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/01/franck-1.png', alt: 'Franck Renimel', link: '#' },
      { name: 'DAMIEN POMMEREAU', subtitle: 'DIRECTEUR SPORTIF', img: 'http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/01/damien-1.png', alt: 'Damien Pommereau', link: '#' },
      { name: 'RENAUD CHEVALIER', subtitle: 'RELATIONS PRESSE', img: 'http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/01/renaud.png', alt: 'Renaud Chevalier', link: '#' },
      { name: 'ARNAUD GUILLAUNE', subtitle: 'COMMUNITY MANAGER', img: 'http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/01/arnaud-1.png', alt: 'Arnaud Guillaune', link: '#' },
      { name: 'MAXIME GANTIER', subtitle: 'CHEF MÉCANICIEN', img: 'http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/01/potraits-04-04-1-1.png', alt: 'Maxime Gantier', link: '#' },
      { name: 'EYMERIC BOISSINOT', subtitle: 'MÉCANICIEN', img: 'http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/01/emeyric.png', alt: 'Eymeric Boissinot', link: '#' },
      { name: 'MARYVONNE BARBOTIN', subtitle: 'MÉDECIN', img: 'http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/01/maryvonne-barbotin.png', alt: 'Maryvonne Barbotin', link: '#' },
      { name: 'MARIE DELPEYROUX', subtitle: 'KINÉSITHÉRAPEUTE', img: 'http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/01/maria.png', alt: 'Marie Delpeyroux', link: '#' },
      { name: 'NAHUEL', subtitle: 'KINÉSITHÉRAPEUTE', img: 'http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/01/nahuel-1.png', alt: 'Nahuel', link: '#' },
      { name: 'PAUL BARBOTIN', subtitle: 'AIDE-MASSEUR', img: 'http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/01/paul.png', alt: 'Paul Barbotin', link: '#' },
    ]
  }
};


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

export default function TheTeam() {
  const { language } = useLanguage();
  const bc = breadcrumbsContent[language];
  const sponsorLang = sponsorsContent[language];
  const imageText = imageTextContent[language];
  const staff = staffContent[language];
  const teams = teamsContent[language];

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeam = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await apiRequest("/api/riders", "GET");
        const riders = Array.isArray(data) ? data : [data];
        setTeamMembers(riders.map((rider: any) => ({
          id: rider.id,
          name: rider.name,
          nationality: rider.nationality,
          img: rider.photo,
          alt: rider.name,
          info: rider.info, // add info property
        })));
      } catch (err) {
        setError((err as Error).message || 'Failed to fetch team');
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  return (<div className="default-background">
    <Navigation />
    <Breadcrumbs title={bc.title} items={bc.items} />
    <ImageTextSection title={imageText.title} subtitle={imageText.subtitle} text={imageText.text} />
    <SponsorsSection
      title={sponsorLang.title}
      subtitle={sponsorLang.subtitle}
      description={sponsorLang.description}
      sponsors={sponsorsData}
      backgroundBlue={true}
    />
    {loading ? (
      <div style={{ textAlign: 'center', padding: '2rem' }}>Loading team...</div>
    ) : error ? (
      <div style={{ color: 'red', textAlign: 'center', padding: '2rem' }}>{error}</div>
    ) : (
      <TeamsSection title={teams.title} subtitle={teams.subtitle} team={teamMembers} />
    )}
    <StaffSection title={staff.title} subtitle={staff.subtitle} staffs={staff.staffs} />
    <Footer />
  </div>
  );
}
