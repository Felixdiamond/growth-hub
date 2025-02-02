'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface BlogCodeBlockProps {
  code: string;
  language: string;
}

const BlogCodeBlock = ({ code, language }: BlogCodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative group"
    >
      <div className="absolute right-4 top-4 z-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-700/50 backdrop-blur-sm border border-dark-600 hover:border-accent-500/20 transition-colors"
        >
          {copied ? (
            <>
              <svg className="w-4 h-4 text-accent-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-xs font-medium text-accent-300">Copied!</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4 text-dark-100 group-hover:text-accent-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span className="text-xs font-medium text-dark-100 group-hover:text-accent-300 transition-colors">Copy</span>
            </>
          )}
        </motion.button>
      </div>

      <div className="relative rounded-2xl overflow-hidden bg-dark-800 border border-dark-700">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Code header */}
        <div className="relative z-10 h-10 bg-dark-900/50 border-b border-dark-700 flex items-center px-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="ml-4 text-sm text-dark-200 font-mono">{language}</div>
        </div>

        {/* Code content */}
        <div className="relative z-10 p-6">
          <SyntaxHighlighter
            language={language}
            style={oneDark}
            showLineNumbers
            wrapLines
            className="rounded-2xl p-4 my-6 text-sm"
            lineNumberStyle={{ color: '#666', minWidth: '2.5em' }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCodeBlock; 