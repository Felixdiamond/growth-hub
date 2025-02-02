'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Squares from './animations/Squares';
import SplitText from './animations/SplitText';
import CountUp from './animations/CountUp';
import TypewriterCode from './animations/TypewriterCode';
import { HeroHighlight, Highlight } from './ui/hero-highlight';
import Link from 'next/link';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  const codeSnippet = `
void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000);
}`.trim();

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen flex items-center justify-center bg-dark-900 overflow-hidden"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0">
        <Squares
          direction="diagonal"
          speed={0.5}
          borderColor="rgba(14, 165, 233, 0.1)"
          hoverFillColor="rgba(14, 165, 233, 0.05)"
          squareSize={50}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent-500/10 border border-accent-500/20">
                <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
                <span className="text-xs sm:text-sm text-accent-200">Learn Arduino Programming</span>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <SplitText
                    text="Master Electronics with"
                    className="block text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-none tracking-tight md:lg:whitespace-nowrap"
                    delay={50}
                    textAlign="left"
                    onLetterAnimationComplete={() => {}}
                    animationFrom={{ opacity: 0, transform: 'translate3d(0,40px,0)' }}
                  />
                </div>
                <HeroHighlight containerClassName="!h-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <Highlight className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-none tracking-tight text-black">
                      The Growth Hub
                    </Highlight>
                  </motion.div>
                </HeroHighlight>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg sm:text-xl text-dark-100 max-w-xl leading-relaxed"
              >
                From basic circuits to advanced IoT projects, learn Arduino programming through hands-on projects and real-world applications.
              </motion.p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/blog/getting-started-with-arduino-ep1">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-8 py-4 rounded-lg bg-accent-500 text-white font-medium hover:bg-accent-400 transition-colors text-center"
                  >
                    Start Learning
                  </motion.button>
                </Link>
                <Link href="/blog">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-8 py-4 rounded-lg bg-dark-700 text-white font-medium border border-dark-600 hover:bg-dark-600 transition-colors text-center group"
                  >
                    <span className="group-hover:text-accent-300 transition-colors">Browse Tutorials</span>
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 sm:flex sm:items-center sm:gap-8 text-dark-200"
            >
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-xl sm:text-2xl font-bold text-white">
                  <CountUp to={20} />+
                </div>
                <div className="text-xs sm:text-sm">Free Tutorials</div>
              </div>
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-xl sm:text-2xl font-bold text-white">
                  <CountUp to={15} />+
                </div>
                <div className="text-xs sm:text-sm">Projects</div>
              </div>
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-xl sm:text-2xl font-bold text-white">100%</div>
                <div className="text-xs sm:text-sm">Free Content</div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Visual Elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            style={{ y }}
            className="relative"
          >
            {/* Code Preview */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-dark-800 border border-dark-700 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-500/10 to-transparent" />
              
              {/* Code Editor Header */}
              <div className="relative z-10 h-10 bg-dark-900/50 border-b border-dark-700 flex items-center justify-between px-4">
                <div className="flex items-center space-x-4">
                  {/* File indicator */}
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-sm text-dark-200">Blink.ino</span>
                  </div>
                  {/* File type */}
                  <span className="text-xs px-2 py-1 rounded-md bg-accent-500/20 text-accent-300">Arduino Sketch</span>
                </div>
                {/* Status indicators */}
                <div className="flex items-center space-x-3">
                  <span className="text-xs px-2 py-1 rounded-md bg-green-500/20 text-green-300">Verified</span>
                  <span className="text-xs px-2 py-1 rounded-md bg-blue-500/20 text-blue-300">Upload Ready</span>
                </div>
              </div>

              {/* Code Content */}
              <div className="relative z-10 p-6">
                <TypewriterCode code={codeSnippet} speed={30} />
              </div>

              {/* Learning Context */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute bottom-4 right-4 bg-dark-900/90 backdrop-blur-sm rounded-lg p-3 border border-dark-700"
              >
                <div className="flex items-center gap-4">
                  {/* Progress indicator */}
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-dark-300">Lesson</span>
                    <span className="text-lg font-bold text-accent-400">01</span>
                    <span className="text-xs text-dark-300">Basic</span>
                  </div>
                  {/* Learning objective */}
                  <div className="text-sm border-l border-dark-700 pl-4">
                    <div className="text-dark-200 font-medium">Learning Objective</div>
                    <div className="text-dark-300">Control digital outputs</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Learning Path Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute -bottom-8 -right-8 bg-dark-800 rounded-xl p-4 border border-dark-700"
            >
              <div className="flex items-center gap-4">
                {/* Skill progression */}
                <div className="flex items-center space-x-1">
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                    <span className="text-green-400 text-sm">✓</span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-accent-500/20 border border-accent-500/30 flex items-center justify-center">
                    <span className="text-accent-400 text-sm">⚡</span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                    <span className="text-purple-400 text-sm">⚙</span>
                  </div>
                </div>
                <div className="text-sm">
                  <div className="text-white font-medium">Skill Progress</div>
                  <div className="text-dark-200">Digital → Analog → Advanced</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-dark-200 text-sm">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 border-2 border-dark-400 rounded-full flex justify-center p-1"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-1 bg-dark-300 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero; 