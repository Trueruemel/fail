
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Container } from '../layout/Container';
import { useScrollAnimation } from '../../lib/hooks';
import { cn } from '../../lib/utils';
import { Clock, FileCheck, BarChart3, ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react';

export function HeroSection() {
  const heroAnim = useScrollAnimation({ type: 'fade-up' });
  const proofAnim = useScrollAnimation({ type: 'fade-in', delay: 300 });
  const impactHeaderAnim = useScrollAnimation({ type: 'fade-up' });
  const impactGridAnim = useScrollAnimation({ type: 'fade-up', delay: 100 });
  const impactFooterAnim = useScrollAnimation({ type: 'fade-in', delay: 200 });
  
  // Lazy load background for section below fold
  const impactBgAnim = useScrollAnimation({ rootMargin: '200px' });

  return (
    <>
      {/* 1. HERO SECTION - Design 9 Layout */}
      <section 
        className="relative w-full flex flex-col justify-center overflow-hidden bg-neutral-900"
        style={{ minHeight: '80vh', padding: '4rem 2rem' }}
      >
        
        {/* New Background Image Implementation - Neo Tech Fluid Abstract */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2500&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/90 via-neutral-900/60 to-neutral-900/90"></div>

        {/* New Glow Implementation */}
        <div style={{
          position: 'absolute', top: '-20%', right: '-10%', width: '600px', height: '600px', 
          background: 'radial-gradient(circle, rgba(106,13,173,0.2) 0%, rgba(255,79,162,0.1) 50%, transparent 70%)', 
          filter: 'blur(80px)', zIndex: 1
        }} />
        
        <Container className="relative z-10 flex-grow flex flex-col justify-center">
           <div className="grid lg:grid-cols-2 gap-10 items-center">
             
             {/* Left Text Content */}
             <div ref={heroAnim.ref} style={heroAnim.style}>
                 <div 
                    style={{
                        display: 'inline-block', background: 'rgba(255, 255, 255, 0.1)', 
                        color: '#FF4FA2', padding: '6px 12px', borderRadius: '20px', 
                        fontWeight: 600, fontSize: '0.9rem', marginBottom: '1.5rem',
                        backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 79, 162, 0.3)'
                    }}
                 >
                    Neu: Consent Mode v2 Support
                 </div>
                 
                 <h1 style={{fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.1, color: 'white', marginBottom: '1.5rem'}} className="font-heading text-shadow-sm">
                    Datenschutz: <br />
                    Ihre Chance, <br />
                    <span style={{color: '#6A0DAD'}} className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">kein Hindernis.</span>
                 </h1>
                 
                 <p style={{fontSize: '1.25rem', color: '#e0e0e0', marginBottom: '2.5rem', maxWidth: '500px', lineHeight: 1.6}}>
                    Wir fixen dein Tracking und Cookie-Banner in &lt; 48h. 
                    Rechtssicher, messbar, ohne Umsatzverlust.
                 </p>
                 
                 <div style={{display: 'flex', gap: '15px', flexWrap: 'wrap'}}>
                    <Link to="/gespraech-buchen">
                        <button style={{
                            background: '#FF4FA2', color: 'white', border: 'none', 
                            padding: '14px 28px', fontSize: '1rem', fontWeight: 'bold', 
                            borderRadius: '8px', cursor: 'pointer', boxShadow: '0 0 20px rgba(255, 79, 162, 0.5)'
                        }} className="hover:opacity-90 hover:scale-105 transition-all">
                            Gratis-Check (15 min)
                        </button>
                    </Link>
                    <Link to="/angebote" style={{
                        padding: '14px 28px', color: 'white', textDecoration: 'none', 
                        fontWeight: 600, border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px',
                        background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(5px)'
                    }} className="hover:bg-white/10 hover:border-white/40 transition-all">
                        Pakete ansehen
                    </Link>
                 </div>
             </div>

             {/* Right Image Content - Moai Design 9 */}
             <div style={{position: 'relative', display: 'flex', justifyContent: 'center'}}>
                <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: '80%', height: '80%', background: '#6A0DAD', opacity: 0.2, 
                    filter: 'blur(80px)', borderRadius: '50%', zIndex: 0
                }}></div>
                
                {/* Fallback image logic if Design 9.png is missing, but styled as requested */}
                <img 
                    src="/Design 9.png" 
                    alt="ConsentWerft Moai" 
                    loading="lazy"
                    decoding="async"
                    width="600"
                    height="600"
                    style={{
                        position: 'relative', zIndex: 1, maxWidth: '100%', height: 'auto', 
                        transform: 'scale(1.1)', 
                        filter: 'drop-shadow(0 20px 40px rgba(106,13,173,0.25))'
                    }}
                    onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2500&auto=format&fit=crop";
                        e.currentTarget.style.transform = "none";
                        e.currentTarget.style.borderRadius = "24px";
                        e.currentTarget.style.border = "1px solid rgba(255,255,255,0.1)";
                    }}
                />
             </div>

          </div>
        </Container>
      </section>

      {/* 2. MINI-PROOF-STREIFEN (Retained as it provides quick trust signals) */}
      <div ref={proofAnim.ref} style={proofAnim.style} className="w-full border-t border-neutral-200 bg-white/95 backdrop-blur py-8 shadow-sm relative z-20">
            <Container>
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-center md:text-left">
                    <div className="flex items-center gap-4 justify-center md:justify-start">
                        <div className="bg-brand-primary/10 p-2.5 rounded-full text-brand-primary shrink-0">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-neutral-900">In 48 Stunden weißt du, wo du stehst.</h3>
                        </div>
                    </div>
                    
                    <div className="hidden md:block w-px h-10 bg-neutral-200"></div>
                    
                    <div className="flex items-center gap-4 max-w-lg justify-center md:justify-start">
                         <div className="bg-brand-accent/10 p-2.5 rounded-full text-brand-accent shrink-0">
                            <FileCheck className="w-6 h-6" />
                        </div>
                        <div>
                             <p className="text-sm text-neutral-700 leading-snug font-medium">
                                Du bekommst eine klare Diagnose deines Banners und Tracking-Setups — mit konkreten Next Steps.
                            </p>
                        </div>
                    </div>
                    
                    <div className="hidden md:block w-px h-10 bg-neutral-200"></div>
                    
                     <p className="text-[10px] text-neutral-400 italic max-w-[150px] text-center md:text-left leading-tight mx-auto md:mx-0">
                        (Keine Rechtsberatung: technisch/organisatorisch.)
                    </p>
                </div>
            </Container>
      </div>

      {/* 3. DARK IMPACT BLOCK */}
      <section className="py-20 bg-neutral-900 text-white overflow-hidden relative">
         {/* Subtle background pattern - Lazy Loaded */}
         <div 
           ref={impactBgAnim.ref}
           className="absolute inset-0 opacity-10 bg-repeat"
           style={{
             backgroundImage: impactBgAnim.isVisible ? "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" : 'none'
           }}
         />
         <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
         <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-accent/10 rounded-full blur-[100px] pointer-events-none"></div>

         <Container className="relative z-10">
             <div ref={impactHeaderAnim.ref} style={impactHeaderAnim.style} className="max-w-4xl mx-auto text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6 leading-tight">
                    Wenn Consent falsch sitzt, fehlen dir Signale — <br className="hidden md:block"/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">nicht nur Cookies.</span>
                </h2>
                <p className="text-lg text-neutral-300 leading-relaxed mb-8">
                    Bei fehlerhaften Bannern oder Consent-Flows gehen je nach Setup typischerweise <span className="text-white font-bold">10–30% an Conversion- und Ads-Signalen verloren</span> (ITP, Ad-Blocker, falsche CMv2-Anbindung).
                    <br className="hidden md:block" />
                    Wir drehen das um: saubere Zustimmungen, saubere Modelle, saubere Entscheidungen.
                </p>
             </div>

             <div ref={impactGridAnim.ref} style={impactGridAnim.style} className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                 {[
                    { icon: BarChart3, text: "Weniger Blindflug in GA4 & Ads" },
                    { icon: ShieldCheck, text: "Mehr stabile Modellierung trotz Datenschutz" },
                    { icon: HeartHandshake, text: "Mehr Vertrauen bei Nutzern" }
                 ].map((item, i) => (
                    <div key={i} className="bg-neutral-800/50 border border-neutral-700 p-6 rounded-xl flex flex-col items-center text-center hover:border-brand-primary/50 transition-colors group">
                        <div className="mb-4 p-3 bg-neutral-900 rounded-full text-brand-primary group-hover:text-white group-hover:bg-brand-primary transition-colors shadow-lg">
                            <item.icon className="w-6 h-6" />
                        </div>
                        <span className="font-medium text-neutral-200 group-hover:text-white transition-colors">{item.text}</span>
                    </div>
                 ))}
             </div>

             <div ref={impactFooterAnim.ref} style={impactFooterAnim.style} className="text-center mt-12">
                <p className="text-xs text-neutral-500 italic mb-8">
                    Ergebnisse variieren je nach Tech-Stack, Traffic und Consent-Rate.
                </p>
                <div>
                     <Link to="/gespraech-buchen" className="inline-flex items-center text-brand-primary hover:text-brand-accent font-bold transition-colors border-b border-brand-primary hover:border-brand-accent pb-0.5">
                        Gratis-Check vereinbaren <ArrowRight className="ml-2 w-4 h-4" />
                     </Link>
                </div>
             </div>
         </Container>
      </section>
    </>
  );
}