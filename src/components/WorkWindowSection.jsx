import React from 'react';
import SectionHtml from './SectionHtml';
import workWindowHtml from '../sections/workwindow.html?raw';

export default function WorkWindowSection() {
  return <SectionHtml html={workWindowHtml} />;
}
