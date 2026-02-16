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

      <div className="max-w-lg w-full">
        <div className="card-elevated rounded-xl border border-slate-600/30 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gold uppercase tracking-wider">
              Renewal — {activeTask?.clientName}
            </h3>
            {harperAssisted && (
              <span className="text-xs bg-emerald/10 text-emerald px-2 py-0.5 rounded-full font-medium">
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
                    ? 'bg-crimson text-white'
                    : (i < ['review', 'flag', 'send'].indexOf(currentStep))
                      ? 'bg-emerald text-white'
                      : 'bg-slate-700 text-mist/50'
                  }
                `}>
                  {i < ['review', 'flag', 'send'].indexOf(currentStep) ? '✓' : i + 1}
                </div>
                {i < 2 && <div className="w-8 h-0.5 bg-slate-700" />}
              </div>
            ))}
          </div>

          {/* Step 1: Review policy tabs */}
          {currentStep === 'review' && (
            <div>
              <p className="text-sm text-mist mb-3">Review current policy sections:</p>
              <div className="space-y-2">
                {policyTabs.map((tab, i) => (
                  <button
                    key={i}
                    onClick={() => handleTabClick(i)}
                    disabled={reviewedTabs[i]}
                    data-testid={`renewal-tab-${i}`}
                    className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer
                      ${reviewedTabs[i]
                        ? 'border-emerald/30 bg-emerald/5 text-emerald'
                        : 'border-slate-600/30 bg-slate-700/30 hover:border-crimson hover:bg-crimson/5 text-pearl'
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
              <p className="text-sm text-mist mb-3">Coverage gap detected:</p>
              <div className="bg-crimson/10 border border-crimson/30 rounded-lg p-3 mb-3">
                <p className="text-sm text-crimson-bright font-medium">⚠ {gap}</p>
              </div>
              <button
                onClick={handleFlagGap}
                disabled={flaggedGap}
                data-testid="renewal-flag"
                className="w-full py-2.5 rounded-full font-semibold text-sm bg-crimson text-white
                           hover:bg-crimson-bright transition-colors cursor-pointer"
              >
                Flag for Renewal
              </button>
            </div>
          )}

          {/* Step 3: Send notice */}
          {currentStep === 'send' && (
            <div>
              {harperAssisted ? (
                <div className="bg-emerald/5 border border-emerald/20 rounded-lg p-4 mb-3">
                  <p className="text-sm text-emerald font-medium mb-1">Summary Ready</p>
                  <p className="text-xs text-mist">
                    Policy reviewed automatically. Gap flagged: {gap}.
                    Renewal notice drafted and ready to send.
                  </p>
                </div>
              ) : (
                <p className="text-sm text-mist mb-3">
                  Renewal notice ready. Gap flagged: <strong className="text-pearl">{gap}</strong>
                </p>
              )}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSendNotice}
                disabled={completed}
                data-testid="renewal-send"
                className="w-full py-2.5 rounded-full font-semibold text-sm bg-gradient-to-br from-gold via-gold-bright to-gold-dim text-midnight
                           transition-colors cursor-pointer"
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
