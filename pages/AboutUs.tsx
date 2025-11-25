
import React from 'react';
import { Container } from '../components/layout/Container';
import { TrustBadge } from '../components/shared/TrustBadge';
import { ShieldCheck, ServerCog, BarChart, GanttChartSquare, Quote } from 'lucide-react';
import { useScrollAnimation } from '../lib/hooks';
import { cn } from '../lib/utils';
import { Card } from '../components/ui/card';

export function AboutUs() {
  const heroAnim = useScrollAnimation();
  const storyAnim = useScrollAnimation();
  const expertiseAnim = useScrollAnimation({ type: 'fade-up' });
  
  return (
    <div className="py-12 md:py-24 overflow-hidden">
      <Container>
        {/* Hero Profile Section with Creative Frame */}
        <div ref={heroAnim.ref} style={heroAnim.style} className={cn("grid md:grid-cols-2 gap-12 items-center mb-24")}>
            <div className="relative flex justify-center md:justify-start">
                {/* Abstract Blob Frame */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-brand-gradient rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-20 animate-float -z-10"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[105%] h-[105%] bg-brand-accent/10 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] -z-10"></div>
                
                <div className="aspect-[3/4] w-full max-w-sm rounded-2xl overflow-hidden border-4 border-white shadow-2xl relative group rotate-2 hover:rotate-0 transition-transform duration-500">
                     {/* Updated Image: Professional Portrait (High Res) */}
                     <img 
                       src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop" 
                       alt="Tristan, Founder" 
                       width="600"
                       height="800"
                       className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500" 
                     />
                     <div className="absolute bottom-0 left-0 w-full bg-neutral-900/90 p-6 backdrop-blur-sm translate-y-2 group-hover:translate-y-0 transition-transform">
                        <p className="text-white font-bold text-xl font-heading">Tristan</p>
                        <p className="text-brand-primary text-sm uppercase tracking-wider font-bold">Gründer ConsentWerft</p>
                     </div>
                </div>
            </div>
            
            <div className="space-y-8">
                <div className="inline-block bg-neutral-100 px-4 py-2 rounded-lg text-sm font-bold text-neutral-600 mb-2">
                    👋 Hi, ich bin Tristan.
                </div>
                <h1 className="text-4xl md:text-6xl font-bold font-heading text-neutral-900 leading-tight">
                    Ihr Navigator im <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">Datenschutz-Dschungel.</span>
                </h1>
                {/* Fixed Contrast: text-neutral-700 instead of 600 */}
                <p className="text-xl text-neutral-700 leading-relaxed font-light">
                    Seit über 10 Jahren arbeite ich an der Schnittstelle von <strong className="text-brand-primary">Technik</strong>, <strong className="text-brand-primary">Marketing</strong> und <strong className="text-brand-primary">Recht</strong>. Mein Ziel ist es, Unternehmen die Angst vor der DSGVO zu nehmen.
                </p>
                <div className="pl-6 border-l-4 border-brand-accent">
                    <p className="text-lg text-neutral-800 italic font-medium">
                        "Datenschutz ist für mich keine Bürokratie, sondern ein Qualitätsversprechen an Ihre Kunden."
                    </p>
                </div>
            </div>
        </div>

        {/* Story Section - Visual Breakdown */}
        <div ref={storyAnim.ref} style={storyAnim.style} className={cn("max-w-4xl mx-auto mb-24 relative")}>
            <div className="absolute -top-12 -left-12 text-neutral-100">
                <Quote className="w-32 h-32" />
            </div>
            
            <div className="bg-neutral-50 rounded-3xl p-8 md:p-12 relative z-10 border border-neutral-100 shadow-lg">
                <h2 className="text-3xl font-bold font-heading mb-8 text-center text-neutral-900">Vom Zwang zur Chance: <br/>Die Geburt von ConsentWerft</h2>
                
                <div className="space-y-8">
                    <div className="flex gap-6">
                        <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-500 font-bold">01</div>
                        <div>
                            <h3 className="text-xl font-bold mb-2 text-neutral-900">Die Frustration</h3>
                            <p className="text-neutral-700 leading-relaxed">
                                In meiner Zeit als Marketing-Leiter sah ich immer wieder, wie wertvolle Daten verloren gingen, weil Cookie-Banner falsch konfiguriert waren oder aus Angst vor Abmahnungen Tracking komplett deaktiviert wurde.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 font-bold">02</div>
                        <div>
                            <h3 className="text-xl font-bold mb-2 text-neutral-900">Das fehlende Puzzleteil</h3>
                            <p className="text-neutral-700 leading-relaxed">
                                Gleichzeitig sah ich Agenturen, die Standard-Lösungen verkauften, die weder technisch sauber noch rechtlich haltbar waren. Es fehlte ein Partner, der beide Sprachen spricht: Die der Entwickler und die der Juristen.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <div className="flex-shrink-0 w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary font-bold">03</div>
                        <div>
                            <h3 className="text-xl font-bold mb-2 text-neutral-900">Die Lösung</h3>
                            <p className="text-neutral-700 leading-relaxed">
                                So entstand ConsentWerft. Wir bauen keine Mauern, wir bauen Brücken. Zwischen Compliance und Performance.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Expertise Section - 3D Cards */}
        <div ref={expertiseAnim.ref} style={expertiseAnim.style} className="text-center relative">
             <div className="absolute inset-0 bg-grid-pattern opacity-50 -z-10 h-full w-full"></div>
             <h2 className="text-3xl md:text-4xl font-bold font-heading mb-12 text-neutral-900">Geprüfte Expertise</h2>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                    { icon: ShieldCheck, text: "Usercentrics Certified" },
                    { icon: ServerCog, text: "Server-Side Tagging" },
                    { icon: BarChart, text: "Consent Mode v2" },
                    { icon: GanttChartSquare, text: "GTM-Gating" }
                ].map((badge, idx) => (
                    <Card key={idx} className="p-6 flex flex-col items-center justify-center gap-4 hover:-translate-y-2 transition-transform duration-300 bg-white border-neutral-200 shadow-md group">
                        <div className="w-16 h-16 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-600 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300 shadow-inner">
                            <badge.icon className="w-8 h-8" />
                        </div>
                        <span className="font-bold text-neutral-800 group-hover:text-brand-primary transition-colors">{badge.text}</span>
                    </Card>
                ))}
             </div>
        </div>
      </Container>
    </div>
  );
}
