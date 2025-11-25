
import { Compass, Users, Database, FileCheck, Settings, Shield, Server } from 'lucide-react';

export const HOME_OFFERS = [
  {
    title: "48h-Consent-Check",
    price: "ab 500 €*",
    description: "CMP/Banner-Review (UX + Tech), Consent Mode v2 Diagnose & Sofort-Fix-Liste.",
    features: [
      "CMP/Banner-Review (UX + Tech)",
      "Consent Mode v2 Diagnose",
      "Sofort-Fix-Liste mit Priorität"
    ],
    scope: {
      includes: "Analyse · Prioritäten · Fahrplan",
      excludes: "Rechtsberatung"
    },
    moreDetails: [
      "Enthält: Analyse · Prioritäten · Fahrplan",
      "Nicht enthalten: Rechtsberatung"
    ],
    ctaText: "Check starten",
    isBestseller: false
  },
  {
    title: "14-Tage Fix-Pilot",
    price: "ab 3.000 €*",
    description: "Banner- & CMv2-Implementierung / Reparatur, GA4 + Ads-Signals sauber verdrahtet.",
    features: [
      "Banner- & CMv2-Implementierung",
      "GA4 + Ads-Signals sauber verdrahtet",
      "Handover inkl. Change-Log"
    ],
    scope: {
      includes: "Umsetzung · QA-Proof · Handover",
      excludes: "Media-Optimierung, Rechtsberatung"
    },
    moreDetails: [
      "Enthält: Umsetzung · QA-Proof · Handover",
      "Nicht enthalten: Media-Optimierung, Rechtsberatung"
    ],
    ctaText: "Pilot planen",
    isBestseller: true
  },
  {
    title: "Banner-A/B",
    price: "ab 1.500 €*",
    description: "Varianten & Copy-Tests für höhere Consent-Raten bei gleicher Signalqualität.",
    features: [
      "Varianten & Copy-Tests",
      "Consent-Rate vs. Signalqualität",
      "Gewinner-Setup live"
    ],
    scope: {
      includes: "2–3 Varianten · Test · Rollout",
      excludes: "Rechtsberatung"
    },
    moreDetails: [
      "Enthält: 2–3 Varianten · Test · Rollout",
      "Nicht enthalten: Rechtsberatung"
    ],
    ctaText: "A/B Setup sehen",
    isBestseller: false
  },
  {
    title: "Training",
    price: "ab 1.200 €*",
    description: "Team-Enablement für CMP/CMv2, Playbooks und QA-Rituale.",
    features: [
      "Team-Enablement für CMP/CMv2",
      "Best-Practice-Playbook",
      "QA-Ritual & Monitoring"
    ],
    scope: {
      includes: "Workshop · Playbook · Q&A",
      excludes: "Rechtsberatung"
    },
    moreDetails: [
      "Enthält: Workshop · Playbook · Q&A",
      "Nicht enthalten: Rechtsberatung"
    ],
    ctaText: "Training anfragen",
    isBestseller: false
  }
];

export const PRICING_PACKAGES = HOME_OFFERS.map(offer => ({
  title: offer.title,
  price: offer.price,
  features: offer.features,
  isPopular: offer.isBestseller
}));

export const FAQS = [
  { question: "Was bekomme ich genau am Ende?", answer: "Einen dokumentierten Proof-Stack + klare Next-Steps, die dein Team versteht und weiter nutzt." },
  { question: "Welche CMPs unterstützt ihr?", answer: "Alle gängigen CMPs im DACH-Markt. Wir prüfen, ob dein Setup export- und audit-fähig ist." },
  { question: "Basic oder Advanced Consent Mode v2?", answer: "Basic ist Startlinie. Advanced lohnt sich, wenn Ads/GA4-Signals strategisch wichtig sind." },
  { question: "Wie schnell sehen wir Effekte?", answer: "Technische Stabilität sofort; Modell-Verbesserungen zeigen sich je nach Traffic in Wochen." },
  { question: "Braucht ihr Zugriff auf alles?", answer: "Minimal-Setup reicht: CMP, GTM/SSGTM, GA4, Ads-Konten. Wir klären das vorab." },
  { question: "Was ist mit „Alle ablehnen“?", answer: "Muss gleichwertig sein. Wir bauen es so, dass UX und Recht zusammenpassen." },
  { question: "Könnt ihr Rechtsberatung geben?", answer: "Nein — wir liefern technisch/organisatorisch saubere Umsetzung und Nachweise." },
  { question: "Was, wenn wir schon CMv2 eingebaut haben?", answer: "Perfekt. Dann prüfen wir Signals, Timing und Vendor-Mapping und fixen die Lücken." },
  { question: "Wie läuft der Fix-Pilot ab?", answer: "Kickoff → Diagnose → Umsetzung → QA-Proof → Handover. Ohne Projekt-Theater." },
  { question: "Was kostet das insgesamt?", answer: "Abhängig von Stack und Umfang. Wir nennen vor Start einen fairen Korridor." }
];

export const SERVICE_PILLARS = [
  {
    icon: Settings,
    title: "Cookie-Banner & CMP-Modernisierung",
    description: "Gleichwertiges 'Alle ablehnen', saubere Vendor-Mappings, klare UX.",
    outcome: "Banner, das Nutzer akzeptieren und Juristen nicht hassen.",
    features: [
      "Banner, das Nutzer akzeptieren und Juristen nicht hassen.",
      "Saubere Vendor-Mappings.",
      "Klare UX Umsetzung."
    ],
    // Abstract Interface / Code / Dark Mode / Pink Accents
    image: "https://images.unsplash.com/photo-1614728853913-1e2386691901?q=80&w=1000&auto=format&fit=crop"
  },
  {
    icon: Database,
    title: "Consent Mode v2 (Basic/Advanced)",
    description: "Richtige Signals, richtiges Timing, richtiges Gating.",
    outcome: "Modellierung funktioniert, ohne Dunkel-Optimierung.",
    features: [
      "Modellierung funktioniert, ohne Blindflug.",
      "Richtiges Timing der Tags.",
      "Korrektes Gating."
    ],
    // Cyber Lock / Security / Neon Violet
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop"
  },
  {
    icon: Server,
    title: "Server-Side Tagging & GTM-Gating",
    description: "Tracking stabilisieren, Datenflüsse kontrollieren, weniger Pixel-Chaos.",
    outcome: "Mehr Datenqualität trotz Browser-Limits.",
    features: [
      "Mehr Datenqualität.",
      "Weniger Ausfall durch Browser-Limits.",
      "Kontrollierte Datenflüsse."
    ],
    // Data Center / Server Racks / Dark Tech
    image: "https://images.unsplash.com/photo-1544197150-b990a580bbc7c?q=80&w=1000&auto=format&fit=crop"
  },
  {
    icon: FileCheck,
    title: "DPA/AV-Audit & Proof-Stack",
    description: "Technische/organisatorische Prüfung + Nachweise für deine Akte.",
    outcome: "Sauber dokumentiert für Kunden, Anwälte, Auditoren.",
    features: [
      "Saubere Dokumentation für Kunden.",
      "Nachweise für Anwälte & Auditoren.",
      "Technische Prüfung."
    ],
    // Digital Analysis / Charts / Verification / Blockchain Vibe
    image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=1000&auto=format&fit=crop"
  }
];
