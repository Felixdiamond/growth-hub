'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BlogSectionProps {
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function BlogSection({ 
  children, 
  className,
  accent = false
}: BlogSectionProps) {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={cn(
        "relative my-16 first:mt-8",
        accent && [
          "p-8 rounded-2xl",
          "bg-gradient-to-br from-accent-500/5 via-accent-500/[0.02] to-transparent",
          "border border-accent-500/10",
          "before:absolute before:inset-0",
          "before:bg-gradient-to-br before:from-accent-500/10 before:via-transparent before:to-transparent",
          "before:opacity-0 before:transition-opacity before:duration-500",
          "hover:before:opacity-100",
        ],
        !accent && "px-1",
        className
      )}
    >
      {children}
    </motion.section>
  );
} 