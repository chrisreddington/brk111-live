import type { ObstacleEntity } from '../../types/game';
import styles from './Game.module.css';

interface CarProps {
  car: ObstacleEntity;
}

export const Car = ({ car }: CarProps) => {
  const { position, size, variant } = car;
  
  // Get a slightly different shade based on variant
  const getCarColor = () => {
    switch(variant) {
      case 1: return '#216e39'; // dark green
      case 2: return '#2ea043'; // medium green
      case 3: return '#39d353'; // light green
      default: return '#216e39'; // default dark green
    }
  };

  return (
    <div
      className={styles.car}
      style={{
        width: `${size.width}px`,
        height: `${size.height}px`,
        left: `${position.x}px`,
        top: `${position.y}px`,
        backgroundColor: getCarColor(),
      }}
    />
  );
};