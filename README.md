# GitHub-themed Frogger Game

A fun implementation of the classic Frogger game with a GitHub theme built with React, TypeScript, and Vite.

## How to Play

- Use arrow keys or WASD to move the character
- Navigate from the bottom to the top of the screen
- Avoid cars on the road
- Cross the river by jumping on logs
- Reach the top to win!

## Features

- GitHub-themed colors (based on contribution graph)
- Responsive design for desktop and mobile
- Increasing difficulty as you level up
- Game loop managed with requestAnimationFrame

## Development

This project was built using React + TypeScript + Vite.

### Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint
```

### Project Structure

- `src/`: Source code directory
  - `components/`: Reusable React components
    - `components/game/`: Game-specific components (Player, Car, Log, etc.)
    - `components/ui/`: UI components (Score, GameOver, etc.)
  - `hooks/`: Custom React hooks
    - `useGameLoop.ts`: Game loop management
    - `useControls.ts`: Player controls
    - `useCollision.ts`: Collision detection
  - `utils/`: Utility functions
    - `physics.ts`: Physics calculations
    - `random.ts`: Random generation utilities
  - `types/`: TypeScript type definitions

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```
