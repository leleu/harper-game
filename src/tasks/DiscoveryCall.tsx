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
            className="absolute inset-0 z-10 flex items-center justify-center bg-midnight/60"
          >
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 12 }}
              className={`rounded-full w-24 h-24 flex items-center justify-center text-5xl shadow-lg
                ${selected !== null && options[selected].correct
                  ? 'bg-emerald text-white'
                  : 'bg-amber text-white'
                }
              `}
            >
              {selected !== null && options[selected].correct ? '✓' : '~'}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-lg w-full">
        <div className="card-elevated rounded-xl border-2 border-gold/40 p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">⭐</span>
            <h3 className="text-sm font-semibold text-gold uppercase tracking-wider">
              Discovery Call — {activeTask?.clientName}
            </h3>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4 mb-5 border border-slate-600/30">
            <p className="text-sm text-pearl font-medium">{question}</p>
            <p className="text-xs text-mist mt-1">
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
                  data-testid={`discovery-option-${idx}`}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-all cursor-pointer
                    ${isSelected
                      ? isCorrect
                        ? 'border-emerald bg-emerald/5'
                        : 'border-crimson bg-crimson/5'
                      : selected !== null && isCorrect
                        ? 'border-emerald/30 bg-emerald/5'
                        : selected !== null
                          ? 'opacity-50'
                          : 'border-slate-600/30 bg-slate-700/30 hover:border-gold/30'
                    }
                  `}
                >
                  <span className={`text-sm font-medium
                    ${isSelected
                      ? isCorrect ? 'text-emerald' : 'text-crimson'
                      : 'text-pearl'
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
                    ? 'bg-emerald/10 text-emerald'
                    : 'bg-crimson/10 text-crimson'
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
