import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../state/gameStore'

interface COIIssuanceProps {
  harperAssisted?: boolean
}

const FIELDS = [
  { key: 'businessName', label: 'Named Insured' },
  { key: 'coiHolder', label: 'Certificate Holder' },
  { key: 'coiEmail', label: 'Send To Email' },
  { key: 'address', label: 'Insured Address' },
]

export function COIIssuance({ harperAssisted = false }: COIIssuanceProps) {
  const activeTask = useGameStore((s) => s.activeTask)
  const completeActiveTask = useGameStore((s) => s.completeActiveTask)
  const incrementClicks = useGameStore((s) => s.incrementClicks)
  const scenario = activeTask?.scenarioData as Record<string, string> | undefined

  const [filledFields, setFilledFields] = useState<Record<string, boolean>>(() => {
    if (harperAssisted) {
      const prefilled: Record<string, boolean> = {}
      FIELDS.forEach(f => { prefilled[f.key] = true })
      return prefilled
    }
    return {}
  })
  const [completed, setCompleted] = useState(false)

  const allFilled = FIELDS.every(f => filledFields[f.key])

  const handleFieldClick = useCallback((key: string) => {
    if (filledFields[key] || completed) return
    incrementClicks()
    setFilledFields(prev => ({ ...prev, [key]: true }))
  }, [filledFields, completed, incrementClicks])

  const handleSend = useCallback(() => {
    if (!allFilled || completed) return
    incrementClicks()
    setCompleted(true)
    setTimeout(() => completeActiveTask(50, false), 600)
  }, [allFilled, completed, incrementClicks, completeActiveTask])

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
              className="bg-emerald text-white rounded-full w-24 h-24 flex items-center justify-center text-5xl shadow-lg"
            >
              ✓
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-md w-full">
        {/* Client email snippet */}
        <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/30 mb-4">
          <p className="text-xs text-mist mb-1">From: {activeTask?.clientName}</p>
          <p className="text-sm text-pearl-dim">
            "Hi, I need a COI sent to <strong className="text-pearl">{scenario.coiHolder || 'our landlord'}</strong> at{' '}
            <strong className="text-pearl">{scenario.coiEmail || 'landlord@example.com'}</strong> ASAP.
            Thanks!"
          </p>
        </div>

        <div className="card-elevated rounded-xl border border-slate-600/30 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gold uppercase tracking-wider">
              Certificate of Insurance
            </h3>
            {harperAssisted && (
              <span className="text-xs bg-emerald/10 text-emerald px-2 py-0.5 rounded-full font-medium">
                ⚡ Auto-Generated
              </span>
            )}
          </div>

          <div className="space-y-2.5">
            {FIELDS.map(field => {
              const isFilled = filledFields[field.key]
              return (
                <button
                  key={field.key}
                  onClick={() => handleFieldClick(field.key)}
                  disabled={isFilled}
                  data-testid={`coi-field-${field.key}`}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-all cursor-pointer
                    ${isFilled
                      ? 'border-emerald/30 bg-emerald/5'
                      : 'border-slate-600/30 bg-slate-700/30 hover:border-crimson hover:bg-crimson/5'
                    }
                  `}
                >
                  <span className="text-[10px] text-mist block">{field.label}</span>
                  {isFilled ? (
                    <span className={`text-sm font-medium ${harperAssisted ? 'text-emerald' : 'text-pearl'}`}>
                      {scenario[field.key] || 'N/A'}
                    </span>
                  ) : (
                    <span className="text-sm text-mist/40">Click to fill</span>
                  )}
                </button>
              )
            })}
          </div>

          <motion.button
            whileHover={allFilled ? { scale: 1.02 } : {}}
            whileTap={allFilled ? { scale: 0.98 } : {}}
            onClick={handleSend}
            disabled={!allFilled || completed}
            data-testid="coi-send"
            className={`w-full mt-4 py-2.5 rounded-full font-semibold text-sm transition-all cursor-pointer
              ${allFilled && !completed
                ? 'bg-gradient-to-br from-gold via-gold-bright to-gold-dim text-midnight hover:shadow-lg'
                : 'bg-slate-700 text-mist/50 cursor-not-allowed'
              }
            `}
          >
            {completed ? 'Sent ✓' : 'Generate & Send COI'}
          </motion.button>
        </div>
      </div>
    </div>
  )
}
