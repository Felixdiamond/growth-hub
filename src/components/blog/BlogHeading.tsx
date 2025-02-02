'use client';

import { motion } from 'framer-motion';

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

interface BlogHeadingProps {
  children: React.ReactNode;
  as: 'h1' | 'h2' | 'h3';
  size: '1' | '2' | '3';
}

const styles = {
  '1': `
    text-4xl md:text-5xl lg:text-6xl
    font-bold tracking-tight
    text-balance
    mb-16
  `,
  '2': `
    text-2xl md:text-3xl
    font-semibold
    text-balance
    mb-8
    flex items-baseline gap-3
  `,
  '3': `
    text-lg md:text-xl
    font-medium
    text-balance
    text-dark-100
    mb-6
    flex items-baseline gap-3
  `
};

export default function BlogHeading({ children, as, size }: BlogHeadingProps) {
  const Component = motion[as];
  const className = styles[size];

  if (size === '1') {
    return (
      <Component 
        variants={fadeUpVariants}
        className={className}
      >
        <span className="relative inline-block">
          <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/80">
            {children}
          </span>
          <motion.div 
            className="absolute -bottom-4 left-0 h-px w-24 bg-gradient-to-r from-accent-500 to-transparent"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 96, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          />
        </span>
      </Component>
    );
  }

  if (size === '2') {
    return (
      <Component 
        variants={fadeUpVariants}
        className={className}
      >
        <motion.div
          className="w-1 h-1 rounded-full bg-accent-500/80"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-200 to-accent-300">
          {children}
        </span>
      </Component>
    );
  }

  return (
    <Component 
      variants={fadeUpVariants}
      className={className}
    >
      <motion.div
        className="w-0.5 h-0.5 rounded-full bg-accent-500/50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      />
      <span>
        {children}
      </span>
    </Component>
  );
} 