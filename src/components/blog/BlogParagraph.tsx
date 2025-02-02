'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BlogParagraphProps {
  children: React.ReactNode;
  lead?: boolean;
  className?: string;
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
      mass: 1,
      duration: 0.7
    }
  }
};

export default function BlogParagraph({ 
  children, 
  lead = false,
  className 
}: BlogParagraphProps) {
  return (
    <motion.p 
      variants={fadeUpVariants}
      className={cn(
        "relative mb-6 [text-wrap:balance] tracking-wide",
        lead ? [
          "text-xl/relaxed md:text-2xl/relaxed",
          "font-light text-dark-100",
          "max-w-[65ch]",
          "mb-8"
        ] : [
          "text-lg/relaxed",
          "text-dark-200",
          "selection:bg-accent-500/20 selection:text-accent-200"
        ],
        // Add a subtle gradient line on the left for lead paragraphs
        lead && "pl-6 border-l-2 border-gradient-to-b from-accent-500/20 via-accent-500/10 to-transparent",
        className
      )}
    >
      {children}
    </motion.p>
  );
} 