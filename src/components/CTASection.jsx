import React from 'react';
import SectionHtml from './SectionHtml';
import ctaHtml from '../sections/cta.html?raw';

export default function CTASection() {
  return <SectionHtml html={ctaHtml} />;
}
