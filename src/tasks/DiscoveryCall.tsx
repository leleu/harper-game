import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../state/gameStore'

export function DiscoveryCall() {
  const activeTask = useGameStore((s) => s.activeTask)
  const completeActiveTask = useGameStore((s) => s.completeActiveTask)
  const incrementClicks = useGameStore((s) => s.incrementClicks)
  const scenario = activeTask?.scenarioData as Record<string, unknown> | undefined

  const [selected, setSelected] = useState<number | null>(null)
  const [completed, setCompleted] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  const question = (scenario?.discoveryQuestion as string) || 'What coverage does this client need?'
  const options = (scenario?.discoveryOptions as { label: string; correct: boolean; explanation: string }[]) || [
    { label: 'General Liability', correct: true, explanation: 'Correct!' },
    { label: 'Marine Cargo', correct: false, explanation: 'Not relevant here.' },
    { label: 'Aviation', correct: false, explanation: 'Not relevant here.' },
  ]

  const handleSelect = useCallback((idx: number) => {
    if (completed) return
    incrementClicks()
    setSelected(idx)
    setShowExplanation(true)

    setTimeout(() => {
      setCompleted(true)
      const isCorrect = options[idx].correct
      const revenue = isCorrect ? 800 : 300
      setTimeout(() => completeActiveTask(revenue, true), 600)
    }, 1500)
  }, [completed, options, incrementClicks, completeActiveTask])

  if (!scenario) return null

  return (
    <div className="flex-1 flex items-center justify-center p-6 relative">
      <AnimatePresence>
        {completed && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute inset-0 z-10 flex items-center justify-center bg-harper-beige/60"
          >
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 12 }}
              className={`rounded-full w-24 h-24 flex items-center justify-center text-5xl shadow-lg
                ${selected !== null && options[selected].correct
                  ? 'bg-harper-green text-white'
                  : 'bg-harper-warning text-white'
                }
              `}
            >
              {selected !== null && options[selected].correct ? '✓' : '~'}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-lg w-full">
        <div className="bg-white rounded-xl shadow-sm border-2 border-amber-300 p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">⭐</span>
            <h3 className="text-sm font-semibold text-harper-teal uppercase tracking-wider">
              Discovery Call — {activeTask?.clientName}
            </h3>
          </div>

          <div className="bg-amber-50 rounded-lg p-4 mb-5">
            <p className="text-sm text-harper-teal font-medium">{question}</p>
            <p className="text-xs text-harper-muted mt-1">
              {(scenario as Record<string, string>).industry} • {(scenario as Record<string, string>).employees} employees
            </p>
          </div>

          <div className="space-y-2">
            {options.map((opt, idx) => {
              const isSelected = selected === idx
              const isCorrect = opt.correct

              return (
                <motion.button
                  key={idx}
                  whileHover={!completed ? { scale: 1.01 } : {}}
                  whileTap={!completed ? { scale: 0.99 } : {}}
                  onClick={() => handleSelect(idx)}
                  disabled={selected !== null}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-all cursor-pointer
                    ${isSelected
                      ? isCorrect
                        ? 'border-harper-green bg-harper-green/5'
                        : 'border-harper-coral bg-harper-coral/5'
                      : selected !== null && isCorrect
                        ? 'border-harper-green/30 bg-harper-green/5'
                        : selected !== null
                          ? 'opacity-50'
                          : 'border-gray-200 bg-gray-50 hover:border-harper-teal/30'
                    }
                  `}
                >
                  <span className={`text-sm font-medium
                    ${isSelected
                      ? isCorrect ? 'text-harper-green' : 'text-harper-coral'
                      : 'text-harper-teal'
                    }
                  `}>
                    {opt.label}
                  </span>
                </motion.button>
              )
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {showExplanation && selected !== null && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4"
              >
                <div className={`rounded-lg p-3 text-sm
                  ${options[selected].correct
                    ? 'bg-harper-green/10 text-harper-green'
                    : 'bg-harper-coral/10 text-harper-coral'
                  }
                `}>
                  {options[selected].explanation}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
