import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import WhatWasSection from './components/WhatWasSection';
import WhySection from './components/WhySection';
import ImpactSection from './components/ImpactSection';
import TestimoniesSection from './components/TestimoniesSection';
import FourRsSection from './components/FourRsSection';
import MillenniumScoopSection from './components/MillenniumScoopSection';
import AntiDiscriminatorySection from './components/AntiDiscriminatorySection';
import ActionSection from './components/ActionSection';
import SourcesSection from './components/SourcesSection';
import Footer from './components/Footer';
import TriggerWarningModal from './components/TriggerWarningModal';

function App() {
  return (
    <div className="bg-charcoal text-cream font-sans">
      <CustomCursor />
      <TriggerWarningModal />
      <Navigation />

      <main>
        <Hero />
        <WhatWasSection />
        <WhySection />
        <ImpactSection />
        <TestimoniesSection />
        <FourRsSection />
        <MillenniumScoopSection />
        <AntiDiscriminatorySection />
        <ActionSection />
        <SourcesSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
