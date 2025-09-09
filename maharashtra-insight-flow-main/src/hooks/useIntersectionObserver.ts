import { useEffect, useRef } from 'react';

export const useIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
) => {
  const targetRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(callback, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options,
    });

    observer.observe(target);

    return () => observer.unobserve(target);
  }, [callback, options]);

  return targetRef;
};

// Auto-animate elements when they come into view
export const useAutoAnimate = () => {
  const callback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        entry.target.classList.remove('opacity-0');
      }
    });
  };

  return useIntersectionObserver(callback);
};