
import React from 'react';
import { Globe, Shield, Lock, FileCheck, Scale, Cpu, Landmark, FileText, Eye, Info } from 'lucide-react';
import { cn } from '../../lib/utils';

const timelineData = [
  { 
    year: '2018', 
    title: 'DSGVO / GDPR', 
    region: 'EU', 
    icon: Shield, 
    description: 'Datenschutz-Grundverordnung. Der globale Goldstandard, der die Rechte der Nutzer in den Mittelpunkt stellt.' 
  },
  { 
    year: '2018', 
    title: 'CCPA', 
    region: 'USA (Kalifornien)', 
    icon: Landmark, 
    description: 'California Consumer Privacy Act. Das erste umfassende Datenschutzgesetz in den USA.' 
  },
  { 
    year: '2019', 
    title: 'LGPD', 
    region: 'Brasilien', 
    icon: Globe, 
    description: 'Lei Geral de Proteção de Dados. Stark an der europäischen DSGVO orientiert.' 
  },
  { 
    year: '2020', 
    title: 'CCPA (Inkrafttretung)', 
    region: 'USA (Kalifornien)', 
    icon: FileCheck, 
    description: 'Beginn der behördlichen Durchsetzung und erste Bußgelder.' 
  },
  { 
    year: '2021', 
    title: 'PIPL', 
    region: 'China', 
    icon: Scale, 
    description: 'Personal Information Protection Law. Strenge Regeln für Datentransfers aus China heraus.' 
  },
  { 
    year: '2023', 
    title: 'CPRA', 
    region: 'USA (Kalifornien)', 
    icon: Lock, 
    description: 'Erweiterung des CCPA. Führt neue Rechte ein und schafft eine eigene Schutzbehörde.' 
  },
  { 
    year: '2023', 
    title: 'VCDPA & CPA', 
    region: 'USA (VA & CO)', 
    icon: FileText, 
    description: 'Virginia und Colorado folgen mit eigenen Datenschutzgesetzen.' 
  },
  { 
    year: '2024', 
    title: 'Digital Markets Act', 
    region: 'EU', 
    icon: Eye, 
    description: 'Regulierung von Gatekeepern, die massive Auswirkungen auf das Tracking hat (Consent Mode v2).' 
  },
  { 
    year: '2024+', 
    title: 'EU AI Act', 
    region: 'EU', 
    icon: Cpu, 
    description: 'Das weltweit erste umfassende Gesetz zur Regulierung künstlicher Intelligenz.' 
  },
];

export function HorizontalTimeline() {
  return (
    <div className="w-full bg-neutral-50 relative overflow-hidden rounded-[2.5rem] border border-neutral-200/60 shadow-sm py-24">
       {/* Soft Halos - Brand aligned */}
       <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_top_left,rgba(106,13,173,0.08),transparent_60%)] pointer-events-none"></div>
       <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_bottom_right,rgba(255,79,162,0.06),transparent_60%)] pointer-events-none"></div>

       <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          height: 8px;
        }
        .hide-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .hide-scrollbar::-webkit-scrollbar-thumb {
          background: #E5E5E5; 
          border-radius: 4px;
        }
        .hide-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #D4D4D4;
        }
      `}</style>
      
      <div className="mb-12 px-8 text-center md:text-left relative z-10">
        <h3 className="text-2xl md:text-3xl font-bold font-heading text-neutral-900">Globale Datenschutz-Historie</h3>
        <p className="text-neutral-500 mt-2 text-lg">Eine Reise durch die Evolution der digitalen Rechte.</p>
      </div>

      <div className="relative w-full group z-10">
        
        {/* Horizontal Scroll Container */}
        <div className="overflow-x-auto pb-12 pt-12 hide-scrollbar snap-x snap-mandatory flex w-full scroll-smooth scroll-pl-4 md:scroll-pl-8">
          <div className="flex px-4 md:px-8 min-w-max">
            {timelineData.map((item, index) => (
              <div key={index} className="relative flex flex-col items-center snap-center w-[280px] md:w-[320px] shrink-0 group/item cursor-default">
                
                {/* Connecting Line - Violet 30-40% opacity */}
                <div className={cn(
                  "absolute top-[28px] h-0.5 bg-brand-primary/30 -z-10 overflow-hidden",
                  index === 0 ? "left-1/2 w-1/2" : 
                  index === timelineData.length - 1 ? "left-0 w-1/2" : 
                  "left-0 w-full"
                )}></div>

                {/* Icon Node - Alternating colors (subtle) */}
                <div className="relative z-10 mb-8">
                  {/* Interactive Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 p-4 bg-white shadow-xl border border-neutral-100 rounded-xl opacity-0 group-hover/item:opacity-100 transition-all duration-300 ease-out transform translate-y-4 group-hover/item:translate-y-0 pointer-events-none z-30 text-center">
                      <p className="leading-relaxed text-neutral-600 text-sm font-medium">{item.description}</p>
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r border-b border-neutral-100 rotate-45"></div>
                  </div>

                  <div className={cn(
                    "w-14 h-14 rounded-full border-2 flex items-center justify-center shadow-sm transition-all duration-300 relative z-10 bg-white",
                    // Default State: Subtle alternating colors (no fill)
                    index % 2 === 0 
                        ? "border-brand-primary/20 text-brand-primary" 
                        : "border-brand-accent/20 text-brand-accent",
                    // Hover State: Scale & Rotate
                    "group-hover/item:scale-110 group-hover/item:shadow-lg group-hover/item:-rotate-6",
                    // Hover State: Intensified colors
                    index % 2 === 0 
                        ? "group-hover/item:border-brand-primary group-hover/item:bg-brand-primary/5" 
                        : "group-hover/item:border-brand-accent group-hover/item:bg-brand-accent/5"
                  )}>
                    <item.icon className="w-6 h-6 transition-transform duration-300" />
                  </div>
                </div>

                {/* Content Card - White background, soft shadow */}
                <div className="px-3 w-full h-full">
                  <div className={cn(
                      "bg-white p-6 rounded-2xl border border-neutral-200 shadow-subtle h-full flex flex-col relative overflow-hidden transition-all duration-300",
                      "group-hover/item:shadow-xl group-hover/item:-translate-y-2",
                      // Hover border color matches node
                      index % 2 === 0 ? "group-hover/item:border-brand-primary/30" : "group-hover/item:border-brand-accent/30"
                  )}>
                     {/* Active Left Line Indicator */}
                     <div className={cn(
                         "absolute left-0 top-0 bottom-0 w-1 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300",
                         index % 2 === 0 ? "bg-brand-primary" : "bg-brand-accent"
                     )}></div>

                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-center mb-3">
                            <span className={cn(
                                "text-2xl font-bold font-heading transition-colors duration-300",
                                "text-neutral-300 group-hover/item:text-neutral-900"
                            )}>{item.year}</span>
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-neutral-50 border border-neutral-100 text-neutral-500 px-2 py-1 rounded-full group-hover/item:bg-neutral-900 group-hover/item:text-white transition-colors border-none">
                                {item.region}
                            </span>
                        </div>
                        
                        <h4 className="text-lg font-bold text-neutral-900 mb-2 leading-tight">{item.title}</h4>
                        <p className="text-sm text-neutral-600 leading-relaxed line-clamp-3 group-hover/item:text-neutral-900 transition-colors">{item.description}</p>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
        
        {/* Mobile Swipe Hint */}
        <div className="md:hidden text-center text-xs font-medium text-neutral-400 animate-pulse mt-4">
           ← Wischen zum Entdecken →
        </div>
      </div>
    </div>
  );
}
