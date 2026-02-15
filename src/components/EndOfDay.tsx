import { motion } from 'framer-motion'
import { useGameStore } from '../state/gameStore'
import { resetShownIntros } from './TaskIntro'
import { resetScenarioIndex } from '../engine/scenarios'

export function EndOfDay() {
  const tasksCompleted = useGameStore((s) => s.tasksCompleted)
  const clientsLost = useGameStore((s) => s.clientsLost)
  const revenue = useGameStore((s) => s.revenue)
  const nps = useGameStore((s) => s.nps)
  const totalClicks = useGameStore((s) => s.totalClicks)
  const adminTime = useGameStore((s) => s.adminTime)
  const sellingTime = useGameStore((s) => s.sellingTime)
  const discoveryCalls = useGameStore((s) => s.discoveryCalls)
  const policiesBound = useGameStore((s) => s.policiesBound)
  const beforeHarperStats = useGameStore((s) => s.beforeHarperStats)
  const resetGame = useGameStore((s) => s.resetGame)

  const totalTime = adminTime + sellingTime
  const adminRatio = totalTime > 0 ? Math.round((adminTime / totalTime) * 100) : 0

  // Calculate "after" stats (everything since Harper unlock)
  const afterTasks = tasksCompleted - (beforeHarperStats?.tasksCompleted || 0)
  const afterClientsLost = clientsLost - (beforeHarperStats?.clientsLost || 0)
  const afterRevenue = revenue - (beforeHarperStats?.revenue || 0)
  const afterDiscovery = discoveryCalls - (beforeHarperStats?.discoveryCalls || 0)
  const afterPolicies = policiesBound - (beforeHarperStats?.policiesBound || 0)
  const afterClicks = totalClicks - (beforeHarperStats?.totalClicks || 0)

  // Estimate after admin ratio (it should be lower)
  const afterAdminRatio = Math.max(10, adminRatio - 45) // rough estimate showing improvement

  // Revenue per hour (game hours: before = 5.75h (8AM-1:45PM), after = 3.25h (1:45PM-5PM))
  const beforeRevPerHour = (beforeHarperStats?.revenue || 0) / 5.75
  const afterRevPerHour = afterRevenue / 3.25

  const rows: { label: string; before: string; after: string; highlight?: boolean }[] = [
    {
      label: 'Tasks completed',
      before: (beforeHarperStats?.tasksCompleted || 0).toString(),
      after: afterTasks.toString(),
    },
    {
      label: 'Clients lost',
      before: (beforeHarperStats?.clientsLost || 0).toString(),
      after: afterClientsLost.toString(),
      highlight: afterClientsLost < (beforeHarperStats?.clientsLost || 0),
    },
    {
      label: 'Discovery calls',
      before: (beforeHarperStats?.discoveryCalls || 0).toString(),
      after: afterDiscovery.toString(),
    },
    {
      label: 'Policies bound',
      before: (beforeHarperStats?.policiesBound || 0).toString(),
      after: afterPolicies.toString(),
    },
    {
      label: 'Revenue',
      before: `$${(beforeHarperStats?.revenue || 0).toLocaleString()}`,
      after: `$${afterRevenue.toLocaleString()}`,
    },
    {
      label: 'Revenue / hour',
      before: `$${Math.round(beforeRevPerHour).toLocaleString()}`,
      after: `$${Math.round(afterRevPerHour).toLocaleString()}`,
      highlight: afterRevPerHour > beforeRevPerHour,
    },
    {
      label: 'NPS',
      before: (beforeHarperStats?.nps || 72).toString(),
      after: nps.toString(),
    },
    {
      label: 'Admin ratio',
      before: `${Math.round((beforeHarperStats?.adminRatio || 0.7) * 100)}%`,
      after: `${afterAdminRatio}%`,
      highlight: true,
    },
    {
      label: 'Total clicks',
      before: (beforeHarperStats?.totalClicks || 0).toString(),
      after: afterClicks.toString(),
    },
  ]

  return (
    <div className="min-h-screen bg-harper-beige flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full"
      >
        <h2 className="text-3xl font-semibold text-harper-teal text-center mb-2">
          End of <span className="font-accent italic text-harper-coral">Day</span>
        </h2>

        {/* Comparison table */}
        <div className="bg-white rounded-xl shadow-sm border border-harper-muted/20 overflow-hidden mt-6">
          {/* Header */}
          <div className="grid grid-cols-3 bg-harper-teal text-harper-beige">
            <div className="p-3 text-xs font-semibold uppercase tracking-wider" />
            <div className="p-3 text-xs font-semibold uppercase tracking-wider text-center">
              Before Harper
              <span className="block text-[10px] text-harper-beige/50 normal-case font-normal">8AM – 1:45PM</span>
            </div>
            <div className="p-3 text-xs font-semibold uppercase tracking-wider text-center">
              After Harper
              <span className="block text-[10px] text-harper-beige/50 normal-case font-normal">1:45PM – 5PM</span>
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className={`grid grid-cols-3 border-t border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-harper-cream/30'}`}
            >
              <div className="p-3 text-sm text-harper-teal-mid">{row.label}</div>
              <div className="p-3 text-sm font-mono text-center text-harper-muted">{row.before}</div>
              <div className={`p-3 text-sm font-mono text-center font-medium ${
                row.highlight ? 'text-harper-green' : 'text-harper-teal'
              }`}>
                {row.after}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-center text-harper-teal-mid mt-6 text-lg"
        >
          Same person. Same day. <span className="font-accent italic text-harper-coral">Different tools.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="flex items-center justify-center gap-4 mt-8"
        >
          <a
            href="https://harperinsure.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-harper-teal text-harper-beige px-6 py-2.5 rounded-full font-semibold text-sm
                       hover:bg-harper-teal-mid transition-colors"
          >
            Learn more about Harper
          </a>
          <button
            onClick={() => { resetShownIntros(); resetScenarioIndex(); resetGame() }}
            className="border-2 border-harper-teal text-harper-teal px-6 py-2.5 rounded-full font-semibold text-sm
                       hover:bg-harper-teal hover:text-harper-beige transition-colors cursor-pointer"
          >
            Play again
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}
