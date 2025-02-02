'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomScrollbar = () => {
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollbar = scrollbarRef.current;
    const progress = progressRef.current;

    if (!scrollbar || !progress) return;

    // Calculate and update scroll progress
    const updateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercent = scrollTop / (documentHeight - windowHeight);
      
      gsap.to(progress, {
        scaleY: scrollPercent,
        duration: 0.1,
        ease: 'power2.out',
      });
    };

    // Add hover effect
    const handleMouseEnter = () => {
      gsap.to(scrollbar, {
        width: '12px',
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(scrollbar, {
        width: '6px',
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    // Listen for Lenis scroll events
    window.addEventListener('scroll', updateProgress, { passive: true });
    scrollbar.addEventListener('mouseenter', handleMouseEnter);
    scrollbar.addEventListener('mouseleave', handleMouseLeave);

    // Initial progress update
    updateProgress();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', updateProgress);
      scrollbar.removeEventListener('mouseenter', handleMouseEnter);
      scrollbar.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={scrollbarRef}
      className="fixed right-0 top-0 w-1.5 h-full bg-dark-700/30 z-50 transition-all duration-300"
    >
      <div
        ref={progressRef}
        className="w-full bg-accent-500/50 origin-top"
        style={{ height: '100%', transform: 'scaleY(0)' }}
      />
    </div>
  );
};

export default CustomScrollbar; 