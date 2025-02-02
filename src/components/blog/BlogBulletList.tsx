'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BlogListProps {
  children: React.ReactNode;
  className?: string;
}

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

export function BlogListItem({ children, className }: BlogListItemProps) {
  return (
    <motion.li
      variants={itemVariants}
      className={cn(
        "group relative text-dark-200 text-lg/relaxed",
        "selection:bg-accent-500/20 selection:text-accent-200",
        "pl-8 pb-1",
        
        // Bullet point styling
        "before:absolute before:left-0 before:top-[0.6875rem]",
        "before:h-1.5 before:w-1.5 before:rounded-full",
        "before:bg-accent-500/30 hover:before:bg-accent-500/50",
        "before:transition-colors before:ring-2",
        "before:ring-accent-500/10 before:ring-offset-2",
        "before:ring-offset-dark-900",
        
        // Text styling
        "[&>strong]:text-dark-100 [&>strong]:font-semibold",
        "[&_code]:relative [&_code]:-top-[1px]",
        
        // Hover effect
        "hover:text-dark-100 transition-colors duration-200",
        className
      )}
    >
      {children}
    </motion.li>
  );
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

export default function BlogList({ children, className }: BlogListProps) {
  return (
    <motion.ul
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={cn(
        "relative space-y-3 my-6",
        "ml-2 list-none",
        className
      )}
    >
      {children}
    </motion.ul>
  );
} 