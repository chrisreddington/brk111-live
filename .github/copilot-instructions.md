This is a Vite and React-based implementation of {NAME OF GAME}. The game features {3-5 detailed sentences about the game, its mechanics, and its objectives}. 

We're making this game in a 30 minute live session, so I need your responses to be concise and focused on the task at hand.

## Code Standards

### Required Before Each Commit

- Run `npm run lint` to ensure code follows project standards
- Make sure all components follow React best practices
- Components that use browser APIs (like canvas, keyboard events) or React hooks must be properly typed
- When adding new functionality, make sure you update the README
- Make sure that the repository structure documentation is correct and accurate in the Copilot Instructions file

### TypeScript and React Patterns

- Use TypeScript interfaces/types for all props, game states, and entities
- Follow React best practices (hooks, functional components)
- Implement proper game loop and animation frame management
- Components should be modular and follow single-responsibility principle
- Use proper collision detection and physics calculations

### Styling

- The game must be GitHub Themed. A few specific ideas include either:
  - Using the color scheme from the contribution graph (different shades of green). If possible, e.g. platforms in doodle jump, different shades of green for a snake in snake, etc.
  - Use an octocat as a character in the game. For initial prototyping feel free to use a placeholder image, and explicitly ask me to replace it with an octocat image later.
- Use CSS modules for component-specific styling
- Follow responsive design principles
- Maintain consistent game aesthetics

## Development Flow

- Install dependencies: `npm install`
- Development server: `npm run dev`
- Build: `npm run build`

- Let's avoid using these for this session (as we're short on time!), but FYI for later:
    - Test: `npm run test`
    - Lint: `npm run lint`

## Repository Structure

- `src/`: Source code directory
  - `components/`: Reusable React components
    - `components/game/`: Game-specific components (Platform, Player, etc.)
    - `components/ui/`: UI components (Score, Menu, etc.)
    - `components/__tests__/`: Component tests
  - `hooks/`: Custom React hooks
    - `useGameLoop.ts`: Game loop management
    - `useCollision.ts`: Collision detection
    - `useControls.ts`: Player controls
  - `utils/`: Utility functions
    - `physics.ts`: Physics calculations
    - `random.ts`: Random generation utilities
  - `assets/`: Game assets (sprites, sounds)
  - `types/`: TypeScript type definitions
- `public/`: Static assets
- `tests/`: Test files and test utilities
- `README.md`: Project documentation

## Game Architecture

1. Game Loop Management
   - Use RequestAnimationFrame for smooth animations
   - Implement delta time for consistent physics
   - Maintain steady FPS

2. Physics System
   - Implement gravity and jumping mechanics
   - Platform collision detection
   - Power-up effects

3. Game State Management
   - Track player position and velocity
   - Manage platform generation and recycling
   - Handle score and power-ups
   - Implement game over conditions

4. Asset Management
   - Efficient sprite loading and caching
   - Sound effect management
   - Texture atlases for better performance

## Key Guidelines

1. Performance Optimization
   - Use object pooling for platforms and particles
   - Implement proper garbage collection
   - Optimize render cycles

2. Game Design
   - Maintain consistent difficulty progression
   - Implement proper scoring system
   - Create engaging power-ups and obstacles

3. User Experience
   - Smooth controls and responsive gameplay
   - Clear visual feedback for player actions
   - Proper game over and restart mechanics

4. Accessibility
   - Include alternative control schemes
   - Provide visual and audio cues
   - Support different screen sizes and orientations

## Testing requirements

1. We're not going to write any tests for now (as we're incredibly tight on time), but please maintain a markdown file called `tests/README.md` that outlines the tests that should be created for each component and functionality. Write them as if they were GitHub Issues.
