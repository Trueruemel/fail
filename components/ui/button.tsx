import * as React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'gradient';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    
    const variants = {
      default: "bg-neutral-900 text-white hover:bg-neutral-800",
      destructive: "bg-red-500 text-white hover:bg-red-500/90",
      outline: "border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-900",
      secondary: "bg-neutral-100 text-neutral-900 hover:bg-neutral-100/80",
      ghost: "hover:bg-neutral-100 hover:text-neutral-900",
      link: "text-neutral-900 underline-offset-4 hover:underline",
      gradient: "bg-brand-gradient text-white hover:opacity-95 shadow-glow",
    };

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8 text-base",
      icon: "h-10 w-10",
    };

    return (
      <button
        className={cn(
          // Added focus-visible:ring-offset-2 for distinct separation and clearer focus indication
          "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] hover:scale-[1.03]",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };