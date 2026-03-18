import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import WorkInitSection from './components/WorkInitSection';
import WorkSection from './components/WorkSection';
import WhyUsSection from './components/WhyUsSection';
import TestimonialSection from './components/TestimonialSection';
import CTASection from './components/CTASection';
import FooterSection from './components/FooterSection';
import { useGsapAnimations } from './hooks/useGsapAnimations';

function App() {
  useGsapAnimations();

  return (
    <>
      <div data-w-id="b087e2d9-32d6-6d90-0f55-d873310a37eb" className="sticky-wrap">
        <div className="sticky-hero">
          <Navbar />
          <Hero />
        </div>
      </div>
      <AboutSection />
      <WorkInitSection />
      <WorkSection />
      <WhyUsSection />
      <TestimonialSection />
      <CTASection />
      <FooterSection />
      <a
        href="https://wa.me/34695384318"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-fab"
      >
        Conversemos
      </a>
    </>
  );
}

export default App;
