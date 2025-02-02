'use client';

import { cn } from '@/lib/utils';

interface BlogInlineCodeProps {
  children: React.ReactNode;
  className?: string;
}

export default function BlogInlineCode({ children, className }: BlogInlineCodeProps) {
  return (
    <code 
      className={cn(
        "relative inline-flex items-center px-1.5",
        "font-mono text-[0.9em] font-medium leading-tight",
        "bg-accent-500/10 text-accent-300",
        "rounded border border-accent-500/10",
        "before:absolute before:inset-0",
        "before:bg-accent-500/5 before:opacity-0",
        "before:transition-opacity hover:before:opacity-100",
        className
      )}
    >
      {children}
    </code>
  );
} 