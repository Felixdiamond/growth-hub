'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BlogListItemProps {
  children: React.ReactNode;
  className?: string;
}

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

export default function BlogListItem({ 
  children,
  className 
}: BlogListItemProps) {
  return (
    <motion.li 
      variants={itemVariants}
      className={cn(
        // Base styles
        "group relative flex items-start gap-4",
        "text-dark-200 text-lg/relaxed",
        "selection:bg-accent-500/20 selection:text-accent-200",
        
        // Marker styles for unordered lists
        "marker:text-accent-500/40",
        
        // Custom bullet point for unordered lists
        "[&:not(:has(text))]:pl-8",
        "[&:not(:has(text))]:before:absolute",
        "[&:not(:has(text))]:before:left-0",
        "[&:not(:has(text))]:before:top-[0.6875rem]",
        "[&:not(:has(text))]:before:h-1.5",
        "[&:not(:has(text))]:before:w-1.5",
        "[&:not(:has(text))]:before:rounded-full",
        "[&:not(:has(text))]:before:bg-accent-500/30",
        "hover:[&:not(:has(text))]:before:bg-accent-500/50",
        "[&:not(:has(text))]:before:transition-colors",
        "[&:not(:has(text))]:before:ring-2",
        "[&:not(:has(text))]:before:ring-accent-500/10",
        "[&:not(:has(text))]:before:ring-offset-2",
        "[&:not(:has(text))]:before:ring-offset-dark-900",
        
        // Hover effects
        "transition-colors duration-200",
        "hover:text-dark-100",
        
        className
      )}
    >
      {children}
    </motion.li>
  );
} 