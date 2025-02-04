// @ts-nocheck
'use client';

import { motion } from 'framer-motion';

interface BlogLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 20,
      mass: 1
    }
  }
};

export default function BlogLink({ children, ...props }: BlogLinkProps) {
  return (
    <motion.a
      variants={fadeUpVariants}
      {...props}
      className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-accent-500/10 hover:bg-accent-500/20 border border-accent-500/20 hover:border-accent-500/30 px-6 py-2 text-base font-medium text-accent-300 transition-all duration-300 my-4"
    >
      <span className="relative">
        {children}
      </span>
      <svg 
        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </motion.a>
  );
} 