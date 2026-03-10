import React from 'react';
import SectionHtml from './SectionHtml';
import workHtml from '../sections/work.html?raw';

export default function WorkSection() {
  return <SectionHtml html={workHtml} />;
}
