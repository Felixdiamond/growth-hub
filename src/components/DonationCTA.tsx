'use client';

import { motion } from 'framer-motion';

export default function DonationCTA() {
  return (
    <div className="relative">
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent-500/10 via-accent-400/5 to-accent-500/10 rounded-2xl" />

      <div className="relative rounded-2xl border border-accent-500/20 backdrop-blur-sm overflow-hidden">
        <div className="px-6 py-8 sm:p-10 sm:pb-6">
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-bold text-white tracking-tight">Support Growth Hub</h3>
            <div className="mt-3 text-center">
              <p className="text-dark-100">
                Help us create more free Arduino tutorials and resources.
              </p>
            </div>
          </div>
        </div>
        <div className="px-6 pt-6 pb-8 sm:px-10 sm:pt-8 sm:pb-10 bg-dark-800/30">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="rounded-xl space-y-4"
          >
            <a
              href="https://www.buymeacoffee.com/growthub"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full px-6 py-4 text-base font-medium text-white bg-accent-500 hover:bg-accent-400 rounded-xl transition-colors duration-200 shadow-lg shadow-accent-500/25"
            >
              <span className="mr-3">☕</span>
              Buy me a coffee
            </a>
            <p className="text-sm text-center text-dark-200">
              Your support helps keep these tutorials free and accessible to everyone.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}