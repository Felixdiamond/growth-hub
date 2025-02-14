'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { cn } from '@/lib/utils';
import BlogCode from '@/components/blog/BlogCode';
import type { BundledLanguage } from 'shiki';
import type { CodeSnippet } from '@/types/code';

interface Props {
  snippet: CodeSnippet;
}

export default function ClientCodePage({ snippet }: Props) {
  // Map our language to Shiki's BundledLanguage
  const language = snippet.language as BundledLanguage;

  return (
    <div className="relative isolate min-h-screen bg-dark-900">
      <Navigation />
      
      <div className="mx-auto max-w-[1400px] px-6 py-24 sm:py-32 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-[900px] space-y-8"
        >
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              {snippet.tags?.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-accent-500/10 px-2.5 py-0.5 text-xs font-medium text-accent-400"
                >
                  {tag}
                </span>
              ))}
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
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              {snippet.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-dark-300">
              <span>{snippet.author}</span>
              <span>•</span>
              <time dateTime={new Date(snippet.date).toISOString()}>
                {new Date(snippet.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            <p className="text-lg text-dark-200">
              {snippet.description}
            </p>
          </div>

          {/* Code */}
          <div className="relative">
            <div className="absolute -inset-x-6 -inset-y-4 bg-accent-500/5 rounded-xl" />
            <div className="relative">
              <BlogCode
                language={language}
                filename={`${snippet.slug}.${snippet.language}`}
              >
                {snippet.code}
              </BlogCode>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 