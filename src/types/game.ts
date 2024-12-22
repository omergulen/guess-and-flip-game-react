export interface Tile {
  id: number;
  value: number;
  isRevealed: boolean;
}

export interface LevelConfig {
  gridSize: number;
  timeLimit: number | null;
  maxMoves: number;
  hintsAllowed: number;
  requiredScore: number;
  flashDuration: number;
}

export interface GameState {
  tiles: Tile[];
  currentNumber: number;
  moves: number;
  level: number;
  bestScore: number;
  isGameWon: boolean;
  isPlaying: boolean;
  hintsRemaining: number;
  timeRemaining: number | null;
  score: number;
  initializeGame: () => void;
  revealTile: (id: number) => void;
  resetGame: () => void;
  useHint: () => void;
}