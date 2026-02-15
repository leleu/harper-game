import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import type { GamePhase } from '../state/gameStore'

const PHASE_MESSAGES: Partial<Record<GamePhase, { headline: string; sub?: string }>> = {
  ramp: {
    headline: 'More submissions. Same hours.',
    sub: 'This is what 57% admin time feels like.',
  },
  overwhelm: {
    headline: "You can't keep up.",
    sub: 'Every red timer is a client finding another broker.',
  },
  mastery: {
    headline: 'Now you have time.',
    sub: 'Same volume. Fewer clicks. The gold tasks are reachable again.',
  },
}

interface PhaseOverlayProps {
  phase: GamePhase
}

export function PhaseOverlay({ phase }: PhaseOverlayProps) {
  const [visible, setVisible] = useState(false)
  const [current, setCurrent] = useState<{ headline: string; sub?: string } | null>(null)
  const shownPhases = useRef(new Set<string>())

  useEffect(() => {
    const message = PHASE_MESSAGES[phase]
    if (!message || shownPhases.current.has(phase)) return

    shownPhases.current.add(phase)
    setCurrent(message)
    setVisible(true)

    const timer = setTimeout(() => setVisible(false), 2500)
    return () => clearTimeout(timer)
  }, [phase])

  return (
    <AnimatePresence>
      {visible && current && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
        >
          <div className="text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl font-semibold text-harper-teal"
            >
              {current.headline}
            </motion.p>
            {current.sub && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-sm text-harper-teal-mid mt-1"
              >
                {current.sub}
              </motion.p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
