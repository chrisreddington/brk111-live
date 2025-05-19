import type { ObstacleEntity, PlatformEntity } from '../types/game';

// Generate a random number between min and max
export const randomBetween = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

// Generate a random integer between min and max (inclusive)
export const randomIntBetween = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate a random car
export const generateRandomCar = (
  y: number,
  gridSize: number,
  gridWidth: number,
  speed: number,
  direction: number
): ObstacleEntity => {
  // Random car width between 1-3 grid cells
  const width = randomIntBetween(1, 2) * gridSize;
  const height = gridSize;
  
  // Start position (outside screen based on direction)
  const x = direction > 0 ? -width : gridWidth * gridSize;
  
  return {
    type: 'car',
    position: { x, y },
    size: { width, height },
    speed,
    direction,
    variant: randomIntBetween(1, 3) // 3 variants of cars
  };
};

// Generate a random log
export const generateRandomLog = (
  y: number,
  gridSize: number,
  gridWidth: number,
  speed: number,
  direction: number
): PlatformEntity => {
  // Random log width between 2-4 grid cells
  const width = randomIntBetween(2, 4) * gridSize;
  const height = gridSize;
  
  // Start position (outside screen based on direction)
  const x = direction > 0 ? -width : gridWidth * gridSize;
  
  return {
    type: 'log',
    position: { x, y },
    size: { width, height },
    speed,
    direction
  };
};