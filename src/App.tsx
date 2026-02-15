import { useGameStore } from './state/gameStore'
import { StartScreen } from './components/StartScreen'
import { GameShell } from './components/GameShell'
import { EndOfDay } from './components/EndOfDay'

function App() {
  const screen = useGameStore((s) => s.screen)

  if (screen === 'start') return <StartScreen />
  if (screen === 'end') return <EndOfDay />
  return <GameShell />
}

export default App
