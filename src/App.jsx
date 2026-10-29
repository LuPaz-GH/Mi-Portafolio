import { MotionConfig } from 'framer-motion';
import { useLang } from './lang';
import Background from './components/Background';
import CursorGlow from './components/CursorGlow';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import TechOrbit from './components/TechOrbit';
import Approach from './components/Approach';
import Testimonials from './components/Testimonials';
import Faq from './components/Faq';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const { t } = useLang();

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">{t.skip}</a>
      <Background />
      <CursorGlow />
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Timeline />
        <TechOrbit />
        <Approach />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
