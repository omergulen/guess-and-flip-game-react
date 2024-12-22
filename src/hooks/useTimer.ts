import { useEffect, useState } from 'react';
import { useGameStore } from '../store/gameStore';

export const useTimer = (initialTime: number | null, onTimeUp: () => void) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const isPlaying = useGameStore(state => state.isPlaying);

  useEffect(() => {
    setTimeRemaining(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (!initialTime || !isPlaying) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev === null || prev <= 0) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [initialTime, onTimeUp, isPlaying]);

  return timeRemaining;
};