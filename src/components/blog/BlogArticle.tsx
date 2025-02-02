'use client';

import { motion } from 'framer-motion';

interface BlogArticleProps {
  children: React.ReactNode;
}

export default function BlogArticle({ children }: BlogArticleProps) {
  return (
    <motion.article 
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.15,
            duration: 0.5
          }
        }
      }}
      className="relative isolate"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-dark-800 via-dark-900 to-dark-800 opacity-50" />
      
      {/* Content container */}
      <div className="mx-auto max-w-[65ch] px-6 py-16 sm:py-24 lg:px-8">
        {/* Article content wrapper with proper typography */}
        <div className="prose prose-invert prose-lg max-w-none
          /* Headings */
          prose-headings:font-semibold
          prose-headings:text-transparent
          prose-headings:bg-clip-text
          prose-headings:bg-gradient-to-r
          prose-headings:from-accent-200
          prose-headings:to-accent-300
          prose-h1:text-4xl
          prose-h2:text-3xl
          prose-h3:text-2xl
          prose-h4:text-xl
          
          /* Paragraphs and lists */
          prose-p:text-dark-200
          prose-p:leading-relaxed
          prose-ul:text-dark-200
          prose-ol:text-dark-200
          
          /* Links */
          prose-a:text-accent-300
          prose-a:no-underline
          hover:prose-a:text-accent-200
          prose-a:transition-colors
          
          /* Code blocks */
          prose-pre:bg-dark-800/50
          prose-pre:border
          prose-pre:border-accent-500/10
          prose-pre:rounded-xl
          
          /* Inline code */
          prose-code:text-accent-200
          prose-code:before:content-none
          prose-code:after:content-none
          
          /* Images */
          prose-img:rounded-xl
          prose-img:shadow-lg
          
          /* Blockquotes */
          prose-blockquote:border-l-accent-500/30
          prose-blockquote:text-dark-200
          prose-blockquote:bg-accent-500/5
          prose-blockquote:rounded-r-lg
          prose-blockquote:py-2
          prose-blockquote:px-6
          
          /* Strong and emphasis */
          prose-strong:text-accent-200
          prose-em:text-accent-100"
        >
          {children}
        </div>
      </div>
    </motion.article>
  );
} 