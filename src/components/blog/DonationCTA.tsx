'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Heart, Coffee, Gift, Star } from 'lucide-react';
import { useStripePayment } from '@/hooks/useStripePayment';
import { toast } from 'sonner';

const DONATION_AMOUNTS = [
  { amount: 5, icon: Coffee, label: "Buy me a coffee" },
  { amount: 15, icon: Heart, label: "Show some love" },
  { amount: 100, icon: Star, label: "Become a star supporter" }
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export default function DonationCTA() {
  const [donationType, setDonationType] = useState<'one-time' | 'monthly' | 'yearly'>('one-time');
  const [customAmount, setCustomAmount] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const { handlePayment, isLoading } = useStripePayment({
    onError: (error) => {
      toast.error('Payment failed: ' + error.message);
    },
  });

  return (
    <motion.section
      id="support"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative my-16"
    >
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-500/20 via-accent-500/5 to-transparent rounded-2xl" />
      
      <div className="relative p-8 rounded-2xl border border-accent-500/20 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-accent-200 to-accent-300 bg-clip-text text-transparent">
              Support Our Work
            </h2>
            <p className="text-dark-200 mt-2">
              Help us create more amazing content
            </p>
          </div>
          <Gift className="w-8 h-8 text-accent-400" />
        </div>

        {/* Donation Type Selector */}
        <motion.div variants={itemVariants} className="flex rounded-lg bg-dark-800 p-1 mb-4">
          {(['one-time', 'monthly', 'yearly'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setDonationType(type)}
              className={cn(
                "flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                donationType === type
                  ? "bg-accent-500 text-white shadow-lg shadow-accent-500/20"
                  : "text-dark-200 hover:text-white hover:bg-dark-700"
              )}
            >
              {type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </button>
          ))}
        </motion.div>

        {/* Amount Selection */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {DONATION_AMOUNTS.map(({ amount, icon: Icon, label }) => (
            <button
              key={amount}
              onClick={() => setCustomAmount(amount.toString())}
              className={cn(
                "relative p-4 rounded-xl text-left transition-all duration-300",
                "border group",
                customAmount === amount.toString()
                  ? "bg-accent-500/10 border-accent-500/30 shadow-lg shadow-accent-500/10"
                  : "bg-dark-800/50 border-dark-700 hover:border-accent-500/20 hover:bg-dark-700/50"
              )}
            >
              <div className="flex items-start gap-4">
                <div className={cn(
                  "p-2 rounded-lg transition-colors duration-300",
                  customAmount === amount.toString()
                    ? "bg-accent-500 text-white"
                    : "bg-dark-700 text-dark-200 group-hover:bg-dark-600"
                )}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-lg text-dark-100">
                    ${amount}
                  </div>
                  <div className="text-sm text-dark-300">
                    {label}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </motion.div>

        {/* Custom Amount Input */}
        <motion.div variants={itemVariants} className="mt-4">
          <label htmlFor="custom-amount" className="block text-sm text-dark-200 mb-2">
            Or enter a custom amount
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400">$</span>
            <input
              type="number"
              id="custom-amount"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className={cn(
                "w-full pl-8 pr-4 py-3 bg-dark-800/50 rounded-xl",
                "text-white placeholder-dark-400",
                "border border-dark-700 transition-all duration-300",
                "focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500/50 focus:outline-none"
              )}
              placeholder="Enter amount"
            />
          </div>
        </motion.div>

        {/* Donate Button */}
        <motion.button
          variants={itemVariants}
          className={cn(
            "w-full mt-6 px-8 py-4 rounded-xl font-semibold",
            "bg-gradient-to-r from-accent-500 to-accent-400",
            "text-white shadow-lg shadow-accent-500/20",
            "transition-all duration-300 hover:shadow-accent-500/30",
            "hover:-translate-y-0.5 active:translate-y-0",
            isLoading && "opacity-75 cursor-not-allowed"
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => handlePayment(customAmount, donationType)}
          disabled={isLoading}
        >
          <span className="flex items-center justify-center gap-2">
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
                <Heart 
                  className={cn(
                    "w-5 h-5 transition-transform duration-500",
                    isHovered && "animate-pulse"
                  )} 
                />
                Donate ${customAmount || '0'}
              </>
            )}
          </span>
        </motion.button>

        <motion.p 
          variants={itemVariants}
          className="text-center text-dark-200 text-sm mt-6"
        >
          Your contribution helps us create more amazing content. Thank you! 💖
        </motion.p>
      </div>
    </motion.section>
  );
} 