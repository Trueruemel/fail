
import React from 'react';
import { Link } from 'react-router-dom';
import { Cookie, ShieldCheck } from 'lucide-react';
import { Container } from './Container';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 py-12 mt-24 relative overflow-hidden">
      {/* Top Claim Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-brand-gradient"></div>

      <Container>
        <div className="text-center mb-12">
            <h3 className="text-xl md:text-2xl font-bold font-heading text-neutral-900">
               Datenschutz: Ihre Chance, kein Hindernis.
            </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-neutral-200 pb-12 mb-8">
          {/* A) Kontakt + Region */}
          <div className="flex flex-col space-y-4">
             <Link to="/" className="flex items-center gap-2 mb-2 group">
                <div className="w-8 h-8 bg-brand-primary text-white rounded-md flex items-center justify-center group-hover:bg-brand-primary/90 transition-colors">
                    <Cookie className="w-5 h-5" />
                </div>
                <span className="font-bold text-lg text-neutral-900">ConsentWerft</span>
             </Link>
             <div className="text-sm text-neutral-700 space-y-1 font-medium">
                <p>Hannover · remote DACH-weit</p>
                <p>
                    <a href="mailto:mail@consentwerft.de" className="hover:text-brand-primary underline decoration-neutral-300 underline-offset-4 transition-colors">
                        mail@consentwerft.de
                    </a>
                </p>
             </div>
          </div>

          {/* B) Leistungen (4 Pfeiler) */}
          <div>
            <h4 className="font-bold text-neutral-900 mb-4 uppercase tracking-wider text-xs">Leistungen</h4>
            <ul className="space-y-3 text-sm text-neutral-700">
              <li><Link to="/leistungen" className="hover:text-brand-primary transition-colors">Cookie-Banner & CMP-Modernisierung</Link></li>
              <li><Link to="/leistungen" className="hover:text-brand-primary transition-colors">Consent Mode v2 (Basic/Advanced)</Link></li>
              <li><Link to="/leistungen" className="hover:text-brand-primary transition-colors">Server-Side Tagging & Gating</Link></li>
              <li><Link to="/leistungen" className="hover:text-brand-primary transition-colors">DPA/AV-Audit & Proof-Stack</Link></li>
            </ul>
          </div>

          {/* C) Rechtliches */}
          <div>
            <h4 className="font-bold text-neutral-900 mb-4 uppercase tracking-wider text-xs">Rechtliches</h4>
            <ul className="space-y-3 text-sm text-neutral-700">
              <li><Link to="#" className="hover:text-brand-primary transition-colors">Impressum</Link></li>
              <li><Link to="#" className="hover:text-brand-primary transition-colors">Datenschutz</Link></li>
              <li>
                <button 
                  onClick={() => (window as any).openConsentSettings?.()} 
                  className="hover:text-brand-primary transition-colors text-left flex items-center gap-2"
                >
                  Cookie-Einstellungen
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
           <p>Technisch/organisatorisch – keine Rechtsberatung.</p>
           <p>© {currentYear} ConsentWerft.</p>
        </div>
      </Container>
    </footer>
  );
}