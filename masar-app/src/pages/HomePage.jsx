import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeaturesCards from "../components/FeaturesCards";
import TracksSection from "../components/TracksSection";
import JourneySteps from "../components/JourneySteps";
import AboutSection from "../components/AboutSection";
import WhyMasar from "../components/WhyMasar";
import CTASection from "../components/CTASection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

const HomePage = ({ onStartJourney }) => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 150);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-navy text-white font-cairo flex flex-col">
      <Navbar />
      <main>
        <HeroSection onStartJourney={onStartJourney} />
        <FeaturesCards onStartJourney={onStartJourney} />
        <TracksSection />
        <JourneySteps />
        <AboutSection />
        <WhyMasar />
        <CTASection onStartJourney={onStartJourney} />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
