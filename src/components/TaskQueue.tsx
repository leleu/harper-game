import { useGameStore } from '../state/gameStore'
import { TaskCard } from './TaskCard'

export function TaskQueue() {
  const taskQueue = useGameStore((s) => s.taskQueue)
  const selectTask = useGameStore((s) => s.selectTask)
  const tasksCompleted = useGameStore((s) => s.tasksCompleted)

  const activeTasks = taskQueue.filter(t => !t.expired && !t.completed)
  const expiredTasks = taskQueue.filter(t => t.expired)

  // Show hint on first task if player hasn't completed any tasks yet
  const showFirstTaskHint = tasksCompleted === 0 && activeTasks.length > 0

  return (
    <div className="w-72 bg-gradient-to-b from-slate-800 to-slate-800/80 border-r border-slate-700/50 flex flex-col shrink-0">
      <div className="px-4 py-3.5 border-b border-slate-700/40">
        <div className="flex items-center justify-between">
          <h2 className="text-[11px] font-semibold text-gold uppercase tracking-[0.15em]">
            Inbox
          </h2>
          {activeTasks.length > 0 && (
            <span className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded-full tabular-nums ${
              activeTasks.length > 5
                ? 'bg-crimson/10 text-crimson'
                : 'bg-gold/8 text-gold-dim'
            }`}>
              {activeTasks.length}
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2.5 space-y-2 queue-scroll">
        {activeTasks.length === 0 && expiredTasks.length === 0 && (
          <div className="text-center mt-12 px-4">
            <p className="text-mist/50 text-sm">No tasks yet</p>
            <p className="text-mist/30 text-xs mt-1">They're coming...</p>
          </div>
        )}

        {activeTasks.map((task, index) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={() => selectTask(task.id)}
            showHint={showFirstTaskHint && index === 0}
          />
        ))}

        {/* Show only the most recent 3 expired tasks, collapse the rest */}
        {expiredTasks.length > 0 && activeTasks.length > 0 && (
          <div className="border-t border-mist/10 mt-1 pt-1" />
        )}
        {expiredTasks.length > 3 && (
          <div className="text-[10px] text-mist/40 text-center py-0.5 tracking-wide">
            +{expiredTasks.length - 3} expired
          </div>
        )}
        {expiredTasks.slice(-3).map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={() => {}}
          />
        ))}
      </div>
    </div>
  )
}
