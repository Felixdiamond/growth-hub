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

      {/* Newsletter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mx-auto max-w-7xl px-6 lg:px-8 pb-24 sm:pb-32"
      >
        <div className="mx-auto max-w-2xl rounded-3xl bg-dark-800 ring-1 ring-dark-700 p-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Stay Updated
          </h2>
          <p className="mt-4 text-lg text-dark-200">
            Subscribe to our newsletter to receive updates on new Arduino tutorials, projects, and tips.
          </p>
          <form className="mt-6 sm:flex sm:max-w-md gap-x-4">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              name="email-address"
              id="email-address"
              autoComplete="email"
              required
              className="w-full min-w-0 appearance-none rounded-lg border-0 bg-dark-900 px-4 py-3 text-base text-white placeholder-dark-400 shadow-sm ring-1 ring-inset ring-dark-700 focus:ring-2 focus:ring-inset focus:ring-accent-500 sm:text-sm sm:leading-6"
              placeholder="Enter your email"
            />
            <div className="mt-4 sm:mt-0 sm:flex-shrink-0">
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-lg bg-accent-500 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-accent-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 sm:text-sm sm:leading-6"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
} 