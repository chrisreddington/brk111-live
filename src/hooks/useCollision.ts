import type { Entity } from '../types/game';

export function useCollision() {
  // Check if two entities are colliding (AABB collision detection)
  const checkCollision = (entity1: Entity, entity2: Entity): boolean => {
    return (
      entity1.position.x < entity2.position.x + entity2.size.width &&
      entity1.position.x + entity1.size.width > entity2.position.x &&
      entity1.position.y < entity2.position.y + entity2.size.height &&
      entity1.position.y + entity1.size.height > entity2.position.y
    );
  };

  // Check if an entity is colliding with any entity in an array
  const checkCollisions = (entity: Entity, entities: Entity[]): Entity | null => {
    for (const other of entities) {
      if (checkCollision(entity, other)) {
        return other;
      }
    }
    return null;
  };

  // Check if entity is within bounds
  const isInBounds = (entity: Entity, width: number, height: number): boolean => {
    return (
      entity.position.x >= 0 &&
      entity.position.x + entity.size.width <= width &&
      entity.position.y >= 0 &&
      entity.position.y + entity.size.height <= height
    );
  };

  return { checkCollision, checkCollisions, isInBounds };
}