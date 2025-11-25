import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Cookie } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Container } from './Container';

const Logo = () => (
  <Link to="/" className="flex items-center gap-2 text-2xl font-bold font-heading text-neutral-900 group">
    <div className="relative w-8 h-8 flex items-center justify-center bg-brand-primary rounded-md text-white transition-transform group-hover:scale-105">
       <Cookie className="w-5 h-5" />
    </div>
    <span className="tracking-tight">ConsentWerft</span>
  </Link>
);

const navLinks = [
  { href: '/leistungen', label: 'Leistungen' },
  { href: '/angebote', label: 'Pakete' },
  { href: '/dsgvo-center', label: 'DSGVO-Center' },
  { href: '/design-studio', label: 'Design Lab' }, // Added to menu
  { href: '/ueber-uns', label: 'Über Uns' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300 border-b',
        isScrolled
          ? 'border-neutral-200/50 bg-white/90 backdrop-blur-md shadow-sm'
          : 'border-transparent bg-transparent'
      )}
    >
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-brand-primary',
                  location.pathname === link.href 
                    ? 'text-brand-primary font-bold' 
                    : 'text-neutral-600'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex flex-col items-end">
            <Link to="/gespraech-buchen">
              <Button variant="gradient" size="sm" className="font-bold shadow-md hover:shadow-lg transition-all">Gratis-Check buchen</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-neutral-100 animate-in slide-in-from-top-2 duration-200">
          <Container className="py-6">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'text-lg font-medium p-2 rounded-lg transition-colors',
                    location.pathname === link.href ? 'bg-brand-primary/5 text-brand-primary font-bold' : 'text-neutral-800'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
               <div className="pt-4 mt-2 border-t border-neutral-100">
                <Link to="/gespraech-buchen" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="gradient" className="w-full justify-center">
                    Gratis-Check buchen
                  </Button>
                </Link>
               </div>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}