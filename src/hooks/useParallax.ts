"use client";
import { useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

interface ParallaxOptions {
  offset?: number[]; // Input range
  outputRange?: number[]; // Output range
  clamp?: boolean;
}

export function useParallax(options: ParallaxOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const {
    offset = [0, 1],
    outputRange = [0, 1],
    clamp = false,
  } = options;

  const value = useTransform(scrollYProgress, offset, outputRange, {
    clamp,
  });

  return { ref, value };
}

// Custom hook for multi-layer parallax
export function useMultiLayerParallax(count: number, baseSpeed: number = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const layers = Array.from({ length: count }, (_, i) => {
    const speed = baseSpeed * (i + 1);
    return useTransform(scrollYProgress, [0, 1], [0, speed * 100]);
  });

  return { ref, layers };
}

// Custom hook for perspective parallax
export function usePerspectiveParallax(depth: number = 0.5) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 + depth]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * depth]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 15 * depth]);

  return { ref, scale, y, rotateX };
}

// Custom hook for reveal parallax
export function useRevealParallax(direction: "up" | "down" | "left" | "right" = "up") {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const directionMap = {
    up: { y: [100, 0] },
    down: { y: [-100, 0] },
    left: { x: [100, 0] },
    right: { x: [-100, 0] },
  };

  const movement = useTransform(
    scrollYProgress,
    [0, 1],
    Object.values(directionMap[direction])[0]
  );

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return { ref, movement, opacity };
} 