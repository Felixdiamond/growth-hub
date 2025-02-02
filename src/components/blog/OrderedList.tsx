'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface OrderedListProps {
  children: React.ReactNode;
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    x: -10,
    filter: 'blur(2px)'
  },
  visible: { 
    opacity: 1, 
    x: 0,
    filter: 'blur(0px)',
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 1
    }
  }
};

interface OrderedListItemProps {
  children: React.ReactNode;
  className?: string;
}

export function OrderedListItem({ children, className }: OrderedListItemProps) {
  return (
    <motion.li
      variants={itemVariants}
      className={cn(
        // Base styles
        "relative pl-12 text-lg/relaxed text-dark-200",
        "selection:bg-accent-500/20 selection:text-accent-200",
        
        // Number styling
        "before:absolute before:left-0",
        "before:flex before:items-center before:justify-center",
        "before:w-7 before:h-7 before:rounded-lg",
        "before:bg-accent-500/5",
        "before:border before:border-accent-500/10",
        "before:text-accent-400 before:text-sm",
        "before:font-mono before:font-medium",
        "before:transition-colors duration-300",
        
        // Counter content
        "before:content-[counter(ordered)]",
        
        // Hover effects
        "hover:text-dark-100",
        "hover:before:bg-accent-500/10",
        "hover:before:border-accent-500/20",
        "hover:before:text-accent-300",
        
        className
      )}
    >
      {children}
    </motion.li>
  );
}

export default function OrderedList({ children, className }: OrderedListProps) {
  return (
    <motion.ol
      variants={containerVariants}
      className={cn(
        "relative space-y-4 my-8",
        "list-none counter-reset-ordered",
        "[&>li]:before:counter-increment-ordered",
        className
      )}
    >
      {children}
    </motion.ol>
  );
} 
