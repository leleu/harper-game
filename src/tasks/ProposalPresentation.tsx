import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../state/gameStore'

export function ProposalPresentation() {
  const activeTask = useGameStore((s) => s.activeTask)
  const completeActiveTask = useGameStore((s) => s.completeActiveTask)
  const incrementClicks = useGameStore((s) => s.incrementClicks)
  const scenario = activeTask?.scenarioData as Record<string, unknown> | undefined

  const [selected, setSelected] = useState<number | null>(null)
  const [completed, setCompleted] = useState(false)

  const priority = (scenario?.proposalPriority as string) || 'value'
  const options = (scenario?.proposalOptions as { label: string; correct: boolean }[]) || [
    { label: 'Best value option', correct: true },
    { label: 'Cheapest option', correct: false },
    { label: 'Highest limits', correct: false },
  ]

  const priorityLabel: Record<string, string> = {
    speed: '"I need this done fast — our funding round closes next week."',
    'coverage-breadth': '"We can\'t have any gaps — Boeing audits everything."',
    value: '"I want the best bang for my buck. Not cheapest — best."',
  }

  const handleSelect = useCallback((idx: number) => {
    if (completed) return
    incrementClicks()
    setSelected(idx)
  }, [completed, incrementClicks])

  const handlePresent = useCallback(() => {
    if (selected === null || completed) return
    incrementClicks()
    setCompleted(true)
    const isCorrect = options[selected].correct
    const revenue = isCorrect ? 1200 : 400
    setTimeout(() => completeActiveTask(revenue, true), 600)
  }, [selected, completed, options, incrementClicks, completeActiveTask])

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
              Proposal — {activeTask?.clientName}
            </h3>
          </div>

          {/* Client priority */}
          <div className="bg-slate-700/50 rounded-lg p-4 mb-5 border border-slate-600/30">
            <p className="text-xs text-gold font-medium mb-1">Client's Priority</p>
            <p className="text-sm text-pearl italic">
              {priorityLabel[priority] || priorityLabel.value}
            </p>
          </div>

          <p className="text-sm text-mist mb-3">Which option matches their priority?</p>

          <div className="space-y-2">
            {options.map((opt, idx) => {
              const isSelected = selected === idx
              return (
                <motion.button
                  key={idx}
                  whileHover={!completed ? { scale: 1.01 } : {}}
                  whileTap={!completed ? { scale: 0.99 } : {}}
                  onClick={() => handleSelect(idx)}
                  disabled={completed}
                  data-testid={`proposal-option-${idx}`}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-all cursor-pointer
                    ${isSelected
                      ? 'border-gold bg-gold/5 ring-1 ring-gold/30'
                      : 'border-slate-600/30 bg-slate-700/30 hover:border-gold/30'
                    }
                    ${completed && opt.correct ? 'border-emerald bg-emerald/5' : ''}
                  `}
                >
                  <span className="text-sm font-medium text-pearl">{opt.label}</span>
                </motion.button>
              )
            })}
          </div>

          <motion.button
            whileHover={selected !== null ? { scale: 1.02 } : {}}
            whileTap={selected !== null ? { scale: 0.98 } : {}}
            onClick={handlePresent}
            disabled={selected === null || completed}
            data-testid="proposal-present"
            className={`w-full mt-4 py-2.5 rounded-full font-semibold text-sm transition-all cursor-pointer
              ${selected !== null && !completed
                ? 'bg-gradient-to-br from-gold via-gold-bright to-gold-dim text-midnight hover:shadow-lg'
                : 'bg-slate-700 text-mist/50 cursor-not-allowed'
              }
            `}
          >
            {completed ? 'Presented ✓' : 'Present to Client'}
          </motion.button>
        </div>
      </div>
    </div>
  )
}
