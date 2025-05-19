import { useEffect, useRef } from 'react';

interface UseGameLoopProps {
  onUpdate: (deltaTime: number) => void;
  fps?: number;
  isRunning?: boolean;
}

export function useGameLoop({ onUpdate, fps = 60, isRunning = true }: UseGameLoopProps) {
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const fpsInterval = useRef<number>(1000 / fps);
  
  useEffect(() => {
    const gameLoop = (timestamp: number) => {
      // Set initial timestamp
      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      }

      // Calculate elapsed time
      const deltaTime = timestamp - lastTimeRef.current;

      // Only update if enough time has passed for target FPS
      if (deltaTime >= fpsInterval.current) {
        // Update last time to current time - remaining time
        lastTimeRef.current = timestamp - (deltaTime % fpsInterval.current);

        // Call the update function with delta time in seconds
        onUpdate(deltaTime / 1000);
      }

      // Request next frame if game is still running
      if (isRunning) {
        frameRef.current = requestAnimationFrame(gameLoop);
      }
    };

    if (isRunning) {
      frameRef.current = requestAnimationFrame(gameLoop);
    }

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [fps, onUpdate, isRunning]);
}