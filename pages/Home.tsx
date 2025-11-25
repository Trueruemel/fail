
import React from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { Container } from '../components/layout/Container';
import { OfferCard } from '../components/sections/OfferCard';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { useScrollAnimation } from '../lib/hooks';
import { cn } from '../lib/utils';
import { ShieldCheck, Award, Database, ArrowRight, ArrowUpRight, Sliders, Lock, Server, Factory, ShoppingCart, Globe, Briefcase, Code2, Users, ChevronDown, Wrench, FileCheck, Zap } from 'lucide-react';
import { HOME_OFFERS, FAQS } from '../lib/data';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

// Image constants
const uxConsentCube = "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1000&auto=format&fit=crop"; 
const consentModeButton = "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=1000&auto=format&fit=crop"; 
const serverSideStack = "https://images.unsplash.com/photo-1544197150-b990a580bbc7c?q=80&w=1000&auto=format&fit=crop"; 
const dataRecoveryGraph = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"; 

interface PillarCardProps {
  service: { img: string; title: string; text: string };
  index: number;
}

const PillarCard: React.FC<PillarCardProps> = ({ service, index }) => {
  const { ref, style } = useScrollAnimation({ 
    type: 'fade-up', 
    delay: index * 100,
    duration: 600,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px' 
  });

  return (
    <div ref={ref} style={style} className="group h-full">
      <div className="relative h-full flex flex-col bg-white border border-neutral-200 rounded-2xl overflow-hidden transition-all duration-500 hover:border-brand-primary/30 hover:shadow-xl hover:-translate-y-1">
          
          <div className="h-48 w-full relative overflow-hidden bg-neutral-100 border-b border-neutral-100">
              <img 
                  src={service.img} 
                  alt={service.title}
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
              />
              <div className="absolute inset-0 bg-neutral-900/10 group-hover:bg-transparent transition-colors"></div>
          </div>

          <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-neutral-900 mb-3 font-heading group-hover:text-brand-primary transition-colors">
                  {service.title}
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                  {service.text}
              </p>
              
              <div className="mt-auto pt-6">
                  <div className="h-0.5 w-8 bg-neutral-200 group-hover:bg-brand-primary transition-all duration-300 group-hover:w-16"></div>
              </div>
          </div>
      </div>
    </div>
  );
};

const PillarsGrid = () => {
  const headerAnim = useScrollAnimation({ type: 'fade-up', duration: 600 });
  
  const services = [
    {
      img: uxConsentCube,
      title: "UX-First Consent Design",
      text: "Banner, die Nutzer akzeptieren und Juristen lieben. Wir maximieren die Opt-in-Rate durch sauberes Design, ohne Dark Patterns."
    },
    {
      img: consentModeButton,
      title: "Advanced Consent Mode v2",
      text: "Signale retten, wo andere blind fliegen. Intelligente Modellierung schließt Datenlücken, selbst bei abgelehntem Consent."
    },
    {
      img: serverSideStack,
      title: "Server-Side Infrastructure",
      text: "Volle Datenkontrolle auf eigener Hardware. Umgehen Sie Ad-Blocker und ITP für stabilere Conversions und schnellere Ladezeiten."
    },
    {
      img: dataRecoveryGraph,
      title: "Signal Recovery & Analytics",
      text: "Vom Blindflug zur Klarheit. Wir machen verlorene Touchpoints wieder sichtbar und korrigieren Ihre Attribution."
    }
  ];
  
  return (
    <section className={cn("py-24 bg-neutral-50 relative overflow-hidden")}>
      <Container className="relative z-10">
          <div ref={headerAnim.ref} style={headerAnim.style} className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-brand-primary font-bold tracking-widest uppercase text-xs mb-3 block">Unsere Leistungen</span>
              <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6 text-neutral-900">
                  Vier Bausteine für <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">belastbare Daten.</span>
              </h2>
              <p className="text-xl text-neutral-600 font-light leading-relaxed">
                  Wir ersetzen Bauchgefühl durch technische Präzision. Ohne Risiko-Zirkus.
              </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                  <PillarCard key={index} service={service} index={index} />
              ))}
          </div>
      </Container>
    </section>
  );
};

