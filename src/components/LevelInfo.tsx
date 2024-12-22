import React from 'react';
import { motion } from 'framer-motion';
import { LEVELS } from '../config/levels';

interface LevelInfoProps {
  level: number;
  score: number;
  timeRemaining: number | null;
}

export const LevelInfo: React.FC<LevelInfoProps> = ({
  level,
  score,
  timeRemaining
}) => {
  const levelConfig = LEVELS[level - 1];

  return (
    <div className="text-center mb-6">
      <motion.h1 
        className="text-5xl font-bold text-white mb-2"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        LEVEL {level}
      </motion.h1>
      <div className="flex gap-4 justify-center text-lg">
        <div className="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-300">
          Score: {score}
        </div>
        {levelConfig.timeLimit && (
          <div className="px-4 py-2 rounded-lg bg-pink-500/20 text-pink-300">
            Time: {timeRemaining}s
          </div>
        )}
        <div className="px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-300">
          Target: {levelConfig.requiredScore}
        </div>
      </div>
    </div>
  );
};