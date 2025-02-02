'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BlogCalloutProps {
  children: React.ReactNode;
  className?: string;
  type?: 'tip' | 'note' | 'warning' | 'important';
  icon?: React.ReactNode;
}

const icons = {
  tip: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  note: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  important: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  )
};

const colors = {
  tip: "from-blue-500/10 via-blue-500/5 to-transparent border-blue-500/10 text-blue-400",
  note: "from-accent-500/10 via-accent-500/5 to-transparent border-accent-500/10 text-accent-400",
  warning: "from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/10 text-amber-400",
  important: "from-rose-500/10 via-rose-500/5 to-transparent border-rose-500/10 text-rose-400"
};

export default function BlogCallout({ 
  children, 
  className,
  type = 'note',
  icon = icons[type]
}: BlogCalloutProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative my-8 p-6 rounded-xl",
        "bg-gradient-to-br border",
        colors[type],
        className
      )}
    >
      <div className="flex gap-4">
        <div className="flex-shrink-0 mt-1">
          {icon}
        </div>
        <div className="flex-1 text-dark-200 [&>:first-child]:mt-0 [&>:last-child]:mb-0">
          {children}
        </div>
      </div>
    </motion.div>
  );
} 