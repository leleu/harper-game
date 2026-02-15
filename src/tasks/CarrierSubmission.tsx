import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../state/gameStore'

interface CarrierSubmissionProps {
  harperAssisted?: boolean
}

interface CarrierPortal {
  name: string
  fields: { label: string; key: string }[]
}

const PORTALS: CarrierPortal[] = [
  {
    name: 'Hartford Portal',
    fields: [
      { label: 'Business Legal Name', key: 'businessName' },
      { label: 'Federal Tax ID', key: 'ein' },
      { label: 'Gross Revenue', key: 'revenue' },
    ],
  },
  {
    name: 'Hiscox Online',
    fields: [
      { label: 'Company Name', key: 'businessName' },
      { label: 'EIN', key: 'ein' },
      { label: 'Number of Employees', key: 'employees' },
    ],
  },
  {
    name: 'AIG Commercial',
    fields: [
      { label: 'Insured Name', key: 'businessName' },
      { label: 'Tax Identification #', key: 'ein' },
      { label: 'SIC Classification', key: 'sicCode' },
    ],
  },
]

export function CarrierSubmission({ harperAssisted = false }: CarrierSubmissionProps) {
  const activeTask = useGameStore((s) => s.activeTask)
  const completeActiveTask = useGameStore((s) => s.completeActiveTask)
  const incrementClicks = useGameStore((s) => s.incrementClicks)
  const scenario = activeTask?.scenarioData as Record<string, string> | undefined

  const [submittedPortals, setSubmittedPortals] = useState<Record<number, boolean>>({})
  const [filledFields, setFilledFields] = useState<Record<string, boolean>>(() => {
    if (harperAssisted) {
      const prefilled: Record<string, boolean> = {}
      PORTALS.forEach((_, pi) => {
        PORTALS[pi].fields.forEach((_, fi) => {
          prefilled[`${pi}-${fi}`] = true
        })
      })
      return prefilled
    }
    return {}
  })
  const [completed, setCompleted] = useState(false)

  const allSubmitted = PORTALS.every((_, i) => submittedPortals[i])

  const handleFieldClick = useCallback((portalIdx: number, fieldIdx: number) => {
    const key = `${portalIdx}-${fieldIdx}`
    if (filledFields[key] || submittedPortals[portalIdx] || completed) return
    incrementClicks()
    setFilledFields(prev => ({ ...prev, [key]: true }))
  }, [filledFields, submittedPortals, completed, incrementClicks])

  const handlePortalSubmit = useCallback((portalIdx: number) => {
    const allFieldsFilled = PORTALS[portalIdx].fields.every((_, fi) => filledFields[`${portalIdx}-${fi}`])
    if (!allFieldsFilled || submittedPortals[portalIdx] || completed) return
    incrementClicks()
    setSubmittedPortals(prev => ({ ...prev, [portalIdx]: true }))
  }, [filledFields, submittedPortals, completed, incrementClicks])

  const handleSubmitAll = useCallback(() => {
    if (!harperAssisted || completed) return
    incrementClicks()
    const allPortals: Record<number, boolean> = {}
    PORTALS.forEach((_, i) => { allPortals[i] = true })
    setSubmittedPortals(allPortals)
    setCompleted(true)
    setTimeout(() => completeActiveTask(150, false), 600)
  }, [harperAssisted, completed, incrementClicks, completeActiveTask])

  // Check if all portals submitted (non-Harper path)
  useEffect(() => {
    if (allSubmitted && !completed && !harperAssisted) {
      setCompleted(true)
      setTimeout(() => completeActiveTask(150, false), 600)
    }
  }, [allSubmitted, completed, harperAssisted, completeActiveTask])

  if (!scenario) return null

  if (harperAssisted) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
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
        <div className="bg-white rounded-xl shadow-sm border border-harper-muted/20 p-8 max-w-md w-full text-center">
          <span className="text-xs bg-harper-green/10 text-harper-green px-2 py-0.5 rounded-full font-medium">
            ⚡ Harper Smart Submit
          </span>
          <h3 className="text-lg font-semibold text-harper-teal mt-3 mb-2">
            Submit to {PORTALS.length} Carriers
          </h3>
          <p className="text-sm text-harper-teal-mid mb-4">
            {activeTask?.clientName} — {scenario.businessName}
          </p>
          <div className="space-y-2 mb-4">
            {PORTALS.map((p, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-harper-green">
                <span>✓</span> <span>{p.name} — pre-filled</span>
              </div>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmitAll}
            disabled={completed}
            className="bg-harper-teal text-harper-beige px-6 py-2.5 rounded-full font-semibold text-sm
                       hover:bg-harper-teal-mid transition-colors cursor-pointer disabled:opacity-50"
          >
            Submit All →
          </motion.button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col items-center p-6 gap-4 overflow-auto relative">
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

      <p className="text-xs text-harper-muted">
        Submit {activeTask?.clientName}'s application to {PORTALS.length} carrier portals — same data, different forms
      </p>

      <div className="flex gap-4 flex-wrap justify-center">
        {PORTALS.map((portal, pi) => {
          const isSubmitted = submittedPortals[pi]
          const portalFieldsFilled = portal.fields.every((_, fi) => filledFields[`${pi}-${fi}`])

          return (
            <div
              key={pi}
              className={`bg-white rounded-xl shadow-sm border p-5 w-56 transition-all
                ${isSubmitted ? 'border-harper-green/30 opacity-60' : 'border-harper-muted/20'}
              `}
            >
              <h4 className="text-xs font-semibold text-harper-teal uppercase tracking-wider mb-3 flex items-center gap-1.5">
                {isSubmitted && <span className="text-harper-green">✓</span>}
                {portal.name}
              </h4>

              <div className="space-y-2">
                {portal.fields.map((field, fi) => {
                  const key = `${pi}-${fi}`
                  const isFilled = filledFields[key]
                  return (
                    <button
                      key={key}
                      onClick={() => handleFieldClick(pi, fi)}
                      disabled={isFilled || isSubmitted}
                      className={`w-full text-left p-2 rounded border text-sm transition-all cursor-pointer
                        ${isFilled
                          ? 'border-harper-green/20 bg-harper-green/5'
                          : 'border-gray-200 bg-gray-50 hover:border-harper-coral hover:bg-harper-coral/5'
                        }
                        ${isSubmitted ? 'cursor-default' : ''}
                      `}
                    >
                      <span className="text-[10px] text-harper-muted block">{field.label}</span>
                      {isFilled ? (
                        <span className="text-xs font-medium text-harper-teal">{scenario[field.key]}</span>
                      ) : (
                        <span className="text-xs text-gray-300">Click to fill</span>
                      )}
                    </button>
                  )
                })}
              </div>

              <button
                onClick={() => handlePortalSubmit(pi)}
                disabled={!portalFieldsFilled || isSubmitted}
                className={`w-full mt-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer
                  ${portalFieldsFilled && !isSubmitted
                    ? 'bg-harper-teal text-harper-beige hover:bg-harper-teal-mid'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                {isSubmitted ? 'Submitted ✓' : 'Submit'}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
