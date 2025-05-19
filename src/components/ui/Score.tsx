import styles from '../game/Game.module.css';

interface ScoreProps {
  score: number;
}

export const Score = ({ score }: ScoreProps) => {
  return (
    <div className={styles.scoreBoard}>
      Score: {score}
    </div>
  );
};