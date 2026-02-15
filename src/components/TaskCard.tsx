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

interface TaskCardProps {
  task: TaskInstance
  onClick: () => void
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  if (task.expired) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0.5 }}
        className="bg-red-50 border border-red-200 rounded-lg p-3 relative"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl text-red-400">✗</span>
        </div>
        <p className="text-xs font-medium text-red-400 line-through">{taskLabels[task.type]}</p>
        <p className="text-xs text-red-300">{task.clientName}</p>
      </motion.div>
    )
  }

  const pct = task.maxDeadline > 0 ? task.deadline / task.maxDeadline : 1
  const timerColor = pct > 0.7 ? 'bg-harper-green' : pct > 0.3 ? 'bg-harper-warning' : 'bg-harper-coral'
  const borderColor = pct > 0.7 ? 'border-harper-green/20' : pct > 0.3 ? 'border-harper-warning/30' : 'border-harper-coral/30'

  return (
    <motion.button
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full text-left rounded-lg p-3 border transition-all cursor-pointer
        ${task.isGold
          ? 'bg-amber-50 border-amber-300 ring-1 ring-amber-200'
          : `bg-white ${borderColor}`
        }
        ${task.harperAssisted ? 'ring-1 ring-harper-green/30' : ''}
      `}
    >
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs font-semibold text-harper-teal">
          {task.isGold && <span className="mr-1">⭐</span>}
          {taskLabels[task.type]}
          {task.harperAssisted && <span className="ml-1 text-harper-green text-[10px]">⚡</span>}
        </p>
      </div>
      <p className="text-xs text-harper-teal-mid truncate">{task.clientName} — {task.businessName}</p>

      {/* Timer bar */}
      <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${timerColor} rounded-full transition-all duration-500`}
          style={{ width: `${pct * 100}%` }}
        />
      </div>
    </motion.button>
  )
}
