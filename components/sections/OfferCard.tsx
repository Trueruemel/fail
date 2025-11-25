import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { BoldCheck } from '../ui/custom-icons';

interface OfferCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  ctaText: string;
  linkTarget?: string;
  moreDetails?: string[]; // Optional extended details
  scope?: {
    includes: string;
    excludes: string;
  };
}

export function OfferCard({ 
  title, 
  price, 
  description, 
  features, 
  ctaText, 
  linkTarget = "/gespraech-buchen",
  moreDetails,
  scope
}: OfferCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="relative flex flex-col h-full border-neutral-200 hover:border-brand-primary hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 hover:bg-brand-primary/[0.04] transition-all duration-300 bg-white group">
      <CardHeader>
        <CardTitle className="text-2xl text-neutral-900 font-bold">{title}</CardTitle>
        <CardDescription className="mt-2 text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-baseline gap-2 mb-8">
          <p className="text-4xl font-bold text-brand-primary">{price}</p>
        </div>
        
        <ul className="space-y-4 mb-6">
          {features.slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <BoldCheck className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <span className="text-neutral-700 font-medium">{feature}</span>
            </li>
          ))}
        </ul>

        {/* New Scope Hints */}
        {scope && (
          <div className="mt-4 mb-6 pt-4 border-t border-neutral-100 space-y-1.5">
             <div className="flex items-baseline gap-2">
                 <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 min-w-[60px]">Enthält:</span>
                 <span className="text-[13px] text-neutral-700 font-medium leading-tight">{scope.includes}</span>
             </div>
             <div className="flex items-baseline gap-2">
                 <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 min-w-[60px]">Nicht enth.:</span>
                 <span className="text-[13px] text-neutral-400 leading-tight">{scope.excludes}</span>
             </div>
          </div>
        )}

        {/* Progressive Disclosure Section */}
        <div className="relative z-20">
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation(); // Prevent card click when toggling details
              setIsExpanded(!isExpanded);
            }}
            className="flex items-center text-sm font-semibold text-brand-primary hover:text-brand-accent transition-colors focus:outline-none"
          >
            {isExpanded ? 'Weniger Details' : 'Alle Details anzeigen'}
            {isExpanded ? <ChevronUp className="ml-1 w-4 h-4" /> : <ChevronDown className="ml-1 w-4 h-4" />}
          </button>

          <div className={cn(
            "grid transition-all duration-300 ease-in-out overflow-hidden",
            isExpanded ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
          )}>
            <div className="min-h-0 space-y-4">
              {/* Remaining main features */}
              {features.slice(3).map((feature, index) => (
                <li key={`main-${index}`} className="flex items-start gap-3">
                  <BoldCheck className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <span className="text-neutral-700 text-sm">{feature}</span>
                </li>
              ))}
              {/* Extra details if provided */}
              {moreDetails && moreDetails.map((detail, index) => (
                 <li key={`extra-${index}`} className="flex items-start gap-3 pl-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-300 mt-2 flex-shrink-0" />
                    <span className="text-neutral-600 text-sm">{detail}</span>
                 </li>
              ))}
            </div>
          </div>
        </div>

      </CardContent>
      <CardFooter className="pt-2">
        {/* Stretched Link Pattern: The after:absolute after:inset-0 makes the Link cover the relative parent Card */}
        <Link to={linkTarget} className="w-full after:absolute after:inset-0 outline-none focus:ring-0">
            <Button 
              variant="gradient" 
              className="w-full text-lg py-6 shadow-md hover:shadow-lg transition-shadow pointer-events-none"
              tabIndex={-1}
            >
              {ctaText}
            </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}