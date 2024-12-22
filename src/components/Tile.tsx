import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';

interface TileProps {
  id: number;
  value: number;
  isRevealed: boolean;
  onClick: () => void;
}

export const Tile: React.FC<TileProps> = ({ id, value, isRevealed, onClick }) => {
  const [showValue, setShowValue] = useState(false);

  const handleClick = () => {
    if (!isRevealed) {
      setShowValue(true);
      onClick();
      // Hide the number after a delay if it was incorrect
      setTimeout(() => {
        if (!isRevealed) {
          setShowValue(false);
        }
      }, 800);
    }
  };

  const getBackgroundColor = () => {
    if (isRevealed) return 'bg-emerald-500';
    return showValue ? 'bg-indigo-400' : 'bg-indigo-600';
  };

  return (
    <motion.div
      whileHover={{ scale: isRevealed ? 1 : 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        rotateY: (isRevealed || showValue) ? 180 : 0,
        scale: isRevealed ? [1, 1.1, 1] : 1,
      }}
      transition={{ 
        duration: 0.4,
        rotateY: { type: "spring", stiffness: 200 },
        scale: { duration: 0.3 }
      }}
      onClick={handleClick}
      className={`
        relative w-24 h-24 cursor-pointer rounded-xl shadow-lg
        flex items-center justify-center text-white text-3xl font-bold
        transform-gpu perspective-1000 backdrop-blur-sm
        ${getBackgroundColor()}
        ${isRevealed ? 'cursor-default' : 'hover:shadow-xl hover:brightness-110'}
        transition-colors duration-300
      `}
    >
      <AnimatePresence>
        <motion.div
          key={showValue || isRevealed ? 'number' : 'question'}
          initial={{ opacity: 0, rotateY: 0 }}
          animate={{ opacity: 1, rotateY: 180 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute w-full h-full flex items-center justify-center"
        >
          {showValue || isRevealed ? (
            <span className="text-4xl">{value}</span>
          ) : (
            <span className="text-2xl">?</span>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};