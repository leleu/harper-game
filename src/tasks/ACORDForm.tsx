import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../state/gameStore'

interface ACORDFormProps {
  harperAssisted?: boolean
}

interface FieldDef {
  key: string
  label: string
}

const FIELDS: FieldDef[] = [
  { key: 'businessName', label: 'Business Name' },
  { key: 'ein', label: 'EIN / Tax ID' },
  { key: 'revenue', label: 'Annual Revenue' },
  { key: 'employees', label: 'Employees' },
  { key: 'sicCode', label: 'SIC Code' },
  { key: 'address', label: 'Business Address' },
]

export function ACORDForm({ harperAssisted = false }: ACORDFormProps) {
  const activeTask = useGameStore((s) => s.activeTask)
  const completeActiveTask = useGameStore((s) => s.completeActiveTask)
  const incrementClicks = useGameStore((s) => s.incrementClicks)

  const scenario = activeTask?.scenarioData as Record<string, string> | undefined

  // Track which fields have been filled
  const [filledFields, setFilledFields] = useState<Record<string, boolean>>(() => {
    if (harperAssisted) {
      // Pre-fill 5 of 6 fields
      const prefilled: Record<string, boolean> = {}
      FIELDS.slice(0, 5).forEach(f => { prefilled[f.key] = true })
      return prefilled
    }
    return {}
  })
  const [selectedValue, setSelectedValue] = useState<string | null>(null)
  const [completed, setCompleted] = useState(false)

  const allFilled = FIELDS.every(f => filledFields[f.key])

  const handleStickyClick = useCallback((key: string, _value: string) => {
    if (filledFields[key] || completed) return
    incrementClicks()
    setSelectedValue(key)
  }, [filledFields, completed, incrementClicks])

  const handleFieldClick = useCallback((key: string) => {
    if (filledFields[key] || completed) return
    if (selectedValue === key) {
      incrementClicks()
      setFilledFields(prev => ({ ...prev, [key]: true }))
      setSelectedValue(null)
    }
  }, [selectedValue, filledFields, completed, incrementClicks])

  const handleSubmit = useCallback(() => {
    if (!allFilled || completed) return
    incrementClicks()
    setCompleted(true)

    setTimeout(() => {
      const revenue = Math.floor(Math.random() * 800) + 200 // $200-$1000 commission
      completeActiveTask(revenue, false)
    }, 600)
  }, [allFilled, completed, incrementClicks, completeActiveTask])

  if (!scenario) return null

  // Sticky note values in a shuffled order for the player to reference
  const stickyItems = [
    { key: 'address', label: 'Address', value: scenario.address },
    { key: 'ein', label: 'Tax ID', value: scenario.ein },
    { key: 'sicCode', label: 'SIC', value: scenario.sicCode },
    { key: 'businessName', label: 'Business', value: scenario.businessName },
    { key: 'revenue', label: 'Revenue', value: scenario.revenue },
    { key: 'employees', label: 'Staff', value: scenario.employees },
  ]

  return (
    <div className="flex-1 flex items-start justify-center p-6 gap-6 overflow-auto">
      {/* Completion overlay */}
      <AnimatePresence>
        {completed && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
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

      {/* Sticky note (client data source) */}
      <div className="w-64 shrink-0">
        <div className="bg-amber-100 rounded-lg p-4 shadow-md border border-amber-200 transform -rotate-1">
          <p className="text-xs font-semibold text-amber-800 mb-3 uppercase tracking-wider">
            Client Info — {activeTask?.clientName}
          </p>
          <div className="space-y-2">
            {stickyItems.map(item => {
              const isFilled = filledFields[item.key]
              const isSelected = selectedValue === item.key
              return (
                <button
                  key={item.key}
                  onClick={() => handleStickyClick(item.key, item.value)}
                  disabled={isFilled}
                  className={`w-full text-left p-2 rounded text-sm transition-all cursor-pointer
                    ${isFilled
                      ? 'opacity-30 line-through cursor-default'
                      : isSelected
                        ? 'bg-amber-300 ring-2 ring-amber-500'
                        : 'bg-amber-50 hover:bg-amber-200'
                    }
                  `}
                >
                  <span className="text-amber-600 text-xs">{item.label}:</span>
                  <span className="ml-1 font-medium text-amber-900">{item.value}</span>
                </button>
              )
            })}
          </div>
        </div>
        {!harperAssisted && (
          <p className="text-xs text-harper-muted mt-2 text-center">
            Click a value, then click the matching field →
          </p>
        )}
      </div>

      {/* ACORD Form */}
      <div className="bg-white rounded-xl shadow-sm border border-harper-muted/20 p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-harper-teal uppercase tracking-wider">
            ACORD 125 — Commercial Application
          </h3>
          {harperAssisted && (
            <span className="text-xs bg-harper-green/10 text-harper-green px-2 py-0.5 rounded-full font-medium">
              ⚡ Harper Pre-filled
            </span>
          )}
        </div>

        <div className="space-y-3">
          {FIELDS.map(field => {
            const isFilled = filledFields[field.key]
            const isTarget = selectedValue === field.key && !isFilled
            const isHarperPrefilled = harperAssisted && isFilled && field.key !== 'address'

            return (
              <motion.button
                key={field.key}
                onClick={() => handleFieldClick(field.key)}
                disabled={isFilled}
                layout
                className={`w-full text-left p-3 rounded-lg border-2 transition-all cursor-pointer
                  ${isFilled
                    ? isHarperPrefilled
                      ? 'border-harper-green/30 bg-harper-green/5'
                      : 'border-harper-green/30 bg-harper-green/5'
                    : isTarget
                      ? 'border-harper-coral bg-harper-coral/5 ring-1 ring-harper-coral/30'
                      : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                  }
                `}
              >
                <span className="text-xs text-harper-muted block">{field.label}</span>
                {isFilled ? (
                  <span className={`text-sm font-medium ${isHarperPrefilled ? 'text-harper-green' : 'text-harper-teal'}`}>
                    {scenario[field.key]}
                  </span>
                ) : isTarget ? (
                  <span className="text-sm text-harper-coral font-medium">Click to fill ↵</span>
                ) : (
                  <span className="text-sm text-gray-300">—</span>
                )}
              </motion.button>
            )
          })}
        </div>

        {/* Submit button */}
        <motion.button
          whileHover={allFilled ? { scale: 1.02 } : {}}
          whileTap={allFilled ? { scale: 0.98 } : {}}
          onClick={handleSubmit}
          disabled={!allFilled || completed}
          className={`w-full mt-4 py-2.5 rounded-full font-semibold text-sm transition-all cursor-pointer
            ${allFilled && !completed
              ? 'bg-harper-teal text-harper-beige hover:bg-harper-teal-mid'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          {completed ? 'Submitted ✓' : 'Submit Application'}
        </motion.button>
      </div>
    </div>
  )
}
