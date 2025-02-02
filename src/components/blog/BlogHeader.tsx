'use client';

import { motion } from 'framer-motion';

interface BlogHeaderProps {
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 20,
      mass: 1
    }
  }
};

export default function BlogHeader({ title, description, date, author, tags }: BlogHeaderProps) {
  // Split title into main part and highlighted part (if it contains a dash or colon)
  const [mainTitle, highlightedPart] = title.includes(' - ') 
    ? title.split(' - ') 
    : title.includes(': ')
    ? title.split(': ')
    : [title, ''];

  return (
    <div className="px-6 md:px-8 pt-24 pb-0 sm:pt-32 sm:pb-20">
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-8 md:space-y-10"
      >
        {/* Title */}
        <motion.div variants={item} className="space-y-6">
          <h1 className="text-[2.5rem]/[1.15] md:text-6xl/[1.15] font-bold tracking-tight text-white text-balance">
            <span className="text-balance">{mainTitle}</span>{" "}
            {highlightedPart && (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-300 via-accent-400 to-accent-300 animate-text-shimmer">
                {highlightedPart}
              </span>
            )}
          </h1>

          <p className="text-lg/relaxed md:text-xl/relaxed text-dark-200 text-balance max-w-[85%]">
            {description}
          </p>
        </motion.div>

        {/* Tags */}
        <motion.div variants={item}>
          <div className="flex flex-wrap items-center gap-2.5">
            {tags.map((tag, index) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ 
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                  mass: 0.5,
                  delay: 0.6 + (index * 0.1)
                }}
                className="inline-flex items-center rounded-full px-3.5 py-1.5 text-[13px] font-medium tracking-wide text-accent-300 bg-accent-500/10 border border-accent-500/20 hover:border-accent-400/30 hover:bg-accent-500/15 transition-all duration-300 shadow-[0_0_15px_-3px_rgba(var(--accent-300-rgb),0.2)] hover:shadow-[0_0_20px_-3px_rgba(var(--accent-300-rgb),0.3)]"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Author info */}
        <motion.div variants={item}>
          <div className="flex items-center gap-4">
            <div className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full ring-2 ring-accent-500/20 hover:ring-accent-400/40 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-400 to-accent-500 opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
              <span className="relative text-[15px] font-medium text-white">
                {author[0]}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="text-[15px] font-semibold tracking-wide text-white/90 group-hover:text-white transition-colors">
                {author}
              </div>
              <time 
                dateTime={date}
                className="text-[13px] tracking-wide text-dark-300"
              >
                {new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
} 