const ProofStack = () => {
  const { ref, style } = useScrollAnimation();

  return (
    <section ref={ref} style={style} className={cn("py-20 bg-white border-b border-neutral-100")}>
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-heading text-neutral-900">So sieht ein sauberer Fix aus</h2>
          <p className="text-neutral-600 mt-4 max-w-2xl mx-auto">
             Keine leeren Versprechen. Wir liefern technische Beweise, dass dein Stack sauber läuft.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
           {/* Card A: Diagnostics */}
           <div className="group cursor-default flex flex-col items-center">
              <div style={{
                background: '#F7F7F9',
                borderRadius: '12px',
                padding: '24px',
                fontFamily: 'monospace',
                border: '1px solid #E0E0E0',
                width: '100%',
                maxWidth: '400px',
                position: 'relative',
                overflow: 'hidden'
              }} className="shadow-lg group-hover:border-[#6A0DAD]/30 transition-colors">
                  
                  <div style={{display:'flex', gap:'6px', marginBottom:'20px'}}>
                    <div style={{width:'10px', height:'10px', borderRadius:'50%', background:'#FF4FA2'}}></div> 
                    <div style={{width:'10px', height:'10px', borderRadius:'50%', background:'#6A0DAD'}}></div> 
                  </div>
                  
                  <div style={{color: '#333', fontSize: '14px', lineHeight: '1.6'}}>
                    <span style={{color: '#6A0DAD'}}>consent_status:</span> <span style={{color: '#2e7d32', fontWeight:'bold'}}>"granted"</span><br/>
                    <span style={{color: '#6A0DAD'}}>gcs_signal:</span> "G100"<br/>
                    <span style={{color: '#6A0DAD'}}>analytics_storage:</span> "granted"<br/>
                    <span style={{color: '#6A0DAD'}}>ad_user_data:</span> "granted"<br/>
                    <hr style={{border: 0, borderTop: '1px dashed #ccc', margin: '15px 0'}}/>
                    <span style={{color: '#888'}}>// Server-Side Validation: OK</span>
                  </div>
              </div>
              <p className="text-neutral-700 font-medium text-center mt-6">Consent-Signale sauber verifiziert.</p>
           </div>

           {/* Card B: Gating */}
           <div className="group cursor-default flex flex-col items-center">
              <div style={{
                background: '#F7F7F9',
                borderRadius: '12px',
                padding: '24px',
                fontFamily: 'monospace',
                border: '1px solid #E0E0E0',
                width: '100%',
                maxWidth: '400px',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }} className="shadow-lg group-hover:border-[#6A0DAD]/30 transition-colors h-full min-h-[190px]">
                  <div style={{display:'flex', gap:'6px', marginBottom:'15px', position: 'absolute', top: '24px', left: '24px'}}>
                    <div style={{width:'10px', height:'10px', borderRadius:'50%', background:'#FF4FA2'}}></div> 
                    <div style={{width:'10px', height:'10px', borderRadius:'50%', background:'#6A0DAD'}}></div> 
                  </div>
                  
                  <div className="space-y-2 relative z-10 font-mono text-xs w-full mt-6">
                      <div className="flex items-center gap-3 opacity-50">
                          <span className="text-neutral-400">event: page_view</span>
                          <span className="text-red-500 font-bold">[BLOCKED]</span>
                      </div>
                      <div className="h-4 border-l-2 border-dashed border-neutral-300 ml-1.5 my-1"></div>
                      <div className="flex items-center gap-3">
                          <span className="text-[#6A0DAD] font-bold">&gt; consent_update: GRANTED</span>
                      </div>
                      <div className="h-4 border-l-2 border-dashed border-neutral-300 ml-1.5 my-1"></div>
                       <div className="flex items-center gap-3">
                          <span className="text-neutral-600">event: page_view</span>
                          <span className="text-[#2e7d32] font-bold">[FIRED]</span>
                      </div>
                  </div>
              </div>
              <p className="text-neutral-700 font-medium text-center mt-6">Gating funktioniert in jeder Stufe.</p>
           </div>

           {/* Card C: DebugView */}
           <div className="group cursor-default flex flex-col items-center">
               <div style={{
                background: '#F7F7F9',
                borderRadius: '12px',
                padding: '24px',
                fontFamily: 'monospace',
                border: '1px solid #E0E0E0',
                width: '100%',
                maxWidth: '400px',
                position: 'relative',
                overflow: 'hidden'
              }} className="shadow-lg group-hover:border-[#6A0DAD]/30 transition-colors h-full min-h-[190px]">
                   <div style={{display:'flex', gap:'6px', marginBottom:'20px'}}>
                     <div style={{width:'10px', height:'10px', borderRadius:'50%', background:'#FF4FA2'}}></div> 
                     <div style={{width:'10px', height:'10px', borderRadius:'50%', background:'#6A0DAD'}}></div> 
                   </div>

                    <div className="space-y-3 relative z-10 w-full text-xs">
                         <div className="flex justify-between border-b border-dashed border-neutral-200 pb-2">
                             <span className="text-[#6A0DAD]">event_name</span>
                             <span className="text-[#6A0DAD]">status</span>
                         </div>
                         <div className="flex justify-between items-center">
                             <span className="text-neutral-600">session_start</span>
                             <span className="text-[#2e7d32] font-bold">✓ 200</span>
                         </div>
                         <div className="flex justify-between items-center">
                             <span className="text-neutral-600">purchase</span>
                             <span className="text-[#2e7d32] font-bold">✓ 200</span>
                         </div>
                         <div className="flex justify-between items-center bg-[#2e7d32]/10 p-1 rounded -mx-1">
                             <span className="text-neutral-900 font-bold">conversion_value</span>
                             <span className="text-neutral-900">129.00 €</span>
                         </div>
                    </div>
               </div>
               <p className="text-neutral-700 font-medium text-center mt-6">Events & Modellierung stabil.</p>
           </div>
        </div>
      </Container>
    </section>
  );
};

