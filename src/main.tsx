import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { useGameStore } from './state/gameStore'

// Dev-only test bridge for Playwright automation
if (!import.meta.env.PROD) {
  window.__HARPER_GAME__ = {
    getState: () => useGameStore.getState() as unknown as Record<string, unknown>,
    setSpeedMultiplier: (n: number) => useGameStore.getState().setSpeedMultiplier(n),
    skipToPhase: (phase) => useGameStore.getState().skipToPhase(phase),
    startGame: () => useGameStore.getState().startGame(),
    resetGame: () => useGameStore.getState().resetGame(),
    setPaused: (paused: boolean) => useGameStore.getState().setPaused(paused),
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
