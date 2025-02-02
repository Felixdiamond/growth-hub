'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const SupportAndResources = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [donationAmount, setDonationAmount] = useState<string>('5.00');
  const [donationType, setDonationType] = useState<'one-time' | 'monthly' | 'yearly'>('one-time');

  const kitOptions = [
    {
      title: "Temu Arduino Kit",
      description: "Get started with this affordable Arduino kit from Temu",
      link: "https://temu.to/k/u77r95d7o9p",
      platform: "Temu"
    },
    {
      title: "Elegoo Arduino Kit",
      description: "Professional Arduino kit from Elegoo available on Amazon",
      link: "https://amzn.to/3Yv56Jg",
      platform: "Amazon"
    }
  ];

  const donationOptions = ['5.00', '15.00', '100.00'];

  return (
    <section className="relative py-24 bg-dark-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-800 via-dark-900 to-dark-800" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent-500/5 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div ref={containerRef} className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Support{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-300 via-accent-400 to-accent-300 animate-text-shimmer">
                Growth Hub
              </span>
            </h2>
            <p className="text-dark-100 text-lg max-w-2xl mx-auto">
              Help us continue sharing knowledge on electronics, Arduino programming, and everything in between to help you build your dream machine.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Get Started Kits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Get Your Arduino Kit</h3>
            <div className="grid gap-4">
              {kitOptions.map((kit) => (
                <a
                  key={kit.platform}
                  href={kit.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-6 rounded-xl bg-dark-800 border border-dark-700 hover:border-accent-500/50 transition-all duration-300 group"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xl font-semibold text-white group-hover:text-accent-300 transition-colors">
                      {kit.title}
                    </h4>
                    <span className="px-3 py-1 rounded-full bg-dark-700 text-dark-100 text-sm">
                      {kit.platform}
                    </span>
                  </div>
                  <p className="text-dark-100">{kit.description}</p>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Donation Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Support Our Work</h3>
            
            {/* Donation Type Selector */}
            <div className="flex rounded-lg bg-dark-800 p-1 mb-6">
              {(['one-time', 'monthly', 'yearly'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setDonationType(type)}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                    donationType === type
                      ? 'bg-accent-500 text-white'
                      : 'text-dark-100 hover:text-white'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                </button>
              ))}
            </div>

            {/* Amount Selection */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {donationOptions.map((amount) => (
                <button
                  key={amount}
                  onClick={() => setDonationAmount(amount)}
                  className={`p-4 rounded-lg border ${
                    donationAmount === amount
                      ? 'border-accent-500 bg-accent-500/10 text-white'
                      : 'border-dark-700 bg-dark-800 text-dark-100 hover:border-accent-500/50'
                  } transition-all duration-300`}
                >
                  ${amount}
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-100">$</span>
              <input
                type="number"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                className="w-full px-8 py-3 rounded-lg bg-dark-800 border border-dark-700 text-white focus:border-accent-500 focus:outline-none transition-colors"
                placeholder="Enter custom amount"
              />
            </div>

            {/* Donate Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-lg bg-accent-500 text-white font-medium hover:bg-accent-400 transition-colors mt-6"
            >
              {`Donate ${donationType !== 'one-time' ? donationType : ''} $${donationAmount}`}
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center text-dark-100"
        >
          Your contribution helps us create more content and improve our tutorials. Thank you for your support!
        </motion.div>
      </div>
    </section>
  );
};

export default SupportAndResources; 