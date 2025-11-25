import React from 'react';

export const BoldCheck = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <circle cx="12" cy="12" r="10" fill="#6A0DAD" stroke="#6A0DAD" strokeWidth="2"/>
    <path d="M16 9L10.5 14.5L8 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const BoldShield = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" fill="#F7F7F9" stroke="#6A0DAD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 12L11 14L15 10" stroke="#FF4FA2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
