import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

interface GameTileProps {
  id: number;
  value: number;
  isRevealed: boolean;
  onClick: () => void;
}

export const GameTile: React.FC<GameTileProps> = ({ value, isRevealed, onClick }) => {
  const [showValue, setShowValue] = React.useState(false);

  const handleClick = () => {
    if (!isRevealed) {
      setShowValue(true);
      onClick();
      setTimeout(() => {
        if (!isRevealed) {
          setShowValue(false);
        }
      }, 500); // Reduced from 800ms to 500ms
    }
  };

  return (
    <motion.div
      whileHover={{ scale: isRevealed ? 1 : 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={cn(
        'relative aspect-square rounded-lg cursor-pointer',
        'flex items-center justify-center',
        'text-3xl font-bold shadow-lg',
        'transition-colors duration-200', // Reduced from 300ms to 200ms
        isRevealed ? 'bg-purple-500 cursor-default' : 'bg-gray-900/50',
        showValue && !isRevealed && 'bg-pink-500',
        !isRevealed && 'hover:shadow-purple-500/20 hover:shadow-xl'
      )}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={showValue || isRevealed ? 'number' : 'hidden'}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }} // Reduced from 0.3s to 0.2s
          className="absolute inset-0 flex items-center justify-center text-white"
        >
          {showValue || isRevealed ? value : '?'}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};