import React from 'react';
import { useLocation } from 'react-router-dom';
import FooterSection from '../components/FooterSection';
import {
  AvisoLegalBody,
  PoliticaPrivacidadBody,
  PoliticaCookiesBody,
} from '../content/LegalPagesContent';

const LEGAL_BY_PATH = {
  '/aviso-legal': { title: 'Aviso Legal', Body: AvisoLegalBody },
  '/politica-de-privacidad': { title: 'Política de Privacidad', Body: PoliticaPrivacidadBody },
  '/politica-de-cookies': { title: 'Política de Cookies', Body: PoliticaCookiesBody },
};

function normalizePath(pathname) {
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

export default function LegalPage() {
  const { pathname } = useLocation();
  const path = normalizePath(pathname);
  const config = LEGAL_BY_PATH[path];

  if (!config) {
    return null;
  }

  const { title, Body } = config;

  return (
    <>
      <main className="legal-page">
        <article className="legal-page-inner w-layout-blockcontainer main-container w-container">
          <h1 className="legal-page-title">{title}</h1>
          <div className="legal-page-content">
            <Body />
          </div>
        </article>
      </main>
      <FooterSection />
    </>
  );
}
