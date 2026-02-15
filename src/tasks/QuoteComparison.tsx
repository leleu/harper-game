import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../state/gameStore'
import type { QuoteOption } from '../engine/scenarios'

interface QuoteComparisonProps {
  harperAssisted?: boolean
}

export function QuoteComparison({ harperAssisted = false }: QuoteComparisonProps) {
  const activeTask = useGameStore((s) => s.activeTask)
  const completeActiveTask = useGameStore((s) => s.completeActiveTask)
  const incrementClicks = useGameStore((s) => s.incrementClicks)
  const scenario = activeTask?.scenarioData as Record<string, unknown> | undefined

  const [selected, setSelected] = useState<number | null>(null)
  const [completed, setCompleted] = useState(false)

  const quotes: QuoteOption[] = (scenario?.quotes as QuoteOption[]) || [
    { carrier: 'Carrier A', premium: '$2,100/mo', premiumAnnual: 25200, deductible: '$5,000', coverageLimit: '$2M', isBest: false },
    { carrier: 'Carrier B', premium: '$24,000/yr', premiumAnnual: 24000, deductible: '$2,500', coverageLimit: '$2M', isBest: true },
    { carrier: 'Carrier C', premium: '$2,450/mo', premiumAnnual: 29400, deductible: '$10,000', coverageLimit: '$5M', isBest: false },
  ]

  const handleSelect = useCallback((idx: number) => {
    if (completed) return
    incrementClicks()
    setSelected(idx)
  }, [completed, incrementClicks])

  const handleConfirm = useCallback(() => {
    if (selected === null || completed) return
    incrementClicks()
    setCompleted(true)
    const isCorrect = quotes[selected].isBest
    const revenue = isCorrect ? 500 : 200
    setTimeout(() => completeActiveTask(revenue, false), 600)
  }, [selected, completed, quotes, incrementClicks, completeActiveTask])

  if (!scenario) return null

  const bestIdx = harperAssisted ? quotes.findIndex(q => q.isBest) : -1

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
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
                ${selected !== null && quotes[selected].isBest
                  ? 'bg-harper-green text-white'
                  : 'bg-harper-warning text-white'
                }
              `}
            >
              {selected !== null && quotes[selected].isBest ? '✓' : '~'}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-3xl w-full">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-harper-teal uppercase tracking-wider">
              Quote Comparison — {activeTask?.clientName}
            </h3>
            <p className="text-xs text-harper-muted mt-0.5">
              Compare quotes and select the best value for the client
            </p>
          </div>
          {harperAssisted && (
            <span className="text-xs bg-harper-green/10 text-harper-green px-2 py-0.5 rounded-full font-medium">
              ⚡ Normalized by Harper
            </span>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3">
          {quotes.map((quote, idx) => {
            const isSelected = selected === idx
            const isRecommended = harperAssisted && idx === bestIdx

            return (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(idx)}
                disabled={completed}
                className={`text-left p-4 rounded-xl border-2 transition-all cursor-pointer relative
                  ${isSelected
                    ? 'border-harper-coral bg-harper-coral/5 ring-1 ring-harper-coral/30'
                    : isRecommended
                      ? 'border-harper-green bg-harper-green/5 ring-1 ring-harper-green/30'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }
                `}
              >
                {isRecommended && (
                  <span className="absolute -top-2 right-2 text-[10px] bg-harper-green text-white px-2 py-0.5 rounded-full font-medium">
                    Best Match
                  </span>
                )}

                <p className="font-semibold text-harper-teal text-sm">{quote.carrier}</p>

                <div className="mt-3 space-y-2">
                  <div>
                    <span className="text-[10px] text-harper-muted uppercase">Premium</span>
                    <p className={`text-sm font-mono font-medium ${harperAssisted ? 'text-harper-teal' : 'text-harper-teal'}`}>
                      {harperAssisted
                        ? `$${quote.premiumAnnual.toLocaleString()}/yr`
                        : quote.premium
                      }
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] text-harper-muted uppercase">Deductible</span>
                    <p className="text-sm font-mono text-harper-teal">{quote.deductible}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-harper-muted uppercase">Limit</span>
                    <p className="text-sm font-mono text-harper-teal">{quote.coverageLimit}</p>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>

        <motion.button
          whileHover={selected !== null ? { scale: 1.02 } : {}}
          whileTap={selected !== null ? { scale: 0.98 } : {}}
          onClick={handleConfirm}
          disabled={selected === null || completed}
          className={`mt-4 w-full py-2.5 rounded-full font-semibold text-sm transition-all cursor-pointer
            ${selected !== null && !completed
              ? 'bg-harper-teal text-harper-beige hover:bg-harper-teal-mid'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          {completed ? 'Confirmed ✓' : 'Select This Quote'}
        </motion.button>
      </div>
    </div>
  )
}
