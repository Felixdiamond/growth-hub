'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface BlogMediaProps {
  src?: string;
  alt?: string;
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

export default function BlogMedia({ src, alt }: BlogMediaProps) {
  return (
    <motion.div 
      variants={fadeUpVariants}
      className="group relative aspect-video mb-8 rounded-2xl overflow-hidden bg-dark-800 ring-1 ring-white/10 hover:ring-accent-500/30 transition-all duration-500"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
      <Image 
        src={src || ''} 
        alt={alt || ''} 
        fill 
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {alt && (
        <div className="absolute bottom-0 left-0 right-0 p-4 text-sm text-dark-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
          {alt}
        </div>
      )}
    </motion.div>
  );
} 