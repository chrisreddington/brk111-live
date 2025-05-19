import { useEffect, useState } from 'react';
import type { Direction } from '../types/game';

interface UseControlsProps {
  onMove?: (direction: Direction) => void;
}

export function useControls({ onMove }: UseControlsProps = {}) {
  const [keysPressed, setKeysPressed] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;
      // Prevent scrolling with arrow keys
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd'].includes(key)) {
        event.preventDefault();
      }

      setKeysPressed((prev) => ({ ...prev, [key]: true }));

      // Map keys to directions
      let direction: Direction | undefined;
      
      if (key === 'ArrowUp' || key === 'w') direction = 'up';
      if (key === 'ArrowDown' || key === 's') direction = 'down';
      if (key === 'ArrowLeft' || key === 'a') direction = 'left';
      if (key === 'ArrowRight' || key === 'd') direction = 'right';

      if (direction && onMove) {
        onMove(direction);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const { key } = event;
      setKeysPressed((prev) => ({ ...prev, [key]: false }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [onMove]);

  return { keysPressed };
}