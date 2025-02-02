'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface BlogKitSectionProps {
  title?: string;
  description?: string;
  link: string;
  image?: string;
}

export default function BlogKitSection({ 
  title = "Get Your Arduino Kit",
  description = "Everything you need to get started with Arduino in one kit",
  link,
  image = "/images/kit.jpg"
}: BlogKitSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="my-16 group"
    >
      <Link
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block overflow-hidden rounded-2xl bg-gradient-to-br from-accent-500/10 via-accent-500/5 to-transparent border border-accent-500/10 hover:border-accent-500/20 transition-all duration-500"
      >
        <div className="relative p-8">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative flex flex-col md:flex-row gap-8 items-center">
            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-accent-200 to-accent-300 mb-3">
                {title}
              </h3>
              <p className="text-dark-200 mb-6">
                {description}
              </p>
              <div className="inline-flex items-center gap-2 text-accent-300 font-medium">
                <span>View on Amazon</span>
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>

            {/* Image */}
            {image && (
              <div className="relative w-full md:w-72 aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src={image}
                  alt="Arduino Kit"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/50 to-transparent" />
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}