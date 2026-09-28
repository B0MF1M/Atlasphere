import React from 'react';
import { Globe2 } from '../Icons';
import './Footer.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-simple-container">
        <div className="footer-brand-inline">
          <Globe2 size={18} className="footer-icon" aria-hidden="true" />
          <span className="footer-brand-name">Atlasphere</span>
        </div>

        <p className="footer-text">
          &copy; {currentYear} Atlasphere • Dados fornecidos pela{' '}
          <a
            href="https://restcountries.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-api-link"
          >
            REST Countries API
          </a>
        </p>
      </div>
    </footer>
  );
}
