'use client';

import { motion } from 'framer-motion';
import BlogGrid from '@/components/blog/BlogList';
import Navigation from '@/components/Navigation';
import type { BlogPost } from '@/types/blog';

export default function BlogPageContent({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="relative isolate min-h-screen bg-dark-900">
      <Navigation />
      
      {/* Header section */}
      <div className="pt-24 pb-8 sm:pt-32 sm:pb-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-white [text-wrap:balance] leading-[1.1]">
              Arduino{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-300 via-accent-400 to-accent-300 animate-text-shimmer">
                Lessons
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-dark-200">
              Learn Arduino programming and electronics with our comprehensive series of tutorials. From basic concepts to advanced projects, we've got you covered.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Blog grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24 sm:pb-32">
        <BlogGrid posts={posts} />
      </div>
    </div>
  );
} 