import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../state/gameStore'

interface FollowUpEmailProps {
  harperAssisted?: boolean
}

export function FollowUpEmail({ harperAssisted = false }: FollowUpEmailProps) {
  const activeTask = useGameStore((s) => s.activeTask)
  const completeActiveTask = useGameStore((s) => s.completeActiveTask)
  const incrementClicks = useGameStore((s) => s.incrementClicks)
  const scenario = activeTask?.scenarioData as Record<string, string> | undefined

  const [blanks, setBlanks] = useState<Record<number, boolean>>(() => {
    if (harperAssisted) return { 0: true, 1: true, 2: true } as Record<number, boolean>
    return {} as Record<number, boolean>
  })
  const [completed, setCompleted] = useState(false)

  const allFilled = blanks[0] && blanks[1] && blanks[2]

  const handleBlankClick = useCallback((idx: number) => {
    if (blanks[idx] || completed) return
    incrementClicks()
    setBlanks(prev => ({ ...prev, [idx]: true }))
  }, [blanks, completed, incrementClicks])

  const handleSend = useCallback(() => {
    if (!allFilled || completed) return
    incrementClicks()
    setCompleted(true)
    setTimeout(() => completeActiveTask(100, false), 600)
  }, [allFilled, completed, incrementClicks, completeActiveTask])

  if (!scenario) return null

  const clientName = activeTask?.clientName || 'Client'
  const context = scenario.followUpContext || 'your recent inquiry'

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

      <div className="max-w-lg w-full">
        {/* Context card */}
        <div className="bg-amber-50 rounded-lg p-3 border border-amber-100 mb-4">
          <p className="text-xs text-amber-600 font-medium mb-1">Context</p>
          <p className="text-sm text-amber-900">{context}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-harper-muted/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-harper-teal uppercase tracking-wider">
              Follow-up Email
            </h3>
            {harperAssisted && (
              <span className="text-xs bg-harper-green/10 text-harper-green px-2 py-0.5 rounded-full font-medium">
                ⚡ Auto-Drafted
              </span>
            )}
          </div>

          <div className="text-sm text-harper-teal-mid leading-relaxed space-y-2">
            <p>
              Hi{' '}
              <BlankSlot
                filled={blanks[0]}
                value={clientName}
                onClick={() => handleBlankClick(0)}
                harperAssisted={harperAssisted}
              />
              ,
            </p>
            <p>
              Just following up regarding{' '}
              <BlankSlot
                filled={blanks[1]}
                value={context}
                onClick={() => handleBlankClick(1)}
                harperAssisted={harperAssisted}
              />
              . We want to make sure everything stays on track for your coverage.
            </p>
            <p>
              Could you send over the documents at your earliest convenience? We're working with{' '}
              <BlankSlot
                filled={blanks[2]}
                value={scenario.businessName || 'your business'}
                onClick={() => handleBlankClick(2)}
                harperAssisted={harperAssisted}
              />{' '}
              to get this wrapped up quickly.
            </p>
            <p>Best,<br />Your Harper Team</p>
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
            {completed ? 'Sent ✓' : 'Send Email'}
          </motion.button>
        </div>
      </div>
    </div>
  )
}

function BlankSlot({
  filled,
  value,
  onClick,
  harperAssisted,
}: {
  filled: boolean
  value: string
  onClick: () => void
  harperAssisted: boolean
}) {
  if (filled) {
    return (
      <span className={`font-medium underline decoration-dotted ${harperAssisted ? 'text-harper-green' : 'text-harper-teal'}`}>
        {value}
      </span>
    )
  }
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center px-2 py-0.5 bg-harper-coral/10 border border-harper-coral/30
                 rounded text-harper-coral text-xs font-medium hover:bg-harper-coral/20 transition-colors cursor-pointer"
    >
      [___]
    </button>
  )
}
