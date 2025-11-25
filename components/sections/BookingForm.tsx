import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Calendar as CalendarIcon, Clock, User, Check, AlertCircle, ChevronLeft, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", 
  "13:00", "13:30", "14:00", "14:30", "15:00"
];

const TOPICS = [
  "Consent-Check",
  "Fix-Pilot",
  "Banner-A/B",
  "Training",
  "Sonstiges"
];

// Mock generated dates for the next 7 days
const generateDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (d.getDay() !== 0 && d.getDay() !== 6) { // Skip weekends
      dates.push(d);
    }
  }
  return dates.slice(0, 6); // Just take next 6 available days
};

export function BookingForm() {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', topic: '' });
  const [errors, setErrors] = useState({ name: false, email: false, topic: false });
  
  const availableDates = generateDates();
  
  // Ref to manage focus transition between steps
  const stepContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // When step changes, move focus to the container of the new step for accessibility
    if (stepContainerRef.current) {
      stepContainerRef.current.focus();
    }
  }, [step]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setStep(2);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep(3);
  };

  const validateForm = () => {
    const newErrors = {
      name: formData.name.trim() === '',
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      topic: formData.topic === ''
    };
    setErrors(newErrors);
    return !newErrors.name && !newErrors.email && !newErrors.topic;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Booking:', { selectedDate, selectedTime, formData });
      setStep(4);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {/* Main Selection Area */}
      <div className="md:col-span-2">
        <Card className="h-full min-h-[450px] border-neutral-200 shadow-sm bg-white/95 backdrop-blur-sm">
          <CardContent className="p-6 md:p-8">
            {step === 1 && (
              <div 
                className="animate-in fade-in slide-in-from-left-4 duration-300 focus:outline-none" 
                ref={stepContainerRef}
                tabIndex={-1}
                role="region"
                aria-label="Schritt 1: Wählen Sie einen Tag"
              >
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-neutral-900">
                  <CalendarIcon className="w-5 h-5 text-brand-primary" aria-hidden="true"/> 
                  Wählen Sie einen Tag
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4" role="list">
                  {availableDates.map((date) => (
                    <button
                      key={date.toISOString()}
                      onClick={() => handleDateSelect(date)}
                      className="p-4 rounded-xl border border-neutral-200 bg-white hover:border-brand-primary hover:bg-brand-primary/5 transition-all text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 group shadow-sm"
                      aria-label={`Wählen Sie ${date.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })}`}
                      role="listitem"
                    >
                      <div className="text-xs text-neutral-500 uppercase mb-1 group-hover:text-brand-primary/70 transition-colors font-bold" aria-hidden="true">{date.toLocaleDateString('de-DE', { weekday: 'short' })}</div>
                      <div className="text-lg font-bold text-neutral-900 group-hover:text-brand-primary transition-colors" aria-hidden="true">{date.getDate()}. {date.toLocaleDateString('de-DE', { month: 'short' })}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div 
                className="animate-in fade-in slide-in-from-right-4 duration-300 focus:outline-none"
                ref={stepContainerRef}
                tabIndex={-1}
                role="region"
                aria-label="Schritt 2: Wählen Sie eine Uhrzeit"
              >
                <div className="flex items-center gap-4 mb-6">
                  <Button variant="ghost" size="sm" onClick={() => setStep(1)} aria-label="Zurück zur Datumsauswahl" className="pl-2 pr-3 text-neutral-600 hover:text-neutral-900 font-medium">
                    <ChevronLeft className="w-4 h-4 mr-1" /> Zurück
                  </Button>
                  <h3 className="text-xl font-bold flex items-center gap-2 text-neutral-900">
                    <Clock className="w-5 h-5 text-brand-primary" aria-hidden="true"/> 
                    Wählen Sie eine Uhrzeit
                  </h3>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3" role="list">
                  {TIME_SLOTS.map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      className="py-3 px-4 rounded-lg border border-neutral-200 bg-white hover:border-brand-primary hover:bg-brand-primary hover:text-white transition-all font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 text-neutral-800 shadow-sm"
                      aria-label={`Wählen Sie ${time} Uhr`}
                      role="listitem"
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div 
                className="animate-in fade-in slide-in-from-right-4 duration-300 focus:outline-none"
                ref={stepContainerRef}
                tabIndex={-1}
                role="region"
                aria-label="Schritt 3: Ihre Kontaktdaten"
              >
                 <div className="flex items-center gap-4 mb-6">
                  <Button variant="ghost" size="sm" onClick={() => setStep(2)} aria-label="Zurück zur Uhrzeitauswahl" className="pl-2 pr-3 text-neutral-600 hover:text-neutral-900 font-medium">
                    <ChevronLeft className="w-4 h-4 mr-1" /> Zurück
                  </Button>
                  <h3 className="text-xl font-bold flex items-center gap-2 text-neutral-900">
                    <User className="w-5 h-5 text-brand-primary" aria-hidden="true"/> 
                    Ihre Kontaktdaten
                  </h3>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto md:mx-0">
                   
                   {/* TOPIC SELECTION - HIGH CONTRAST & FOCUS */}
                   <div>
                    <label htmlFor="topic-select" className="block text-sm font-bold text-neutral-800 mb-2">Worum geht’s bei dir?</label>
                    <div className="relative">
                        <select
                            id="topic-select"
                            className={cn(
                                "w-full p-3.5 pr-10 rounded-lg border bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 transition-shadow appearance-none cursor-pointer shadow-sm font-medium",
                                errors.topic ? "border-red-500 focus:ring-red-200" : "border-neutral-300",
                                formData.topic === "" && "text-neutral-500"
                            )}
                            value={formData.topic}
                            onChange={(e) => {
                                setFormData({...formData, topic: e.target.value});
                                if(errors.topic) setErrors({...errors, topic: false});
                            }}
                             aria-invalid={errors.topic}
                             aria-describedby={errors.topic ? "topic-error" : undefined}
                        >
                            <option value="" disabled>Bitte wählen...</option>
                            {TOPICS.map(topic => (
                                <option key={topic} value={topic} className="text-neutral-900">{topic}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-4 w-5 h-5 text-neutral-600 pointer-events-none" />
                         {errors.topic && <AlertCircle className="absolute right-10 top-4 w-5 h-5 text-red-500" />}
                    </div>
                    {errors.topic && <p id="topic-error" className="text-red-600 text-sm mt-1 font-medium">Bitte wählen Sie ein Thema aus.</p>}
                  </div>

                  {/* NAME INPUT - HIGH CONTRAST & FOCUS */}
                  <div>
                    <label htmlFor="name-input" className="block text-sm font-bold text-neutral-800 mb-2">Name</label>
                    <div className="relative">
                      <input 
                        id="name-input"
                        type="text" 
                        className={cn(
                          "w-full p-3.5 rounded-lg border bg-white text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 transition-shadow shadow-sm font-medium",
                          errors.name ? "border-red-500 focus:ring-red-200" : "border-neutral-300"
                        )}
                        placeholder="Max Mustermann"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({...formData, name: e.target.value});
                          if(errors.name) setErrors({...errors, name: false});
                        }}
                        aria-invalid={errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                      />
                      {errors.name && <AlertCircle className="absolute right-3 top-3.5 w-5 h-5 text-red-500" />}
                    </div>
                    {errors.name && <p id="name-error" className="text-red-600 text-sm mt-1 font-medium">Bitte geben Sie Ihren Namen ein.</p>}
                  </div>
                  
                  {/* EMAIL INPUT - HIGH CONTRAST & FOCUS */}
                  <div>
                    <label htmlFor="email-input" className="block text-sm font-bold text-neutral-800 mb-2">E-Mail</label>
                    <div className="relative">
                      <input 
                        id="email-input"
                        type="email" 
                        className={cn(
                          "w-full p-3.5 rounded-lg border bg-white text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 transition-shadow shadow-sm font-medium",
                          errors.email ? "border-red-500 focus:ring-red-200" : "border-neutral-300"
                        )}
                        placeholder="max@firma.de"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({...formData, email: e.target.value});
                          if(errors.email) setErrors({...errors, email: false});
                        }}
                        aria-invalid={errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                      {errors.email && <AlertCircle className="absolute right-3 top-3.5 w-5 h-5 text-red-500" />}
                    </div>
                    {errors.email && <p id="email-error" className="text-red-600 text-sm mt-1 font-medium">Bitte geben Sie eine gültige E-Mail-Adresse ein.</p>}
                  </div>

                  <Button type="submit" variant="gradient" size="lg" className="w-full mt-8 shadow-lg shadow-brand-primary/20 font-bold text-base py-6">
                    Gespräch verbindlich buchen
                  </Button>
                </form>
              </div>
            )}

            {step === 4 && (
              <div 
                className="flex flex-col items-center justify-center h-full py-12 animate-in zoom-in-95 duration-500 focus:outline-none"
                ref={stepContainerRef}
                tabIndex={-1}
                role="status"
                aria-live="polite"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
                    <Check className="w-10 h-10 text-green-600" />
                  </div>
                  <div className="absolute inset-0 bg-green-400 rounded-full opacity-20 animate-ping"></div>
                </div>
                
                <h3 className="text-2xl font-bold text-neutral-900 mb-2 font-heading">Buchung erfolgreich!</h3>
                <p className="text-neutral-700 text-center max-w-xs mb-4 font-medium">
                  Wir haben Ihnen eine Bestätigung an <br/><span className="font-bold text-neutral-900">{formData.email}</span> gesendet.
                </p>
                {formData.topic && (
                     <p className="text-neutral-600 text-sm text-center bg-neutral-100 px-4 py-1.5 rounded-full border border-neutral-200 font-semibold">
                        Thema: {formData.topic}
                     </p>
                )}
                
                <Button variant="outline" className="mt-10 border-neutral-300" onClick={() => window.location.href = '/'}>Zurück zur Startseite</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Summary Sidebar - Dark Theme for high contrast */}
      <div className="md:col-span-1">
        <div className="bg-neutral-950 text-white p-6 lg:p-8 rounded-xl shadow-xl sticky top-24 border border-neutral-800" role="complementary" aria-label="Buchungszusammenfassung">
          <h4 className="text-lg font-bold mb-6 border-b border-neutral-800 pb-4 font-heading text-white">Zusammenfassung</h4>
          
          <div className="space-y-6" aria-live="polite" aria-atomic="true">
            <div className="group">
              <p className="text-xs uppercase text-neutral-400 font-bold tracking-wider mb-1 group-hover:text-brand-primary transition-colors">Datum</p>
              <p className="font-bold text-lg text-white">
                {selectedDate 
                  ? selectedDate.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' }) 
                  : <span className="text-neutral-500 text-base italic font-normal">Wird gewählt...</span>}
              </p>
            </div>

            <div className="group">
              <p className="text-xs uppercase text-neutral-400 font-bold tracking-wider mb-1 group-hover:text-brand-primary transition-colors">Uhrzeit</p>
              <p className="font-bold text-lg text-white">
                 {selectedTime 
                  ? `${selectedTime} Uhr` 
                  : <span className="text-neutral-500 text-base italic font-normal">Wird gewählt...</span>}
              </p>
            </div>
            
            {formData.topic && (
                <div className="group">
                  <p className="text-xs uppercase text-neutral-400 font-bold tracking-wider mb-1 group-hover:text-brand-primary transition-colors">Thema</p>
                  <p className="font-medium text-white">{formData.topic}</p>
                </div>
            )}

             <div>
              <p className="text-xs uppercase text-neutral-400 font-bold tracking-wider mb-1">Dauer</p>
              <p className="font-medium text-white">15 Minuten</p>
            </div>
            
             <div className="pt-6 border-t border-neutral-800">
               <div className="flex justify-between items-end">
                 <p className="text-sm text-neutral-400 font-medium">Preis</p>
                 <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">Kostenlos</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}