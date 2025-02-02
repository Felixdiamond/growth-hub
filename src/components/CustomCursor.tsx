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
    const handleMouseEnter = () => {
      cursorScaleRef.current = gsap.to(cursor, {
        duration: 0.3,
        scale: 1.5,
        backgroundColor: 'rgba(14, 165, 233, 0.2)', // accent-500 with opacity
      });
      
      followerScaleRef.current = gsap.to(follower, {
        duration: 0.3,
        scale: 2,
        backgroundColor: 'rgba(56, 189, 248, 0.1)', // accent-400 with opacity
      });
    };

    const handleMouseLeave = () => {
      cursorScaleRef.current?.reverse();
      followerScaleRef.current?.reverse();
    };

    // Add event listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Hide default cursor
    document.body.style.cursor = 'none';

    // Cleanup
    return () => {
      document.body.style.cursor = 'auto';
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-50 w-4 h-4 rounded-full bg-accent-500/30 mix-blend-difference transition-transform duration-300 ease-out"
      />
      <div
        ref={followerRef}
        className="fixed pointer-events-none z-50 w-8 h-8 rounded-full bg-accent-400/20 mix-blend-difference transition-transform duration-300 ease-out"
      />
    </>
  );
};

export default CustomCursor; 