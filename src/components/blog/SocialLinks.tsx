'use client';

import { motion } from 'framer-motion';
import { FaInstagram, FaYoutube, FaGlobe, FaGithub, FaTwitter } from 'react-icons/fa';
import { cn } from '@/lib/utils';

const links = [
  {
    name: 'Instagram',
    url: 'https://instagram.com/king_shaun_paw',
    icon: FaInstagram,
    color: 'hover:text-pink-500 hover:bg-pink-500/10',
    description: 'Follow me on Instagram'
  },
  {
    name: 'Growth Hub',
    url: 'https://shaunpaw.org',
    icon: FaGlobe,
    color: 'hover:text-accent-400 hover:bg-accent-500/10',
    description: 'Visit my website'
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/shaun_paw',
    icon: FaYoutube,
    color: 'hover:text-red-500 hover:bg-red-500/10',
    description: 'Subscribe on YouTube'
  },
  {
    name: 'GitHub',
    url: 'https://github.com/shaunpaw',
    icon: FaGithub,
    color: 'hover:text-purple-500 hover:bg-purple-500/10',
    description: 'Check out my code'
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/shaunpaw',
    icon: FaTwitter,
    color: 'hover:text-blue-400 hover:bg-blue-500/10',
    description: 'Follow me on Twitter'
  }
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export default function SocialLinks() {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="my-16 px-4 py-8 rounded-2xl bg-dark-800/50 border border-dark-700"
    >
      <h2 className="text-xl font-semibold text-center mb-6 text-dark-100">
        Connect With Me
      </h2>
      
      <motion.div className="flex flex-wrap items-center justify-center gap-4">
        {links.map((link) => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            className={cn(
              "group relative flex items-center gap-3 p-3 rounded-xl",
              "bg-dark-800/50 border border-dark-700",
              "transition-all duration-300",
              link.color
            )}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <link.icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            <span className="text-sm font-medium text-dark-200 group-hover:text-current">
              {link.name}
            </span>
            
            {/* Tooltip */}
            <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-2 rounded-lg bg-dark-800 border border-dark-700 text-xs text-dark-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
              {link.description}
            </span>
          </motion.a>
        ))}
      </motion.div>
    </motion.section>
  );
} 