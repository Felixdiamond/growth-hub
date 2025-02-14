'use client';

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import { TbGrowth } from 'react-icons/tb';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const { scrollToSection } = useSmoothScroll();
  const pathname = usePathname();

  const handleSectionNavigation = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    
    // Check if the section exists on current page
    const section = document.getElementById(sectionId);
    
    if (pathname === '/') {
      // If we're on home page, just scroll
      scrollToSection(sectionId);
    } else if (section) {
      // If section exists on current page, scroll to it
      scrollToSection(sectionId);
    } else {
      // If section doesn't exist, go to home page section
      window.location.href = `/#${sectionId}`;
    }
  };

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '#about' },
    { label: 'Tutorials', href: '/blog' },
    { label: 'Code', href: '/code' },
  ];

  const socialLinks = [
    {
      label: 'YouTube',
      href: 'https://youtube.com/@shaun_paw?si=M-XvIXRiti0-e5dH',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
    {
      label: 'Email',
      href: 'mailto:shaunpaw22@gmail.com',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: 'Arduino Kit',
      href: 'https://amzn.to/3Yv56Jg',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <footer className="relative bg-dark-900 pt-16 sm:pt-24 pb-8 sm:pb-12 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-800 via-dark-900 to-dark-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent-500/5 via-transparent to-transparent opacity-30" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent,rgba(14,165,233,0.03),transparent)] animate-pulse" />
      </div>

      <div ref={containerRef} className="container mx-auto px-4 relative">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12 sm:mb-16"
        >
          {/* Brand */}
          <motion.div variants={itemVariants} className="space-y-3 sm:space-y-4">
          <Link 
              href="/" 
              className="group relative flex items-center space-x-3 z-10"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent-500/20 to-accent-400/20 blur-lg group-hover:blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                <TbGrowth className="relative w-8 h-8 text-accent-300 group-hover:text-accent-200 transition-colors duration-300" />
              </motion.div>
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-xl font-bold text-white group-hover:text-accent-200 transition-colors duration-300"
              >
                Growth Hub
              </motion.span>
            </Link>
            <p className="text-sm sm:text-base text-dark-100">
              Empowering creators with the knowledge and skill to build their dream machines.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm sm:text-base text-dark-100 hover:text-accent-300 transition-colors relative group"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute inset-x-0 bottom-0 h-px bg-accent-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div variants={itemVariants}>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Connect</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm sm:text-base text-dark-100 hover:text-accent-300 transition-all duration-300 group"
                  >
                    <span className="transform group-hover:scale-110 transition-transform duration-300">
                      {link.icon}
                    </span>
                    <span className="relative">
                      {link.label}
                      <span className="absolute inset-x-0 bottom-0 h-px bg-accent-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter Teaser */}
          <motion.div variants={itemVariants}>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Stay Updated</h3>
            <p className="text-sm sm:text-base text-dark-100 mb-3 sm:mb-4">
              Subscribe to our newsletter for weekly Arduino tutorials and electronics tips.
            </p>
            <motion.a
              href="#newsletter"
              onClick={(e) => handleSectionNavigation(e, 'newsletter')}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(14,165,233,0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-5 sm:px-6 py-2 rounded-lg bg-accent-500 text-sm sm:text-base text-white font-medium transition-all duration-300 shadow-lg shadow-accent-500/25 relative overflow-hidden group"
            >
              <span className="relative z-10">Subscribe Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent-400 to-accent-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="border-t border-dark-700 pt-6 sm:pt-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs sm:text-sm text-dark-200">
              <p>© 2025 The Growth Hub. All rights reserved.</p>
              <div className="flex items-center gap-1.5">
                <span>Developed with</span>
                <svg className="w-4 h-4 text-accent-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <span>by</span>
                <a 
                  href="https://portfolio-ayane.vercel.app" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-accent-300 hover:text-accent-400 transition-colors"
                >
                  Felix (Ayane)
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4 sm:gap-6">
              <Link href="/privacy" className="text-xs sm:text-sm text-dark-200 hover:text-accent-300 transition-colors relative group">
                <span className="relative">
                  Privacy Policy
                  <span className="absolute inset-x-0 bottom-0 h-px bg-accent-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </span>
              </Link>
              <Link href="/terms" className="text-xs sm:text-sm text-dark-200 hover:text-accent-300 transition-colors relative group">
                <span className="relative">
                  Terms of Service
                  <span className="absolute inset-x-0 bottom-0 h-px bg-accent-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;