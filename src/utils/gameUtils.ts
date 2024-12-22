export const shuffleArray = (array: number[]): number[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const createInitialTiles = (gridSize: number) => {
  const totalTiles = gridSize * gridSize;
  const numbers = shuffleArray(Array.from({ length: totalTiles }, (_, i) => i + 1));
  return numbers.map((value, index) => ({
    id: index,
    value,
    isRevealed: false,
  }));
};