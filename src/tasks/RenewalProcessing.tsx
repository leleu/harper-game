import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../state/gameStore'

interface RenewalProcessingProps {
  harperAssisted?: boolean
}

type Step = 'review' | 'flag' | 'send'

export function RenewalProcessing({ harperAssisted = false }: RenewalProcessingProps) {
  const activeTask = useGameStore((s) => s.activeTask)
  const completeActiveTask = useGameStore((s) => s.completeActiveTask)
  const incrementClicks = useGameStore((s) => s.incrementClicks)
  const scenario = activeTask?.scenarioData as Record<string, string> | undefined

  const [currentStep, setCurrentStep] = useState<Step>(harperAssisted ? 'send' : 'review')
  const [reviewedTabs, setReviewedTabs] = useState<Record<number, boolean>>(
    harperAssisted ? { 0: true, 1: true, 2: true } : {}
  )
  const [flaggedGap, setFlaggedGap] = useState(harperAssisted)
  const [completed, setCompleted] = useState(false)

  const handleTabClick = useCallback((idx: number) => {
    if (reviewedTabs[idx] || currentStep !== 'review' || completed) return
    incrementClicks()
    setReviewedTabs(prev => {
      const next = { ...prev, [idx]: true }
      if (next[0] && next[1] && next[2]) {
        setTimeout(() => setCurrentStep('flag'), 200)
      }
      return next
    })
  }, [reviewedTabs, currentStep, completed, incrementClicks])

  const handleFlagGap = useCallback(() => {
    if (flaggedGap || currentStep !== 'flag' || completed) return
    incrementClicks()
    setFlaggedGap(true)
    setTimeout(() => setCurrentStep('send'), 200)
  }, [flaggedGap, currentStep, completed, incrementClicks])

  const handleSendNotice = useCallback(() => {
    if (currentStep !== 'send' || completed) return
    incrementClicks()
    setCompleted(true)
    setTimeout(() => completeActiveTask(300, false), 600)
  }, [currentStep, completed, incrementClicks, completeActiveTask])

  if (!scenario) return null

  const gap = scenario.renewalGap || 'Coverage gap detected in current policy'
  const policyTabs = ['General Liability', 'Property', 'Workers Comp']

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
        <div className="bg-white rounded-xl shadow-sm border border-harper-muted/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-harper-teal uppercase tracking-wider">
              Renewal — {activeTask?.clientName}
            </h3>
            {harperAssisted && (
              <span className="text-xs bg-harper-green/10 text-harper-green px-2 py-0.5 rounded-full font-medium">
                ⚡ Renewal Autopilot
              </span>
            )}
          </div>

          {/* Progress indicator */}
          <div className="flex items-center gap-2 mb-5">
            {(['review', 'flag', 'send'] as Step[]).map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium
                  ${currentStep === step
                    ? 'bg-harper-coral text-white'
                    : (i < ['review', 'flag', 'send'].indexOf(currentStep))
                      ? 'bg-harper-green text-white'
                      : 'bg-gray-200 text-gray-400'
                  }
                `}>
                  {i < ['review', 'flag', 'send'].indexOf(currentStep) ? '✓' : i + 1}
                </div>
                {i < 2 && <div className="w-8 h-0.5 bg-gray-200" />}
              </div>
            ))}
          </div>

          {/* Step 1: Review policy tabs */}
          {currentStep === 'review' && (
            <div>
              <p className="text-sm text-harper-teal-mid mb-3">Review current policy sections:</p>
              <div className="space-y-2">
                {policyTabs.map((tab, i) => (
                  <button
                    key={i}
                    onClick={() => handleTabClick(i)}
                    disabled={reviewedTabs[i]}
                    className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer
                      ${reviewedTabs[i]
                        ? 'border-harper-green/30 bg-harper-green/5 text-harper-green'
                        : 'border-gray-200 bg-gray-50 hover:border-harper-coral hover:bg-harper-coral/5 text-harper-teal'
                      }
                    `}
                  >
                    <span className="text-sm font-medium">
                      {reviewedTabs[i] ? '✓ ' : ''}{tab}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Flag gap */}
          {currentStep === 'flag' && (
            <div>
              <p className="text-sm text-harper-teal-mid mb-3">Coverage gap detected:</p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                <p className="text-sm text-red-800 font-medium">⚠ {gap}</p>
              </div>
              <button
                onClick={handleFlagGap}
                disabled={flaggedGap}
                className="w-full py-2.5 rounded-full font-semibold text-sm bg-harper-coral text-white
                           hover:bg-red-500 transition-colors cursor-pointer"
              >
                Flag for Renewal
              </button>
            </div>
          )}

          {/* Step 3: Send notice */}
          {currentStep === 'send' && (
            <div>
              {harperAssisted ? (
                <div className="bg-harper-green/5 border border-harper-green/20 rounded-lg p-4 mb-3">
                  <p className="text-sm text-harper-green font-medium mb-1">Summary Ready</p>
                  <p className="text-xs text-harper-teal-mid">
                    Policy reviewed automatically. Gap flagged: {gap}.
                    Renewal notice drafted and ready to send.
                  </p>
                </div>
              ) : (
                <p className="text-sm text-harper-teal-mid mb-3">
                  Renewal notice ready. Gap flagged: <strong>{gap}</strong>
                </p>
              )}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSendNotice}
                disabled={completed}
                className="w-full py-2.5 rounded-full font-semibold text-sm bg-harper-teal text-harper-beige
                           hover:bg-harper-teal-mid transition-colors cursor-pointer"
              >
                {completed ? 'Sent ✓' : 'Send Renewal Notice'}
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
