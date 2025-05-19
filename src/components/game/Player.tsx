import type { PlayerEntity } from '../../types/game';
import styles from './Game.module.css';

interface PlayerProps {
  player: PlayerEntity;
}

export const Player = ({ player }: PlayerProps) => {
  const { position, size } = player;

  return (
    <div
      className={styles.player}
      style={{
        width: `${size.width}px`,
        height: `${size.height}px`,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
};