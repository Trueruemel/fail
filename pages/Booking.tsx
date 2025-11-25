import React from 'react';
import { Container } from '../components/layout/Container';
import { BookingForm } from '../components/sections/BookingForm';
import { CheckCircle2 } from 'lucide-react';
import { useScrollAnimation } from '../lib/hooks';
import { cn } from '../lib/utils';

export function Booking() {
  const anim = useScrollAnimation({ type: 'fade-up', duration: 500 });

  return (
    <div className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden bg-neutral-50">
      
      {/* Flashy Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-dot-pattern opacity-30"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-brand-primary/10 rounded-full blur-[120px] animate-float"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-brand-accent/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }}></div>
      
      <Container className="relative z-10">
        <div ref={anim.ref} style={anim.style}>
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg mb-6 text-3xl">📅</div>
                <h1 className="text-4xl md:text-6xl font-bold font-heading mb-8 text-neutral-900">
                    15 Minuten, die dir <span className="gradient-text">Wochen sparen.</span>
                </h1>
                
                <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 mb-8 flex-wrap">
                    <div className="flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full border border-neutral-200 shadow-sm">
                        <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0" />
                        <span className="text-neutral-700 font-medium text-sm md:text-base">Klartext zu Banner, CMv2, Server-Side</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full border border-neutral-200 shadow-sm">
                        <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0" />
                        <span className="text-neutral-700 font-medium text-sm md:text-base">Du bekommst konkrete Next Steps</span>
                    </div>
                     <div className="flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full border border-neutral-200 shadow-sm">
                        <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0" />
                        <span className="text-neutral-700 font-medium text-sm md:text-base">Kein Verkaufsgespräch, kein Druck</span>
                    </div>
                </div>
            </div>
            
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white shadow-2xl p-2 md:p-8">
                <BookingForm />
            </div>
            
            <div className="text-center mt-8">
                <p className="text-xs md:text-sm text-neutral-500 font-medium">
                    Kein Slot passt? Schreib kurz an <a href="mailto:mail@consentwerft.de" className="text-brand-primary hover:underline font-bold">mail@consentwerft.de</a>
                </p>
            </div>
        </div>
      </Container>
    </div>
  );
}