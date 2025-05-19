import type { PlatformEntity } from '../../types/game';
import styles from './Game.module.css';

interface LogProps {
  log: PlatformEntity;
}

export const Log = ({ log }: LogProps) => {
  const { position, size } = log;

  return (
    <div
      className={styles.log}
      style={{
        width: `${size.width}px`,
        height: `${size.height}px`,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
};