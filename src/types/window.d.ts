import type { GamePhase } from '../state/gameStore'

interface HarperGameBridge {
  getState: () => Record<string, unknown>
  setSpeedMultiplier: (n: number) => void
  skipToPhase: (phase: GamePhase) => void
  startGame: () => void
  resetGame: () => void
  setPaused: (paused: boolean) => void
}

declare global {
  interface Window {
    __HARPER_GAME__?: HarperGameBridge
    __HARPER_SKIP_CINEMATICS__?: boolean
  }
}

export {}
