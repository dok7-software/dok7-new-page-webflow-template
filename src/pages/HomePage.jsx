import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import WorkInitSection from '../components/WorkInitSection';
import WorkSection from '../components/WorkSection';
import WhyUsSection from '../components/WhyUsSection';
import TestimonialSection from '../components/TestimonialSection';
import CTASection from '../components/CTASection';
import FooterSection from '../components/FooterSection';
import { useGsapAnimations } from '../hooks/useGsapAnimations';

export default function HomePage() {
  useGsapAnimations();
  const location = useLocation();

  useEffect(() => {
    const raw = location.hash || window.location.hash;
    const hash = raw?.replace(/^#/, '');
    if (!hash) return;
    requestAnimationFrame(() => {
      document.getElementById(decodeURIComponent(hash))?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }, [location.pathname, location.hash]);

  return (
    <>
      <div data-w-id="b087e2d9-32d6-6d90-0f55-d873310a37eb" className="sticky-wrap">
        <div className="sticky-hero">
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
    </>
  );
}
