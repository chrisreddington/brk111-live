import { useState, useCallback, useMemo } from 'react';
import type { Direction, GameConfig, GameState, PlayerEntity, ObstacleEntity, PlatformEntity } from '../../types/game';
import { useGameLoop } from '../../hooks/useGameLoop';
import { useControls } from '../../hooks/useControls';
import { useCollision } from '../../hooks/useCollision';
import { moveEntity, moveHorizontally, wrapEntityHorizontally } from '../../utils/physics';
import { generateRandomCar, generateRandomLog, randomIntBetween } from '../../utils/random';
import { Player } from './Player';
import { Car } from './Car';
import { Log } from './Log';
import { River } from './River';
import { Road } from './Road';
import { Score } from '../ui/Score';
import { GameOver } from '../ui/GameOver';
import styles from './Game.module.css';

export const GameArea = () => {
  // Game configuration
  const gameConfig = useMemo((): GameConfig => ({
    gridSize: 40,
    gridWidth: 10,
    gridHeight: 12,
    playerSpeed: 40,
    carSpeed: 100,
    logSpeed: 50,
    carSpawnRate: 2, // seconds
    logSpawnRate: 3, // seconds
  }), []);

  // Calculate dimensions
  const width = gameConfig.gridSize * gameConfig.gridWidth;
  const height = gameConfig.gridSize * gameConfig.gridHeight;

  // Game state
  const [gameState, setGameState] = useState<GameState>(() => {
    // Initial player position (center bottom)
    const playerSize = { width: gameConfig.gridSize - 10, height: gameConfig.gridSize - 10 };
    const playerX = (gameConfig.gridWidth * gameConfig.gridSize) / 2 - playerSize.width / 2;
    const playerY = (gameConfig.gridHeight - 1) * gameConfig.gridSize;
    
    const initialPlayer: PlayerEntity = {
      position: { x: playerX, y: playerY },
      size: playerSize,
      lives: 3,
      isOnLog: false,
    };

    return {
      player: initialPlayer,
      obstacles: [], // Cars
      platforms: [], // Logs
      score: 0,
      gameOver: false,
      gameWon: false,
      level: 1,
    };
  });

  // We're using functional state updates in the game loop,
  // but TypeScript's rules require us to declare the state variables.
  // These variables are conceptually used but TypeScript can't detect that.
  const [, setCarTimer] = useState(0);
  const [, setLogTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const { checkCollisions, isInBounds } = useCollision();

  // Set up river and road positions
  const roadTop = gameConfig.gridSize * 6;
  const roadHeight = gameConfig.gridSize * 4;
  const riverTop = gameConfig.gridSize * 1;
  const riverHeight = gameConfig.gridSize * 5;

  // Handle player movement
  const handleMove = useCallback((direction: Direction) => {
    if (gameState.gameOver || !isRunning) return;

    setGameState((prevState) => {
      const newPlayer = moveEntity(prevState.player, direction, gameConfig.playerSpeed);

      // Check if player is out of bounds
      if (!isInBounds(newPlayer, width, height)) {
        return {
          ...prevState,
          gameOver: true,
        };
      }

      // Calculate new score based on y position (higher = better score)
      const maxY = (gameConfig.gridHeight - 1) * gameConfig.gridSize;
      const distanceFromBottom = maxY - newPlayer.position.y;
      const newScore = Math.floor(distanceFromBottom / gameConfig.gridSize);

      // Check if player reached the top (win condition)
      const gameWon = newPlayer.position.y <= gameConfig.gridSize;

      return {
        ...prevState,
        player: newPlayer as PlayerEntity,
        score: Math.max(prevState.score, newScore),
        gameWon,
        gameOver: gameWon,
      };
    });
  }, [gameState.gameOver, isRunning, width, height, gameConfig, isInBounds]);

  // Set up keyboard controls
  useControls({ onMove: handleMove });

  // Game update function
  const updateGame = useCallback((deltaTime: number) => {
    if (gameState.gameOver || !isRunning) return;

    setCarTimer((prev) => {
      let timer = prev + deltaTime;
      // Spawn new cars
      if (timer >= gameConfig.carSpawnRate / gameState.level) {
        // Reset timer
        timer = 0;

        setGameState((prevState) => {
          // Choose a random lane in the road section
          const laneCount = 4;
          const laneIndex = randomIntBetween(0, laneCount - 1);
          const laneY = roadTop + laneIndex * gameConfig.gridSize;
          
          // Randomize direction (left/right)
          const direction = Math.random() > 0.5 ? 1 : -1; 
          
          // Create a new car
          const newCar = generateRandomCar(
            laneY,
            gameConfig.gridSize,
            gameConfig.gridWidth,
            gameConfig.carSpeed * (0.8 + Math.random() * 0.4), // Randomize speed slightly
            direction
          );
          
          return {
            ...prevState,
            obstacles: [...prevState.obstacles, newCar],
          };
        });
      }
      return timer;
    });

    setLogTimer((prev) => {
      let timer = prev + deltaTime;
      // Spawn new logs
      if (timer >= gameConfig.logSpawnRate / gameState.level) {
        // Reset timer
        timer = 0;

        setGameState((prevState) => {
          // Choose a random lane in the river section
          const laneCount = 5;
          const laneIndex = randomIntBetween(0, laneCount - 1);
          const laneY = riverTop + laneIndex * gameConfig.gridSize;
          
          // Randomize direction (left/right)
          const direction = Math.random() > 0.5 ? 1 : -1; 
          
          // Create a new log
          const newLog = generateRandomLog(
            laneY,
            gameConfig.gridSize,
            gameConfig.gridWidth,
            gameConfig.logSpeed * (0.8 + Math.random() * 0.4), // Randomize speed slightly
            direction
          );
          
          return {
            ...prevState,
            platforms: [...prevState.platforms, newLog],
          };
        });
      }
      return timer;
    });

    // Update game state
    setGameState((prevState) => {
      // Update car positions
      const updatedCars = prevState.obstacles
        .map((car) => moveHorizontally(car, deltaTime))
        .map((car) => wrapEntityHorizontally(car, width))
        // Remove cars that are off-screen
        .filter((car) => car.position.x + car.size.width > -100 && car.position.x < width + 100);

      // Update log positions
      const updatedLogs = prevState.platforms
        .map((log) => moveHorizontally(log, deltaTime))
        .map((log) => wrapEntityHorizontally(log, width))
        // Remove logs that are off-screen
        .filter((log) => log.position.x + log.size.width > -100 && log.position.x < width + 100);

      // Check if player collided with any cars
      const isHitByCar = checkCollisions(prevState.player, updatedCars);
      
      // Update player position if riding a log
      let updatedPlayer = { ...prevState.player };
      
      // Check if player is in the river area
      const isInRiverArea = 
        updatedPlayer.position.y >= riverTop && 
        updatedPlayer.position.y < riverTop + riverHeight;
      
      // Check if player is on any log
      const logPlayerIsOn = isInRiverArea ? 
        checkCollisions(updatedPlayer, updatedLogs) : null;
      
      // If player is in river but not on a log, game over
      const drowned = isInRiverArea && !logPlayerIsOn;

      // If player is on a log, move with it
      if (logPlayerIsOn && logPlayerIsOn.direction) {
        updatedPlayer = {
          ...updatedPlayer,
          position: {
            x: updatedPlayer.position.x + (logPlayerIsOn.speed || 0) * deltaTime * logPlayerIsOn.direction,
            y: updatedPlayer.position.y
          },
          isOnLog: true
        };
        
        // Check if player moved off-screen while on log
        if (!isInBounds(updatedPlayer, width, height)) {
          return {
            ...prevState,
            gameOver: true
          };
        }
      } else {
        updatedPlayer.isOnLog = false;
      }

      // Game over conditions
      if (isHitByCar || drowned) {
        return {
          ...prevState,
          gameOver: true
        };
      }

      return {
        ...prevState,
        player: updatedPlayer,
        obstacles: updatedCars as ObstacleEntity[],
        platforms: updatedLogs as PlatformEntity[],
      };
    });
  }, [gameState.gameOver, isRunning, gameConfig, roadTop, riverTop, riverHeight, width, height, checkCollisions, isInBounds, gameState.level]);

  // Set up game loop
  useGameLoop({ onUpdate: updateGame, isRunning });

  // Handle game restart
  const handleRestart = () => {
    // Reset all state
    setGameState((prevState) => {
      // Initial player position (center bottom)
      const playerSize = { width: gameConfig.gridSize - 10, height: gameConfig.gridSize - 10 };
      const playerX = (gameConfig.gridWidth * gameConfig.gridSize) / 2 - playerSize.width / 2;
      const playerY = (gameConfig.gridHeight - 1) * gameConfig.gridSize;
      
      const initialPlayer: PlayerEntity = {
        position: { x: playerX, y: playerY },
        size: playerSize,
        lives: 3,
        isOnLog: false,
      };

      return {
        player: initialPlayer,
        obstacles: [], // Cars
        platforms: [], // Logs
        score: 0,
        gameOver: false,
        gameWon: false,
        level: prevState.level + (prevState.gameWon ? 1 : 0), // Increase level only if won
      };
    });

    setCarTimer(0);
    setLogTimer(0);
    setIsRunning(true);
  };

  return (
    <div 
      className={styles.gameArea} 
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {/* Goal area at the top */}
      <div className={styles.goalArea}></div>
      
      {/* River area */}
      <River top={riverTop} height={riverHeight} />
      
      {/* Road area */}
      <Road top={roadTop} height={roadHeight} />
      
      {/* Render logs */}
      {gameState.platforms.map((log, index) => (
        <Log key={`log-${index}`} log={log} />
      ))}
      
      {/* Render cars */}
      {gameState.obstacles.map((car, index) => (
        <Car key={`car-${index}`} car={car} />
      ))}
      
      {/* Render player */}
      <Player player={gameState.player} />
      
      {/* Score UI */}
      <Score score={gameState.score} />
      
      {/* Game over screen */}
      {gameState.gameOver && (
        <GameOver 
          score={gameState.score} 
          onRestart={handleRestart}
          gameWon={gameState.gameWon}
        />
      )}
    </div>
  );
};