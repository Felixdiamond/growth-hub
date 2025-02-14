'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { codeSnippets } from '@/data/code-snippets';
import Navigation from '@/components/Navigation';
import { cn } from '@/lib/utils';

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 1
    }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

export default function CodePage() {
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
                Code Library
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-dark-200">
              A collection of tested and verified Arduino code snippets for your projects. Copy, modify, and learn from these examples.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Code grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24 sm:pb-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid gap-8 md:grid-cols-2"
        >
          {codeSnippets.map((snippet) => (
            <motion.article
              key={snippet.slug}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl bg-dark-800 p-6 transition-all hover:bg-dark-750"
            >
              <Link href={`/code/${snippet.slug}`} className="block">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    {snippet.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-accent-500/10 px-2.5 py-0.5 text-xs font-medium text-accent-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span
                    className={cn(
                      "px-2.5 py-0.5 text-xs font-medium rounded-full",
                      snippet.difficulty === 'Beginner' && "bg-green-500/10 text-green-400",
                      snippet.difficulty === 'Intermediate' && "bg-yellow-500/10 text-yellow-400",
                      snippet.difficulty === 'Advanced' && "bg-red-500/10 text-red-400"
                    )}
                  >
                    {snippet.difficulty}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-white group-hover:text-accent-400 transition-colors">
                  {snippet.title}
                </h2>
                <p className="mt-2 line-clamp-2 text-dark-200">
                  {snippet.description}
                </p>
                <div className="mt-4 flex items-center justify-between text-sm text-dark-300">
                  <span>{snippet.author}</span>
                  <time dateTime={new Date(snippet.date).toISOString()}>
                    {new Date(snippet.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
                <div className="mt-4 p-4 rounded-lg bg-dark-900/50 border border-dark-700">
                  <pre className="text-xs text-dark-200 overflow-hidden line-clamp-3">
                    <code className={`language-${snippet.language}`}>
                      {snippet.code}
                    </code>
                  </pre>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  );
} 