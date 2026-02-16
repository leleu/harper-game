import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { useGameStore } from '../state/gameStore'

const TOOLS = [
  { id: 'smart-applications', label: 'AI Form Completion', icon: '🤖', desc: 'ACORD forms auto-filled instantly' },
  { id: 'instant-quote', label: 'Carrier Matching', icon: '⚡', desc: 'Best E&S quotes in seconds' },
  { id: 'auto-coi', label: 'Auto-COI', icon: '📜', desc: 'Certificates generated on demand' },
  { id: 'renewal-autopilot', label: 'Renewal Autopilot', icon: '🔄', desc: 'Renewals handled automatically' },
  { id: 'smart-followups', label: 'Smart Follow-ups', icon: '💬', desc: 'Emails drafted with context' },
]

export function HarperUnlockCinematic() {
  const harperUnlocked = useGameStore((s) => s.harperUnlocked)
  const unlockTool = useGameStore((s) => s.unlockTool)
  const unlockedTools = useGameStore((s) => s.unlockedTools)
  const tasksCompleted = useGameStore((s) => s.tasksCompleted)
  const clientsLost = useGameStore((s) => s.clientsLost)
  const adminTime = useGameStore((s) => s.adminTime)
  const sellingTime = useGameStore((s) => s.sellingTime)

  const [showCinematic, setShowCinematic] = useState(false)
  const [cinematicStarted, setCinematicStarted] = useState(false)
  const [stage, setStage] = useState<'stats' | 'question' | 'tools' | 'complete'>('stats')

  const totalTime = adminTime + sellingTime
  const adminRatio = totalTime > 0 ? Math.round((adminTime / totalTime) * 100) : 0

  useEffect(() => {
    if (harperUnlocked && !cinematicStarted) {
      setCinematicStarted(true)
      setShowCinematic(true)

      const skip = window.__HARPER_SKIP_CINEMATICS__

      if (skip) {
        // Fast path: unlock everything immediately and go to complete
        setStage('complete')
        TOOLS.forEach((tool) => unlockTool(tool.id))
      } else {
        // Normal cinematic timing
        setStage('stats')
        setTimeout(() => setStage('question'), 3000)
        setTimeout(() => setStage('tools'), 5000)

        TOOLS.forEach((tool, i) => {
          setTimeout(() => {
            unlockTool(tool.id)
          }, 6000 + i * 800)
        })

        setTimeout(() => setStage('complete'), 10000)
      }
    }
  }, [harperUnlocked, cinematicStarted, unlockTool])

  const setPaused = useGameStore((s) => s.setPaused)

  const handleDismiss = useCallback(() => {
    setShowCinematic(false)
    setPaused(false)
  }, [setPaused])

  if (!showCinematic) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Animated background */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-midnight"
        >
          {/* Animated orbs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald/10 rounded-full blur-3xl"
          />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl mx-4 text-center">
          <AnimatePresence mode="wait">
            {/* Stage 1: Stats */}
            {stage === 'stats' && (
              <motion.div
                key="stats"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <p className="text-sm text-mist uppercase tracking-widest">In 5.5 hours of manual work...</p>
                <div className="grid grid-cols-3 gap-6 mt-8">
                  <div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                      className="text-5xl font-bold text-emerald-glow tabular-nums mb-2"
                    >
                      {tasksCompleted}
                    </motion.div>
                    <p className="text-sm text-pearl-dim">Tasks Completed</p>
                  </div>
                  <div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                      className="text-5xl font-bold text-crimson-bright tabular-nums mb-2"
                    >
                      {clientsLost}
                    </motion.div>
                    <p className="text-sm text-pearl-dim">Clients Lost</p>
                  </div>
                  <div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.7, type: "spring" }}
                      className="text-5xl font-bold text-amber-bright tabular-nums mb-2"
                    >
                      {adminRatio}%
                    </motion.div>
                    <p className="text-sm text-pearl-dim">Admin Time</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Stage 2: Question */}
            {stage === 'question' && (
              <motion.div
                key="question"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <h2 className="text-5xl font-bold text-pearl leading-tight mb-6">
                  What if the admin<br />
                  <span className="font-serif italic text-gold-bright" style={{
                    textShadow: '0 0 40px rgba(212, 175, 55, 0.5)'
                  }}>
                    handled itself?
                  </span>
                </h2>
              </motion.div>
            )}

            {/* Stage 3: Tools */}
            {(stage === 'tools' || stage === 'complete') && (
              <motion.div
                key="tools"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="inline-flex items-center gap-3 mb-6"
                  >
                    <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                    <p className="text-xs uppercase tracking-[0.2em] text-gold/70 font-bold">Harper AI Tools</p>
                    <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-pearl mb-2">Coming Online</h3>
                  <p className="text-sm text-mist">Your new workflow starts now</p>
                </div>

                {/* Tool grid */}
                <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto">
                  {TOOLS.map((tool, i) => {
                    const isUnlocked = unlockedTools.includes(tool.id)
                    return (
                      <motion.div
                        key={tool.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isUnlocked ? {
                          opacity: 1,
                          scale: 1,
                          transition: { delay: i * 0.15 }
                        } : {
                          opacity: 0.3,
                          scale: 0.9
                        }}
                        className={`p-4 rounded-xl border transition-all ${
                          isUnlocked
                            ? 'bg-gradient-to-br from-emerald/10 to-emerald/5 border-emerald/30'
                            : 'bg-slate-800/30 border-slate-600/20'
                        }`}
                      >
                        <div className="text-3xl mb-2">{tool.icon}</div>
                        <div className="text-sm font-semibold text-pearl mb-1">{tool.label}</div>
                        <div className="text-xs text-mist">{tool.desc}</div>
                        {isUnlocked && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="mt-2 flex items-center gap-1 text-[10px] text-emerald-glow font-semibold"
                          >
                            <span>✓</span>
                            <span>ACTIVE</span>
                          </motion.div>
                        )}
                      </motion.div>
                    )
                  })}
                </div>

                {/* Dismiss button */}
                {stage === 'complete' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleDismiss}
                      data-testid="cinematic-dismiss"
                      className="px-12 py-4 rounded-full font-semibold text-lg cursor-pointer
                                 bg-gradient-to-br from-gold via-gold-bright to-gold-dim text-midnight"
                      style={{
                        boxShadow: `
                          0 0 40px rgba(212, 175, 55, 0.4),
                          0 8px 24px rgba(0, 0, 0, 0.4),
                          inset 0 1px 0 rgba(255, 255, 255, 0.3)
                        `
                      }}
                    >
                      Let's finish the day
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </AnimatePresence>
  )
}
