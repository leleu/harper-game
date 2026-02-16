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

  const rows: { label: string; before: string; after: string; highlight?: boolean; isKey?: boolean }[] = [
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
      isKey: true,
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
      isKey: true,
    },
    {
      label: 'Total clicks',
      before: (beforeHarperStats?.totalClicks || 0).toString(),
      after: afterClicks.toString(),
    },
  ]

  return (
    <div className="min-h-screen noise-bg scan-line-effect flex items-center justify-center p-6 relative overflow-hidden">
      {/* Enhanced ambient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gold rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.08, 0.12, 0.08],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full relative z-10"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
            <div className="w-1 h-1 rounded-full bg-gold/60" />
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
          </div>
          <h2 className="text-5xl font-bold text-pearl tracking-tight">
            End of{' '}
            <span className="font-serif italic text-gold-bright" style={{
              textShadow: '0 0 30px rgba(212, 175, 55, 0.4)'
            }}>Day</span>
          </h2>
        </motion.div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-elevated-lg rounded-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="grid grid-cols-3 bg-gradient-to-br from-slate-800 to-slate-700 border-b border-gold/20">
            <div className="p-5" />
            <div className="p-5 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-mist">
                Before Harper
              </p>
              <p className="text-[10px] text-mist/40 mt-1 font-mono">8 AM – 1:45 PM</p>
            </div>
            <div className="p-5 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-bright">
                After Harper
              </p>
              <p className="text-[10px] text-gold/50 mt-1 font-mono">1:45 PM – 5 PM</p>
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.08 }}
              className={`grid grid-cols-3 border-t ${
                row.isKey
                  ? 'border-gold/20 bg-gradient-to-r from-slate-700/40 to-slate-700/20'
                  : 'border-slate-600/30'
              }`}
            >
              <div className="px-5 py-3.5 flex items-center">
                <span className={`text-sm ${row.isKey ? 'font-semibold text-pearl' : 'text-pearl-dim'}`}>
                  {row.label}
                </span>
              </div>
              <div className="px-5 py-3.5 flex items-center justify-center">
                <span className="text-sm font-mono text-mist tabular-nums">
                  {row.before}
                </span>
              </div>
              <div className="px-5 py-3.5 flex items-center justify-center">
                <span className={`text-sm font-mono font-semibold tabular-nums ${
                  row.highlight ? 'text-emerald-glow' : 'text-pearl'
                }`}>
                  {row.after}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="text-center text-pearl-dim mt-10 text-xl tracking-tight font-light"
        >
          Same person. Same day.{' '}
          <span className="font-serif italic text-gold-bright">Different tools.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6 }}
          className="flex items-center justify-center gap-4 mt-10"
        >
          <a
            href="https://harperinsure.com"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="learn-more-link"
            className="bg-gradient-to-br from-gold via-gold-bright to-gold-dim text-midnight px-8 py-3.5 rounded-full font-semibold text-sm
                       transition-all duration-300 cursor-pointer relative overflow-hidden group"
            style={{
              boxShadow: `
                0 0 30px rgba(212, 175, 55, 0.3),
                0 8px 20px rgba(0, 0, 0, 0.4),
                inset 0 1px 0 rgba(255, 255, 255, 0.3)
              `
            }}
          >
            <span className="relative z-10">Learn more about Harper</span>
          </a>
          <button
            onClick={() => { resetShownIntros(); resetScenarioIndex(); resetGame() }}
            data-testid="play-again-button"
            className="border-2 border-pearl/20 text-pearl px-8 py-3.5 rounded-full font-semibold text-sm
                       hover:border-gold hover:bg-gold/10 hover:text-gold-bright
                       transition-all duration-300 cursor-pointer backdrop-blur-sm"
          >
            Play again
          </button>
        </motion.div>

        {/* Decorative close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="flex items-center justify-center gap-2 mt-12"
        >
          <div className="w-1 h-1 rounded-full bg-gold/40" />
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <div className="w-1 h-1 rounded-full bg-gold/40" />
        </motion.div>
      </motion.div>
    </div>
  )
}
