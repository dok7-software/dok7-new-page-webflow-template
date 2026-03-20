import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import LegalPage from './pages/LegalPage';
import CookieConsentModal from './components/CookieConsentModal';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="/aviso-legal" element={<LegalPage />} />
        <Route path="/politica-de-privacidad" element={<LegalPage />} />
        <Route path="/politica-de-cookies" element={<LegalPage />} />
      </Routes>
      <CookieConsentModal />
    </>
  );
}

export default App;
