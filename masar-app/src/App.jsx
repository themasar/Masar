import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesCards from './components/FeaturesCards';
import JourneySteps from './components/JourneySteps';
import AboutSection from './components/AboutSection';
import WhyMasar from './components/WhyMasar';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import { QuestionsFlow } from './components/QuestionsFlow';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [showQuestionsFlow, setShowQuestionsFlow] = useState(false);
  const [currentRoute, setCurrentRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (currentRoute === '#admin') {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-navy text-white font-cairo flex flex-col">
      {!showQuestionsFlow && <Navbar />}
      
      {!showQuestionsFlow ? (
        <main>
          <HeroSection onStartJourney={() => setShowQuestionsFlow(true)} />
          <FeaturesCards onStartJourney={() => setShowQuestionsFlow(true)} />
          <JourneySteps />
          <AboutSection />
          <WhyMasar />
          <CTASection onStartJourney={() => setShowQuestionsFlow(true)} />
        </main>
      ) : (
        <main>
          <QuestionsFlow onBackToMain={() => setShowQuestionsFlow(false)} />
        </main>
      )}

      {!showQuestionsFlow && <Footer />}
    </div>
  );
}

export default App;
