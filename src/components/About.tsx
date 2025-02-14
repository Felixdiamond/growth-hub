'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { WavyBackground } from './ui/wavy-background';
import Image from 'next/image';
import { Target, Wrench, BookOpen, Users } from 'lucide-react';

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const textVariants = {
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

  return (
    <section id="about" className="relative bg-dark-900 overflow-hidden">
      <WavyBackground 
        className="max-w-6xl mx-auto px-4"
        containerClassName="min-h-[70vh] sm:min-h-[80vh] py-16 sm:py-24"
        colors={[
          'rgba(14,165,233,0.15)',
          'rgba(56,189,248,0.15)',
          'rgba(125,211,252,0.15)'  
        ]}
        waveWidth={100}
        backgroundFill="#0A0A0F"
        blur={12}
        speed="slow"
        waveOpacity={0.8}
      >
        <div ref={containerRef}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Left Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative mx-auto lg:mx-0 max-w-[400px] lg:max-w-none w-full"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-dark-800 via-dark-700 to-dark-800 border border-dark-600/50 shadow-xl shadow-dark-900/50">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-500/10 via-accent-400/5 to-transparent" />
                
                {/* Growth Hub Image */}
                <div className="relative w-full h-full">
                  <Image
                    src="/images/gh.jpg"
                    alt="Growth Hub"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                {/* Decorative Elements */}
                <div className="absolute inset-0">
                  <motion.div
                    className="absolute w-40 h-40 blur-3xl"
                    style={{
                      top: '20%',
                      left: '20%',
                      background: 'radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)',
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute w-32 h-32 blur-2xl"
                    style={{
                      bottom: '30%',
                      right: '25%',
                      background: 'radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 70%)',
                    }}
                    animate={{
                      scale: [1.2, 1, 1.2],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute -bottom-4 sm:-bottom-8 -right-4 sm:-right-8 bg-dark-800/90 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-dark-600/50 shadow-lg"
              >
                <div className="flex items-center gap-4 sm:gap-6">
                  <a
                    href="https://youtube.com/@theofficialgrowthub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-accent-400 transition-colors duration-300"
                  >
                    <motion.svg 
                      whileHover={{ scale: 1.1 }}
                      className="w-5 h-5 sm:w-6 sm:h-6" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </motion.svg>
                  </a>
                  <a
                    href="mailto:growthub2024@outlook.com"
                    className="text-white hover:text-accent-400 transition-colors duration-300"
                  >
                    <motion.svg 
                      whileHover={{ scale: 1.1 }}
                      className="w-6 h-6" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </motion.svg>
                  </a>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="space-y-6 sm:space-y-8"
            >
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center space-x-2 px-3 sm:px-4 py-1.5 rounded-full bg-accent-500/10 border border-accent-500/20 backdrop-blur-sm"
              >
                <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-accent-400 animate-pulse" />
                <span className="text-xs sm:text-sm font-medium text-white">Welcome to Growth Hub</span>
              </motion.div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight drop-shadow-sm">
                Your Gateway to{" "}
                <span className="relative">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-accent-300 via-accent-400 to-accent-300 animate-text-shimmer font-extrabold">
                    Electronics Mastery
                  </span>
                  <span className="absolute inset-x-0 bottom-0 h-3 bg-accent-400/10 -skew-x-6 transform" />
                </span>
              </h2>

              <div className="space-y-4 sm:space-y-6 text-base sm:text-lg">
                <motion.p 
                  custom={1}
                  variants={textVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="leading-relaxed text-white/90 drop-shadow-sm"
                >
                  Growth Hub is your dedicated platform for mastering electronics and Arduino programming. We're committed to breaking down complex concepts into easy-to-follow tutorials, helping you build your dream projects from the ground up.
                </motion.p>
                <motion.p 
                  custom={2}
                  variants={textVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="leading-relaxed text-white/90 drop-shadow-sm"
                >
                  Whether you're a complete beginner or looking to advance your skills, our comprehensive tutorials and hands-on approach will guide you through every step of your learning journey. We believe in making electronics education accessible to everyone.
                </motion.p>
                <motion.p 
                  custom={3}
                  variants={textVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="text-accent-300 font-medium leading-relaxed drop-shadow-sm"
                >
                  Join our growing community of makers and innovators as we explore the exciting world of electronics together.
                </motion.p>

                {/* Key Features */}
                <motion.div
                  custom={4}
                  variants={textVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="grid grid-cols-2 gap-4 pt-4"
                >
                  {[
                    { icon: <Target className="w-5 h-5 text-accent-400" />, text: "Step-by-step Guidance" },
                    { icon: <Wrench className="w-5 h-5 text-accent-400" />, text: "Hands-on Projects" },
                    { icon: <BookOpen className="w-5 h-5 text-accent-400" />, text: "Comprehensive Resources" },
                    { icon: <Users className="w-5 h-5 text-accent-400" />, text: "Community Support" }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 bg-dark-800/50 backdrop-blur-sm rounded-lg p-3 border border-dark-700/50 group hover:border-accent-500/30 transition-colors duration-300">
                      <span className="transform group-hover:scale-110 transition-transform duration-300">{feature.icon}</span>
                      <span className="text-sm text-white/90">{feature.text}</span>
                    </div>
                  ))}
                </motion.div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
                <motion.a
                  href="https://youtube.com/@theofficialgrowthub"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(14,165,233,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-accent-500 text-white font-medium transition-all duration-300 text-center relative overflow-hidden shadow-lg shadow-accent-500/25"
                >
                  <span className="relative z-10 text-sm sm:text-base flex items-center justify-center gap-2">
                    Watch Tutorials
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-400 to-accent-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.a>
                <motion.a
                  href="#newsletter"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-dark-700/50 backdrop-blur-sm text-white font-medium border border-dark-600/50 hover:bg-dark-600/50 transition-all duration-300 text-center group shadow-lg"
                >
                  <span className="group-hover:text-accent-300 transition-colors duration-300 text-sm sm:text-base">Get Updates</span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </WavyBackground>
    </section>
  );
};

export default About;