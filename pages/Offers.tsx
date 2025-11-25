import React from 'react';
import { Container } from '../components/layout/Container';
import { OfferCard } from '../components/sections/OfferCard';
import { ChevronDown, Clock, Rocket, HelpCircle } from 'lucide-react';
import { HOME_OFFERS, FAQS } from '../lib/data';
import { useScrollAnimation } from '../lib/hooks';

// Styled FAQ Component
const FAQItem: React.FC<{ question: string, answer: string }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <div className={`border border-neutral-200 rounded-xl bg-white transition-all duration-300 ${isOpen ? 'shadow-md border-brand-primary/30' : 'hover:border-brand-primary/20'}`}>
            <button onClick={() => setIsOpen(!isOpen)} className="flex justify-between items-center w-full text-left p-6 font-semibold text-lg text-neutral-900">
                <span className="flex items-center gap-3">
                    <HelpCircle className={`w-5 h-5 ${isOpen ? 'text-brand-primary' : 'text-neutral-400'}`} />
                    {question}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-brand-primary text-white' : 'bg-neutral-100 text-neutral-500'}`}>
                     <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 pb-6 pt-0 text-neutral-600 border-t border-dashed border-neutral-100 mt-2">
                    <div className="pt-4">{answer}</div>
                </div>
            </div>
        </div>
    )
}

export function Offers() {
  const headerAnim = useScrollAnimation({ type: 'fade-up' });
  const gridAnim = useScrollAnimation({ type: 'fade-up', delay: 100 });
  const faqAnim = useScrollAnimation({ type: 'fade-up', delay: 100 });

  return (
    <div className="bg-neutral-50/50 min-h-screen">
      
      {/* GLOBAL HEADER - Tech Gradient Style */}
      <header style={{
          background: 'linear-gradient(135deg, #F7F7F9 0%, #FFFFFF 100%)',
          borderBottom: '1px solid rgba(106, 13, 173, 0.1)',
          padding: '6rem 2rem 3rem 2rem',
          position: 'relative',
          overflow: 'hidden'
      }}>
          <div style={{
              position: 'absolute', top: '-50%', right: '-10%', 
              width: '500px', height: '500px', 
              background: 'radial-gradient(circle, rgba(106,13,173,0.08) 0%, transparent 70%)',
              pointerEvents: 'none'
          }}></div>

          <div ref={headerAnim.ref} style={{...headerAnim.style, maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2}}>
               <span style={{
                  textTransform: 'uppercase', letterSpacing: '1.5px', fontSize: '0.85rem', 
                  fontWeight: 700, color: '#6A0DAD', display: 'block', marginBottom: '1rem'
              }}>
                  Produktisierte Dienstleistungen
              </span>
              <h1 style={{
                  fontSize: '2.5rem', color: '#333', lineHeight: '1.2', maxWidth: '800px', fontFamily: 'Sora, sans-serif', fontWeight: 700
              }}>
                  Klarheit statt <span style={{borderBottom: '3px solid #FF4FA2'}}>Abmahnung</span>.
              </h1>
               <p className="text-xl text-neutral-600 mt-6 max-w-2xl font-light">
                  Wählen Sie das Paket, das zu Ihrer aktuellen Phase passt. Fixpreise, klare Ergebnisse.
              </p>
          </div>
      </header>

      <Container className="py-24 relative z-20">
        <div 
            ref={gridAnim.ref} 
            style={gridAnim.style}
            className="grid lg:grid-cols-2 gap-8 mb-24"
        >
            {HOME_OFFERS.map((offer, index) => (
                <div key={index} className="relative group">
                    {/* Background Graphic specific to offer */}
                    <div className="absolute -right-8 -top-8 w-48 h-48 opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none rotate-12">
                         {index === 0 ? <Clock className="w-full h-full text-brand-primary" /> : <Rocket className="w-full h-full text-brand-accent" />}
                    </div>

                    {offer.isBestseller && (
                        <div className="absolute -top-4 -right-4 bg-brand-accent text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider z-30 shadow-glow-pink animate-pulse-slow">
                            Bestseller
                        </div>
                    )}
                    <OfferCard 
                        title={offer.title}
                        price={offer.price}
                        description={offer.description}
                        features={offer.features}
                        ctaText={offer.ctaText}
                        scope={offer.scope}
                        moreDetails={offer.moreDetails}
                    />
                </div>
            ))}
        </div>

        <div 
            ref={faqAnim.ref}
            style={faqAnim.style}
            className="max-w-3xl mx-auto"
        >
            <div className="text-center mb-12">
                <h3 className="text-3xl font-bold font-heading mb-4">Häufige Fragen</h3>
                <p className="text-neutral-500">Alles, was Sie vor der Buchung wissen müssen.</p>
            </div>
            <div className="space-y-4">
                {FAQS.map((faq, index) => (
                    <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
            </div>
        </div>
      </Container>
    </div>
  );
}