import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../state/gameStore'

interface PauseScreenProps {
  isVisible: boolean
  onClose: () => void
}

const taskTypeInfo = [
  { type: 'ACORD Form', icon: '📋', desc: 'Universal insurance application - name, address, revenue, SIC code' },
  { type: 'Carrier Submission', icon: '🏢', desc: 'Send applications to insurance carriers via their portals' },
  { type: 'Quote Comparison', icon: '⚖', desc: 'Compare multiple carrier quotes and recommend best option' },
  { type: 'COI Request', icon: '📄', desc: 'Certificate of Insurance - proof of coverage for contracts' },
  { type: 'Follow-up Email', icon: '✉', desc: 'Chase carriers for quotes, clients for missing info' },
  { type: 'Renewal Processing', icon: '🔄', desc: 'Remarket expiring policies before they lapse' },
  { type: 'Discovery Call', icon: '📞', desc: 'Initial client conversation - understand their risks (cannot automate)' },
  { type: 'Proposal', icon: '🤝', desc: 'Present coverage options and close the deal (cannot automate)' },
]

export function PauseScreen({ isVisible, onClose }: PauseScreenProps) {
  const gameTimeMinutes = useGameStore((s) => s.gameTimeMinutes)
  const tasksCompleted = useGameStore((s) => s.tasksCompleted)
  const clientsLost = useGameStore((s) => s.clientsLost)
  const revenue = useGameStore((s) => s.revenue)
  const gamePhase = useGameStore((s) => s.gamePhase)

  const hours = Math.floor(gameTimeMinutes / 60)
  const mins = gameTimeMinutes % 60
  const timeDisplay = `${hours + 8}:${mins.toString().padStart(2, '0')} ${hours < 4 ? 'AM' : 'PM'}`

  const phaseLabels: Record<string, string> = {
    tutorial: 'Tutorial - Learning the ropes',
    ramp: 'Ramping Up - Volume increasing',
    overwhelm: 'Peak Hours - All hands on deck',
    harper: 'Harper Unlock - AI tools activating',
    mastery: 'AI-Assisted - New workflow active',
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-midnight/95 backdrop-blur-lg"
        />

        {/* Pause Screen */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative max-w-3xl w-full card-elevated-lg rounded-2xl overflow-hidden border border-gold/20"
        >
          {/* Header */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 border-b border-gold/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-pearl mb-1">Game Paused</h2>
                <p className="text-sm text-mist">{phaseLabels[gamePhase] || 'In Progress'}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-mono text-gold-bright">{timeDisplay}</div>
                <div className="text-xs text-mist mt-1">Game Time</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
            {/* Current Stats */}
            <div>
              <h3 className="text-sm uppercase tracking-widest text-gold/70 font-bold mb-3">Your Stats</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-600/30">
                  <div className="text-xl font-bold text-emerald-glow tabular-nums">{tasksCompleted}</div>
                  <div className="text-xs text-mist mt-1">Completed</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-600/30">
                  <div className="text-xl font-bold text-crimson-bright tabular-nums">{clientsLost}</div>
                  <div className="text-xs text-mist mt-1">Lost</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-600/30">
                  <div className="text-xl font-bold text-gold-bright tabular-nums">${revenue.toLocaleString()}</div>
                  <div className="text-xs text-mist mt-1">Revenue</div>
                </div>
              </div>
            </div>

            {/* How to Play */}
            <div>
              <h3 className="text-sm uppercase tracking-widest text-gold/70 font-bold mb-3">How to Play</h3>
              <div className="space-y-2 text-sm text-pearl-dim">
                <p>• <strong className="text-pearl">Tasks appear</strong> in the left queue with countdown timers</p>
                <p>• <strong className="text-pearl">Click a task</strong> to start working on it</p>
                <p>• <strong className="text-pearl">Fill in fields</strong> and complete before timer expires</p>
                <p>• <strong className="text-gold-bright">Gold tasks</strong> are high-value relationship work (discovery calls, proposals)</p>
                <p>• <strong className="text-emerald-glow">AI badge</strong> means Harper's tools will auto-complete (after unlock)</p>
                <p>• <strong className="text-pearl">Press ESC</strong> anytime to return to this screen</p>
              </div>
            </div>

            {/* Task Types */}
            <div>
              <h3 className="text-sm uppercase tracking-widest text-gold/70 font-bold mb-3">Task Types</h3>
              <div className="grid grid-cols-2 gap-3">
                {taskTypeInfo.map((task) => (
                  <div key={task.type} className="p-3 rounded-lg bg-slate-800/30 border border-slate-600/20">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base">{task.icon}</span>
                      <span className="text-xs font-semibold text-pearl">{task.type}</span>
                    </div>
                    <p className="text-xs text-mist leading-relaxed">{task.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* About */}
            <div>
              <h3 className="text-sm uppercase tracking-widest text-gold/70 font-bold mb-3">About This Game</h3>
              <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-600/20 space-y-2 text-sm text-pearl-dim">
                <p>
                  This simulation demonstrates the difference between traditional insurance brokerage
                  and AI-assisted workflows.
                </p>
                <p>
                  You'll experience manual work first (forms, portals, follow-ups), then see how
                  Harper's AI tools transform the same day.
                </p>
                <p className="text-xs text-mist italic">
                  Real brokers spend 57% of their time on admin. You're about to feel why — and see
                  what changes when AI handles it.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-600/30 p-6 bg-slate-800/30">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="w-full bg-gradient-to-br from-gold via-gold-bright to-gold-dim text-midnight
                         px-6 py-3 rounded-full font-semibold cursor-pointer"
              style={{
                boxShadow: `
                  0 0 30px rgba(212, 175, 55, 0.3),
                  0 8px 20px rgba(0, 0, 0, 0.4),
                  inset 0 1px 0 rgba(255, 255, 255, 0.3)
                `
              }}
            >
              Resume Game
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
