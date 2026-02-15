import { useGameStore } from '../state/gameStore'
import { TaskCard } from './TaskCard'

export function TaskQueue() {
  const taskQueue = useGameStore((s) => s.taskQueue)
  const selectTask = useGameStore((s) => s.selectTask)

  const activeTasks = taskQueue.filter(t => !t.expired && !t.completed)
  const expiredTasks = taskQueue.filter(t => t.expired)

  return (
    <div className="w-72 bg-harper-cream border-r border-harper-muted/20 flex flex-col shrink-0">
      <div className="px-4 py-3 border-b border-harper-muted/20">
        <h2 className="text-sm font-semibold text-harper-teal uppercase tracking-wider">
          Task Queue
          {activeTasks.length > 0 && (
            <span className="ml-2 bg-harper-teal text-harper-beige text-xs px-2 py-0.5 rounded-full">
              {activeTasks.length}
            </span>
          )}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {activeTasks.length === 0 && expiredTasks.length === 0 && (
          <p className="text-harper-muted text-sm text-center mt-8">
            No tasks yet...
          </p>
        )}

        {activeTasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={() => selectTask(task.id)}
          />
        ))}

        {/* Show only the most recent 3 expired tasks, collapse the rest */}
        {expiredTasks.length > 3 && (
          <div className="text-xs text-harper-muted/60 text-center py-1">
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
