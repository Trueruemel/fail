import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, X, Send, Loader2, Bot, User, BrainCircuit } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hallo! Ich bin der ConsentWerft Assistent. Wie kann ich Ihnen beim Thema Datenschutz, Cookies oder Tracking helfen?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const chat = ai.chats.create({
        model: 'gemini-3-pro-preview',
        config: {
          systemInstruction: "Du bist ein hilfreicher KI-Assistent für 'ConsentWerft'. Du hilfst Nutzern bei Fragen zu Datenschutz, Cookie-Bannern, Google Consent Mode v2 und Server-Side Tracking. Deine Antworten sind präzise, freundlich und deutsch. Du bist ein Experte, aber gibst keine Rechtsberatung (weise darauf hin). Formatiere Antworten gut lesbar.",
          // Enable Thinking Mode for complex compliance questions
          thinkingConfig: { thinkingBudget: 32768 },
        }
      });

      // Simple history handling: We start a new chat but send the user context.
      // In a production app, we would maintain the `chat` instance or pass full history.
      const result = await chat.sendMessage({ message: userMessage });
      const responseText = result.text;

      setMessages(prev => [...prev, { role: 'model', text: responseText }]);

    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Entschuldigung, ich habe gerade Verbindungsprobleme. Bitte versuchen Sie es später noch einmal." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-glow transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2",
          isOpen ? "bg-neutral-900 text-white rotate-90" : "bg-brand-gradient text-white"
        )}
        aria-label="Chat öffnen"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      <div 
        className={cn(
          "fixed bottom-24 right-6 w-[90vw] md:w-[400px] bg-white rounded-2xl shadow-2xl border border-neutral-200 z-50 flex flex-col transition-all duration-300 origin-bottom-right overflow-hidden",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        )}
        style={{ height: '500px', maxHeight: '80vh' }}
      >
        {/* Header */}
        <div className="bg-neutral-900 text-white p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center">
                <Bot className="w-5 h-5" />
            </div>
            <div>
                <h3 className="font-bold text-sm">ConsentWerft AI</h3>
                <p className="text-xs text-neutral-400 flex items-center gap-1">
                   <BrainCircuit className="w-3 h-3" />
                   Thinking Mode Active
                </p>
            </div>
        </div>

        {/* Messages Area */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-neutral-50 scroll-smooth">
            {messages.map((msg, idx) => (
                <div 
                    key={idx} 
                    className={cn(
                        "flex gap-3 max-w-[85%]",
                        msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                    )}
                >
                    <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1",
                        msg.role === 'user' ? "bg-neutral-200 text-neutral-600" : "bg-brand-primary/10 text-brand-primary"
                    )}>
                        {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={cn(
                        "p-3 rounded-2xl text-sm leading-relaxed",
                        msg.role === 'user' 
                            ? "bg-neutral-900 text-white rounded-tr-none" 
                            : "bg-white border border-neutral-200 text-neutral-800 rounded-tl-none shadow-sm"
                    )}>
                        {msg.text}
                    </div>
                </div>
            ))}
            {isLoading && (
                <div className="flex gap-3 max-w-[85%]">
                     <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0 mt-1 text-brand-primary">
                        <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-white border border-neutral-200 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                        <span className="text-xs text-neutral-500 font-medium">Denkt nach...</span>
                        <Loader2 className="w-3 h-3 animate-spin text-brand-primary" />
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-neutral-100 flex gap-2">
            <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Frag etwas..." 
                className="flex-grow bg-neutral-100 border-none rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
            />
            <Button 
                type="submit" 
                size="icon" 
                variant="gradient" 
                className="rounded-full w-10 h-10 shrink-0"
                disabled={isLoading || !inputValue.trim()}
            >
                <Send className="w-4 h-4" />
            </Button>
        </form>
      </div>
    </>
  );
}