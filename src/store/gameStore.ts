import { create } from 'zustand';
import { GameState, Tile } from '../types/game';
import { LEVELS } from '../config/levels';
import { createInitialTiles, shuffleArray } from '../utils/gameUtils';

export const useGameStore = create<GameState>((set, get) => ({
  tiles: createInitialTiles(LEVELS[0].gridSize).map(t => ({ ...t, revealedByHint: false })),
  currentNumber: 1,
  moves: 0,
  level: 1,
  bestScore: parseInt(localStorage.getItem('bestScore') || '0'),
  isGameWon: false,
  isPlaying: true,
  hintsRemaining: { single: LEVELS[0].hintsAllowed, flash: LEVELS[0].hintsAllowed },
  timeRemaining: LEVELS[0].timeLimit,
  score: 0,

  initializeGame: () => {
    const level = get().level;
    const levelConfig = LEVELS[level - 1];
    const initialTiles = createInitialTiles(levelConfig.gridSize).map(t => ({
      ...t,
      revealedByHint: false
    }));
    
    set({
      tiles: initialTiles,
      currentNumber: 1,
      moves: 0,
      hintsRemaining: { single: levelConfig.hintsAllowed, flash: levelConfig.hintsAllowed },
      timeRemaining: levelConfig.timeLimit,
      score: 0,
      isGameWon: false,
      isPlaying: true,
    });
  },

  revealTile: (id: number) => {
    const { tiles, currentNumber, moves, level } = get();
    const levelConfig = LEVELS[level - 1];
    const tile = tiles.find((t) => t.id === id);
    
    if (!tile || tile.isRevealed) return;

    const newMoves = moves + 1;
    const scoreTarget = levelConfig.requiredScore + Math.max(0, newMoves - levelConfig.maxMoves) * 5;
    
    if (tile.value === currentNumber) {
      const newTiles = tiles.map((t) =>
        t.id === id ? { ...t, isRevealed: true } : t
      );
      
      const totalTiles = levelConfig.gridSize * levelConfig.gridSize;
      // Check if all numbers up to the highest revealed number are revealed
      const highestRevealed = Math.max(...newTiles.filter(t => t.isRevealed).map(t => t.value));
      const allPreviousRevealed = Array.from({ length: highestRevealed }, (_, i) => i + 1)
        .every(num => newTiles.some(t => t.value === num && t.isRevealed));
      
      const isComplete = allPreviousRevealed && highestRevealed === totalTiles;
      
      if (isComplete) {
        const moveBonus = Math.max(0, levelConfig.maxMoves - newMoves) * 10;
        const newScore = get().score + moveBonus + 50;
        
        set({
          tiles: newTiles,
          currentNumber: currentNumber,
          moves: newMoves,
          isGameWon: true,
          score: newScore,
        });
      } else {
        // Find the next unrevealed number
        let newCurrentNumber = currentNumber + 1;
        while (newCurrentNumber <= totalTiles && 
               newTiles.some(t => t.value === newCurrentNumber && t.isRevealed)) {
          newCurrentNumber++;
        }
        
        // Check if we've revealed all numbers up to a point
        const allPreviousRevealedAfterMove = Array.from({ length: newCurrentNumber - 1 }, (_, i) => i + 1)
          .every(num => newTiles.some(t => t.value === num && t.isRevealed));
          
        if (allPreviousRevealedAfterMove && newCurrentNumber > totalTiles) {
          // We've revealed all numbers
          const moveBonus = Math.max(0, levelConfig.maxMoves - newMoves) * 10;
          const finalScore = get().score + moveBonus + 50;
          
          set({
            tiles: newTiles,
            currentNumber: newCurrentNumber - 1,
            moves: newMoves,
            isGameWon: true,
            score: finalScore,
          });
        } else {
          set({
            tiles: newTiles,
            currentNumber: newCurrentNumber,
            moves: newMoves,
            score: get().score + 10,
          });
        }
      }
    } else {
      set({
        tiles: tiles.map((t) => ({ 
          ...t, 
          isRevealed: t.revealedByHint || false 
        })),
        currentNumber: 1,
        moves: newMoves,
        score: 0, // Reset score on fail
      });
    }
  },

  useHint: (type: 'single' | 'flash') => {
    const { hintsRemaining, tiles, currentNumber } = get();
    if (hintsRemaining[type] <= 0) return;

    if (type === 'single') {
      // Get all unrevealed tiles
      const unrevealedTiles = tiles.filter(t => !t.isRevealed);
      if (unrevealedTiles.length > 0) {
        // Pick a random unrevealed tile
        const randomTile = unrevealedTiles[Math.floor(Math.random() * unrevealedTiles.length)];
        
        // Mark the tile as revealed by hint
        const newTiles = tiles.map(t => ({
          ...t,
          isRevealed: t.id === randomTile.id || t.isRevealed,
          revealedByHint: t.id === randomTile.id ? true : t.revealedByHint
        }));

        // If the revealed tile is the current number or less, count it as progress
        if (randomTile.value <= currentNumber) {
          let newCurrentNumber = currentNumber;
          // Check if we need to advance currentNumber
          while (newCurrentNumber <= tiles.length && 
                 newTiles.every(t => t.value !== newCurrentNumber || t.isRevealed)) {
            newCurrentNumber++;
          }
          
          set({ 
            tiles: newTiles,
            currentNumber: newCurrentNumber,
            hintsRemaining: { ...hintsRemaining, single: hintsRemaining.single - 1 },
            score: get().score + 10 // Add score for revealed number
          });
        } else {
          set({ 
            tiles: newTiles,
            hintsRemaining: { ...hintsRemaining, single: hintsRemaining.single - 1 }
          });
        }
      }
    } else {
      // Flash the entire grid
      const revealedTiles = tiles.map(t => ({ ...t, isRevealed: true }));
      set({ 
        tiles: revealedTiles, 
        hintsRemaining: { ...hintsRemaining, flash: hintsRemaining.flash - 1 }
      });

      const levelConfig = LEVELS[get().level - 1];
      setTimeout(() => {
        set({
          tiles: tiles.map(t => ({ 
            ...t, 
            isRevealed: t.value < currentNumber || t.revealedByHint 
          }))
        });
      }, levelConfig.flashDuration);
    }
  },

  resetGame: () => {
    const { level, isGameWon, score } = get();
    const currentConfig = LEVELS[level - 1];
    
    if (isGameWon && score >= currentConfig.requiredScore) {
      const nextLevel = Math.min(level + 1, LEVELS.length);
      const nextConfig = LEVELS[nextLevel - 1];
      const initialTiles = createInitialTiles(nextConfig.gridSize).map(t => ({
        ...t,
        revealedByHint: false
      }));
      
      set({
        level: nextLevel,
        tiles: initialTiles,
        currentNumber: 1,
        moves: 0,
        hintsRemaining: { single: nextConfig.hintsAllowed, flash: nextConfig.hintsAllowed },
        timeRemaining: nextConfig.timeLimit,
        score: 0,
        isGameWon: false,
        isPlaying: true,
      });
    } else {
      const initialTiles = createInitialTiles(currentConfig.gridSize).map(t => ({
        ...t,
        revealedByHint: false
      }));
      
      set({
        tiles: initialTiles,
        currentNumber: 1,
        moves: 0,
        hintsRemaining: { single: currentConfig.hintsAllowed, flash: currentConfig.hintsAllowed },
        timeRemaining: currentConfig.timeLimit,
        score: 0,
        isGameWon: false,
        isPlaying: true,
      });
    }
  },
}));