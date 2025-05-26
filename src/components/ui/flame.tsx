'use client';

import { motion } from 'framer-motion';

export const Flame = () => {
  return (
    <div className="relative w-24 h-24 mx-auto mb-8">
      <motion.div
        className="absolute inset-0 bg-orange-500 rounded-full blur-md"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute inset-0 bg-red-500 rounded-full blur-sm"
        animate={{
          scale: [1.1, 0.9, 1.1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute inset-0 bg-yellow-400 rounded-full"
        animate={{
          scale: [0.9, 1.1, 0.9],
          opacity: [1, 0.8, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}; 