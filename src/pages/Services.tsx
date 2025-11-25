
import React, { useRef, useState, useEffect } from 'react';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/card';
import { CheckCircle, ArrowRight, ChevronRight, Layers, Zap, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { SERVICE_PILLARS, PRICING_PACKAGES } from '../lib/data';
import { useScrollAnimation } from '../lib/hooks';

// New component for staggered animation of Service Pillars
interface ServicePillarCardProps {
  service: typeof SERVICE_PILLARS[0];
  index: number;
}

const ServicePillarCard: React.FC<ServicePillarCardProps> = ({ service, index }) => {
  const { ref, style } = useScrollAnimation({ 
    type: 'fade-up', 
    delay: index * 200, 
    duration: 800,      
    threshold: 0.1
  });

  return (
    <div ref={ref} style={style} className="h-full">
        <Card className="h-full flex flex-col border-neutral-200 hover:border-brand-primary transition-all duration-500 group bg-white/80 backdrop-blur relative overflow-hidden hover:-translate-y-2 hover:shadow-2xl">
        {/* Step Badge */}
        <div className="absolute top-4 right-4 bg-neutral-900/90 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg z-20 border border-white/20 backdrop-blur">
            STEP 0{index + 1}
        </div>

        {/* Image Header with new Neo-Tech visuals */}
        <div className="h-48 w-full relative overflow-hidden bg-neutral-900">
             <img 
               src={service.image} 
               alt={service.title} 
               className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
               loading="lazy"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent"></div>
             
             {/* Icon Overlay */}
             <div className="absolute -bottom-6 left-6 w-16 h-16 rounded-2xl bg-brand-primary text-white flex items-center justify-center shadow-glow border-2 border-white transform group-hover:rotate-6 transition-transform duration-500 z-20">
                 <service.icon className="w-8 h-8" />
             </div>
        </div>

        <CardHeader className="pt-10 pb-2 px-6">
            <CardTitle className="text-xl md:text-2xl mb-2 group-hover:text-brand-primary transition-colors leading-tight">{service.title}</CardTitle>
            <CardDescription className="text-sm font-medium text-neutral-500">{service.description}</CardDescription>
        </CardHeader>
        
        <CardContent className="flex-grow px-6 pb-6">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent mb-4"></div>
            <ul className="space-y-3 text-left">
            {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                <div className="mt-1 bg-brand-primary/10 rounded-full p-0.5 shrink-0">
                        <CheckCircle className="h-3.5 w-3.5 text-brand-primary" />
                </div>
                <span className="text-neutral-700 text-sm leading-snug">{feature}</span>
                </li>
            ))}
            </ul>
        </CardContent>
        </Card>
    </div>
  );
};

