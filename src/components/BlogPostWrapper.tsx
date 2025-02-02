'use client';

import { ReactNode } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import DonationCTA from './DonationCTA';
import PostNavigation from './blog/PostNavigation';

interface BlogPostWrapperProps {
  children: ReactNode;
  postId: number;
}

export default function BlogPostWrapper({ children, postId }: BlogPostWrapperProps) {
  return (
    <div className="min-h-screen bg-dark-900">
      <Navigation />
      <div className="relative">
        {/* Enhanced Background Elements */}
        <div className="fixed inset-0">
          {/* Primary gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800/50 to-dark-900" />
          
          {/* Accent color radial gradient */}
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-500/20 via-accent-400/5 to-transparent" />
          
          {/* Additional subtle patterns */}
          <div 
            className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:48px_48px]"
            style={{
              maskImage: 'radial-gradient(ellipse at center, transparent 20%, black)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 20%, black)'
            }}
          />
        </div>
        
        {/* Content */}
        <div className="relative">
          {children}
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 mb-5">
            <div className="mx-auto max-w-3xl">
              <PostNavigation currentPostId={postId} />
              <div className="mt-16">
                <DonationCTA />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
} 