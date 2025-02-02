'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-dark-900 flex items-center justify-center">
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

      <div className="relative z-10">
        {/* Animated circles */}
        <div className="relative w-24 h-24">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.2,
              }}
            >
              <div
                className="h-24 w-24 rounded-full border-t-2 border-r-2"
                style={{
                  transform: `scale(${1 - i * 0.15})`,
                  opacity: 1 - i * 0.2,
                  borderColor: i === 0 ? '#7DD3FC' : i === 1 ? '#38BDF8' : '#0EA5E9',
                }}
              />
            </motion.div>
          ))}

          {/* Center dot */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-3 h-3 bg-accent-300 rounded-full -translate-x-1/2 -translate-y-1/2"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Loading text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute top-32 left-1/2 transform -translate-x-1/2 text-center"
        >
          <p className="text-lg font-medium bg-gradient-to-r from-accent-300 via-accent-400 to-accent-300 text-transparent bg-clip-text animate-text-shimmer">
            Loading
          </p>
          <motion.div
            animate={{
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="flex justify-center mt-3 space-x-2"
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 bg-accent-400 rounded-full"
                animate={{
                  y: [0, -4, 0],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 