import React from 'react';
import SectionHtml from './SectionHtml';
import footerHtml from '../sections/footer.html?raw';

export default function FooterSection() {
  return <SectionHtml html={footerHtml} />;
}
