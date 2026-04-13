import { Navigation } from '@/components/Navigation';
import { PageOverlay } from '@/components/PageOverlay';
import { Hero } from '@/sections/Hero';
import { About } from '@/sections/About';
import { Services } from '@/sections/Services';
import { Portfolio } from '@/sections/Portfolio';
import { Testimonials } from '@/sections/Testimonials';
import { CTA } from '@/sections/CTA';
import { Footer } from '@/sections/Footer';
import { TechStackTicker } from '@/components/TechStackTicker';
import { VideoBackground } from '@/components/VideoBackground';
import { ContactModal } from '@/components/ContactModal';
import { usePageLoad } from '@/hooks/usePageLoad';
import { useState } from 'react';
import { Toaster } from 'sonner';

function App() {
  const { showOverlay } = usePageLoad(3000);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Toaster position="bottom-right" theme="dark" />
      
      {/* Page Load Overlay */}
      <PageOverlay isVisible={showOverlay} />
      
      {/* Fixed Video Background */}
      <VideoBackground />
      
      {/* Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      
      {/* Navigation */}
      <Navigation onContactClick={() => setIsContactOpen(true)} />
      
      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        
        <div className="relative">
          <About />
          <Services />
          
          {/* Tech Ticker placed precisely above Technical Skills section */}
          <TechStackTicker />
          
          <Portfolio onContactClick={() => setIsContactOpen(true)} />
          <Testimonials />
          <CTA onContactClick={() => setIsContactOpen(true)} />
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default App;
