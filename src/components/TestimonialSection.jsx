import React from 'react';
import SectionHtml from './SectionHtml';
import testimonialHtml from '../sections/testimonial.html?raw';

export default function TestimonialSection() {
  return <SectionHtml html={testimonialHtml} />;
}
