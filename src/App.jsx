import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import WorkInitSection from './components/WorkInitSection';
import WorkWindowSection from './components/WorkWindowSection';
import WorkSection from './components/WorkSection';
import WhyUsSection from './components/WhyUsSection';
import TestimonialSection from './components/TestimonialSection';
import CTASection from './components/CTASection';
import FooterSection from './components/FooterSection';
import WebflowBadge from './components/WebflowBadge';
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
      <WorkWindowSection />
      <WorkSection />
      <WhyUsSection />
      <TestimonialSection />
      <CTASection />
      <FooterSection />
      <WebflowBadge />
    </>
  );
}

export default App;
