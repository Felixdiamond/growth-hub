'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import PixelCard from './ui/pixel-card';

const Features = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const features = [
    {
      title: "Beginner Friendly",
      description: "Start from zero with our carefully crafted beginner tutorials. No prior experience needed - just bring your curiosity!",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" className="stroke-accent-300" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" className="stroke-accent-300" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" className="stroke-accent-300" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      path: "/blog/getting-started-with-arduino-ep1",
      topics: ["Basic Circuits", "LED Control", "Digital Pins"],
      variant: "blue"
    },
    {
      title: "Hands-on Projects",
      description: "Learn by building real projects. Each tutorial comes with practical examples and complete circuit diagrams.",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 6L12 18" className="stroke-accent-300" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M8 10L12 6L16 10" className="stroke-accent-300" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="4" y="4" width="16" height="16" rx="2" className="stroke-accent-300" strokeWidth="1.5"/>
          <path d="M4 9H20" className="stroke-accent-300" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      path: "/blog/led-dimming-pwm-ep9",
      topics: ["PWM", "Sensors", "Automation"],
      variant: "blue"
    },
    {
      title: "Advanced Topics",
      description: "Dive deep into complex Arduino concepts. Master advanced programming techniques and hardware integration.",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 10H19C21 10 22 9 22 7V5C22 3 21 2 19 2H17C15 2 14 3 14 5V7C14 9 15 10 17 10Z" className="stroke-accent-300" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 22H7C9 22 10 21 10 19V17C10 15 9 14 7 14H5C3 14 2 15 2 17V19C2 21 3 22 5 22Z" className="stroke-accent-300" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6 10C8.20914 10 10 8.20914 10 6C10 3.79086 8.20914 2 6 2C3.79086 2 2 3.79086 2 6C2 8.20914 3.79086 10 6 10Z" className="stroke-accent-300" strokeWidth="1.5"/>
          <path d="M18 22C20.2091 22 22 20.2091 22 18C22 15.7909 20.2091 14 18 14C15.7909 14 14 15.7909 14 18C14 20.2091 15.7909 22 18 22Z" className="stroke-accent-300" strokeWidth="1.5"/>
        </svg>
      ),
      path: "/blog/rgb-setcolor-function-ep16",
      topics: ["IoT", "RGB Control", "Functions"],
      variant: "blue"
    },
  ];

  return (
    <section className="relative py-24 bg-dark-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900" />
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent-500/10 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative">
        <div ref={containerRef} className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Your Learning{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-300 via-accent-400 to-accent-300 animate-text-shimmer">
                Journey
              </span>
            </h2>
            <p className="text-dark-100 text-lg max-w-2xl mx-auto">
              Follow our structured learning path to master Arduino programming - from basic concepts to advanced applications.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Link href={feature.path} key={feature.title} className="block">
              <PixelCard
                variant={feature.variant}
                className="group cursor-pointer"
              >
                <div className="absolute inset-0 p-8 flex flex-col">
                  <div className="p-3 w-16 h-16 rounded-xl bg-dark-800/80 backdrop-blur-sm flex items-center justify-center group-hover:bg-dark-700/80 transition-colors">
                    {feature.icon}
                  </div>
                  <div className="mt-6 space-y-2">
                    <h3 className="text-xl font-semibold text-white group-hover:text-accent-300 transition-colors">{feature.title}</h3>
                    <p className="text-white/80">{feature.description}</p>
                  </div>
                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {feature.topics.map((topic) => (
                        <span 
                          key={topic}
                          className="px-3 py-1 text-sm rounded-full bg-dark-800/80 backdrop-blur-sm text-white/80 border border-dark-700/50 group-hover:border-accent-500/30 transition-colors"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </PixelCard>
            </Link>
          ))}
        </div>

        {/* Learning Path Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 flex justify-center"
        >
          <div className="inline-flex items-center space-x-4 px-6 py-3 rounded-full bg-dark-800/80 backdrop-blur-sm border border-dark-700">
            <div className="w-3 h-3 rounded-full bg-accent-500 animate-pulse" />
            <span className="text-white/80">Start your journey today - all tutorials are completely free!</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features; 