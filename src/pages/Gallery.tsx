import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import Footer from "../components/Footer/Footer";
import Gallery from "../components/Gallery/Gallery";
import Navigation from "../components/Navigation/Navigation";
import { useLanguage } from '../context/LanguageContext';

const breadcrumbsContent = {
  EN: {
    title: 'Gallery',
    items: ['Home', 'Gallery']
  },
  FR: {
    title: 'Galerie',
    items: ['Accueil', 'Galerie']
  }
};

export default function GalleryPage() {
    const { language } = useLanguage();
    const bc = breadcrumbsContent[language];
    return (<>
        <Navigation />
        <Breadcrumbs
            title={bc.title}
            items={bc.items}
        />
        <Gallery />
        <Footer />
    </>
    );
}
