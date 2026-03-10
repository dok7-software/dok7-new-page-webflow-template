import React from 'react';

function replaceAssets(str) {
  return str.replace(/\.\/assets\//g, '/assets/');
}

export default function SectionHtml({ html, tag = 'div' }) {
  const Wrapper = tag;
  return <Wrapper dangerouslySetInnerHTML={{ __html: replaceAssets(html) }} />;
}
