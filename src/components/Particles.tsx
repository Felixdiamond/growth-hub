'use client';

import { useEffect, useRef, useState } from 'react';
import { useSpring } from '@react-spring/web';
import { createNoise2D } from 'simplex-noise';
import { cn } from '@/lib/utils';

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  refresh?: boolean;
  color?: string;
  vx?: number;
  vy?: number;
}

export function Particles({
  className = '',
  quantity = 50,
  staticity = 50,
  ease = 50,
  refresh = false,
  color = '#64748b',
  vx = 0,
  vy = 0,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const noise2D = createNoise2D();
  const particles = useRef<Array<{ x: number; y: number; vx: number; vy: number }>>([]);
  const animationFrameId = useRef<number>();
  const mousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dimensions = useRef<{ width: number; height: number }>({ width: 0, height: 0 });

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      setContext(ctx);
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!context || !canvasRef.current) return;

    const handleResize = () => {
      if (!canvasRef.current || !context) return;
      
      dimensions.current.width = window.innerWidth;
      dimensions.current.height = window.innerHeight;
      canvasRef.current.width = dimensions.current.width;
      canvasRef.current.height = dimensions.current.height;

      particles.current = Array.from({ length: quantity }, () => ({
        x: Math.random() * dimensions.current.width,
        y: Math.random() * dimensions.current.height,
        vx: 0,
        vy: 0,
      }));
    };

    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = { x: event.clientX, y: event.clientY };
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      if (!context || !canvasRef.current) return;

      context.clearRect(0, 0, dimensions.current.width, dimensions.current.height);
      context.fillStyle = color;

      particles.current.forEach((particle, i) => {
        // Calculate distance from mouse
        const dx = mousePosition.current.x - particle.x;
        const dy = mousePosition.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200; // Maximum distance for mouse influence

        // Mouse influence
        if (distance < maxDistance) {
          const force = (1 - distance / maxDistance) * 0.2;
          particle.vx += dx * force / distance;
          particle.vy += dy * force / distance;
        }

        // Noise influence
        const time = Date.now() * 0.001;
        const noiseX = noise2D(particle.x * 0.01, time) * 0.1;
        const noiseY = noise2D(particle.y * 0.01, time + 1000) * 0.1;

        particle.vx += noiseX + vx;
        particle.vy += noiseY + vy;

        // Apply ease
        particle.vx *= (100 - ease) * 0.01;
        particle.vy *= (100 - ease) * 0.01;

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Keep particles within bounds
        if (particle.x < 0) particle.x = dimensions.current.width;
        if (particle.x > dimensions.current.width) particle.x = 0;
        if (particle.y < 0) particle.y = dimensions.current.height;
        if (particle.y > dimensions.current.height) particle.y = 0;

        // Draw particle
        context.beginPath();
        context.arc(particle.x, particle.y, 1.5, 0, Math.PI * 2);
        context.fill();
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [context, quantity, staticity, ease, refresh, color, vx, vy]);

  return (
    <canvas
      ref={canvasRef}
      className={cn('absolute inset-0 -z-10', className)}
      style={{ opacity: 0.75 }}
    />
  );
} 