import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer/Footer";
import Navigation from "../components/Navigation/Navigation";
import { useLanguage } from '../context/LanguageContext';

const breadcrumbsContent = {
  EN: {
    title: 'Contacts',
    items: ['Home', 'Contacts']
  },
  FR: {
    title: 'Contacts',
    items: ['Accueil', 'Contacts']
  }
};

const contactFormContent = {
  EN: {
    labelSmall: 'CONTACT US',
    heading: 'Have a question?\nGet in touch',
    name: 'Name*',
    email: 'Email*',
    subject: 'Subject*',
    message: 'Message*',
    agree: "I agree with the site's ",
    privacy: 'privacy policy',
    sending: 'SENDING...',
    submit: 'SUBMIT',
    thankYou: 'Thank you for contacting us!'
  },
  FR: {
    labelSmall: 'CONTACTEZ-NOUS',
    heading: 'Une question ?\nContactez-nous',
    name: 'Nom*',
    email: 'E-mail*',
    subject: 'Sujet*',
    message: 'Message*',
    agree: "J'accepte la ",
    privacy: 'politique de confidentialité du site',
    sending: 'ENVOI...',
    submit: 'ENVOYER',
    thankYou: 'Merci de nous avoir contactés !'
  }
};

export default function ContactUs() {
  const { language } = useLanguage();
  const bc = breadcrumbsContent[language];
  const formLabels = contactFormContent[language];
  return (<>
    <Navigation />
    <Breadcrumbs title={bc.title} items={bc.items} />
    <ContactForm {...formLabels} />
    <Footer />
  </>
  );
}
