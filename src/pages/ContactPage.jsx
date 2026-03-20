import React, { useState } from 'react';
import FooterSection from '../components/FooterSection';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Integración con envío de correo pendiente */
  };

  return (
    <>
      <main className="contact-page">
        <div className="contact-page-inner w-layout-blockcontainer main-container w-container">
          <h1 className="contact-page-title">Contacto</h1>
          <p className="contact-page-lead small-text">
            Cuéntanos en qué podemos ayudarte. Responderemos lo antes posible.
          </p>
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="contact-form-field">
              <label htmlFor="contact-name" className="contact-form-label">
                Nombre
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="contact-form-input w-input"
                placeholder="Tu nombre"
              />
            </div>
            <div className="contact-form-field">
              <label htmlFor="contact-email" className="contact-form-label">
                Correo electrónico
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="contact-form-input w-input"
                placeholder="tu@correo.com"
              />
            </div>
            <div className="contact-form-field">
              <label htmlFor="contact-message" className="contact-form-label">
                Mensaje
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="contact-form-textarea w-input"
                placeholder="Escribe tu mensaje…"
              />
            </div>
            <button type="submit" className="contact-form-submit">
              Enviar
            </button>
          </form>
        </div>
      </main>
      <FooterSection />
    </>
  );
}
