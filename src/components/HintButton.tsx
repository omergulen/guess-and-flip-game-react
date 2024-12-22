import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Eye } from 'lucide-react';
import { cn } from '../utils/cn';

interface HintButtonProps {
  hintsRemaining: { single: number; flash: number };
  onUseHint: (type: 'single' | 'flash') => void;
  disabled?: boolean;
}

export const HintButton: React.FC<HintButtonProps> = ({
  hintsRemaining,
  onUseHint,
  disabled
}) => {
  return (
    <div className="flex gap-2">
      <motion.button
        whileHover={{ scale: disabled ? 1 : 1.05 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        onClick={() => onUseHint('single')}
        disabled={disabled || hintsRemaining.single <= 0}
        className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-lg',
          'transition-colors duration-200',
          hintsRemaining.single > 0 && !disabled
            ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
            : 'bg-gray-700 text-gray-400 cursor-not-allowed'
        )}
      >
        <Lightbulb className="w-4 h-4" />
        <span>Show One: {hintsRemaining.single}</span>
      </motion.button>

      <motion.button
        whileHover={{ scale: disabled ? 1 : 1.05 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        onClick={() => onUseHint('flash')}
        disabled={disabled || hintsRemaining.flash <= 0}
        className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-lg',
          'transition-colors duration-200',
          hintsRemaining.flash > 0 && !disabled
            ? 'bg-blue-500 hover:bg-blue-600 text-white'
            : 'bg-gray-700 text-gray-400 cursor-not-allowed'
        )}
      >
        <Eye className="w-4 h-4" />
        <span>Flash All: {hintsRemaining.flash}</span>
      </motion.button>
    </div>
  );
};