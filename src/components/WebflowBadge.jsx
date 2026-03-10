import React from 'react';

const ASSETS = '/assets';

export default function WebflowBadge() {
  return (
    <a className="w-webflow-badge" href="https://webflow.com/?utm_campaign=brandjs">
      <img src={`${ASSETS}/images/webflow-badge-icon-d2.89e12c322e.svg`} alt="" style={{ marginRight: '4px', width: 26 }} />
      <img src={`${ASSETS}/images/webflow-badge-text-d2.c82cec3b78.svg`} alt="Made in Webflow" />
    </a>
  );
}
