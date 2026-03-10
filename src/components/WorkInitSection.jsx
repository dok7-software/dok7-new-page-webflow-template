import React from 'react';
import SectionHtml from './SectionHtml';
import workInitHtml from '../sections/workinit.html?raw';

export default function WorkInitSection() {
  return <SectionHtml html={workInitHtml} />;
}
