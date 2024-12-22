import React from 'react';
import { motion } from 'framer-motion';

const generateParticles = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 20 + 10,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));
};

export const ParticleBackground: React.FC = () => {
  const particles = generateParticles(15);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-4 h-4 rounded-sm bg-white/5"
          style={{ left: `${particle.x}%`, top: `${particle.y}%` }}
          animate={{
            y: ['0%', '100%'],
            rotate: [0, 360],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};