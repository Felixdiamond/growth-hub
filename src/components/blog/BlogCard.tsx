import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/types/blog';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface BlogCardProps {
  post: BlogPost;
  className?: string;
}

export default function BlogCard({ post, className }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link 
        href={`/blog/${post.slug}`} 
        className={cn(
          "group relative flex flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-white to-zinc-50/50 dark:from-zinc-900 dark:to-black/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800",
          "transform-gpu transition-all duration-500 hover:shadow-xl hover:shadow-zinc-200/20 dark:hover:shadow-zinc-800/20 hover:-translate-y-1",
          className
        )}
      >
        {post.image && (
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-all duration-700 will-change-transform group-hover:scale-105"
              sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
        )}

        <div className="relative flex flex-1 flex-col p-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-zinc-100 dark:bg-zinc-800/50 px-3 py-1 text-[13px] font-medium tracking-wide text-zinc-800 dark:text-zinc-200 ring-1 ring-zinc-200/50 dark:ring-zinc-700/50"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-xl font-semibold leading-snug tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-black dark:group-hover:text-white transition-colors">
            {post.title}
          </h3>

          <p className="mt-3 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400 line-clamp-2">
            {post.excerpt}
          </p>

          <div className="mt-8 flex items-center justify-between pt-6 border-t border-zinc-200/80 dark:border-zinc-800/80">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 shrink-0 select-none items-center justify-center overflow-hidden rounded-full">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-400 to-accent-500 opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                <span className="relative text-[15px] font-medium text-white">
                  {post.author.charAt(0)}
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="text-[15px] font-semibold tracking-wide text-white/90 group-hover:text-white transition-colors">
                  {post.author}
                </div>
                <div className="text-[13px] tracking-wide text-zinc-500 dark:text-zinc-400">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[14px] font-medium tracking-wide text-zinc-700 dark:text-zinc-300 transition-colors group-hover:text-black dark:group-hover:text-white">
                Read article
              </span>
              <svg 
                className="h-4 w-4 transition-all duration-300 group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M14 5l7 7m0 0l-7 7m7-7H3" 
                />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
} 