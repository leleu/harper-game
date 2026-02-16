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
    <div className="w-52 bg-gradient-to-b from-slate-800/60 to-slate-800/30 border-l border-slate-700/40 p-4 flex flex-col gap-3 shrink-0">
      <h3 className="text-[10px] font-semibold text-mist uppercase tracking-[0.15em]">
        Your Day
      </h3>

      <div className="space-y-2.5">
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

        <div className="h-px bg-slate-700/40" />

        <Stat label="Total Clicks" value={totalClicks.toString()} subdued />
        <Stat label="Discovery Calls" value={discoveryCalls.toString()} gold />
        <Stat label="Policies Bound" value={policiesBound.toString()} gold />
      </div>

      {/* Phase indicator */}
      <div className="mt-auto pt-3 border-t border-slate-700/30">
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
  subdued = false,
}: {
  label: string
  value: string
  danger?: boolean
  gold?: boolean
  subdued?: boolean
}) {
  return (
    <div className="flex items-baseline justify-between">
      <p className="text-[10px] text-mist tracking-wide">{label}</p>
      <p className={`font-mono text-base font-medium tabular-nums ${
        danger ? 'text-crimson' : gold ? 'text-gold' : subdued ? 'text-mist' : 'text-pearl'
      }`}>
        {value}
      </p>
    </div>
  )
}

function PhaseIndicator({ phase }: { phase: string }) {
  const labels: Record<string, { text: string; color: string }> = {
    start: { text: 'Ready', color: 'text-mist' },
    tutorial: { text: 'Learning the ropes', color: 'text-emerald' },
    ramp: { text: 'Getting busy...', color: 'text-amber' },
    overwhelm: { text: 'Drowning', color: 'text-crimson' },
    harper: { text: 'Harper activating...', color: 'text-emerald' },
    mastery: { text: 'In the zone', color: 'text-emerald' },
    winddown: { text: 'Wrapping up', color: 'text-mist' },
    end: { text: 'Day complete', color: 'text-gold' },
  }

  const info = labels[phase] || labels.start

  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-1.5 h-1.5 rounded-full ${
        phase === 'overwhelm' ? 'bg-crimson animate-pulse' :
        phase === 'mastery' || phase === 'harper' ? 'bg-emerald' :
        'bg-mist/40'
      }`} />
      <p className={`text-[11px] font-medium ${info.color}`}>
        {info.text}
      </p>
    </div>
  )
}
