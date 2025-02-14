'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import PixelCard from './ui/pixel-card';

const Features = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 * i,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };

  const features = [
    {
      title: "Start Your Journey",
      description: "Begin with the basics of Arduino programming and electronics. Learn about digital pins, LED control, and fundamental circuit concepts through hands-on examples.",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" className="stroke-accent-300" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" className="stroke-accent-300" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" className="stroke-accent-300" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      path: "",
      topics: ["Digital I/O", "Circuit Basics", "First Sketch"],
      variant: "blue",
      level: "Beginner"
    },
    {
      title: "Build Real Projects",
      description: "Create interactive projects using sensors and actuators. Master PWM control, analog readings, and serial communication while building practical applications.",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 6L12 18" className="stroke-accent-300" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M8 10L12 6L16 10" className="stroke-accent-300" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="4" y="4" width="16" height="16" rx="2" className="stroke-accent-300" strokeWidth="1.5"/>
          <path d="M4 9H20" className="stroke-accent-300" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      path: "",
      topics: ["Sensors", "PWM Control", "Serial Monitor"],
      variant: "blue",
      level: "Intermediate"
    },
    {
      title: "Master Advanced Skills",
      description: "Take your projects to the next level with advanced techniques. Learn functions, libraries, and IoT integration to create sophisticated Arduino applications.",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 10H19C21 10 22 9 22 7V5C22 3 21 2 19 2H17C15 2 14 3 14 5V7C14 9 15 10 17 10Z" className="stroke-accent-300" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 22H7C9 22 10 21 10 19V17C10 15 9 14 7 14H5C3 14 2 15 2 17V19C2 21 3 22 5 22Z" className="stroke-accent-300" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6 10C8.20914 10 10 8.20914 10 6C10 3.79086 8.20914 2 6 2C3.79086 2 2 3.79086 2 6C2 8.20914 3.79086 10 6 10Z" className="stroke-accent-300" strokeWidth="1.5"/>
          <path d="M18 22C20.2091 22 22 20.2091 22 18C22 15.7909 20.2091 14 18 14C15.7909 14 14 15.7909 14 18C14 20.2091 15.7909 22 18 22Z" className="stroke-accent-300" strokeWidth="1.5"/>
        </svg>
      ),
      path: "",
      topics: ["Functions", "Libraries", "IoT Projects"],
      variant: "blue",
      level: "Advanced"
    },
  ];

  return (
    <section className="relative py-16 sm:py-24 bg-dark-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900" />
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent-500/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(14,165,233,0.05)_50%,transparent_100%)] animate-gradient-x" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative">
        <div ref={containerRef} className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="space-y-3 sm:space-y-4"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              Your Learning{" "}
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-300 via-accent-400 to-accent-300 animate-text-shimmer">
                  Journey
                </span>
                <span className="absolute inset-x-0 bottom-0 h-2 bg-accent-400/10 -skew-x-6 transform" />
              </span>
            </h2>
            <p className="text-dark-100 text-base sm:text-lg max-w-2xl mx-auto">
              Follow our structured learning path to master Arduino programming - from basic concepts to advanced applications.
            </p>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={feature.title} 
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="flex justify-center max-w-[400px] md:max-w-none mx-auto w-full"
              >
                <div className="w-full">
                  <PixelCard
                    variant={feature.variant}
                    className="group cursor-default"
                  >
                    <div className="absolute inset-0 p-6 sm:p-8 flex flex-col">
                      <div className="relative">
                        <div className="p-3 w-14 h-14 rounded-xl bg-dark-800/80 backdrop-blur-sm flex items-center justify-center group-hover:bg-dark-700/80 transition-colors">
                          {feature.icon}
                        </div>
                        <div className="absolute -top-2 -right-2 px-2 py-1 rounded-full bg-accent-500/10 border border-accent-500/20 text-xs text-accent-300">
                          {feature.level}
                        </div>
                      </div>
                      <div className="mt-6 space-y-3 flex-grow">
                        <h3 className="text-xl font-semibold text-white group-hover:text-accent-300 transition-colors">{feature.title}</h3>
                        <p className="text-base text-white/80 leading-relaxed">{feature.description}</p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-dark-700/50">
                        <div className="flex flex-wrap gap-2">
                          {feature.topics.map((topic) => (
                            <span 
                              key={topic}
                              className="px-3 py-1 text-sm rounded-full bg-dark-800/80 backdrop-blur-sm text-white/80 border border-dark-700/50 group-hover:border-accent-500/30 group-hover:text-accent-300 transition-colors"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </PixelCard>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 sm:mt-20 text-center"
        >
          <Link 
            href="/blog/getting-started-with-arduino-ep1" 
            className="group inline-flex items-center text-accent-300 hover:text-accent-200 transition-colors text-lg sm:text-xl font-medium"
          >
            Start learning for free
            <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Features; 