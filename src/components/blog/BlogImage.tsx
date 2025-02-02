'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface BlogImageProps {
  images: {
    src: string;
    alt: string;
    caption?: string;
  }[];
}

export function BlogImage({ images }: BlogImageProps) {
  if (images.length === 1) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl bg-dark-800 shadow-2xl ring-1 ring-dark-700 hover:ring-accent-500/20 transition-all duration-300 mb-16"
      >
        <div className="aspect-video relative">
          <Image
            src={images[0].src}
            alt={images[0].alt}
            fill
            className="object-cover"
          />
        </div>
        {images[0].caption && (
          <div className="p-4 text-center text-sm text-dark-200">
            {images[0].caption}
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16"
    >
      {images.map((image, index) => {
        // For 3 images, make the first one span full width
        const isFirstOfThree = images.length === 3 && index === 0;
        
        return (
          <motion.div
            key={image.src}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative overflow-hidden rounded-2xl bg-dark-800 shadow-2xl ring-1 ring-dark-700 hover:ring-accent-500/20 transition-all duration-300 ${
              isFirstOfThree ? 'md:col-span-2' : ''
            }`}
          >
            <div className={`relative ${isFirstOfThree ? 'aspect-video' : 'aspect-square'}`}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </div>
            {image.caption && (
              <div className="p-4 text-center text-sm text-dark-200">
                {image.caption}
              </div>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
} 