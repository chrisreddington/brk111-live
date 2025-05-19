import styles from './Game.module.css';

interface RoadProps {
  top: number;
  height: number;
}

export const Road = ({ top, height }: RoadProps) => {
  return (
    <div
      className={styles.road}
      style={{
        top: `${top}px`,
        height: `${height}px`,
      }}
    />
  );
};