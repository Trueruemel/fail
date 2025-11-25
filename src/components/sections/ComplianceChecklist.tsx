import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { CheckCircle2, AlertTriangle, ArrowRight, PieChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const INDUSTRIES = [
  { id: 'ecommerce', label: 'E-Commerce / Shopify' },
  { id: 'saas', label: 'B2B SaaS / Software' },
  { id: 'agency', label: 'Agentur / Dienstleister' },
];

const QUESTIONS = [
  { id: 1, text: "Ist Ihr Cookie-Banner so konfiguriert, dass vor der Zustimmung KEINE Marketing-Tags feuern?" },
  { id: 2, text: "Nutzen Sie den Google Consent Mode v2, um Conversion-Daten zu modellieren?" },
  { id: 3, text: "Werden die Einwilligungen Ihrer Nutzer nachweisbar und revisionssicher gespeichert?" },
  { id: 4, text: "Haben Sie Server-Side Tagging im Einsatz, um die Datenhoheit zu erhöhen?" },
  { id: 5, text: "Ist Ihr Checkout-Prozess datenschutzkonform (z.B. bzgl. Newsletter-Anmeldung)?" },
];

export function ComplianceChecklist() {
  const [step, setStep] = useState(1);
  const [industry, setIndustry] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [score, setScore] = useState(0);

  const handleIndustrySelect = (id: string) => {
    setIndustry(id);
    setStep(2);
  };

  const handleAnswer = (questionId: number, value: boolean) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const calculateResult = () => {
    const yesCount = Object.values(answers).filter(Boolean).length;
    const calculatedScore = (yesCount / QUESTIONS.length) * 100;
    setScore(calculatedScore);
    setStep(3);
  };

  const allQuestionsAnswered = QUESTIONS.every(q => answers[q.id] !== undefined);

  return (
    <Card className="w-full max-w-3xl mx-auto border-neutral-800 shadow-lg overflow-hidden bg-neutral-900 text-neutral-200">
      <div className="bg-brand-primary/10 p-2">
        <div className="flex gap-1 h-1">
           <div className={`h-full bg-brand-primary transition-all duration-500 rounded-full ${step >= 1 ? 'w-1/3' : 'w-0'}`}></div>
           <div className={`h-full bg-brand-primary transition-all duration-500 rounded-full ${step >= 2 ? 'w-1/3' : 'w-0'}`}></div>
           <div className={`h-full bg-brand-primary transition-all duration-500 rounded-full ${step >= 3 ? 'w-1/3' : 'w-0'}`}></div>
        </div>
      </div>

      {step === 1 && (
        <div className="animate-in fade-in slide-in-from-right-8 duration-500">
          <CardHeader>
            <CardTitle className="text-center text-3xl mb-2 text-white">Starten Sie Ihre Compliance-Analyse</CardTitle>
            <p className="text-center text-neutral-400">Wählen Sie Ihre Branche für den passenden Fragenkatalog.</p>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-3 p-8">
            {INDUSTRIES.map((ind) => (
              <div 
                key={ind.id} 
                onClick={() => handleIndustrySelect(ind.id)}
                className="cursor-pointer border-2 border-neutral-800 rounded-xl p-6 text-center hover:border-brand-primary hover:bg-brand-primary/10 transition-all flex flex-col items-center justify-center gap-4 h-40"
              >
                 <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                    <PieChart className="w-6 h-6" />
                 </div>
                 <span className="font-semibold text-neutral-200">{ind.label}</span>
              </div>
            ))}
          </CardContent>
        </div>
      )}

      {step === 2 && (
        <div className="animate-in fade-in slide-in-from-right-8 duration-500">
          <CardHeader>
            <CardTitle className="text-white">Compliance Check: {INDUSTRIES.find(i => i.id === industry)?.label}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {QUESTIONS.map((q) => (
              <div key={q.id} className="p-4 rounded-lg bg-neutral-800/50 border border-neutral-800">
                <p className="font-medium text-neutral-100 mb-3">{q.text}</p>
                <div className="flex gap-3">
                  <Button 
                    variant={answers[q.id] === true ? 'gradient' : 'outline'}
                    onClick={() => handleAnswer(q.id, true)}
                    className={answers[q.id] === true ? "" : "border-neutral-700 bg-transparent hover:bg-neutral-800 text-neutral-100"}
                  >
                    Ja
                  </Button>
                  <Button 
                    variant={answers[q.id] === false ? 'default' : 'outline'}
                    onClick={() => handleAnswer(q.id, false)}
                    className={answers[q.id] === false ? "bg-neutral-700 text-white" : "border-neutral-700 bg-transparent hover:bg-neutral-800 text-neutral-100"}
                  >
                    Nein
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button 
              disabled={!allQuestionsAnswered} 
              onClick={calculateResult}
              className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white"
              size="lg"
            >
              Ergebnis berechnen
            </Button>
          </CardFooter>
        </div>
      )}

      {step === 3 && (
        <div className="text-center animate-in zoom-in-95 duration-500">
           <div className="bg-neutral-950 text-white py-12 px-6">
              <h3 className="text-sm uppercase tracking-widest text-brand-accent font-bold mb-4">Ihr Compliance Score</h3>
              <div className="text-6xl font-bold font-heading mb-4 gradient-text inline-block">
                {Math.round(score)}%
              </div>
              <p className="text-xl max-w-lg mx-auto mt-4 text-neutral-300">
                {score < 50 && "Handlungsbedarf erkannt! Viele Ihrer Prozesse scheinen nicht den aktuellen Standards zu entsprechen."}
                {score >= 50 && score < 80 && "Gute Grundlage! Sie haben bereits wichtige Schritte unternommen, aber es gibt noch Optimierungspotenzial."}
                {score >= 80 && "Sehr gut! Ihre Implementierung ist auf einem hohen Niveau."}
              </p>
           </div>
           <div className="p-8 bg-neutral-900">
              <div className="bg-brand-primary/10 border border-brand-primary/20 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-left">
                    <h4 className="font-bold text-xl text-white">Schwachstellen aufgedeckt?</h4>
                    <p className="text-neutral-400">Buchen Sie jetzt Ihren 48h-Consent-Check für eine detaillierte Analyse.</p>
                  </div>
                  <Link to="/gespraech-buchen">
                    <Button variant="gradient" size="lg" className="whitespace-nowrap">
                      Jetzt für 500 € prüfen
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
              </div>
           </div>
        </div>
      )}
    </Card>
  );
}