import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useGameStore } from '../state/gameStore'

const TOOLS = [
  { id: 'smart-applications', label: 'AI Form Completion', desc: 'ACORD 125s auto-filled from calls, emails, and intake data', delay: 0 },
  { id: 'instant-quote', label: 'Carrier Matching', desc: 'E&S quotes normalized across markets, best match highlighted', delay: 5 },
  { id: 'auto-coi', label: 'Auto-COI', desc: 'ACORD 25 certificates generated and ready to send', delay: 10 },
  { id: 'renewal-autopilot', label: 'Renewal Autopilot', desc: 'Policy reviewed, gaps flagged, notice drafted', delay: 15 },
  { id: 'smart-followups', label: 'Smart Follow-ups', desc: 'Underwriter follow-ups drafted with full context', delay: 20 },
]

export function HarperUnlock() {
  const harperUnlocked = useGameStore((s) => s.harperUnlocked)
  const unlockTool = useGameStore((s) => s.unlockTool)
  const unlockedTools = useGameStore((s) => s.unlockedTools)

  const [showBanner, setShowBanner] = useState(false)
  const [unlockStarted, setUnlockStarted] = useState(false)

  // Show banner when Harper unlocks
  useEffect(() => {
    if (harperUnlocked && !unlockStarted) {
      setUnlockStarted(true)
      setShowBanner(true)

      // Unlock tools one by one
      TOOLS.forEach(tool => {
        setTimeout(() => {
          unlockTool(tool.id)
        }, tool.delay * 1000)
      })

      // Hide banner after all tools unlocked
      setTimeout(() => {
        setShowBanner(false)
      }, 28000)
    }
  }, [harperUnlocked, unlockStarted, unlockTool])

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-96"
        >
          <div className="bg-harper-teal rounded-xl shadow-xl p-5 border border-harper-teal-mid">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-harper-green rounded-full flex items-center justify-center text-white text-sm font-bold">
                H
              </div>
              <div>
                <h4 className="text-sm font-semibold text-harper-beige">Harper Hub is now active</h4>
                <p className="text-xs text-harper-beige/60">AI automation coming online...</p>
              </div>
            </div>

            <div className="space-y-1.5">
              {TOOLS.map(tool => {
                const isUnlocked = unlockedTools.includes(tool.id)
                return (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isUnlocked ? { opacity: 1, x: 0 } : { opacity: 0.3, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2"
                  >
                    <span className={`text-xs ${isUnlocked ? 'text-harper-green-light' : 'text-harper-beige/30'}`}>
                      {isUnlocked ? '✓' : '○'}
                    </span>
                    <span className={`text-xs ${isUnlocked ? 'text-harper-beige' : 'text-harper-beige/30'}`}>
                      {tool.label}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
