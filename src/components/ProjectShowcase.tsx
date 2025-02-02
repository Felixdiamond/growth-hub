'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const projects = [
  {
    id: 1,
    title: 'Smart Home Automation',
    description: 'Control your entire home with Arduino. Features voice commands, mobile app integration, and AI-powered automation.',
    image: '/projects/smart-home.jpg',
    tech: ['Arduino', 'IoT', 'AI', 'Mobile'],
    color: '#4F46E5',
  },
  {
    id: 2,
    title: 'Interactive LED Matrix',
    description: 'Create mesmerizing light shows with this 32x32 RGB LED matrix. Includes sound reactivity and pattern generation.',
    image: '/projects/led-matrix.jpg',
    tech: ['Arduino', 'LED', 'Sound', 'Graphics'],
    color: '#7C3AED',
  },
  {
    id: 3,
    title: 'Gesture-Controlled Robot',
    description: 'Build a robot that responds to hand gestures. Features real-time motion tracking and obstacle avoidance.',
    image: '/projects/robot.jpg',
    tech: ['Robotics', 'Computer Vision', 'Sensors'],
    color: '#EC4899',
  },
];

const ProjectShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [100, -100]),
    { stiffness: 100, damping: 30 }
  );

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMousePosition({
        x: (clientX / innerWidth - 0.5) * 2,
        y: (clientY / innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-32 bg-gray-900 overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 opacity-90" />
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: Math.random() * 0.5 + 0.5,
                opacity: Math.random() * 0.3 + 0.1,
              }}
              animate={{
                y: [null, Math.random() * -100],
                opacity: [null, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      </div>

      <motion.div
        style={{ opacity, scale }}
        className="container mx-auto px-6 relative"
      >
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative inline-block"
          >
            <motion.span
              className="absolute -inset-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 opacity-50 blur-lg"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <h2 className="relative text-5xl md:text-6xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Featured Projects
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300"
          >
            Discover what's possible with our cutting-edge Arduino projects
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-20">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative"
              onMouseEnter={() => setActiveProject(index)}
            >
              <motion.div
                className="relative z-10 grid md:grid-cols-2 gap-8 items-center"
                style={{
                  y,
                  rotateY: mousePosition.x * 5,
                  rotateX: -mousePosition.y * 5,
                  perspective: 1000,
                }}
              >
                <div className="relative group">
                  <motion.div
                    className="absolute -inset-4 rounded-xl opacity-50 blur-xl transition-all duration-500 group-hover:opacity-100"
                    style={{ background: project.color }}
                  />
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                </div>

                <div className="relative">
                  <motion.h3
                    className="text-3xl md:text-4xl font-bold text-white mb-4"
                    layout
                  >
                    {project.title}
                  </motion.h3>
                  <motion.p
                    className="text-gray-300 text-lg mb-6"
                    layout
                  >
                    {project.description}
                  </motion.p>
                  <div className="flex flex-wrap gap-3">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 rounded-full text-sm font-medium"
                        style={{
                          background: `${project.color}33`,
                          color: project.color,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-8 px-8 py-3 rounded-full font-semibold text-white"
                    style={{ background: project.color }}
                  >
                    Learn More
                  </motion.button>
                </div>
              </motion.div>

              {/* Interactive particles */}
              <AnimatePresence>
                {activeProject === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 pointer-events-none"
                  >
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full"
                        style={{
                          background: project.color,
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          scale: [0, 1, 0],
                          opacity: [0, 0.5, 0],
                          x: Math.random() * 200 - 100,
                          y: Math.random() * 200 - 100,
                        }}
                        transition={{
                          duration: Math.random() * 2 + 1,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectShowcase; 