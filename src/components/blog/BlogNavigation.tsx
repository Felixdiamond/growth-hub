'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { blogPosts } from '@/data/blog-posts';
import { cn } from '@/lib/utils';

interface BlogNavigationProps {
  currentSlug: string;
}

export default function BlogNavigation({ currentSlug }: BlogNavigationProps) {
  // Find current post index
  const currentIndex = blogPosts.findIndex(post => post.slug === currentSlug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <motion.nav
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-2xl"
    >
      <motion.div 
        className="relative flex items-center justify-between gap-4 p-4 rounded-2xl bg-dark-800/95 backdrop-blur-md border border-dark-700 shadow-xl"
        variants={itemVariants}
      >
        {/* Previous Post */}
        {prevPost ? (
          <Link
            href={`/blog/${prevPost.slug}`}
            className={cn(
              "group flex items-center gap-3 py-2 px-4 rounded-xl",
              "bg-dark-700/50 hover:bg-dark-700",
              "border border-dark-600/50 hover:border-dark-600",
              "transition-all duration-300"
            )}
          >
            <ChevronLeft className="w-4 h-4 text-dark-300 group-hover:text-accent-400 transition-colors" />
            <div className="hidden sm:block text-right">
              <div className="text-xs text-dark-400">Previous</div>
              <div className="text-sm font-medium text-dark-200 group-hover:text-accent-300 transition-colors">
                Episode {prevPost.episode}
              </div>
            </div>
          </Link>
        ) : (
          <div className="w-[100px]" />
        )}

        {/* Current Episode Indicator */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="px-4 py-2 rounded-lg bg-accent-500/10 border border-accent-500/20">
            <span className="text-sm font-medium text-accent-400">
              Episode {currentIndex + 1}
            </span>
          </div>
        </div>

        {/* Next Post */}
        {nextPost ? (
          <Link
            href={`/blog/${nextPost.slug}`}
            className={cn(
              "group flex items-center gap-3 py-2 px-4 rounded-xl",
              "bg-dark-700/50 hover:bg-dark-700",
              "border border-dark-600/50 hover:border-dark-600",
              "transition-all duration-300"
            )}
          >
            <div className="hidden sm:block">
              <div className="text-xs text-dark-400">Next</div>
              <div className="text-sm font-medium text-dark-200 group-hover:text-accent-300 transition-colors">
                Episode {nextPost.episode}
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-dark-300 group-hover:text-accent-400 transition-colors" />
          </Link>
        ) : (
          <div className="w-[100px]" />
        )}

        {/* Quick Navigation Menu (Optional) */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="p-2 rounded-lg bg-dark-800 border border-dark-700 shadow-lg">
            <div className="text-xs text-dark-400">Quick Nav</div>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
} 