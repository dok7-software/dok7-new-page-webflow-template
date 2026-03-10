import React from 'react';
import SectionHtml from './SectionHtml';
import aboutHtml from '../sections/about.html?raw';

export default function AboutSection() {
  return <SectionHtml html={aboutHtml} />;
}
