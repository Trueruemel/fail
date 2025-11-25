
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Upload, Wand2, Image as ImageIcon, Loader2, AlertCircle, Download, MonitorPlay, FileWarning, Sparkles, BrainCircuit } from 'lucide-react';
import { cn } from '../lib/utils';
import { useScrollAnimation } from '../lib/hooks';

// Helper function to get mime type from base64 string
function getMimeTypeFromBase64(base64DataUrl: string): string {
  if (base64DataUrl.startsWith('data:image/png;')) return 'image/png';
  if (base64DataUrl.startsWith('data:image/jpeg;')) return 'image/jpeg';
  if (base64DataUrl.startsWith('data:image/webp;')) return 'image/webp';
  return 'image/png'; // Default
}

// Define Image Size options for gemini-3-pro-image-preview
type ImageSize = '1K' | '2K' | '4K';

const EXAMPLES = [
  {
    prompt: "A dark mode UI mockup of a consent banner with violet and pink accents, modern aesthetic, clean typography, high fidelity",
    img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop",
    label: "Dark Mode Banner"
  },
  {
    prompt: "Visually striking image representing A/B testing for banners, split screen composition, contrasting neon colors, digital abstract style",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop", 
    label: "A/B Testing Concept"
  },
  {
    prompt: "Illustration of banner performance analytics with clear charts, glowing data lines, dark background, violet dashboard view",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop", 
    label: "Performance Analytics"
  },
  {
    prompt: "Concept image for a GDPR-compliant banner that prioritizes user experience, trust shield symbol, futuristic interface, soft lighting",
    img: "https://images.unsplash.com/photo-1633265486064-084b5f994028?q=80&w=800&auto=format&fit=crop",
    label: "GDPR UX Concept"
  }
];

