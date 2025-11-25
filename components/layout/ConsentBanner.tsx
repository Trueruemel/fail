import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Container } from './Container';
import { ShieldCheck, Settings, Loader2, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

export function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [processing, setProcessing] = useState<'denied' | 'granted' | null>(null);
  const [confirmed, setConfirmed] = useState<'denied' | 'granted' | null>(null);

  useEffect(() => {
    const storedConsent = localStorage.getItem('consent_status');
    if (!storedConsent) {
      const timer = setTimeout(() => setIsVisible(true), 1500); // Slightly longer delay for better UX on load
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (status: 'denied' | 'granted') => {
    setProcessing(status);
    
    // Simulate async processing
    setTimeout(() => {
        setProcessing(null);
        setConfirmed(status);

        setTimeout(() => {
            setIsClosing(true);
            localStorage.setItem('consent_status', status);
            setTimeout(() => {
                setIsVisible(false);
                setIsClosing(false);
                setConfirmed(null);
            }, 300);
        }, 800);
    }, 600);
  };

  const handleOpenSettings = () => setIsVisible(true);

  useEffect(() => {
    (window as any).openConsentSettings = handleOpenSettings;
  }, []);

  return (
    <div 
      className={cn(
        "fixed bottom-0 left-0 w-full z-[100] transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1)",
        // Crucial fix: pointer-events-none when invisible to prevent blocking clicks on footer
        !isVisible ? "pointer-events-none translate-y-full opacity-0" : "pointer-events-auto opacity-100",
        isClosing ? "translate-y-full" : "translate-y-0"
      )}
    >
      <div className="relative bg-white/95 backdrop-blur-xl border-t border-neutral-200/60 shadow-[0_-8px_30px_-5px_rgba(0,0,0,0.1)] pb-6 pt-6 md:py-6">
        <div className="absolute top-0 left-0 w-full h-1 bg-brand-gradient"></div>

        <Container>
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-primary" />
                <h3 className="font-bold text-neutral-900">Datenschutz-Einstellung (Demo)</h3>
              </div>
              <p className="text-neutral-600 max-w-3xl leading-snug text-sm">
                Wir nutzen Cookies, um den Consent Mode v2 zu demonstrieren. 
                Hier sehen Sie, wie ein <strong>gleichwertiges „Alle ablehnen“</strong> aussieht. 
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto shrink-0 pt-2 lg:pt-0">
              <Button 
                variant="outline" 
                onClick={() => handleConsent('denied')}
                disabled={processing !== null || confirmed !== null}
                className="w-full sm:w-auto min-w-[130px] border-neutral-300"
              >
                {processing === 'denied' ? <Loader2 className="w-4 h-4 animate-spin" /> : 
                 confirmed === 'denied' ? <Check className="w-4 h-4" /> : 'Alle ablehnen'}
              </Button>
              
              <Button 
                variant="ghost"
                onClick={handleOpenSettings}
                className="w-full sm:w-auto text-neutral-500"
              >
                Einstellen
              </Button>

              <Button 
                variant="gradient" 
                onClick={() => handleConsent('granted')}
                disabled={processing !== null || confirmed !== null}
                className="w-full sm:w-auto min-w-[150px] shadow-md"
              >
                 {processing === 'granted' ? <Loader2 className="w-4 h-4 animate-spin" /> : 
                  confirmed === 'granted' ? <Check className="w-4 h-4" /> : 'Alle akzeptieren'}
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}