const TypicalFixes = () => {
  const { ref, style } = useScrollAnimation();

  const fixes = [
    {
      problem: "Banner ohne gleichwertiges Ablehnen → niedrige Consent-Rate.",
      fix: "UX- & Vendor-Fix, sauberer Flow.",
      outcome: "Consent-Rate typ. +5–15 Punkte (stack-abhängig)."
    },
    {
      problem: "CMv2 falsch verdrahtet → Ads-Signale brechen.",
      fix: "Basic/Advanced sauber gegated.",
      outcome: "Signallücken typ. −10–30% (traffic-abhängig)."
    },
    {
      problem: "Kein Server-Side → ITP/Ad-Blocker fressen Events.",
      fix: "SS-GTM + Gatekeeping.",
      outcome: "Stabilere Modellierung, weniger Event-Drop."
    }
  ];

  return (
    <section ref={ref} style={style} className={cn("py-20 bg-neutral-50/80")}>
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-heading text-neutral-900">3 typische Fixes, die wir gerade sehen</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {fixes.map((item, i) => (
            <Card key={i} className="bg-white border-neutral-200 hover:border-brand-primary/30 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 bg-red-100 rounded text-red-600">
                        <ShieldCheck className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Ausgangslage</span>
                </div>
                <p className="text-neutral-800 font-medium leading-snug">{item.problem}</p>
              </CardHeader>
              <CardContent className="pb-3 flex-grow">
                 <div className="w-full h-px bg-neutral-100 mb-4"></div>
                 <div className="flex items-center gap-2 mb-3">
                     <div className="p-1.5 bg-brand-primary/10 rounded text-brand-primary">
                        <Wrench className="w-4 h-4" />
                     </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Der Fix</span>
                 </div>
                 <p className="text-neutral-800 font-medium leading-snug">{item.fix}</p>
              </CardContent>
               <CardContent className="pt-0 mt-auto">
                 <div className="bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 border border-brand-primary/10 rounded-lg p-4 flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-brand-accent">
                         <ArrowUpRight className="w-4 h-4" />
                         <span className="text-xs font-bold uppercase tracking-wider">Outcome</span>
                    </div>
                    <p className="text-sm font-bold text-neutral-900">{item.outcome}</p>
                 </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

const TrustRow = () => {
  const { ref, style } = useScrollAnimation();
  
  const badges = [
    { icon: FileCheck, label: "CMP-Export & audit-fähig" },
    { icon: Sliders, label: "CMv2 Basic/Advanced ready" },
    { icon: Lock, label: "GTM-Gating sauber umgesetzt" },
    { icon: Server, label: "Server-Side stabilisiert Signale" }
  ];

  return (
    <section ref={ref} style={style} className={cn("py-20 bg-white border-t border-neutral-100")}>
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12">
           <h2 className="text-3xl font-bold font-heading text-neutral-900 mb-4">Sauberer Stack statt Bauchgefühl.</h2>
           <p className="text-lg text-neutral-600">
             Zertifizierte CMP-Setups, Consent Mode v2 nach Best-Practice und Server-Side-Architektur für DACH-Realität, nicht US-Folklore.
           </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {badges.map((badge, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 rounded-xl bg-neutral-50 border border-neutral-100 hover:border-brand-primary/20 hover:shadow-subtle transition-all duration-300 group">
                  <div className="w-14 h-14 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-600 group-hover:text-brand-primary group-hover:border-brand-primary group-hover:scale-110 transition-all duration-300 shadow-sm mb-4">
                     <badge.icon className="w-6 h-6" />
                  </div>
                  <span className="font-semibold text-neutral-800 text-sm leading-tight">{badge.label}</span>
              </div>
           ))}
        </div>
      </Container>
    </section>
  );
};

const IndustryChips = () => {
  const { ref, style } = useScrollAnimation();
  
  const industries = [
    { name: "E-Commerce", icon: ShoppingCart },
    { name: "SaaS", icon: Globe },
    { name: "Agenturen", icon: Briefcase },
    { name: "Shopify/Shop-Systeme", icon: Code2 },
    { name: "Lead-Gen", icon: Users },
    { name: "KMU", icon: Factory }
  ];

  return (
    <section ref={ref} style={style} className={cn("py-16 bg-neutral-50 border-y border-neutral-200")}>
      <Container>
         <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-xl text-center lg:text-left">
                <h2 className="text-2xl md:text-3xl font-bold font-heading text-neutral-900 mb-3">Ideal für Teams, die so richtig messen wollen.</h2>
                <p className="text-neutral-600 font-medium">
                   Typische Fixes: Consent-Rate hoch ohne Dark Patterns, Ads-Signals stabil trotz ITP.
                </p>
            </div>
            
            <div className="flex flex-wrap justify-center lg:justify-end gap-3 max-w-xl">
               {industries.map((ind, index) => (
                  <div key={index} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-neutral-200 shadow-sm text-sm font-bold text-neutral-700 hover:border-brand-primary hover:text-brand-primary hover:shadow-md transition-all duration-300 cursor-default">
                      {ind.name}
                  </div>
               ))}
            </div>
         </div>
      </Container>
    </section>
  );
};

const FAQSection = () => {
  const { ref, style } = useScrollAnimation();
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <section ref={ref} style={style} className={cn("py-24 bg-white")}>
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-neutral-900">
            Die 10 Fragen, die immer kommen.
          </h2>
        </div>

        <div className="max-w-3xl mx-auto mb-16 space-y-4">
          {FAQS.map((faq, index) => {
             const isOpen = openIndex === index;
             return (
               <div 
                 key={index} 
                 className={cn(
                   "border rounded-xl bg-white transition-all duration-300 overflow-hidden",
                   isOpen ? "border-brand-primary/30 shadow-subtle" : "border-neutral-200 hover:border-brand-primary/30"
                 )}
               >
                 <button
                   onClick={() => setOpenIndex(isOpen ? null : index)}
                   className="flex justify-between items-center w-full text-left p-5 md:p-6 focus:outline-none"
                 >
                   <span className={cn("font-semibold text-lg pr-8", isOpen ? "text-brand-primary" : "text-neutral-900")}>
                     {faq.question}
                   </span>
                   <div className={cn(
                     "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300",
                     isOpen ? "bg-brand-primary text-white" : "bg-neutral-100 text-neutral-500"
                   )}>
                     <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", isOpen && "rotate-180")} />
                   </div>
                 </button>
                 <div 
                   className={cn(
                     "transition-all duration-300 ease-in-out overflow-hidden",
                     isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                   )}
                 >
                   <div className="px-6 pb-6 pt-0 text-neutral-600 leading-relaxed font-medium">
                     <div className="pt-4 border-t border-dashed border-neutral-100">
                        {faq.answer}
                     </div>
                   </div>
                 </div>
               </div>
             );
          })}
        </div>

        <div className="text-center bg-neutral-50 rounded-2xl p-8 border border-neutral-100 max-w-2xl mx-auto">
            <p className="text-lg text-neutral-800 font-medium mb-6">
                Klingt nach deinem Fall? Dann lass uns 15 Minuten draufschauen.
            </p>
            <Link to="/gespraech-buchen">
                <Button variant="gradient" size="lg" className="shadow-glow-pink hover:scale-105 transition-transform">
                    Gratis-Check buchen
                </Button>
            </Link>
        </div>
      </Container>
    </section>
  );
};

export function Home() {
  const problemHeaderRef = useScrollAnimation();
  const problemCardsRef = useScrollAnimation();
  const offersRef = useScrollAnimation();
  const ctaRef = useScrollAnimation({ type: 'zoom-in' });
  
  const dilemmaBgAnim = useScrollAnimation({ rootMargin: '200px' });

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <HeroSection />
      <PillarsGrid />
      <ProofStack />

      {/* Solutions Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-tech-grid -z-20"></div>
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] -z-10 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px] -z-10"></div>

        <Container>
          <div ref={offersRef.ref} style={offersRef.style} className={cn("")}>
             <div className="text-center mb-20 max-w-3xl mx-auto relative">
                <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-sm uppercase tracking-wider">
                    Unsere Lösungen
                </div>
                <h2 className="text-4xl md:text-6xl font-bold font-heading mb-6 text-neutral-900">
                    Fixe Pakete. Klare Ergebnisse. <br/>
                    <span className="gradient-text">Kein Overhead.</span>
                </h2>
                <p className="text-xl text-neutral-600 font-medium max-w-2xl mx-auto">
                    Wähle das Tempo, wir liefern den Proof-Stack — transparent und messbar.
                </p>
             </div>

             <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
                {HOME_OFFERS.map((offer, index) => (
                  <div key={index} className="relative group h-full">
                     <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-accent rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 -z-10"></div>
                     
                     {offer.isBestseller && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-brand-accent to-red-500 text-white text-sm font-bold px-6 py-1.5 rounded-full uppercase tracking-wider z-30 shadow-glow-pink flex items-center gap-2 whitespace-nowrap">
                            <Zap className="w-4 h-4 fill-current" /> Bestseller
                        </div>
                     )}
                     <OfferCard 
                       title={offer.title}
                       price={offer.price}
                       description={offer.description}
                       features={offer.features}
                       moreDetails={offer.moreDetails}
                       ctaText={offer.ctaText}
                       scope={offer.scope}
                     />
                  </div>
                ))}
             </div>
             
             <div className="mt-12 border-t border-neutral-200 pt-8 text-center">
                <div className="flex flex-col md:flex-row items-center justify-center gap-2 mb-2 text-sm font-medium text-neutral-800">
                   <div className="flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-brand-primary" />
                      <span className="font-bold text-brand-primary">Proof-Stack inklusive:</span>
                   </div>
                   <span className="hidden md:inline text-neutral-300">|</span>
                   <span className="text-center">Ads Consent Diagnostics grün · deny→allow→toggle-Sequenz (HAR + Screens)</span>
                   <span className="hidden md:inline text-neutral-300">|</span>
                   <span className="text-center">CMP-Export · GA4 DebugView konsistent · Change-Log & Handover-1-Pager</span>
                </div>
                <div className="flex flex-col gap-1 mt-4">
                  <p className="text-xs text-neutral-400 italic">
                    (Keine Rechtsberatung: technisch/organisatorisch.)
                  </p>
                  <p className="text-[11px] text-neutral-400/80 mt-1">
                    *Finaler Preis abhängig von Stack-Komplexität & Umfang.
                  </p>
                </div>
             </div>

          </div>
        </Container>
      </section>

      <TypicalFixes />
      <TrustRow />
      <IndustryChips />
      <FAQSection />

      {/* The Dilemma (Problem Section) */}
      <section className="py-24 bg-neutral-900 relative text-white">
        <div 
           ref={dilemmaBgAnim.ref}
           className="absolute inset-0 opacity-10 bg-repeat"
           style={{
             backgroundImage: dilemmaBgAnim.isVisible ? "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" : 'none'
           }}
        />
        
        <Container>
          <div ref={problemHeaderRef.ref} style={problemHeaderRef.style} className={cn("text-center max-w-3xl mx-auto mb-16 relative z-10")}>
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6">
                Das <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-brand-accent">Dilemma</span> des Datenschutzes
            </h2>
            <p className="text-xl text-neutral-300 leading-relaxed">
              Viele sehen es als Bremse. Wir sehen es als Treibstoff. <br/>
              Falsche Implementierungen verbrennen Geld.
            </p>
          </div>
          
          <div ref={problemCardsRef.ref} style={problemCardsRef.style} className={cn("grid md:grid-cols-3 md:grid-rows-2 gap-6 max-w-6xl mx-auto")}>
            
            <div className="md:col-span-2 md:row-span-2 bg-neutral-800/50 border border-neutral-700 rounded-3xl p-8 md:p-12 relative overflow-hidden group hover:border-brand-primary/50 transition-colors">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl group-hover:bg-brand-primary/20 transition-colors"></div>
                <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                        <div className="w-16 h-16 bg-neutral-700 rounded-2xl flex items-center justify-center mb-6 text-brand-accent">
                            <Database className="w-8 h-8" />
                        </div>
                        <h3 className="text-3xl font-bold mb-4 font-heading">Datenverlust</h3>
                        <p className="text-neutral-300 text-lg leading-relaxed max-w-md">
                            Ohne Consent Mode und sauberes Server-Side Tagging verlieren Sie bis zu <span className="text-white font-bold">30% Ihrer Conversion-Daten</span> an Ad-Blocker und Browser-Restriktionen (ITP). Das macht Ihre Ads blind und teuer.
                        </p>
                    </div>
                    
                    <div className="mt-8 w-full h-32 bg-neutral-900/50 rounded-xl border border-neutral-700 relative overflow-hidden flex items-center justify-center">
                        <div className="flex gap-1 items-end h-20">
                            <div className="w-4 bg-brand-primary h-[80%] rounded-t-sm animate-pulse"></div>
                            <div className="w-4 bg-brand-primary h-[60%] rounded-t-sm animate-pulse delay-75"></div>
                            <div className="w-4 bg-neutral-700 h-[30%] rounded-t-sm"></div>
                            <div className="w-4 bg-neutral-700 h-[40%] rounded-t-sm"></div>
                            <div className="w-4 bg-brand-primary h-[70%] rounded-t-sm animate-pulse delay-150"></div>
                            <div className="w-4 bg-neutral-700 h-[20%] rounded-t-sm"></div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent"></div>
                        <span className="absolute bottom-2 text-xs text-neutral-500 uppercase tracking-wider">Tracking Signal Quality</span>
                    </div>
                </div>
            </div>

            <div className="bg-neutral-800/50 border border-neutral-700 rounded-3xl p-8 relative overflow-hidden group hover:border-red-500/50 transition-colors">
                <div className="absolute -right-4 -top-4 w-32 h-32 bg-red-500/10 rounded-full blur-2xl"></div>
                <ShieldCheck className="w-10 h-10 text-red-400 mb-4" />
                <h3 className="text-xl font-bold mb-2 font-heading">Rechtsrisiko</h3>
                <p className="text-neutral-400 text-sm font-medium">
                    Abmahnungen wegen fehlerhafter Cookie-Banner sind ein wachsendes Geschäftsmodell.
                </p>
            </div>

            <div className="bg-neutral-800/50 border border-neutral-700 rounded-3xl p-8 relative overflow-hidden group hover:border-brand-accent/50 transition-colors">
                <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-brand-accent/10 rounded-full blur-2xl"></div>
                <Award className="w-10 h-10 text-brand-accent mb-4" />
                <h3 className="text-xl font-bold mb-2 font-heading">Vertrauensverlust</h3>
                <p className="text-neutral-400 text-sm font-medium">
                    Intransparenz schreckt Kunden ab. Datenschutz ist heute ein Qualitätsmerkmal für Premium-Marken.
                </p>
            </div>

          </div>
        </Container>
      </section>

      <section className="py-20 relative">
         <div className="absolute inset-0 bg-brand-primary/5"></div>
         <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent"></div>
         <Container>
             <div ref={ctaRef.ref} style={ctaRef.style} className="bg-white rounded-3xl p-12 shadow-2xl border border-brand-primary/10 relative overflow-hidden text-center">
                 <div className="absolute top-0 left-0 w-full h-2 bg-brand-gradient"></div>
                 <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6 text-neutral-900">Bereit für das nächste Level?</h2>
                 <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto font-medium">
                     Verlassen Sie sich nicht auf Glück. Verlassen Sie sich auf Daten. Starten Sie jetzt mit einer kostenlosen Analyse.
                 </p>
                 <Link to="/gespraech-buchen">
                    <Button variant="gradient" size="lg" className="text-lg px-10 py-6 shadow-glow hover:scale-105 transition-transform">
                        Gratis-Gespräch buchen <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                 </Link>
             </div>
         </Container>
      </section>

    </div>
  );
}
