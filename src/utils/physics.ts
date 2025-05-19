import type { Direction, Entity, Position } from '../types/game';

// Move an entity in a given direction
export const moveEntity = (entity: Entity, direction: Direction, distance: number): Entity => {
  const newPosition: Position = { ...entity.position };
  
  switch (direction) {
    case 'up':
      newPosition.y -= distance;
      break;
    case 'down':
      newPosition.y += distance;
      break;
    case 'left':
      newPosition.x -= distance;
      break;
    case 'right':
      newPosition.x += distance;
      break;
  }

  return {
    ...entity,
    position: newPosition
  };
};

// Move an entity horizontally based on its speed and direction
export const moveHorizontally = (entity: Entity, deltaTime: number): Entity => {
  if (!entity.speed || !entity.direction) return entity;
  
  const distance = entity.speed * deltaTime;
  const newPosition: Position = {
    x: entity.position.x + (distance * entity.direction),
    y: entity.position.y
  };

  return {
    ...entity,
    position: newPosition
  };
};

// Wrap entity around screen if it goes out of bounds horizontally
export const wrapEntityHorizontally = (entity: Entity, screenWidth: number): Entity => {
  let newX = entity.position.x;
  
  if (newX > screenWidth) {
    newX = -entity.size.width;
  } else if (newX + entity.size.width < 0) {
    newX = screenWidth;
  }
  
  return {
    ...entity,
    position: {
      x: newX,
      y: entity.position.y
    }
  };
};