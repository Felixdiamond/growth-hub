'use client';

import Image from 'next/image';
import BlogPostWrapper from '@/components/BlogPostWrapper';
import { motion } from 'framer-motion';

export default function ArduinoEp4Page() {
  return (
    <BlogPostWrapper postId={4}>
      <article className="relative isolate">
        {/* Header section */}
        <div className="pt-24 pb-8 sm:pt-32 sm:pb-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-2 mb-8"
            >
              <span className="inline-flex items-center rounded-full bg-dark-700/50 backdrop-blur-sm px-3 py-1 text-[13px] font-medium tracking-wide text-accent-300 border border-accent-500/20">
                ARDUINO LESSONS
              </span>
              <span className="inline-flex items-center rounded-full bg-dark-700/50 backdrop-blur-sm px-3 py-1 text-[13px] font-medium tracking-wide text-accent-300 border border-accent-500/20">
                LED
              </span>
              <span className="inline-flex items-center rounded-full bg-dark-700/50 backdrop-blur-sm px-3 py-1 text-[13px] font-medium tracking-wide text-accent-300 border border-accent-500/20">
                Programming
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl font-bold tracking-tight sm:text-6xl text-white [text-wrap:balance] leading-[1.1] mb-8"
            >
              Understanding the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-300 via-accent-400 to-accent-300 animate-text-shimmer">
                LED Blink Code
              </span>
            </motion.h1>

            {/* Author info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-4"
            >
              <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-400 to-accent-500" />
                <span className="relative text-sm font-medium text-white">S</span>
              </div>
              <div>
                <div className="text-[14px] font-semibold tracking-wide text-white">
                  Shaun Sosi
                </div>
                <div className="text-[13px] tracking-wide text-dark-200">
                  November 2, 2024
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative mx-auto max-w-7xl px-6 lg:px-8 mb-16"
        >
          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl bg-dark-800 shadow-2xl ring-1 ring-dark-700 hover:ring-accent-500/20 transition-all duration-300">
            <div className="aspect-video">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="LED Blink Code Explained"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mx-auto max-w-3xl prose prose-lg prose-invert"
          >
            {/* Kit Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-accent-300 via-accent-400 to-accent-300">Get Your Arduino Kit</h2>
              <div className="flex flex-col items-center gap-6">
                <a 
                  href="https://amzn.to/3Yv56Jg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 hover:bg-accent-600 px-8 py-4 text-base font-semibold text-white transition-all shadow-lg hover:shadow-xl"
                >
                  🛒 Get the Arduino (Elegoo) Kit
                </a>
              </div>
            </div>

            {/* Essential Functions Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-accent-300 via-accent-400 to-accent-300">Essential Arduino Functions</h2>
              <div className="space-y-6">
                <div className="bg-dark-800/80 backdrop-blur-sm rounded-xl p-6 border border-dark-700">
                  <h3 className="text-xl font-semibold mb-4 text-accent-300">pinMode()</h3>
                  <p className="text-dark-100">
                    Tells the Arduino which pin you're connected to and what mode (INPUT or OUTPUT) to set that pin to.
                  </p>
                  <div className="mt-4 bg-dark-900 rounded-lg p-4">
                    <code className="text-sm text-dark-100">pinMode(7, OUTPUT);</code>
                  </div>
                </div>

                <div className="bg-dark-800/80 backdrop-blur-sm rounded-xl p-6 border border-dark-700">
                  <h3 className="text-xl font-semibold mb-4 text-accent-300">digitalWrite()</h3>
                  <p className="text-dark-100">
                    Used to send signals to control connected external components such as LEDs, buzzers, motors, etc.
                  </p>
                  <div className="mt-4 bg-dark-900 rounded-lg p-4">
                    <code className="text-sm text-dark-100">digitalWrite(7, HIGH);</code>
                  </div>
                </div>

                <div className="bg-dark-800/80 backdrop-blur-sm rounded-xl p-6 border border-dark-700">
                  <h3 className="text-xl font-semibold mb-4 text-accent-300">delay()</h3>
                  <p className="text-dark-100">
                    Pauses the program for a specified amount of time (in milliseconds).
                  </p>
                  <div className="mt-4 bg-dark-900 rounded-lg p-4">
                    <code className="text-sm text-dark-100">delay(1000); // Wait for 1 second</code>
                  </div>
                </div>
              </div>
            </div>

            {/* Complete Code Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-accent-300 via-accent-400 to-accent-300">Complete LED Blink Code</h2>
              <div className="bg-dark-800 rounded-2xl p-8 border border-dark-700 shadow-lg hover:shadow-xl transition-all">
                <div className="bg-dark-900 rounded-lg p-6">
                  <pre className="text-sm overflow-x-auto text-dark-100">
                    <code>{`// LED Blink Example
int ledPin = 7;  // LED connected to pin 7

void setup() {
  pinMode(ledPin, OUTPUT);  // Set pin as output
}

void loop() {
  digitalWrite(ledPin, HIGH);  // Turn LED on
  delay(1000);                 // Wait 1 second
  digitalWrite(ledPin, LOW);   // Turn LED off
  delay(1000);                 // Wait 1 second
}`}</code>
                  </pre>
                </div>
                <div className="mt-6 space-y-4">
                  <h3 className="text-xl font-semibold text-accent-300">Code Explanation</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="flex-none flex items-center justify-center w-6 h-6 rounded-full bg-accent-500 text-white font-semibold text-sm">1</span>
                      <span className="text-dark-100">First, we define which pin the LED is connected to (pin 7 in this case).</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-none flex items-center justify-center w-6 h-6 rounded-full bg-accent-500 text-white font-semibold text-sm">2</span>
                      <span className="text-dark-100">In setup(), we configure the pin as an OUTPUT using pinMode().</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-none flex items-center justify-center w-6 h-6 rounded-full bg-accent-500 text-white font-semibold text-sm">3</span>
                      <span className="text-dark-100">The loop() function contains the main blinking logic: turn on LED, wait, turn off LED, wait.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </article>
    </BlogPostWrapper>
  );
} 