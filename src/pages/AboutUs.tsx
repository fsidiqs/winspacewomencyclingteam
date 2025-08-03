import ManagementStaff, { ManagementStaffType } from "@/components/ManagementStaff/ManagementStaff";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import Footer from "../components/Footer/Footer";
import Navigation from "../components/Navigation/Navigation";
import OurStory from "../components/OurStory/OurStory";
import WhoWeAreSection from "../components/WhoWeAreSection/WhoWeAreSection";
import { useLanguage } from '../context/LanguageContext';
import React, { useEffect, useState } from "react";
import { apiRequest } from "../admin/lib/api";
import { title } from "process";

const breadcrumbsContent = {
  EN: {
    title: 'ABOUT US',
    items: ['Home', 'About Us']
  },
  FR: {
    title: 'À PROPOS',
    items: ['Accueil', 'À propos']
  }
};

const whoWeAreContent = {
  EN: {
    title: 'WHO WE ARE',
    subtitle: 'Meet Our Team',
    text: 'We are a passionate group of individuals dedicated to making a difference. Our team brings together diverse skills and backgrounds to achieve our mission.'
  },
  FR: {
    title: 'QUI NOUS SOMMES',
    subtitle: 'Rencontrez notre équipe',
    text: "Nous sommes un groupe passionné d'individus dédiés à faire la différence. Notre équipe réunit des compétences et des parcours divers pour atteindre notre mission."
  }
};

const ourStoryContent = {
  EN: {
    title: 'WHO WE ARE',
    subtitle: 'OUR STORY',
    paragraphs: [
      'Founded in 2013 as DN 17, the team quickly became a leader in developing young female cyclists, achieving national success and advancing riders to UCI teams.',
      'In 2019, it joined the UCI Women’s Tour as Charente–Maritime Women Cycling, competing in major European races.',
      'Rebranded in 2024 as Winspace Women Cycling Team, it partnered with Winspace as sponsor and equipment supplier. In 2025, the team evolves into Winspace Orange Seal, aiming for new heights in women’s cycling.'
    ]
  },
  FR: {
    title: 'QUI NOUS SOMMES',
    subtitle: 'NOTRE HISTOIRE',
    paragraphs: [
      "Fondée en 2013 sous le nom de DN 17, l'équipe est rapidement devenue un leader dans le développement des jeunes cyclistes féminines, remportant des succès nationaux et faisant progresser des coureuses vers les équipes UCI.",
      "En 2019, elle rejoint le UCI Women’s Tour sous le nom de Charente–Maritime Women Cycling, participant aux principales courses européennes.",
      "Rebaptisée en 2024 Winspace Women Cycling Team, elle s'associe à Winspace comme sponsor et fournisseur d'équipement. En 2025, l'équipe devient Winspace Orange Seal, visant de nouveaux sommets dans le cyclisme féminin."
    ]
  }
};

export default function AboutUs() {
  const { language } = useLanguage();
  const bc = breadcrumbsContent[language];
  const who = whoWeAreContent[language];
  const story = ourStoryContent[language];

  const [team, setTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeam = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await apiRequest("/api/management-staff", "GET");
        const members = Array.isArray(data) ? data : [data];
        setTeam(members.filter((m: ManagementStaffType) => m.status === "active").map((m: ManagementStaffType) => ({
          id: m.id, // add id for navigation
          name: m.name,
          title: m.title, // API uses 'title' for role
          photo: m.photo,
          alt: m.name,
        })));
      } catch (err) {
        setError((err as Error).message || 'Failed to fetch management staff');
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, [language]);

  return (<>
    <Navigation />
    <Breadcrumbs title={bc.title} items={bc.items} />
    <WhoWeAreSection title={who.title} subtitle={who.subtitle} text={who.text} />
    <OurStory title={story.title} subtitle={story.subtitle} paragraphs={story.paragraphs} />
    {loading ? (
      <div style={{ textAlign: 'center', padding: '2rem' }}>Loading management staff...</div>
    ) : error ? (
      <div style={{ color: 'red', textAlign: 'center', padding: '2rem' }}>{error}</div>
    ) : (
      <ManagementStaff
        title={language === 'FR' ? "L'ÉQUIPE" : "THE TEAM"}
        subtitle={language === 'FR' ? "L'ÉQUIPE DERRIÈRE LE PROJET" : "THE TEAM BEHIND THE PROJECT"}
        team={team}
      />
    )}
    <Footer />
  </>
  );
}
