import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesCards from './components/FeaturesCards';
import JourneySteps from './components/JourneySteps';
import AboutSection from './components/AboutSection';
import WhyMasar from './components/WhyMasar';
import CTASection from './components/CTASection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { QuestionsFlow } from './components/QuestionsFlow';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';

function App() {
  const [showQuestionsFlow, setShowQuestionsFlow] = useState(false);
  const [currentRoute, setCurrentRoute] = useState(window.location.pathname);
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentRoute(window.location.pathname);
      setCurrentHash(window.location.hash);
    };

    // Listen for standard pushState and hash changes
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Check if we are on the admin route (either /admin or #admin)
  const isAdminRoute = currentRoute === '/admin' || currentHash === '#admin';

  if (isAdminRoute) {
    if (!isAuthenticated) {
      return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
    }
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
          <ContactSection />
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
