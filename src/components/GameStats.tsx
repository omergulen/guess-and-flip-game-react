import React from 'react';
import { motion } from 'framer-motion';

interface GameStatsProps {
  currentNumber: number;
  moves: number;
  bestScore: number;
}

export const GameStats: React.FC<GameStatsProps> = ({ currentNumber, moves, bestScore }) => {
  return (
    <div className="flex gap-4 justify-center text-lg">
      <motion.div 
        className="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-300"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 0.3 }}
      >
        Finding: {currentNumber}
      </motion.div>
      <div className="px-4 py-2 rounded-lg bg-gray-800/50 text-gray-300">
        Moves: {moves}
      </div>
      {bestScore > 0 && (
        <div className="px-4 py-2 rounded-lg bg-pink-500/20 text-pink-300">
          Best: {bestScore}
        </div>
      )}
    </div>
  );
};