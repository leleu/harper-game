import { motion, AnimatePresence } from 'framer-motion'

interface WelcomeCardProps {
  isVisible: boolean
  onDismiss: () => void
  category: string
  headline: string
  body: string
  bodySecondary?: string
  dismissText?: string
  stats?: {
    tasksCompleted: number
    clientsLost: number
    adminRatio: number
  }
}

export function WelcomeCard({
  isVisible,
  onDismiss,
  category,
  headline,
  body,
  bodySecondary,
  dismissText = "Got it",
  stats
}: WelcomeCardProps) {
  if (!isVisible) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-midnight/90 backdrop-blur-md"
        />

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative max-w-lg mx-4 card-elevated-lg rounded-2xl p-8 border border-gold/20"
        >
          {/* Category label */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-1 rounded-full bg-gold/60" />
            <p className="text-[10px] uppercase tracking-[0.2em] text-gold/70 font-bold">
              {category}
            </p>
            <div className="w-1 h-1 rounded-full bg-gold/60" />
          </div>

          {/* Headline */}
          <h3 className="text-2xl font-bold text-pearl mb-4 leading-tight">
            {headline}
          </h3>

          {/* Body text */}
          <p className="text-base text-pearl-dim leading-relaxed mb-4">
            {body}
          </p>

          {/* Stats display (optional) */}
          {stats && (
            <div className="grid grid-cols-3 gap-3 mb-6 p-4 rounded-xl bg-slate-800/50 border border-slate-600/30">
              <div className="text-center">
                <div className="text-2xl font-bold text-pearl tabular-nums">
                  {stats.tasksCompleted}
                </div>
                <div className="text-xs text-mist mt-1">Tasks Done</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-crimson-bright tabular-nums">
                  {stats.clientsLost}
                </div>
                <div className="text-xs text-mist mt-1">Clients Lost</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-bright tabular-nums">
                  {stats.adminRatio}%
                </div>
                <div className="text-xs text-mist mt-1">Admin Time</div>
              </div>
            </div>
          )}

          {/* Secondary body (optional) */}
          {bodySecondary && (
            <p className="text-sm text-mist leading-relaxed mb-6 italic">
              {bodySecondary}
            </p>
          )}

          {/* Dismiss button */}
          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={onDismiss}
            data-testid="welcome-dismiss"
            className="w-full bg-gradient-to-br from-gold via-gold-bright to-gold-dim text-midnight
                       px-6 py-3 rounded-full font-semibold text-sm cursor-pointer"
            style={{
              boxShadow: `
                0 0 30px rgba(212, 175, 55, 0.3),
                0 8px 20px rgba(0, 0, 0, 0.4),
                inset 0 1px 0 rgba(255, 255, 255, 0.3)
              `
            }}
          >
            {dismissText}
          </motion.button>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
