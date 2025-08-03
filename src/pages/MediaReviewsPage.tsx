import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer/Footer";
import Navigation from "../components/Navigation/Navigation";
import MediaReviews from "../components/MediaReviews/MediaReviews";
import { useLanguage } from '../context/LanguageContext';

const breadcrumbsContent = {
  EN: {
    title: 'Media Reviews',
    items: ['Home', 'Media Reviews']
  },
  FR: {
    title: 'Revues de presse',
    items: ['Accueil', 'Revues de presse']
  }
};

export default function MediaReviewsPage() {
  const { language } = useLanguage();
  const bc = breadcrumbsContent[language];
  return (<>
    <Navigation />
    <Breadcrumbs title={bc.title} items={bc.items} />
    <MediaReviews currentLanguage={language.toLowerCase()} />
    <Footer />
  </>
  );
}
