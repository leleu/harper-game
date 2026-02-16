import { motion } from 'framer-motion'
import type { TaskInstance } from '../state/gameStore'

const taskLabels: Record<string, string> = {
  'acord-form': 'ACORD Application',
  'carrier-submission': 'Carrier Submission',
  'quote-comparison': 'Quote Comparison',
  'coi-issuance': 'COI Request',
  'follow-up-email': 'Follow-up Email',
  'renewal-processing': 'Renewal Processing',
  'discovery-call': 'Discovery Call',
  'proposal-presentation': 'Proposal',
}

const taskIcons: Record<string, string> = {
  'acord-form': '📋',
  'carrier-submission': '🏢',
  'quote-comparison': '⚖',
  'coi-issuance': '📄',
  'follow-up-email': '✉',
  'renewal-processing': '🔄',
  'discovery-call': '📞',
  'proposal-presentation': '🤝',
}

interface TaskCardProps {
  task: TaskInstance
  onClick: () => void
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  if (task.expired) {
    return (
      <motion.div
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 0.3 }}
        className="rounded-lg p-2.5 bg-slate-800/30 border border-crimson/20"
      >
        <div className="flex items-center gap-2">
          <span className="text-xs text-crimson/50">✗</span>
          <p className="text-[11px] text-mist/40 line-through flex-1 truncate">{taskLabels[task.type]}</p>
        </div>
      </motion.div>
    )
  }

  const pct = task.maxDeadline > 0 ? task.deadline / task.maxDeadline : 1
  const isUrgent = pct <= 0.3
  const isMid = pct <= 0.7

  return (
    <motion.button
      layout
      initial={{ opacity: 0, x: -16, scale: 0.97 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      data-testid={`task-card-${task.id}`}
      className={`w-full text-left rounded-xl p-3 transition-all cursor-pointer
        ${task.isGold
          ? 'gold-glow'
          : task.harperAssisted
            ? 'card-elevated border-emerald/30'
            : isUrgent
              ? 'card-elevated pulse-urgent'
              : 'card-elevated border-slate-600/50'
        }
      `}
    >
      <div className="flex items-start gap-2.5">
        <span className="text-sm mt-0.5 opacity-80">{taskIcons[task.type]}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="text-xs font-semibold text-pearl truncate">
              {taskLabels[task.type]}
            </p>
            {task.harperAssisted && (
              <span className="shrink-0 text-[9px] bg-emerald-glow/20 text-emerald-glow px-1.5 py-0.5 rounded font-medium border border-emerald/30">
                AI
              </span>
            )}
            {task.isGold && (
              <span className="shrink-0 text-[9px] bg-gold/20 text-gold-bright px-1.5 py-0.5 rounded font-medium border border-gold/40">
                ★
              </span>
            )}
          </div>
          <p className="text-[11px] text-mist truncate mt-0.5">
            {task.clientName}
          </p>
        </div>
      </div>

      {/* Timer bar */}
      <div className="mt-2.5 h-1.5 bg-slate-700/50 rounded-full overflow-hidden border border-slate-600/30">
        <motion.div
          className={`h-full rounded-full ${
            isUrgent
              ? 'bg-gradient-to-r from-crimson to-crimson-bright'
              : isMid
                ? 'bg-gradient-to-r from-amber to-amber-bright'
                : 'bg-gradient-to-r from-emerald to-emerald-bright'
          }`}
          style={{
            width: `${pct * 100}%`,
            boxShadow: isUrgent
              ? '0 0 8px rgba(220, 38, 38, 0.4)'
              : isMid
                ? '0 0 6px rgba(245, 158, 11, 0.3)'
                : '0 0 6px rgba(5, 150, 105, 0.3)'
          }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.button>
  )
}
