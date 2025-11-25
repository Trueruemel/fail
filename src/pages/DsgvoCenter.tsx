
import React, { useMemo, useState } from 'react';
import { Container } from '../components/layout/Container';
import { HorizontalTimeline } from '../components/sections/HorizontalTimeline';
import { ComplianceChecklist } from '../components/sections/ComplianceChecklist';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { AlertTriangle, TrendingDown, FileWarning, AlertOctagon, Lightbulb, Info } from 'lucide-react';
import { cn } from '../lib/utils';

// Updated Data with specific colors requested: Violet (#6A0DAD), Pink (#FF4FA2), Neutral (#D9D9DE)
const BREACH_COSTS = [
  { label: 'Notfallreaktion', value: 28, color: '#6A0DAD' },
  { label: 'Geschäftsunterbrechung', value: 27, color: '#FF4FA2' },
  { label: 'Benachrichtigung', value: 18, color: '#D9D9DE' },
  { label: 'Wiederherstellung', value: 16, color: '#D9D9DE' },
  { label: 'Rechtliche Kosten', value: 11, color: '#D9D9DE' },
];

const KEY_METRICS = [
  { 
    label: 'Durchschnittliche Gesamtkosten', 
    value: '4,44 Mio. €', 
    color: 'text-brand-primary',
    source: 'Globaler Durchschnittswert laut IBM Cost of a Data Breach Report (2023).'
  },
  { 
    label: 'Kosten pro Datensatz', 
    value: '191 €', 
    color: 'text-neutral-900',
    source: 'Durchschnittskosten pro kompromittiertem Datensatz inkl. Forensik & Benachrichtigung.'
  },
  { 
    label: 'Churn-Risiko', 
    value: 'bis zu 5 %', 
    color: 'text-brand-accent',
    source: 'Prognostizierte Kundenabwanderung nach Bekanntwerden einer Datenschutzverletzung.'
  },
];

// Data from Screenshot 2: DACH Case Studies
const DACH_CASES = [
  {
    company: 'Deutsche Telekom',
    country: 'Deutschland',
    fine: '€55 Million',
    violation: 'Unzureichende Sicherheitsmaßnahmen',
    impact: '-€500M Umsatzverlust',
    icon: FileWarning,
    impactColor: 'text-brand-primary'
  },
  {
    company: 'OMV Petrom',
    country: 'Österreich',
    fine: '€18 Million',
    violation: 'Datenschutzverletzung',
    impact: '-€120M Geschäftsunterbrechung',
    icon: AlertTriangle,
    impactColor: 'text-brand-primary'
  },
  {
    company: 'Migros',
    country: 'Schweiz',
    fine: '€12.7 Million',
    violation: 'Mangelhafter Datenschutz',
    impact: '-€80M Kundenvertrauen',
    icon: TrendingDown,
    impactColor: 'text-brand-primary'
  }
];

