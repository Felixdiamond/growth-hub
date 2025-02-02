'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { getHighlighter, type BundledLanguage } from 'shiki';
import { Copy, Check } from 'lucide-react';
import { Toast, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '@/components/ui/Toast';

interface BlogCodeProps {
  children: string;
  className?: string;
  language?: BundledLanguage;
  filename?: string;
}

export default function BlogCode({ 
  children, 
  className,
  language = 'cpp',
  filename 
}: BlogCodeProps) {
  const [highlightedCode, setHighlightedCode] = useState(children);
  const [isCopied, setIsCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    async function highlight() {
      const highlighter = await getHighlighter({
        themes: ['github-dark'],
        langs: ['cpp', 'javascript', 'typescript', 'jsx', 'tsx']
      });

      const highlighted = highlighter.codeToHtml(children, { 
        lang: language,
        theme: 'github-dark'
      });
      setHighlightedCode(highlighted);
    }

    highlight();
  }, [children, language]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(children);
    setIsCopied(true);
    setShowToast(true);
    setTimeout(() => {
      setIsCopied(false);
      setShowToast(false);
    }, 2000);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "relative my-8 rounded-xl overflow-hidden",
          "bg-dark-800/50 border border-accent-500/10",
          className
        )}
      >
        {/* Header with filename and copy button */}
        <div className="flex items-center justify-between gap-2 px-4 py-2 border-b border-accent-500/10 bg-accent-500/5">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {filename && <span className="text-sm text-accent-300 font-mono">{filename}</span>}
          </div>
          
          <button
            onClick={copyToClipboard}
            className={cn(
              "p-2 rounded-lg transition-colors",
              "hover:bg-accent-500/10",
              "focus:outline-none focus:ring-2 focus:ring-accent-500/20"
            )}
            title="Copy code"
          >
            {isCopied ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-accent-400" />
            )}
          </button>
        </div>

        {/* Code content */}
        <div 
          className="p-4 overflow-x-auto text-sm font-mono text-dark-200 [&_pre]:!bg-transparent [&_pre]:!p-0"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </motion.div>

      {/* Toast notification */}
      <ToastProvider>
        {showToast && (
          <Toast>
            <div className="flex">
              <Check className="w-4 h-4 text-green-400 mr-2" />
              <ToastTitle>Copied to clipboard!</ToastTitle>
            </div>
          </Toast>
        )}
        <ToastViewport />
      </ToastProvider>
    </>
  );
} 