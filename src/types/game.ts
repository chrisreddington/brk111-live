// Game entity types
export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Entity {
  position: Position;
  size: Size;
  speed?: number;
  direction?: number; // 1 for right, -1 for left
}

export interface PlayerEntity extends Entity {
  lives: number;
  isOnLog: boolean;
}

export interface ObstacleEntity extends Entity {
  type: 'car';
  variant: number; // Different car designs (1-3)
}

export interface PlatformEntity extends Entity {
  type: 'log';
}

export interface GameState {
  player: PlayerEntity;
  obstacles: ObstacleEntity[];
  platforms: PlatformEntity[];
  score: number;
  gameOver: boolean;
  gameWon: boolean;
  level: number;
}

export type Direction = 'up' | 'down' | 'left' | 'right';

export interface GameConfig {
  gridSize: number; // Size of each grid cell
  gridWidth: number; // Number of grid cells horizontally
  gridHeight: number; // Number of grid cells vertically
  playerSpeed: number;
  carSpeed: number;
  logSpeed: number;
  carSpawnRate: number; // Lower means more cars
  logSpawnRate: number; // Lower means more logs
}