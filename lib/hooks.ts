import { useEffect, useRef, useState, CSSProperties } from 'react';

export type AnimationType = 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'zoom-in';

export interface ScrollAnimationOptions {
  type?: AnimationType;
  delay?: number;
  duration?: number;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const {
    type = 'fade-up',
    delay = 0,
    duration = 400,
    threshold = 0.1,
    rootMargin = '0px',
    once = true
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Prefer reduced motion check
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && element) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [threshold, rootMargin, once]);

  const getInitialTransform = () => {
    switch (type) {
      case 'fade-up': return 'translate3d(0, 20px, 0)';
      case 'slide-left': return 'translate3d(-20px, 0, 0)';
      case 'slide-right': return 'translate3d(20px, 0, 0)';
      case 'zoom-in': return 'scale3d(0.95, 0.95, 1)';
      default: return 'none';
    }
  };

  const getFinalTransform = () => {
    switch (type) {
      case 'zoom-in': return 'scale3d(1, 1, 1)';
      default: return 'translate3d(0, 0, 0)';
    }
  };

  const style: CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? getFinalTransform() : getInitialTransform(),
    transition: `opacity ${duration}ms cubic-bezier(0.2, 0.8, 0.2, 1), transform ${duration}ms cubic-bezier(0.2, 0.8, 0.2, 1)`,
    transitionDelay: `${delay}ms`,
    willChange: isVisible ? 'auto' : 'opacity, transform', // Optimization: release memory after animation
  };

  return { ref, isVisible, style };
}