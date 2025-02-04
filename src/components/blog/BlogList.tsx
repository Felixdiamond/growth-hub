'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { BlogPost } from '@/types/blog';

interface BlogGridProps {
  posts: BlogPost[];
  className?: string;
}

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

export default function BlogGrid({ posts = [], className }: BlogGridProps) {
  // Safety check for posts
  if (!Array.isArray(posts) || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-dark-200">No blog posts available.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={cn("grid gap-8 md:grid-cols-2", className)}
    >
      {posts.map((post) => (
        <motion.article
          key={post.slug}
          variants={itemVariants}
          className="group relative overflow-hidden rounded-2xl bg-dark-800 p-4 transition-all hover:bg-dark-750"
        >
          <Link href={`/blog/${post.slug}`} className="block">
            <div className="relative h-48 w-full overflow-hidden rounded-xl">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="mt-4">
              <div className="flex items-center gap-2 flex-wrap">
                {post.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-accent-500/10 px-2.5 py-0.5 text-xs font-medium text-accent-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="mt-2 text-xl font-semibold text-white group-hover:text-accent-400 transition-colors">
                {post.title}
              </h2>
              <p className="mt-2 line-clamp-2 text-dark-200">
                {post.description}
              </p>
              <div className="mt-4 flex items-center justify-between text-sm text-dark-300">
                <span>{post.author}</span>
                <span>•</span>
                <time dateTime={new Date(post.date).toISOString()}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
            </div>
          </Link>
        </motion.article>
      ))}
    </motion.div>
  );
} 