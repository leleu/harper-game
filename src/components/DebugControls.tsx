import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../state/gameStore'
import type { GamePhase } from '../state/gameStore'

const SPEED_PRESETS = [1, 2, 5, 10, 20]

export function DebugControls() {
  const [isOpen, setIsOpen] = useState(false)
  const skipToPhase = useGameStore((s) => s.skipToPhase)
  const currentPhase = useGameStore((s) => s.gamePhase)
  const speedMultiplier = useGameStore((s) => s.speedMultiplier)
  const setSpeedMultiplier = useGameStore((s) => s.setSpeedMultiplier)

  // Only show in development
  if (import.meta.env.PROD) return null

  const phases: GamePhase[] = ['tutorial', 'ramp', 'overwhelm', 'harper', 'mastery', 'winddown']

  return (
    <div className="fixed bottom-4 right-4 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="mb-2 p-3 rounded-lg bg-slate-900/95 backdrop-blur-sm border border-gold/30 shadow-xl"
          >
            {/* Speed Controls */}
            <div className="text-[10px] uppercase tracking-wider text-gold/70 font-bold mb-2">
              Speed
            </div>
            <div className="flex gap-1.5 mb-3">
              {SPEED_PRESETS.map((speed) => (
                <button
                  key={speed}
                  onClick={() => setSpeedMultiplier(speed)}
                  className={`px-2.5 py-1 text-xs rounded font-medium transition-all cursor-pointer ${
                    speed === speedMultiplier
                      ? 'bg-gold/20 text-gold'
                      : 'bg-slate-700/50 text-pearl hover:bg-gold/30 hover:text-gold'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>

            {/* Phase Skip */}
            <div className="text-[10px] uppercase tracking-wider text-gold/70 font-bold mb-2">
              Skip to Phase
            </div>
            <div className="flex flex-col gap-1.5">
              {phases.map((phase) => (
                <button
                  key={phase}
                  onClick={() => {
                    skipToPhase(phase)
                    setIsOpen(false)
                  }}
                  disabled={phase === currentPhase}
                  className={`px-3 py-1.5 text-xs rounded font-medium transition-all ${
                    phase === currentPhase
                      ? 'bg-gold/20 text-gold cursor-not-allowed'
                      : 'bg-slate-700/50 text-pearl hover:bg-gold/30 hover:text-gold cursor-pointer'
                  }`}
                >
                  {phase.charAt(0).toUpperCase() + phase.slice(1)}
                  {phase === currentPhase && ' (current)'}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-gold/20 border border-gold/40 backdrop-blur-sm
                   flex items-center justify-center text-gold text-sm font-mono font-bold
                   hover:bg-gold/30 transition-colors cursor-pointer shadow-lg"
        title="Debug Controls"
      >
        {speedMultiplier > 1 ? `${speedMultiplier}x` : '🐛'}
      </motion.button>
    </div>
  )
}
