'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useStripePayment } from '@/hooks/useStripePayment';
import { toast } from 'sonner';

const SupportAndResources = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [donationAmount, setDonationAmount] = useState<string>('5.00');
  const [donationType, setDonationType] = useState<'one-time' | 'monthly' | 'yearly'>('one-time');
  const [selectedKit, setSelectedKit] = useState<string | null>(null);

  const kitOptions = [
    {
      title: "Elegoo Arduino Kit",
      description: "Professional Arduino kit from Elegoo available on Amazon. Comprehensive kit with premium components.",
      link: "https://amzn.to/3Yv56Jg",
      platform: "Amazon",
      features: ["Premium Quality", "Extensive Components", "Professional Grade"]
    }
  ];

  const donationOptions = ['5.00', '15.00', '100.00'];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  const { handlePayment, isLoading } = useStripePayment({
    onError: (error) => {
      toast.error('Payment failed: ' + error.message);
    },
  });

  return (
    <section id="support" className="relative py-16 sm:py-24 bg-dark-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-800 via-dark-900 to-dark-800" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent-500/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent,rgba(14,165,233,0.03),transparent)] animate-pulse" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div ref={containerRef} className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="space-y-3 sm:space-y-4"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              Support{" "}
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-300 via-accent-400 to-accent-300 animate-text-shimmer">
                  Growth Hub
                </span>
                <span className="absolute inset-x-0 bottom-0 h-2 bg-accent-400/10 -skew-x-6 transform" />
              </span>
            </h2>
            <p className="text-dark-100 text-base sm:text-lg max-w-2xl mx-auto">
              Help us continue sharing knowledge on electronics, Arduino programming, and everything in between to help you build your dream machine.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {/* Get Started Kits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 sm:space-y-6"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              Get Your Arduino Kit
            </h3>
            <div className="grid gap-3 sm:gap-4">
              {kitOptions.map((kit, index) => (
                <motion.div
                  key={kit.platform}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  <a
                    href={kit.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 sm:p-6 rounded-xl bg-dark-800 border border-dark-700 hover:border-accent-500/50 transition-all duration-300 group relative overflow-hidden"
                    onMouseEnter={() => setSelectedKit(kit.title)}
                    onMouseLeave={() => setSelectedKit(null)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-accent-500/0 via-accent-500/5 to-accent-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    
                    <div className="relative z-10">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-lg sm:text-xl font-semibold text-white group-hover:text-accent-300 transition-colors">
                          {kit.title}
                        </h4>
                        <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-300 text-xs sm:text-sm">
                          {kit.platform}
                        </span>
                      </div>
                      <p className="text-sm sm:text-base text-dark-100 mb-3">{kit.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {kit.features.map((feature, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-xs rounded-md bg-dark-700/50 text-dark-100"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Donation Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4 sm:space-y-6"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Support Our Work
            </h3>
            
            {/* Donation Type Selector */}
            <div className="flex rounded-lg bg-dark-800 p-1 mb-4 sm:mb-6">
              {(['one-time', 'monthly', 'yearly'] as const).map((type) => (
                <motion.button
                  key={type}
                  onClick={() => setDonationType(type)}
                  className={`flex-1 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-md transition-all duration-300 ${
                    donationType === type
                      ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/25'
                      : 'text-dark-100 hover:text-white hover:bg-dark-700'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                </motion.button>
              ))}
            </div>

            {/* Amount Selection */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
              {donationOptions.map((amount, index) => (
                <motion.button
                  key={amount}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  onClick={() => setDonationAmount(amount)}
                  className={`p-3 sm:p-4 rounded-lg border relative overflow-hidden ${
                    donationAmount === amount
                      ? 'border-accent-500 bg-accent-500/10 text-white shadow-lg shadow-accent-500/25'
                      : 'border-dark-700 bg-dark-800 text-dark-100 hover:border-accent-500/50'
                  } transition-all duration-300`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative z-10 text-sm sm:text-base">
                    ${amount}
                  </div>
                  {donationAmount === amount && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-accent-500/10 via-accent-500/5 to-accent-500/10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="relative group">
              <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-dark-100 text-sm sm:text-base">$</span>
              <input
                type="number"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                className="w-full px-7 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg bg-dark-800 border border-dark-700 text-white focus:border-accent-500 focus:ring-1 focus:ring-accent-500/50 focus:outline-none transition-all group-hover:border-accent-500/50"
                placeholder="Enter custom amount"
              />
            </div>

            {/* Donate Button */}
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(14,165,233,0.2)" }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3 sm:py-4 rounded-lg bg-accent-500 text-white text-sm sm:text-base font-medium transition-all duration-300 shadow-lg shadow-accent-500/25 relative overflow-hidden group ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
              onClick={() => handlePayment(donationAmount, donationType)}
              disabled={isLoading}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    {`Donate ${donationType !== 'one-time' ? donationType : ''} $${donationAmount}`}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent-400 to-accent-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center space-y-2"
        >
          <p className="text-sm sm:text-base text-dark-100">
            Your contribution helps us create more content and improve our tutorials.
          </p>
          <p className="text-sm sm:text-base text-accent-300 font-medium">
            Thank you for supporting the Arduino community! ❤️
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SupportAndResources; 