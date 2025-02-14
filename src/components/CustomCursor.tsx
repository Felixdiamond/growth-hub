'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const cursorScaleRef = useRef<GSAPTween | null>(null);
  const followerScaleRef = useRef<GSAPTween | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    // Initial setup
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    // Create smooth animation for cursor movement
    window.addEventListener('mousemove', (e) => {
      gsap.to(cursor, {
        duration: 0.1,
        x: e.clientX,
        y: e.clientY,
      });
      
      gsap.to(follower, {
        duration: 0.5,
        x: e.clientX,
        y: e.clientY,
        ease: 'power2.out',
      });
    });

    // Add hover effects for interactive elements
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isLink = target.tagName.toLowerCase() === 'a';
      const isButton = target.tagName.toLowerCase() === 'button' || target.getAttribute('role') === 'button';
      const isInput = target.tagName.toLowerCase() === 'input' || target.tagName.toLowerCase() === 'textarea';
      const isCard = target.closest('[data-cursor="card"]');
      
      if (isLink || isButton) {
        cursorScaleRef.current = gsap.to(cursor, {
          duration: 0.3,
          scale: 1.2,
          backgroundColor: 'rgba(14, 165, 233, 0.25)', // accent-500 with opacity
        });
        
        followerScaleRef.current = gsap.to(follower, {
          duration: 0.3,
          scale: 1.5,
          backgroundColor: 'rgba(56, 189, 248, 0.12)', // accent-400 with opacity
        });
      } else if (isInput) {
        cursorScaleRef.current = gsap.to(cursor, {
          duration: 0.3,
          scale: 0.5,
          backgroundColor: 'rgba(14, 165, 233, 0.15)',
        });
        
        followerScaleRef.current = gsap.to(follower, {
          duration: 0.3,
          scale: 0.8,
          backgroundColor: 'rgba(56, 189, 248, 0.08)',
        });
      } else if (isCard) {
        cursorScaleRef.current = gsap.to(cursor, {
          duration: 0.3,
          scale: 1.5,
          backgroundColor: 'rgba(14, 165, 233, 0.12)',
        });
        
        followerScaleRef.current = gsap.to(follower, {
          duration: 0.3,
          scale: 1.8,
          backgroundColor: 'rgba(56, 189, 248, 0.06)',
        });
      }
    };

    const handleMouseLeave = () => {
      cursorScaleRef.current?.reverse();
      followerScaleRef.current?.reverse();
    };

    // Add event listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, [data-cursor="card"]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Hide cursor when leaving window
    const handleWindowLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 || e.clientX <= 0 || e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) {
        gsap.to([cursor, follower], {
          duration: 0.3,
          opacity: 0,
        });
      }
    };

    const handleWindowEnter = () => {
      gsap.to([cursor, follower], {
        duration: 0.3,
        opacity: 1,
      });
    };

    // Hide default cursor
    document.body.style.cursor = 'none';

    // Add window event listeners
    document.addEventListener('mouseleave', handleWindowLeave);
    document.addEventListener('mouseenter', handleWindowEnter);

    // Cleanup
    return () => {
      document.body.style.cursor = 'auto';
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      document.removeEventListener('mouseleave', handleWindowLeave);
      document.removeEventListener('mouseenter', handleWindowEnter);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] w-2.5 h-2.5 rounded-full bg-accent-500/25 mix-blend-difference transition-transform duration-300 ease-out"
      />
      <div
        ref={followerRef}
        className="fixed pointer-events-none z-[9998] w-5 h-5 rounded-full bg-accent-400/15 mix-blend-difference transition-transform duration-300 ease-out"
      />
    </>
  );
};

export default CustomCursor; 