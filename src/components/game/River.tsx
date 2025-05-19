import styles from './Game.module.css';

interface RiverProps {
  top: number;
  height: number;
}

export const River = ({ top, height }: RiverProps) => {
  return (
    <div
      className={styles.river}
      style={{
        top: `${top}px`,
        height: `${height}px`,
      }}
    />
  );
};