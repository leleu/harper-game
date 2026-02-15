import { useGameStore, type TaskInstance, type TaskType } from '../state/gameStore'
import { getNextScenario } from './scenarios'

let taskIdCounter = 0

export function resetTaskIdCounter() {
  taskIdCounter = 0
}

export function createTask(type: TaskType, deadline: number): TaskInstance {
  const scenario = getNextScenario()
  taskIdCounter++
  return {
    id: `task-${taskIdCounter}`,
    type,
    clientName: scenario.clientName,
    businessName: scenario.businessName,
    scenarioData: scenario as unknown as Record<string, unknown>,
    createdAt: useGameStore.getState().gameTimeMinutes,
    deadline,
    maxDeadline: deadline,
    completed: false,
    expired: false,
    isGold: type === 'discovery-call' || type === 'proposal-presentation',
    harperAssisted: useGameStore.getState().harperUnlocked && type !== 'discovery-call' && type !== 'proposal-presentation',
  }
}

// All task types for cycling through during gameplay
export const ALL_TASK_TYPES: TaskType[] = [
  'acord-form',
  'carrier-submission',
  'quote-comparison',
  'coi-issuance',
  'follow-up-email',
  'renewal-processing',
  'discovery-call',
  'proposal-presentation',
]