export function DsgvoCenter() {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);

  const chartSegments = useMemo(() => {
    let cumulativePercent = 0;
    return BREACH_COSTS.map(item => {
      const startOffset = cumulativePercent;
      cumulativePercent += item.value;
      return { ...item, startOffset };
    });
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* 1) PAGE HERO - Digital Shield Vibe */}
      <div className="pt-32 pb-20 relative overflow-hidden bg-neutral-900">
         {/* Background Image - Digital Security / Shield - Updated to Neo-Tech AI style */}
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2500&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
         <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/95 via-neutral-900/80 to-white"></div>
         
         {/* Abstract glow - Adjusted position for better blend */}
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
         <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-accent/10 rounded-full blur-[100px] pointer-events-none"></div>

         <Container className="relative z-10">
             <div className="max-w-4xl mx-auto text-center">
                 <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 text-neutral-900 drop-shadow-sm mix-blend-screen bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-200 to-neutral-400">
                     Das Datenschutz-Radar
                 </h1>
                 {/* Fallback text color for browsers where mix-blend doesn't work well over bg */}
                 <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 text-neutral-900 absolute top-0 left-0 w-full h-full opacity-0 pointer-events-none">Das Datenschutz-Radar</h1>

                 <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto font-medium bg-white/50 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-white/50">
                     Verstehen Sie die Vergangenheit, um die Zukunft Ihres Trackings zu sichern.
                 </p>
                 <Link to="/gespraech-buchen">
                    <Button variant="gradient" size="lg" className="shadow-glow-pink hover:scale-105 transition-transform text-lg px-8 py-6">
                         Gratis-Check buchen (15 min)
                    </Button>
                 </Link>
             </div>
         </Container>
      </div>

      {/* 2) TIMELINE SECTION */}
      <Container className="mb-32">
         <HorizontalTimeline />
      </Container>

      {/* 3) RISK & REALITY SECTION */}
      <Container className="mb-24">
        <div className="bg-neutral-50 rounded-[2.5rem] p-8 md:p-16 border border-neutral-200 shadow-sm relative overflow-hidden">
            {/* Soft Background Blobs */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-brand-accent/5 rounded-full blur-[100px] -z-10 pointer-events-none -translate-x-1/3 translate-y-1/3"></div>

            <div className="text-center mb-20">
                <span className="inline-block bg-white border border-neutral-200 text-neutral-900 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
                    Die Realität
                </span>
                <h2 className="text-3xl md:text-4xl font-bold font-heading text-neutral-900 mb-4">
                    Risiken & Wirtschaftliche Folgen
                </h2>
                <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                  Die Daten zeigen: Compliance ist kein Kostenfaktor, sondern eine Versicherung gegen massive Geschäftsunterbrechungen.
                </p>
            </div>

            {/* Chart & Stats Grid */}
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-24 border-b border-neutral-200 pb-16">
                {/* Text & Metrics */}
                <div className="order-2 lg:order-1">
                  <h3 className="text-2xl font-bold font-heading text-neutral-900 mb-4">Kostenaufschlüsselung einer Datenpanne</h3>
                  <p className="text-neutral-600 mb-10 leading-relaxed">
                     Bußgelder sind oft nur der Anfang. Die größten Verluste entstehen operativ durch Ausfälle, Forensik und Vertrauensverlust bei Kunden.
                  </p>
                  <div className="space-y-4">
                      {KEY_METRICS.map((metric, idx) => (
                        <div key={idx} className="relative flex items-center justify-between p-5 rounded-xl bg-white border border-neutral-100 shadow-subtle hover:border-brand-primary/30 transition-colors group">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-neutral-600">{metric.label}</span>
                                {/* Tooltip Icon */}
                                <div className="group/tooltip relative">
                                    <Info className="w-3.5 h-3.5 text-neutral-400 cursor-help hover:text-brand-primary transition-colors" />
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 p-3 bg-neutral-900 text-white text-xs rounded-lg shadow-xl opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none z-50 text-center leading-relaxed">
                                        {metric.source}
                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-900 rotate-45"></div>
                                    </div>
                                </div>
                            </div>
                            <span className={`text-xl font-bold ${metric.color}`}>{metric.value}</span>
                        </div>
                      ))}
                  </div>
                  <p className="text-xs text-neutral-400 mt-4 italic">
                      * Werte aus Studien, Umrechnung/Übertragbarkeit je Stack variabel.
                  </p>
                </div>

                {/* Donut Chart Visual */}
                <div className="flex flex-row items-center justify-center gap-8 order-1 lg:order-2">
                    {/* The Donut */}
                    <div className="relative w-64 h-64 shrink-0">
                        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 drop-shadow-xl">
                            {chartSegments.map((item, index) => (
                                <circle
                                    key={index}
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    fill="transparent"
                                    stroke={item.color}
                                    strokeWidth={hoveredSegment === item.label ? 14 : 12}
                                    strokeDasharray={`${item.value} 100`}
                                    strokeDashoffset={-1 * item.startOffset}
                                    strokeLinecap="round"
                                    className={cn(
                                        "transition-all duration-500 ease-out cursor-pointer hover:brightness-110",
                                        hoveredSegment && hoveredSegment !== item.label ? "opacity-30" : "opacity-100"
                                    )}
                                    onMouseEnter={() => setHoveredSegment(item.label)}
                                    onMouseLeave={() => setHoveredSegment(null)}
                                />
                            ))}
                        </svg>
                        {/* Center Content */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                             <div className="text-center">
                                 <div className="w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-1 text-brand-primary">
                                     <AlertOctagon className="w-5 h-5" />
                                 </div>
                                 <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Total</span>
                                 <p className="text-xl font-bold text-neutral-900">100%</p>
                             </div>
                        </div>
                    </div>

                    {/* The Legend - Right Side List */}
                    <div className="flex flex-col justify-center gap-3 min-w-[180px]">
                        {BREACH_COSTS.map((item, idx) => (
                            <div 
                                key={idx} 
                                className={cn(
                                    "flex items-center gap-3 text-sm transition-opacity duration-300 cursor-default group",
                                    hoveredSegment && hoveredSegment !== item.label ? "opacity-30" : "opacity-100"
                                )}
                                onMouseEnter={() => setHoveredSegment(item.label)}
                                onMouseLeave={() => setHoveredSegment(null)}
                            >
                                <div 
                                    className="w-3 h-3 rounded-full shrink-0 shadow-sm group-hover:scale-125 transition-transform" 
                                    style={{ backgroundColor: item.color }}
                                ></div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-neutral-900 leading-none">{item.value}%</span>
                                    <span className="text-xs text-neutral-500 leading-tight">{item.label}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* DACH Case Studies */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-10">
                 <div className="h-8 w-1.5 bg-brand-gradient rounded-full"></div>
                 <h3 className="text-2xl font-bold font-heading text-neutral-900">Fallstudien aus der DACH-Region</h3>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {DACH_CASES.map((item, index) => (
                  <Card 
                    key={index} 
                    className="bg-white border-neutral-200 hover:border-brand-primary/50 transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl"
                  >
                      <CardHeader className="pb-4 flex flex-row items-start justify-between space-y-0">
                        <div>
                            <CardTitle className="text-lg font-bold text-neutral-900 group-hover:text-brand-primary transition-colors">{item.company}</CardTitle>
                            <p className="text-xs text-neutral-500 mt-1 font-bold uppercase tracking-wide">{item.country}</p>
                        </div>
                        <div className="p-2 bg-neutral-50 rounded-lg border border-neutral-100 text-neutral-400 group-hover:text-brand-primary group-hover:bg-brand-primary/5 transition-colors">
                            <item.icon className="w-5 h-5" />
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-5">
                        <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-100">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">Bußgeld</p>
                            <p className="text-lg font-bold text-brand-accent">{item.fine}</p>
                        </div>
                        
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">Grund</p>
                            <p className="text-sm font-medium text-neutral-700 leading-snug">{item.violation}</p>
                        </div>

                        <div className="pt-4 border-t border-neutral-100">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">Geschäftliche Auswirkung</p>
                            <p className={`text-sm font-bold ${item.impactColor}`}>{item.impact}</p>
                        </div>
                      </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* THE LESSON */}
            <div className="bg-neutral-900 rounded-2xl p-8 md:p-10 text-white flex flex-col md:flex-row gap-8 items-center relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/20 rounded-full blur-3xl -z-0 translate-x-1/3 -translate-y-1/3"></div>
                
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-full shrink-0 relative z-10 border border-white/10 shadow-glow">
                    <Lightbulb className="w-8 h-8 text-brand-accent" />
                </div>
                <div className="relative z-10">
                    <h4 className="text-xl font-bold font-heading mb-3 text-brand-accent">Die strategische Lektion</h4>
                    <p className="text-neutral-300 leading-relaxed max-w-3xl text-lg">
                        Datenschutzverletzungen kosten weit mehr als nur Bußgelder.
                        <br className="hidden md:block" />
                        Unternehmen zahlen oft ein Vielfaches an indirekten Kosten. 
                        <strong className="text-white ml-1">Proaktive Compliance ist günstiger als das Risiko.</strong>
                    </p>
                </div>
            </div>
        </div>
      </Container>

      {/* CHECKLIST SECTION */}
      <Container className="mb-24">
         <ComplianceChecklist />
      </Container>
    </div>
  );
}