export function DesignStudio() {
  const [mode, setMode] = useState<'ai-banner-design' | 'image-upload-edit' | 'ai-image-hq'>('ai-banner-design');
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null); // Displayed image (base64 data URL)
  const [loading, setLoading] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState<ImageSize>('1K');
  const [apiKeySelected, setApiKeySelected] = useState<boolean>(true); // Assume true initially
  const [isDragging, setIsDragging] = useState(false); // Drag state

  const fileInputRef = useRef<HTMLInputElement>(null);
  const headerAnim = useScrollAnimation({ type: 'fade-up' });

  // Check API key status when entering 'ai-image-hq' mode
  useEffect(() => {
    const checkKey = async () => {
      if (mode === 'ai-image-hq') {
        // Use type assertion to access window.aistudio safely
        const win = window as any;
        if (win.aistudio && typeof win.aistudio.hasSelectedApiKey === 'function') {
          const hasKey = await win.aistudio.hasSelectedApiKey();
          setApiKeySelected(hasKey);
        } else {
          // If aistudio is not available, assume API key is set externally or not required for this env
          setApiKeySelected(true); 
          console.warn("window.aistudio API not available. Assuming API key is set externally.");
        }
      }
    };
    checkKey();
    // Clear image and errors when changing modes
    setImageUrl(null);
    setError(null);
    setPrompt('');
    setIsDragging(false);
  }, [mode]);

  // Handle API Key selection via dialog
  const handleSelectApiKey = async () => {
    // Use type assertion to access window.aistudio safely
    const win = window as any;
    if (win.aistudio && typeof win.aistudio.openSelectKey === 'function') {
      await win.aistudio.openSelectKey();
      // Assume selection was successful and proceed
      setApiKeySelected(true); 
    } else {
      setError("API Key selection not supported in this environment.");
      console.error("window.aistudio.openSelectKey is not available.");
    }
  };

  // PROMPT OPTIMIZATION (Thinking Mode)
  const handleOptimizePrompt = async () => {
    if (!prompt.trim()) {
      setError("Bitte geben Sie zuerst einen Basis-Prompt ein.");
      return;
    }

    setThinking(true);
    setError(null);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `You are an expert design consultant and prompt engineer. Your task is to analyze the user's request and create a highly detailed, professional image generation prompt.
        
        Focus on:
        1. Lighting and atmosphere
        2. Composition and camera angle
        3. Style (e.g. minimalist UI, glassmorphism, cyberpunk, photorealistic)
        4. Color palette details
        
        User Request: "${prompt}"
        
        Output ONLY the optimized prompt text, nothing else.`,
        config: {
            // Using Thinking Config for complex reasoning to create the perfect prompt
            thinkingConfig: { thinkingBudget: 32768 },
        }
      });
      
      if (response.text) {
        setPrompt(response.text.trim());
      }
    } catch (err: any) {
        console.error(err);
        setError("Prompt-Optimierung fehlgeschlagen. (Ggf. API Key prüfen)");
    } finally {
        setThinking(false);
    }
  };

  // Generic image generation/editing function using Gemini
  const generateOrEditImage = async (
    modelName: string,
    contents: any,
    config: any = {}
  ): Promise<string | null> => {
    setLoading(true);
    setError(null);

    // Create a new GoogleGenAI instance right before the API call to ensure the latest API key is used
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: modelName,
        contents: contents,
        config: config,
      });

      let foundImage = false;
      if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const base64EncodeString = part.inlineData.data;
            const mimeType = part.inlineData.mimeType || 'image/png';
            foundImage = true;
            return `data:${mimeType};base64,${base64EncodeString}`;
          }
        }
      }

      if (!foundImage) {
         throw new Error("Das Modell hat kein Bild zurückgegeben. Bitte versuchen Sie es erneut mit einem anderen Prompt.");
      }
    } catch (err: any) {
      console.error(err);
      if (err.message && err.message.includes("Requested entity was not found.")) {
        // Specific error for API key issue, reset state and prompt user
        setApiKeySelected(false);
        setError("API Key Problem: Bitte wählen Sie erneut einen gültigen API Key (aus einem kostenpflichtigen GCP Projekt).");
      } else {
        setError(`Fehler bei der KI-Anfrage: ${err.message || "Unbekannter Fehler"}.`);
      }
      return null;
    } finally {
      setLoading(false);
    }
    return null;
  };

  // Mode 1: AI Banner Design (gemini-2.5-flash-image for new UI mockups)
  const handleGenerateBanner = async () => {
    if (!prompt.trim()) return;
    setImageUrl(null); // Clear previous image

    const newImageUrl = await generateOrEditImage(
      'gemini-2.5-flash-image', // Nano Banana
      { parts: [{ text: `Design a modern, GDPR-compliant cookie consent banner UI. Style: ${prompt}. High quality, UI design mockup.` }] },
      { /* no responseMimeType for image models */ }
    );
    if (newImageUrl) setImageUrl(newImageUrl);
  };

  // Centralized File Processing Logic
  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError("Bitte laden Sie nur Bilddateien hoch (JPG, PNG, WebP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setError("Die Datei ist zu groß (max. 5MB erlaubt).");
      return;
    }

    setLoading(true);
    setError(null);
    setImageUrl(null); // Clear previous image if any

    const reader = new FileReader();
    reader.onload = (e) => {
      setImageUrl(e.target?.result as string);
      setLoading(false);
    };
    reader.onerror = () => {
      setError("Fehler beim Laden der Datei.");
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  // Mode 2: Image Upload - Input Handler
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
    event.target.value = ''; // Clear file input
  };

  // Mode 2: Image Upload - Drag & Drop Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleEditImage = async () => {
    if (!imageUrl || !prompt.trim()) {
      setError("Bitte laden Sie zuerst ein Bild hoch und geben Sie einen Prompt ein.");
      return;
    }

    const base64Content = imageUrl.split(',')[1];
    const mimeType = getMimeTypeFromBase64(imageUrl);

    const newImageUrl = await generateOrEditImage(
      'gemini-2.5-flash-image', // Nano Banana for editing
      { 
        parts: [
          { inlineData: { data: base64Content, mimeType: mimeType } },
          { text: prompt }
        ]
      },
      { /* no responseMimeType for image models */ }
    );
    if (newImageUrl) setImageUrl(newImageUrl);
  };

  // Mode 3: High-Quality AI Image (gemini-3-pro-image-preview)
  const handleGenerateHqImage = async () => {
    if (!prompt.trim()) return;
    if (!apiKeySelected) {
      setError("Bitte wählen Sie zuerst einen API Key aus.");
      return;
    }
    setImageUrl(null); // Clear previous image

    const newImageUrl = await generateOrEditImage(
      'gemini-3-pro-image-preview',
      { parts: [{ text: prompt }] },
      { imageConfig: { aspectRatio: "1:1", imageSize: imageSize } } // Default to 1:1 aspect ratio
    );
    if (newImageUrl) setImageUrl(newImageUrl);
  };

  return (
    <div className="bg-neutral-50/50 min-h-screen">
      
      {/* Header */}
      <div className="pt-32 pb-16 bg-white border-b border-neutral-200">
        <Container>
          <div ref={headerAnim.ref} style={headerAnim.style} className="max-w-4xl mx-auto text-center">
            <span className="inline-block py-1 px-3 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-wider mb-4">
               Beta Feature
            </span>
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-neutral-900">
              Banner Design Lab
            </h1>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Experimentieren Sie mit neuen Banner-Designs via KI oder laden Sie Ihre Designs hoch, um sie im Kontext zu prüfen und bearbeiten zu lassen.
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-12">
        <div className="grid lg:grid-cols-5 gap-8">
          
          {/* Left Controls */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 border-neutral-200 bg-white shadow-sm">
              <div className="flex gap-2 p-1 bg-neutral-100 rounded-lg mb-6">
                <button
                  onClick={() => { setMode('ai-banner-design'); setError(null); setPrompt(''); }}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold rounded-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2",
                    mode === 'ai-banner-design' ? "bg-white text-brand-primary shadow-sm" : "text-neutral-500 hover:text-neutral-900"
                  )}
                  aria-pressed={mode === 'ai-banner-design'}
                >
                  <Wand2 className="w-4 h-4" />
                  KI-Banner
                </button>
                <button
                  onClick={() => { setMode('image-upload-edit'); setError(null); setPrompt(''); }}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold rounded-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2",
                    mode === 'image-upload-edit' ? "bg-white text-brand-primary shadow-sm" : "text-neutral-500 hover:text-neutral-900"
                  )}
                  aria-pressed={mode === 'image-upload-edit'}
                >
                  <Upload className="w-4 h-4" />
                  Bearbeiten
                </button>
                <button
                  onClick={() => { setMode('ai-image-hq'); setError(null); setPrompt(''); }}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold rounded-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2",
                    mode === 'ai-image-hq' ? "bg-white text-brand-primary shadow-sm" : "text-neutral-500 hover:text-neutral-900"
                  )}
                  aria-pressed={mode === 'ai-image-hq'}
                >
                  <MonitorPlay className="w-4 h-4" />
                  HQ-Bild
                </button>
              </div>

              {/* Mode: AI Banner Design */}
              {mode === 'ai-banner-design' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div>
                    <label htmlFor="banner-prompt" className="block text-sm font-bold text-neutral-900 mb-2">Prompt (Design-Beschreibung)</label>
                    <textarea
                      id="banner-prompt"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="z.B. Minimalistischer Cookie-Banner, Dark Mode, Buttons in Neon-Pink, hohe Transparenz..."
                      className="w-full p-3.5 rounded-lg border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 transition-shadow min-h-[120px] text-sm shadow-sm"
                      aria-label="Prompt für KI-Banner-Design"
                    />
                     {/* Thinking Mode Button */}
                    <div className="flex justify-end mt-2">
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-xs text-brand-primary hover:text-brand-accent hover:bg-brand-primary/5 h-8"
                            onClick={handleOptimizePrompt}
                            disabled={thinking || loading || !prompt.trim()}
                        >
                             {thinking ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <BrainCircuit className="w-3 h-3 mr-1" />}
                             Mit KI verfeinern
                        </Button>
                    </div>
                  </div>
                  <Button 
                    variant="gradient" 
                    className="w-full py-6 text-base font-bold" 
                    onClick={handleGenerateBanner}
                    disabled={loading || thinking || !prompt.trim()}
                    aria-label={loading ? "Generiere Banner..." : "Design generieren"}
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Wand2 className="w-5 h-5 mr-2" />}
                    {loading ? "Generiere..." : "Design generieren"}
                  </Button>
                  <p className="text-xs text-neutral-400 mt-2 text-center">
                    Powered by Gemini 2.5 Flash Image.
                  </p>
                </div>
              )}

              {/* Mode: Image Upload & Edit */}
              {mode === 'image-upload-edit' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div 
                    className={cn(
                      "border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer bg-white focus-within:ring-2 focus-within:ring-brand-primary focus-within:ring-offset-2",
                      isDragging 
                        ? "border-brand-primary bg-brand-primary/5 scale-[1.02]" 
                        : "border-neutral-300 hover:bg-neutral-50 hover:border-brand-primary/50",
                      error?.includes("Datei ist zu groß") || error?.includes("Bilddateien") ? "border-red-400 bg-red-50" : ""
                    )}
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    aria-label="Klicken oder ziehen Sie ein Bild zum Hochladen"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        fileInputRef.current?.click();
                      }
                    }}
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/png, image/jpeg, image/webp"
                      onChange={handleFileUpload}
                    />
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 transition-colors",
                      isDragging ? "bg-brand-primary text-white shadow-glow" : "bg-brand-primary/5 text-brand-primary"
                    )}>
                      {isDragging ? <Upload className="w-6 h-6 animate-bounce" /> : <Upload className="w-6 h-6" />}
                    </div>
                    <p className="text-sm font-bold text-neutral-900">
                      {isDragging ? "Hier loslassen" : "Klicken oder Drag & Drop"}
                    </p>
                    <div className="flex flex-col items-center mt-2 gap-1">
                       <p className="text-xs text-neutral-500">PNG, JPG, WebP</p>
                       <p className={cn("text-[10px] px-2 py-0.5 rounded-full font-bold", 
                         error?.includes("Datei ist zu groß") ? "bg-red-200 text-red-800" : "bg-neutral-100 text-neutral-400"
                       )}>
                         Max. 5 MB
                       </p>
                    </div>
                  </div>

                  {imageUrl && (
                    <div className="space-y-4 mt-6 pt-6 border-t border-neutral-200">
                      <h3 className="text-lg font-bold text-neutral-900">Bild bearbeiten (KI)</h3>
                      <div>
                        <label htmlFor="edit-prompt" className="block text-sm font-bold text-neutral-900 mb-2">Prompt (Bearbeitungswunsch)</label>
                        <textarea
                          id="edit-prompt"
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          placeholder="z.B. Füge einen Retro-Filter hinzu, Entferne die Person im Hintergrund..."
                          className="w-full p-3.5 rounded-lg border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 transition-shadow min-h-[100px] text-sm shadow-sm"
                          aria-label="Prompt für Bildbearbeitung"
                        />
                         {/* Thinking Mode Button */}
                        <div className="flex justify-end mt-2">
                             <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-xs text-brand-primary hover:text-brand-accent hover:bg-brand-primary/5 h-8"
                                onClick={handleOptimizePrompt}
                                disabled={thinking || loading || !prompt.trim()}
                            >
                                 {thinking ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <BrainCircuit className="w-3 h-3 mr-1" />}
                                 Mit KI verfeinern
                            </Button>
                        </div>
                      </div>
                      <Button 
                        variant="gradient" 
                        className="w-full py-6 text-base font-bold" 
                        onClick={handleEditImage}
                        disabled={loading || thinking || !prompt.trim()}
                        aria-label={loading ? "Bearbeite Bild..." : "Bild bearbeiten"}
                      >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Wand2 className="w-5 h-5 mr-2" />}
                        {loading ? "Bearbeite..." : "Bild bearbeiten"}
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Mode: High-Quality AI Image */}
              {mode === 'ai-image-hq' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  {!apiKeySelected ? (
                    <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200 flex flex-col items-center text-center gap-3">
                      <AlertCircle className="w-6 h-6" />
                      <p className="font-bold text-base">API Key erforderlich!</p>
                      <p className="text-sm">Für High-Quality KI-Bilder benötigen Sie einen API Key aus einem kostenpflichtigen GCP Projekt.</p>
                      <Button 
                        onClick={handleSelectApiKey} 
                        variant="destructive" 
                        className="w-full max-w-[200px]"
                        aria-label="API Key auswählen"
                      >
                        API Key auswählen
                      </Button>
                      <a 
                        href="https://ai.google.dev/gemini-api/docs/billing" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-xs text-red-500 underline hover:text-red-700"
                      >
                        Infos zur Abrechnung
                      </a>
                    </div>
                  ) : (
                    <>
                      <div>
                        <label htmlFor="hq-prompt" className="block text-sm font-bold text-neutral-900 mb-2">Prompt (Bild-Beschreibung)</label>
                        <textarea
                          id="hq-prompt"
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          placeholder="z.B. Ein futuristisches Raumschiff im Anflug auf eine neonbeleuchtete Stadt, Cyberpunk-Stil..."
                          className="w-full p-3.5 rounded-lg border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 transition-shadow min-h-[120px] text-sm shadow-sm"
                          aria-label="Prompt für High-Quality KI-Bild"
                        />
                         {/* Thinking Mode Button */}
                         <div className="flex justify-end mt-2">
                             <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-xs text-brand-primary hover:text-brand-accent hover:bg-brand-primary/5 h-8"
                                onClick={handleOptimizePrompt}
                                disabled={thinking || loading || !prompt.trim()}
                            >
                                 {thinking ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <BrainCircuit className="w-3 h-3 mr-1" />}
                                 Mit KI verfeinern
                            </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-bold text-neutral-900 mb-2">Bildgröße</label>
                        <div className="flex flex-wrap gap-3" role="radiogroup" aria-label="Wählen Sie die Bildgröße">
                          {(['1K', '2K', '4K'] as ImageSize[]).map((size) => (
                            <Button
                              key={size}
                              variant={imageSize === size ? 'gradient' : 'outline'}
                              onClick={() => setImageSize(size)}
                              className={cn(
                                "font-bold min-w-[60px]",
                                imageSize === size ? "shadow-glow-pink" : "border-neutral-300 text-neutral-700 bg-white hover:text-neutral-900"
                              )}
                              aria-checked={imageSize === size}
                              role="radio"
                            >
                              {size}
                            </Button>
                          ))}
                        </div>
                      </div>
                      <Button 
                        variant="gradient" 
                        className="w-full py-6 text-base font-bold" 
                        onClick={handleGenerateHqImage}
                        disabled={loading || thinking || !prompt.trim()}
                        aria-label={loading ? "Generiere High-Quality Bild..." : "High-Quality Bild generieren"}
                      >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <MonitorPlay className="w-5 h-5 mr-2" />}
                        {loading ? "Generiere..." : "High-Quality Bild generieren"}
                      </Button>
                      <p className="text-xs text-neutral-400 mt-2 text-center">
                        Powered by Gemini 3 Pro Image Preview.
                      </p>
                    </>
                  )}
                </div>
              )}

              {error && (
                <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-start gap-2 font-medium border border-red-100" role="alert">
                  {error.includes("zu groß") ? <FileWarning className="w-4 h-4 mt-0.5 shrink-0" /> : <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />}
                  {error}
                </div>
              )}
            </Card>

            <div className="bg-brand-primary/5 p-6 rounded-xl border border-brand-primary/10">
                <h4 className="font-bold text-brand-primary mb-2 text-sm uppercase tracking-wider">Expertentipp</h4>
                <p className="text-sm text-neutral-700 leading-relaxed">
                    Nutzen Sie Mockups, um Stakeholdern frühzeitig zu zeigen, dass „compliant“ nicht „hässlich“ bedeutet. Ein gutes Banner erhöht die Consent-Rate um bis zu 15%.
                </p>
            </div>
          </div>

          {/* Right Preview */}
          <div className="lg:col-span-3 space-y-8">
            <Card className="h-full min-h-[500px] border-neutral-200 bg-white flex flex-col overflow-hidden shadow-lg relative">
               <div className="p-4 border-b border-neutral-100 flex justify-between items-center bg-neutral-50">
                  <div className="flex gap-2">
                     <div className="w-3 h-3 rounded-full bg-red-400 border border-red-500/20"></div>
                     <div className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-500/20"></div>
                     <div className="w-3 h-3 rounded-full bg-green-400 border border-green-500/20"></div>
                  </div>
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Preview Canvas</span>
                  {imageUrl ? (
                      <a href={imageUrl} download="consent-werft-design.png" className="text-neutral-400 hover:text-brand-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded" aria-label="Bild herunterladen">
                          <Download className="w-4 h-4" />
                      </a>
                  ) : <div className="w-4"></div>}
               </div>

               <div className="flex-grow flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] bg-neutral-100 relative p-8">
                  {loading ? (
                    <div className="text-center" role="status" aria-live="polite">
                        <div className="relative w-16 h-16 mx-auto mb-4">
                             <div className="absolute inset-0 border-4 border-brand-primary/20 rounded-full"></div>
                             <div className="absolute inset-0 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <p className="text-brand-primary font-bold animate-pulse">
                            {mode === 'ai-banner-design' ? 'KI entwirft Banner...' : 
                             mode === 'image-upload-edit' ? 'Bild wird bearbeitet...' : 'High-Quality Bild wird generiert...'}
                        </p>
                    </div>
                  ) : imageUrl ? (
                    <img 
                        src={imageUrl} 
                        alt="Generated or Edited Design" 
                        loading="lazy"
                        className="max-w-full max-h-[600px] rounded-lg shadow-2xl border border-white/20 animate-in zoom-in-95 duration-500"
                    />
                  ) : (
                    <div className="text-center text-neutral-400">
                        <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
                        <p className="font-medium">Ihr Design erscheint hier.</p>
                    </div>
                  )}
               </div>
            </Card>

            {/* Inspiration Gallery */}
            <div className="animate-in fade-in duration-500 delay-200">
               <div className="flex items-center gap-2 mb-4">
                   <Sparkles className="w-4 h-4 text-brand-accent" />
                   <h3 className="font-bold text-neutral-900 text-lg">Inspiration aus dem Lab</h3>
               </div>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {EXAMPLES.map((ex, i) => (
                      <div 
                         key={i} 
                         className="group relative rounded-xl overflow-hidden border border-neutral-200 cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                         onClick={() => {
                             setPrompt(ex.prompt);
                             setMode('ai-image-hq');
                             window.scrollTo({ top: 0, behavior: 'smooth' });
                         }}
                      >
                         <img src={ex.img} alt={ex.label} className="w-full aspect-square object-cover" />
                         <div className="absolute inset-0 bg-neutral-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                             <p className="text-white text-xs font-bold mb-1">{ex.label}</p>
                             <p className="text-neutral-300 text-[10px] line-clamp-2">{ex.prompt}</p>
                         </div>
                      </div>
                  ))}
               </div>
            </div>
          </div>

        </div>
      </Container>
    </div>
  );
}
