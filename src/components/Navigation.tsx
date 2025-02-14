'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { TbGrowth } from "react-icons/tb";
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollToSection } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Tutorials', href: '/blog' },
    { label: 'Code', href: '/code' },
    { label: 'About', href: '#about', isSection: true },
    { label: 'Newsletter', href: '#newsletter', isSection: true },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, item: { href: string; isSection?: boolean }) => {
    if (item.isSection) {
      e.preventDefault();
      scrollToSection(item.href.substring(1));
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 50, damping: 15 }}
        className={`fixed top-0 left-0 right-0 z-50 ${
          isScrolled
            ? 'bg-dark-900/80 backdrop-blur-xl border-b border-dark-700/50 shadow-lg shadow-dark-900/20'
            : 'bg-transparent'
        } transition-all duration-500`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
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

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleClick(e, item)}
                  className="relative text-[15px] font-medium text-dark-200 hover:text-white transition-colors duration-300 group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent-400 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
              <motion.a
                href="https://github.com/sponsors/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-5 py-2 text-[15px] font-medium text-white"
              >
                <span className="relative z-10">Support Project</span>
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent-500 to-accent-400 opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-300" />
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative z-10 md:hidden p-2 -mr-2"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: 45, y: 8, backgroundColor: "#fff" } : { rotate: 0, y: 0, backgroundColor: "#94a3b8" }}
                  className="w-full h-0.5 transform origin-left transition-all duration-300"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { opacity: 0, backgroundColor: "#fff" } : { opacity: 1, backgroundColor: "#94a3b8" }}
                  className="w-full h-0.5 transition-all duration-300"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: -45, y: -8, backgroundColor: "#fff" } : { rotate: 0, y: 0, backgroundColor: "#94a3b8" }}
                  className="w-full h-0.5 transform origin-left transition-all duration-300"
                />
              </div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-dark-900/60 backdrop-blur-md z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-dark-800 border-l border-dark-700/50 shadow-2xl z-50"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-dark-700/50">
                  <Link 
                    href="/" 
                    className="group flex items-center space-x-3"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent-500/20 to-accent-400/20 blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      <TbGrowth className="relative w-7 h-7 text-accent-300 group-hover:text-accent-200 transition-colors duration-300" />
                    </div>
                    <span className="text-lg font-bold text-white group-hover:text-accent-200 transition-colors duration-300">
                      Growth Hub
                    </span>
                  </Link>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-dark-200 hover:text-white transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </motion.button>
                </div>
                <div className="flex-1 overflow-y-auto py-4 px-6">
                  <nav className="space-y-6">
                    {menuItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={(e) => {
                          handleClick(e, item);
                          setIsMobileMenuOpen(false);
                        }}
                        className="block text-lg font-medium text-dark-200 hover:text-white transition-colors duration-300"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                </div>
                <div className="p-6 border-t border-dark-700/50">
                  <motion.a
                    href="https://github.com/sponsors/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="block w-full py-3 text-center text-[15px] font-medium text-white rounded-xl bg-gradient-to-r from-accent-500 to-accent-400 hover:from-accent-400 hover:to-accent-500 transition-all duration-300"
                  >
                    Support Project
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation; 