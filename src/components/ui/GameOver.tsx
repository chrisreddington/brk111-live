import styles from '../game/Game.module.css';

interface GameOverProps {
  score: number;
  onRestart: () => void;
  gameWon: boolean;
}

export const GameOver = ({ score, onRestart, gameWon }: GameOverProps) => {
  return (
    <div className={styles.gameOver}>
      <h2>{gameWon ? 'You Win!' : 'Game Over'}</h2>
      <p>Score: {score}</p>
      <button onClick={onRestart}>Play Again</button>
    </div>
  );
};