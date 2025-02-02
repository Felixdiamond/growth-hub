'use client';

import { motion } from 'framer-motion';
import { use } from 'react';
import SocialLinks from '@/components/blog/SocialLinks';
import DonationCTA from '@/components/blog/DonationCTA';
import BlogNavigation from '@/components/blog/BlogNavigation';
import Navigation from '@/components/Navigation';
import Squares from '@/components/animations/Squares';

// This wraps ALL blog post pages
export default function BlogPostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  
  return (
    <div className="relative isolate min-h-screen bg-dark-900">
      <Navigation />
      
      {/* Animated grid background */}
      <div className="fixed inset-0 -z-10">
        <Squares 
          direction="diagonal"
          speed={0.1}
          borderColor="rgba(103, 232, 249, 0.08)"
          squareSize={48}
          hoverFillColor="rgba(103, 232, 249, 0.03)"
        />
      </div>

      {/* Radial fade */}
      <div 
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, transparent 0%, rgb(2, 6, 23) 80%)`
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-[1400px] px-6 py-24 sm:py-32 lg:px-8"
      >
        <div className="mx-auto max-w-[900px]">
          {children}
          <SocialLinks />
          <DonationCTA />
          <BlogNavigation currentSlug={resolvedParams.slug} />
        </div>
      </motion.div>
    </div>
  );
}