export function Services() {
  const pricingRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (pricingRef.current) {
        const element = pricingRef.current;
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementHeight = element.offsetHeight;

        // Calculate progress based on visibility in viewport
        const totalDistance = elementHeight + windowHeight;
        const distanceTravelled = windowHeight - rect.top;

        let progress = (distanceTravelled / totalDistance) * 100;
        progress = Math.min(100, Math.max(0, progress));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="overflow-x-hidden bg-white">
      
      {/* 1. FLASHY HEADER SECTION - Neo-Tech Neural Network */}
      <div className="relative py-24 md:py-32 bg-neutral-900 text-white overflow-hidden">
         {/* Background Image - High Quality Neural Network/AI - Violet/Dark Vibe */}
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2500&auto=format&fit=crop')] bg-cover bg-center opacity-30 animate-pulse-slow"></div>
         {/* Gradient Overlay */}
         <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/80 via-neutral-900/60 to-white/5"></div>
         
         {/* Abstract Shapes */}
         <div className="absolute top-10 right-10 w-96 h-96 bg-brand-primary/20 rounded-full blur-[100px] animate-float"></div>
         <div className="absolute bottom-10 left-10 w-96 h-96 bg-brand-accent/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }}></div>

         <Container className="relative z-10">
            <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 mb-6 shadow-glow">
                    <Layers className="w-4 h-4 text-brand-accent" />
                    <span className="text-sm font-bold tracking-wider uppercase">End-to-End Datenschutz</span>
                </div>
                <h1 className="text-4xl md:text-7xl font-bold font-heading mb-6 tracking-tight leading-tight">
                    Strategie, Technik & Recht <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">in perfekter Synchronisation.</span>
                </h1>
                <p className="text-xl md:text-2xl text-neutral-200 font-light max-w-2xl mx-auto drop-shadow-md">
                    Wir schließen die Lücke zwischen juristischer Anforderung und technischer Realität.
                </p>
            </div>
         </Container>
      </div>

      <Container className="py-24 relative">
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5 pointer-events-none -z-10"></div>

        {/* 2. SERVICE PILLARS with Images & Visual Flow */}
        <div className="relative mb-40">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Unser 3-Säulen-Modell</h2>
                <p className="text-neutral-500 max-w-xl mx-auto">Ein ganzheitlicher Ansatz, der sicherstellt, dass nichts durchs Raster fällt.</p>
            </div>

            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-[50%] left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent -z-10 transform -translate-y-1/2 border-t-2 border-dashed border-brand-primary/20"></div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICE_PILLARS.map((service, index) => (
                <ServicePillarCard key={index} service={service} index={index} />
            ))}
            </div>
        </div>

        {/* 3. PRICING PACKAGES with Background Pattern & Scroll Progress */}
        <div ref={pricingRef} className="mb-12 relative py-16 px-4 rounded-[3rem] overflow-hidden bg-neutral-50 border border-neutral-100 shadow-sm">
          {/* Background Graphic */}
          <div className="absolute inset-0 bg-dot-pattern opacity-30 -z-10"></div>
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl"></div>
          
          {/* Scroll Progress Bar */}
          <div className="sticky top-24 z-30 w-full max-w-md mx-auto mb-12 h-2 bg-neutral-200 rounded-full overflow-hidden shadow-inner border border-neutral-200/50 backdrop-blur">
            <div 
              className="h-full bg-brand-gradient transition-all duration-150 ease-out rounded-full relative shadow-[0_0_10px_rgba(106,13,173,0.5)]"
              style={{ width: `${scrollProgress}%` }}
            >
                <div className="absolute right-0 top-0 h-full w-4 bg-white/50 blur-[2px]"></div>
            </div>
          </div>

          <div className="text-center mb-16 relative z-10">
             <span className="text-brand-primary font-bold tracking-widest uppercase text-xs mb-2 block">Investition</span>
             <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">Pakete & Preise</h2>
             <p className="text-neutral-600 text-lg">Transparent. Fair. Keine versteckten Kosten.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start relative z-10">
            {PRICING_PACKAGES.map((pkg, index) => (
              <div key={index} className={cn("relative h-full transition-all duration-300", pkg.isPopular ? "lg:-mt-8 lg:mb-8 z-10" : "hover:scale-105")}>
                {pkg.isPopular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-primary to-brand-accent text-white text-sm font-bold px-6 py-2 rounded-full uppercase tracking-wider z-20 shadow-glow-pink ring-4 ring-white flex items-center gap-2">
                    <Zap className="w-3 h-3 fill-current" /> Meistgewählt
                  </div>
                )}
                
                <Card className={cn(
                  "h-full flex flex-col relative overflow-hidden transition-all duration-300",
                  pkg.isPopular 
                    ? "border-brand-primary shadow-2xl bg-white" 
                    : "border-neutral-200 bg-white/60 backdrop-blur-md hover:border-brand-primary/50 hover:bg-white hover:shadow-xl"
                )}>
                  {/* Card Background decoration */}
                  <div className={cn(
                      "absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-current to-transparent opacity-5 rounded-bl-[100px] -mr-10 -mt-10 pointer-events-none",
                      pkg.isPopular ? "text-brand-primary" : "text-neutral-500"
                  )}></div>

                  <CardHeader className="pb-0">
                    <CardTitle className="text-xl md:text-2xl h-14 flex items-center leading-tight">{pkg.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow relative z-10 pt-6">
                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="text-sm font-medium text-neutral-400">ab</span>
                      <span className="text-4xl font-bold text-neutral-900">{pkg.price}</span>
                    </div>
                    
                    <div className="w-full h-px bg-neutral-100 mb-6"></div>

                    <ul className="space-y-4">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 group/li">
                          <CheckCircle className={cn(
                            "h-5 w-5 shrink-0 mt-0.5 transition-colors",
                            pkg.isPopular ? "text-brand-accent" : "text-neutral-300 group-hover/li:text-brand-primary"
                          )} />
                          <span className="text-neutral-700 text-sm leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="pt-8">
                    <Link to="/gespraech-buchen" className="w-full relative after:absolute after:inset-0">
                      <Button 
                        variant={pkg.isPopular ? "gradient" : "outline"} 
                        className={cn("w-full text-base py-6 shadow-sm transition-transform hover:scale-[1.02]", !pkg.isPopular && "hover:border-brand-primary hover:text-brand-primary")}
                      >
                        Anfragen
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-neutral-400 mt-12 italic">
            * Preisindikationen. Aufwand variiert je nach CMS und bestehender Infrastruktur.
          </p>
        </div>

        {/* 4. PUNCHY CTA SECTION - Neon Abstract Background */}
        <div className="mt-24 rounded-[2rem] p-1 bg-brand-gradient shadow-2xl relative overflow-hidden group">
            <div className="bg-neutral-900 rounded-[1.9rem] p-10 md:p-20 text-center text-white relative overflow-hidden">
                {/* Animated Background Elements - Neo Tech Gradient */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2500&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-screen animate-pulse-slow"></div>
                <div className="absolute inset-0 bg-neutral-900/60"></div>
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-primary/30 rounded-full blur-[100px]"></div>
                <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-brand-accent/30 rounded-full blur-[100px]"></div>

                <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur mb-8 border border-white/20 shadow-glow">
                        <Shield className="w-8 h-8 text-brand-accent" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6">Unsicher, welches Paket passt?</h2>
                    <p className="text-xl text-neutral-200 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
                        Kein Verkaufsgespräch. Nur Klartext. <br/>
                        Lassen Sie uns in 15 Minuten herausfinden, wo Sie stehen.
                    </p>
                    <Link to="/gespraech-buchen">
                        <Button variant="gradient" size="lg" className="min-w-[250px] h-16 text-xl shadow-glow hover:scale-105 transition-transform border-2 border-white/10">
                            Gratis-Gespräch buchen <ArrowRight className="ml-2 w-6 h-6" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>

      </Container>
    </div>
  );
}
