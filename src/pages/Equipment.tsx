import Equipment from "@/components/Equipment/Equipment";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer/Footer";
import Navigation from "../components/Navigation/Navigation";
import { useLanguage } from '../context/LanguageContext';
import ProductSection from "@/components/ProductSection/ProductSection";

const breadcrumbsContent = {
  EN: {
    title: 'Equipment',
    items: ['Home', 'Equipment']
  },
  FR: {
    title: 'Équipement',
    items: ['Accueil', 'Équipement']
  }
};

const equipmentContent = {
  EN: {
    label: "EQUIPMENT",
    heading: "The gear that keeps us ahead",
    equipmentData: [
      {
        image: "http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/05/winspace-equipment-banner.png",
        logo: "http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/01/WINSPACE.png",
        title: "WINSPACE",
        description:
          "Winspace has over a decade of experience in crafting high-end carbon bikes. They distribute to 200+ stores and directly to customers worldwide. Driven by passion, they don’t see bikes as just products – each one has a story, a soul, and a will to be ridden.",
        link: "https://www.winspace.cc/",
      },
      {
        image: "http://app.winspacewomencyclingteam.com/public/storage/uploads/lun.png",
        logo: "http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/01/LUN.png",
        title: "Lún",
        description:
          "Lún Wheels is the in-house wheel brand of Winspace. Comprised of a dedicated team of passionate cyclists, they have been designing, building, and racing carbon bikes and wheels for over a decade. They’re constantly pushing the boundaries of performance and innovation.",
        link: "https://www.lunwheels.cc/",
      },
      {
        image: "https://cdn.shopify.com/s/files/1/1700/9831/files/image2_480x480.jpg",
        logo: "http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/01/winspace-orange-seal-logo.png",
        title: "Seal",
        description:
          "Recognizing the impact of tire pressure loss, Orange Seal developed a solution to prevent flats and leaks, ensuring optimal performance and durability. Engineered with passion and tested on the trails, Orange Seal helps riders get closer to the perfect ride.",
        link: "https://orangeseal.com/",
      },
    ],
  },
  FR: {
    label: "ÉQUIPEMENT",
    heading: "L'équipement qui nous garde en tête",
    equipmentData: [
      {
        image: "http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/05/winspace-equipment-banner.png",
        logo: "http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/01/WINSPACE.png",
        title: "WINSPACE",
        description:
          "Winspace possède plus d'une décennie d'expérience dans la fabrication de vélos haut de gamme en carbone. Ils distribuent dans plus de 200 magasins et directement aux clients dans le monde entier. Animés par la passion, ils ne considèrent pas les vélos comme de simples produits – chacun a une histoire, une âme et une volonté d'être roulé.",
        link: "https://www.winspace.cc/",
      },
      {
        image: "https://www.lunwheels.cc/wp-content/uploads/2023/02/BannerDaMao.jpg",
        logo: "http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/01/LUN.png",
        title: "Lún",
        description:
          "Lún Wheels est la marque de roues interne de Winspace. Composée d'une équipe dévouée de cyclistes passionnés, elle conçoit, fabrique et teste des vélos et roues en carbone depuis plus de dix ans. Ils repoussent sans cesse les limites de la performance et de l'innovation.",
        link: "https://www.lunwheels.cc/",
      },
      {
        image: "https://cdn.shopify.com/s/files/1/1700/9831/files/image2_480x480.jpg",
        logo: "http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/01/winspace-orange-seal-logo.png",
        title: "Seal",
        description:
          "Conscients de l'impact de la perte de pression des pneus, Orange Seal a développé une solution pour éviter les crevaisons et les fuites, assurant ainsi des performances et une durabilité optimales. Conçue avec passion et testée sur les sentiers, Orange Seal aide les cyclistes à se rapprocher de la sortie parfaite.",
        link: "https://orangeseal.com/",
      },
    ],
  },
};

const productSectionContent = {
  EN: {
    subtitle: "EXPLORE STYLES",
    title: "Our products",
    products: [
      {
        id: 1,
        name: 'T1550 2nd Gen. Frame',
        image: 'http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/05/T1550_2nd_Gen_Frameset.png',
        description: 'Born to race, the new generation T1550 takes everything to the next level. Lightweight, aerodynamic, and stiff.',
        link: 'https://www.winspace.cc/product/t15502ndgen/?v=b80bb7740288',
      },
      {
        id: 2,
        name: 'Lún HYPER D45 Disc Wheels',
        image: 'http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/05/HYPER_D45_Disc_Brake_Wheelset.png',
        description: 'The Lún HYPER D45 are our all-round disc-brake wheels. Carbon spokes, ceramic bearings, and supreme aerodynamics.',
        link: 'https://www.lunwheels.cc/product/hyper-d45-disc-brake-wheelset/',
      },
    ],
  },
  FR: {
    subtitle: "DÉCOUVREZ LES STYLES",
    title: "Nos produits",
    products: [
      {
        id: 1,
        name: 'T1550 2nd Gen. Frame',
        image: 'http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/05/T1550_2nd_Gen_Frameset.png',
        description: 'Né pour la course, le nouveau T1550 porte tout à un autre niveau. Léger, aérodynamique et rigide.',
        link: 'https://www.winspace.cc/product/t15502ndgen/?v=b80bb7740288',
      },
      {
        id: 2,
        name: 'Lún HYPER D45 Disc Wheels',
        image: 'http://app.winspacewomencyclingteam.com/wp-content/uploads/2025/05/HYPER_D45_Disc_Brake_Wheelset.png',
        description: 'Les Lún HYPER D45 sont nos roues polyvalentes à disque. Rayons en carbone, roulements céramique et aérodynamisme suprême.',
        link: 'https://www.lunwheels.cc/product/hyper-d45-disc-brake-wheelset/',
      },
    ],
  },
};


export default function EquipmentPage() {
  const { language } = useLanguage();
  const bc = breadcrumbsContent[language];
  const { equipmentData, label, heading } = equipmentContent[language];
  const { products, subtitle, title } = productSectionContent[language];
  return (<>
    <Navigation />
    <Breadcrumbs title={bc.title} items={bc.items} />
    <Equipment equipmentData={equipmentData} label={label} heading={heading} />
    <ProductSection products={products} subtitle={subtitle} title={title} />
    <Footer />
  </>
  );
}
