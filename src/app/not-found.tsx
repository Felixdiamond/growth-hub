'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function NotFound() {
  const [dimensions, setDimensions] = useState({ width: 1000, height: 800 });

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:24px_24px]"
        style={{
          maskImage: 'radial-gradient(ellipse at center, black, transparent)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black, transparent)'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800/50 to-dark-900" />

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 Text */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-300 via-accent-400 to-accent-300 animate-text-shimmer">
              404
            </h2>
          </motion.div>

          {/* Animated Icon */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="mb-8"
          >
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 bg-accent-500/20 rounded-full blur-xl animate-pulse-slow" />
              <svg
                className="w-24 h-24 relative z-10 text-accent-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-dark-100">
            Page Not Found
          </h1>

          <p className="text-xl text-dark-200 mb-8 max-w-lg mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/" className="inline-block">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-accent-500/10 hover:bg-accent-500/20 text-accent-300 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg shadow-accent-500/5 border border-accent-400/20 hover:border-accent-400/30"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Back to Home
                  <svg 
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M13 7l5 5m0 0l-5 5m5-5H6" 
                    />
                  </svg>
                </span>
              </motion.div>
            </Link>
          </motion.div>

          {/* Floating particles */}
          <AnimatePresence>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-accent-400/30 rounded-full"
                initial={{
                  x: Math.random() * dimensions.width,
                  y: Math.random() * dimensions.height,
                  scale: Math.random() * 0.5 + 0.5,
                }}
                animate={{
                  y: [null, '-100vh'],
                  opacity: [0.3, 0],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
} 