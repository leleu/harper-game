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
            className="absolute inset-0 z-10 flex items-center justify-center bg-harper-beige/60"
          >
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 12 }}
              className="bg-harper-green text-white rounded-full w-24 h-24 flex items-center justify-center text-5xl shadow-lg"
            >
              ✓
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-md w-full">
        {/* Client email snippet */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 mb-4">
          <p className="text-xs text-blue-400 mb-1">From: {activeTask?.clientName}</p>
          <p className="text-sm text-blue-900">
            "Hi, I need a COI sent to <strong>{scenario.coiHolder || 'our landlord'}</strong> at{' '}
            <strong>{scenario.coiEmail || 'landlord@example.com'}</strong> ASAP.
            Thanks!"
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-harper-muted/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-harper-teal uppercase tracking-wider">
              Certificate of Insurance
            </h3>
            {harperAssisted && (
              <span className="text-xs bg-harper-green/10 text-harper-green px-2 py-0.5 rounded-full font-medium">
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
                  className={`w-full text-left p-3 rounded-lg border-2 transition-all cursor-pointer
                    ${isFilled
                      ? 'border-harper-green/30 bg-harper-green/5'
                      : 'border-gray-200 bg-gray-50 hover:border-harper-coral hover:bg-harper-coral/5'
                    }
                  `}
                >
                  <span className="text-[10px] text-harper-muted block">{field.label}</span>
                  {isFilled ? (
                    <span className={`text-sm font-medium ${harperAssisted ? 'text-harper-green' : 'text-harper-teal'}`}>
                      {scenario[field.key] || 'N/A'}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-300">Click to fill</span>
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
            className={`w-full mt-4 py-2.5 rounded-full font-semibold text-sm transition-all cursor-pointer
              ${allFilled && !completed
                ? 'bg-harper-teal text-harper-beige hover:bg-harper-teal-mid'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
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
