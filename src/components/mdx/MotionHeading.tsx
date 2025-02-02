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

interface MotionHeadingProps {
  children: React.ReactNode;
  as: 'h1' | 'h2' | 'h3';
  size: '1' | '2' | '3';
}

const styles = {
  '1': "text-4xl font-bold tracking-tight sm:text-6xl text-white [text-wrap:balance] leading-[1.1] mb-12",
  '2': "group relative text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-accent-300 via-accent-400 to-accent-300 hover:from-accent-400 hover:via-accent-300 hover:to-accent-400 transition-all duration-300",
  '3': "text-xl font-semibold mb-6 text-accent-300 [text-wrap:balance]"
};

export default function MotionHeading({ children, as, size }: MotionHeadingProps) {
  const Component = motion[as];
  const className = styles[size];

  return (
    <Component variants={fadeUpVariants} className={className}>
      {size === '2' && (
        <span className="absolute -left-6 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent-500/30 group-hover:scale-[1.5] group-hover:bg-accent-500/50 transition-all duration-300" />
      )}
      {children}
    </Component>
  );
} 