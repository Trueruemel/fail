import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface TrustBadgeProps {
  icon: LucideIcon;
  text: string;
  className?: string;
}

export function TrustBadge({ icon: Icon, text, className }: TrustBadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-brand-primary/30 bg-brand-primary/10 px-4 py-2 text-sm font-medium text-brand-primary',
        className
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{text}</span>
    </div>
  );
}
