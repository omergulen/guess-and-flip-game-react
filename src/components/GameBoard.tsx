import React from 'react';
import { motion } from 'framer-motion';
import { GameTile } from './GameTile';
import { GameStats } from './GameStats';
import { HintButton } from './HintButton';
import { LevelInfo } from './LevelInfo';
import { useGameStore } from '../store/gameStore';
import { ArrowRight, RefreshCw } from 'lucide-react';
import { useTimer } from '../hooks/useTimer';
import { LEVELS } from '../config/levels';

export const GameBoard: React.FC = () => {
  const { 
    tiles, 
    currentNumber, 
    moves,
    level,
    score,
    bestScore,
    isGameWon,
    hintsRemaining,
    resetGame,
    useHint,
    revealTile
  } = useGameStore();

  const levelConfig = LEVELS[level - 1];
  const timeRemaining = useTimer(levelConfig.timeLimit, resetGame);

  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
  }[levelConfig.gridSize];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-8 p-6">
      <LevelInfo 
        level={level}
        score={score}
        timeRemaining={timeRemaining}
      />
      
      <GameStats 
        currentNumber={currentNumber}
        moves={moves}
        bestScore={bestScore}
      />

      <motion.div 
        className={`grid ${gridCols} gap-3 w-full`}
        animate={isGameWon ? { 
          scale: [1, 1.05, 1],
          rotate: [0, 2, -2, 0]
        } : {}}
      >
        {tiles.map((tile) => (
          <GameTile
            key={tile.id}
            {...tile}
            onClick={() => revealTile(tile.id)}
          />
        ))}
      </motion.div>

      <div className="flex gap-4">
        <HintButton 
          hintsRemaining={hintsRemaining}
          onUseHint={useHint}
          disabled={isGameWon}
        />
        
        <motion.button
          onClick={resetGame}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-3 bg-purple-500 text-white rounded-lg
            hover:bg-purple-600 transition-colors"
        >
          {isGameWon ? (
            <>
              <ArrowRight className="w-5 h-5" />
              Next Level
            </>
          ) : (
            <>
              <RefreshCw className="w-5 h-5" />
              Reset Level
            </>
          )}
        </motion.button>
      </div>

      {isGameWon && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-pink-400 px-6 py-4 rounded-xl
            bg-pink-500/20 backdrop-blur-sm"
        >
          {score >= levelConfig.requiredScore ? (
            '🎉 Level Complete! Ready for next level!'
          ) : (
            '😅 Level Complete! Try again to reach the target score!'
          )}
        </motion.div>
      )}
    </div>
  );
};