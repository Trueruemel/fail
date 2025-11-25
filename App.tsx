import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ConsentBanner } from './components/layout/ConsentBanner';
import { Home } from './pages/Home';
import { Offers } from './pages/Offers';
import { Services } from './pages/Services';
import { DsgvoCenter } from './pages/DsgvoCenter';
import { AboutUs } from './pages/AboutUs';
import { Booking } from './pages/Booking';
import { DesignStudio } from './pages/DesignStudio';
import { ChatBot } from './components/features/ChatBot';
import ScrollToTop from './components/shared/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-white text-neutral-900 font-sans antialiased selection:bg-brand-primary/20">
        <Header />
        <main className="flex-grow w-full overflow-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/leistungen" element={<Services />} />
            <Route path="/angebote" element={<Offers />} />
            <Route path="/dsgvo-center" element={<DsgvoCenter />} />
            <Route path="/ueber-uns" element={<AboutUs />} />
            <Route path="/gespraech-buchen" element={<Booking />} />
            <Route path="/design-studio" element={<DesignStudio />} />
          </Routes>
        </main>
        <Footer />
        <ConsentBanner />
        <ChatBot />
      </div>
    </Router>
  );
}

export default App;