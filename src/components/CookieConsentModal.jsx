import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const LEGAL_READ_PATHS = ['/aviso-legal', '/politica-de-privacidad', '/politica-de-cookies'];

export const COOKIE_CONSENT_STORAGE_KEY = 'dok7_cookie_consent';

/** @typedef {'all' | 'necessary'} CookieConsentValue */

/**
 * Lee el consentimiento guardado (o null si aún no ha elegido).
 */
export function getCookieConsent() {
  try {
    const v = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (v === 'all' || v === 'necessary') return v;
    return null;
  } catch {
    return null;
  }
}

export default function CookieConsentModal() {
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const path = location.pathname.replace(/\/$/, '') || '/';
  const hideWhileReadingLegal = LEGAL_READ_PATHS.includes(path) && getCookieConsent() === null;

  useEffect(() => {
    if (getCookieConsent() === null) {
      setVisible(true);
    }
  }, []);

  const modalOpen = visible && !hideWhileReadingLegal;
  useEffect(() => {
    if (!modalOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [modalOpen]);

  /** @param {CookieConsentValue} value */
  const persist = (value) => {
    try {
      localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, value);
    } catch {
      /* ignorar modo privado / bloqueo */
    }
    setVisible(false);
    window.dispatchEvent(new CustomEvent('dok7-cookie-consent', { detail: value }));
  };

  if (!visible || hideWhileReadingLegal) return null;

  return (
    <div className="cookie-consent-root" role="presentation">
      <div className="cookie-consent-backdrop" aria-hidden="true" />
      <div
        className="cookie-consent-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-consent-title"
      >
        <h2 id="cookie-consent-title" className="cookie-consent-title">
          Uso de cookies
        </h2>
        <p className="cookie-consent-text">
          Utilizamos cookies propias y de terceros para conocer los usos de nuestra página web y poder mejorarla,
          adaptar el contenido a tus gustos y personalizar nuestros anuncios, marketing y publicaciones en redes
          sociales. Puedes obtener más información en nuestra{' '}
          <Link to="/politica-de-cookies" className="cookie-consent-inline-link">
            Política de Cookies
          </Link>{' '}
          y retirar tu consentimiento u oponerte al tratamiento de tus datos según el interés legítimo en cualquier
          momento haciendo clic en{' '}
          <Link to="/politica-de-privacidad" className="cookie-consent-inline-link">
            Más Información
          </Link>
          .
        </p>
        <div className="cookie-consent-actions">
          <button type="button" className="cookie-consent-btn cookie-consent-btn--primary" onClick={() => persist('all')}>
            Aceptar todas
          </button>
          <button
            type="button"
            className="cookie-consent-btn cookie-consent-btn--secondary"
            onClick={() => persist('necessary')}
          >
            Rechazar opcionales
          </button>
        </div>
      </div>
    </div>
  );
}
