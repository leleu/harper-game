import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../state/gameStore'

export function Scoreboard() {
  const tasksCompleted = useGameStore((s) => s.tasksCompleted)
  const clientsLost = useGameStore((s) => s.clientsLost)
  const adminTime = useGameStore((s) => s.adminTime)
  const sellingTime = useGameStore((s) => s.sellingTime)
  const discoveryCalls = useGameStore((s) => s.discoveryCalls)
  const policiesBound = useGameStore((s) => s.policiesBound)
  const totalClicks = useGameStore((s) => s.totalClicks)
  const gamePhase = useGameStore((s) => s.gamePhase)

  const totalTime = adminTime + sellingTime
  const adminRatio = totalTime > 0 ? Math.round((adminTime / totalTime) * 100) : 0

  return (
    <div className="w-56 bg-harper-cream/50 border-l border-harper-muted/20 p-4 flex flex-col gap-4 shrink-0">
      <h3 className="text-xs font-semibold text-harper-teal uppercase tracking-wider">Your Day</h3>

      <div className="space-y-3">
        <Stat label="Tasks Done" value={tasksCompleted.toString()} />

        <AnimatePresence>
          {clientsLost > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              <Stat label="Clients Lost" value={clientsLost.toString()} danger />
            </motion.div>
          )}
        </AnimatePresence>

        <Stat
          label="Admin Ratio"
          value={`${adminRatio}%`}
          danger={adminRatio > 60}
        />

        <Stat label="Total Clicks" value={totalClicks.toString()} />
        <Stat label="Discovery Calls" value={discoveryCalls.toString()} gold />
        <Stat label="Policies Bound" value={policiesBound.toString()} gold />
      </div>

      {/* Phase indicator */}
      <div className="mt-auto pt-4 border-t border-harper-muted/10">
        <PhaseIndicator phase={gamePhase} />
      </div>
    </div>
  )
}

function Stat({
  label,
  value,
  danger = false,
  gold = false,
}: {
  label: string
  value: string
  danger?: boolean
  gold?: boolean
}) {
  return (
    <div>
      <p className="text-[10px] text-harper-muted uppercase tracking-wider">{label}</p>
      <p className={`font-mono text-lg font-medium ${
        danger ? 'text-harper-coral' : gold ? 'text-amber-500' : 'text-harper-teal'
      }`}>
        {value}
      </p>
    </div>
  )
}

function PhaseIndicator({ phase }: { phase: string }) {
  const labels: Record<string, { text: string; color: string }> = {
    start: { text: 'Ready', color: 'text-harper-muted' },
    tutorial: { text: 'Learning the ropes', color: 'text-harper-green' },
    ramp: { text: 'Getting busy...', color: 'text-harper-warning' },
    overwhelm: { text: 'Drowning', color: 'text-harper-coral' },
    harper: { text: 'Harper activating...', color: 'text-harper-green' },
    mastery: { text: 'In the zone', color: 'text-harper-green' },
    winddown: { text: 'Wrapping up', color: 'text-harper-muted' },
    end: { text: 'Day complete', color: 'text-harper-teal' },
  }

  const info = labels[phase] || labels.start

  return (
    <p className={`text-xs font-medium ${info.color}`}>
      {info.text}
    </p>
  )
}
