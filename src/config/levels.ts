import { LevelConfig } from '../types/game';

export const LEVELS: LevelConfig[] = [
  {
    gridSize: 2,
    timeLimit: null,
    maxMoves: 8,
    hintsAllowed: 2,
    requiredScore: 50,
    flashDuration: 800,
  },
  {
    gridSize: 3,
    timeLimit: null,
    maxMoves: 15,
    hintsAllowed: 2,
    requiredScore: 100,
    flashDuration: 800,
  },
  {
    gridSize: 3,
    timeLimit: null,
    maxMoves: 15,
    hintsAllowed: 1,
    requiredScore: 150,
    flashDuration: 600,
  },
  {
    gridSize: 4,
    timeLimit: null,
    maxMoves: 25,
    hintsAllowed: 1,
    requiredScore: 200,
    flashDuration: 500,
  },
  {
    gridSize: 5,
    timeLimit: null,
    maxMoves: 40,
    hintsAllowed: 0,
    requiredScore: 250,
    flashDuration: 400,
  },
];