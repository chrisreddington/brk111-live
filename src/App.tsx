import './App.css'
import { GameArea } from './components/game/GameArea'

function App() {
  return (
    <>
      <h1>GitHub Frogger</h1>
      <p>Use arrow keys or WASD to move. Reach the top without getting hit by cars or falling into the river!</p>
      <GameArea />
    </>
  )
}

export default App
