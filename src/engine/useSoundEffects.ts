import { useEffect, useRef } from 'react'
import { useGameStore } from '../state/gameStore'
import {
  playTaskComplete,
  playNewTask,
  playNewTaskBurst,
  playClientLost,
  playHarperUnlock,
  playToolUnlock,
} from './sound'

export function useSoundEffects() {
  const soundEnabled = useGameStore((s) => s.soundEnabled)
  const tasksCompleted = useGameStore((s) => s.tasksCompleted)
  const clientsLost = useGameStore((s) => s.clientsLost)
  const taskQueue = useGameStore((s) => s.taskQueue)
  const harperUnlocked = useGameStore((s) => s.harperUnlocked)
  const unlockedTools = useGameStore((s) => s.unlockedTools)

  const prevTasksCompleted = useRef(tasksCompleted)
  const prevClientsLost = useRef(clientsLost)
  const prevQueueLength = useRef(taskQueue.length)
  const prevHarperUnlocked = useRef(harperUnlocked)
  const prevToolCount = useRef(unlockedTools.length)

  useEffect(() => {
    if (!soundEnabled) {
      prevTasksCompleted.current = tasksCompleted
      prevClientsLost.current = clientsLost
      prevQueueLength.current = taskQueue.length
      prevHarperUnlocked.current = harperUnlocked
      prevToolCount.current = unlockedTools.length
      return
    }

    // Task completed
    if (tasksCompleted > prevTasksCompleted.current) {
      playTaskComplete()
    }

    // Client lost
    if (clientsLost > prevClientsLost.current) {
      playClientLost()
    }

    // New task(s) arrived
    const activeCount = taskQueue.filter(t => !t.expired && !t.completed).length
    const prevActiveCount = prevQueueLength.current
    if (activeCount > prevActiveCount) {
      const newTasks = activeCount - prevActiveCount
      if (newTasks >= 3) {
        playNewTaskBurst()
      } else {
        playNewTask()
      }
    }

    // Harper unlocked
    if (harperUnlocked && !prevHarperUnlocked.current) {
      playHarperUnlock()
    }

    // Tool unlocked
    if (unlockedTools.length > prevToolCount.current) {
      playToolUnlock()
    }

    prevTasksCompleted.current = tasksCompleted
    prevClientsLost.current = clientsLost
    prevQueueLength.current = activeCount
    prevHarperUnlocked.current = harperUnlocked
    prevToolCount.current = unlockedTools.length
  }, [soundEnabled, tasksCompleted, clientsLost, taskQueue, harperUnlocked, unlockedTools])
}
