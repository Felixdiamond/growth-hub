'use client';

import { motion } from 'framer-motion';

interface BlogVideoProps {
  videoId: string;
  title?: string;
}

export default function BlogVideo({ videoId, title }: BlogVideoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sm:mt-6 relative overflow-hidden rounded-2xl border border-dark-800/50 bg-dark-800/50 backdrop-blur-sm mb-16"
    >
      {/* Window chrome */}
      <div className="relative flex items-center gap-1.5 border-b border-dark-800/50 px-4 py-3">
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <div className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>

        {/* Title */}
        {title && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 sm:hidden">
            <div className="rounded-lg bg-dark-800/90 px-3 py-1 text-[13px] font-medium tracking-wide text-dark-200">
              {title}
            </div>
          </div>
        )}
      </div>

      {/* Video */}
      <div className="relative aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title || 'Video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </motion.div>
  );
} 