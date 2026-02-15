import { create } from 'zustand'

export type GamePhase = 'start' | 'tutorial' | 'ramp' | 'overwhelm' | 'harper' | 'mastery' | 'winddown' | 'end'

export type TaskType =
  | 'acord-form'
  | 'carrier-submission'
  | 'quote-comparison'
  | 'coi-issuance'
  | 'follow-up-email'
  | 'renewal-processing'
  | 'discovery-call'
  | 'proposal-presentation'

export interface TaskInstance {
  id: string
  type: TaskType
  clientName: string
  businessName: string
  scenarioData: Record<string, unknown>
  createdAt: number // game time in minutes since 8AM
  deadline: number // seconds remaining (real time)
  maxDeadline: number // original deadline for percentage calc
  completed: boolean
  expired: boolean
  isGold: boolean // discovery calls and proposals
  harperAssisted: boolean
}

export interface BeforeAfterStats {
  tasksCompleted: number
  avgTimePerTask: number
  clientsLost: number
  discoveryCalls: number
  policiesBound: number
  revenue: number
  nps: number
  adminRatio: number
  totalClicks: number
}

interface GameState {
  // Core state
  screen: 'start' | 'game' | 'end'
  gamePhase: GamePhase
  gameTimeMinutes: number // 0 = 8AM, 540 = 5PM
  realTimeElapsed: number // seconds since game started
  isRunning: boolean

  // Task management
  taskQueue: TaskInstance[]
  activeTask: TaskInstance | null

  // Scoring
  revenue: number
  nps: number
  tasksCompleted: number
  clientsLost: number
  totalClicks: number
  adminTime: number // seconds spent on admin tasks
  sellingTime: number // seconds spent on gold tasks
  discoveryCalls: number
  policiesBound: number

  // Harper unlock
  harperUnlocked: boolean
  unlockedTools: string[]

  // Before/After tracking (snapshot at Harper unlock)
  beforeHarperStats: BeforeAfterStats | null

  // Sound
  soundEnabled: boolean

  // Actions
  startGame: () => void
  setScreen: (screen: 'start' | 'game' | 'end') => void
  setGamePhase: (phase: GamePhase) => void
  tick: (deltaSeconds: number) => void
  addTask: (task: TaskInstance) => void
  selectTask: (taskId: string) => void
  completeActiveTask: (revenueEarned: number, wasGold: boolean) => void
  expireTask: (taskId: string) => void
  incrementClicks: () => void
  unlockHarper: () => void
  unlockTool: (tool: string) => void
  toggleSound: () => void
  endGame: () => void
  resetGame: () => void
}

export const useGameStore = create<GameState>((set, get) => ({
  screen: 'start',
  gamePhase: 'start',
  gameTimeMinutes: 0,
  realTimeElapsed: 0,
  isRunning: false,

  taskQueue: [],
  activeTask: null,

  revenue: 0,
  nps: 72,
  tasksCompleted: 0,
  clientsLost: 0,
  totalClicks: 0,
  adminTime: 0,
  sellingTime: 0,
  discoveryCalls: 0,
  policiesBound: 0,

  harperUnlocked: false,
  unlockedTools: [],

  beforeHarperStats: null,

  soundEnabled: true,

  startGame: () => set({
    screen: 'game',
    gamePhase: 'tutorial',
    gameTimeMinutes: 0,
    realTimeElapsed: 0,
    isRunning: true,
    taskQueue: [],
    activeTask: null,
    revenue: 0,
    nps: 72,
    tasksCompleted: 0,
    clientsLost: 0,
    totalClicks: 0,
    adminTime: 0,
    sellingTime: 0,
    discoveryCalls: 0,
    policiesBound: 0,
    harperUnlocked: false,
    unlockedTools: [],
    beforeHarperStats: null,
  }),

  setScreen: (screen) => set({ screen }),
  setGamePhase: (gamePhase) => set({ gamePhase }),

  tick: (deltaSeconds) => {
    const state = get()
    if (!state.isRunning) return

    const newRealTime = state.realTimeElapsed + deltaSeconds
    // 600 real seconds = 540 game minutes (8AM to 5PM)
    const gameMinutesPerRealSecond = 540 / 600
    const newGameTime = newRealTime * gameMinutesPerRealSecond

    // Update task deadlines
    const updatedQueue = state.taskQueue.map(task => ({
      ...task,
      deadline: Math.max(0, task.deadline - deltaSeconds),
    }))

    // Track time for active task
    const activeTask = state.activeTask
    let adminDelta = 0
    let sellingDelta = 0
    if (activeTask) {
      if (activeTask.isGold) {
        sellingDelta = deltaSeconds
      } else {
        adminDelta = deltaSeconds
      }
    }

    set({
      realTimeElapsed: newRealTime,
      gameTimeMinutes: Math.min(540, newGameTime),
      taskQueue: updatedQueue,
      adminTime: state.adminTime + adminDelta,
      sellingTime: state.sellingTime + sellingDelta,
    })
  },

  addTask: (task) => set((state) => ({
    taskQueue: [...state.taskQueue, task],
  })),

  selectTask: (taskId) => {
    const state = get()
    const task = state.taskQueue.find(t => t.id === taskId)
    if (!task || task.expired || task.completed) return

    set({
      activeTask: task,
      taskQueue: state.taskQueue.filter(t => t.id !== taskId),
    })
  },

  completeActiveTask: (revenueEarned, _wasGold) => {
    const state = get()
    if (!state.activeTask) return

    // NPS recovers when Harper is active — completing tasks rebuilds client satisfaction
    const npsBoost = state.harperUnlocked ? 3 : 0
    const newNps = Math.min(72, state.nps + npsBoost)

    set({
      activeTask: null,
      tasksCompleted: state.tasksCompleted + 1,
      revenue: state.revenue + revenueEarned,
      nps: npsBoost > 0 ? newNps : state.nps,
      discoveryCalls: state.discoveryCalls + (state.activeTask.type === 'discovery-call' ? 1 : 0),
      policiesBound: state.policiesBound + (state.activeTask.type === 'proposal-presentation' ? 1 : 0),
    })
  },

  expireTask: (taskId) => set((state) => {
    const updated = state.taskQueue.map(t =>
      t.id === taskId ? { ...t, expired: true } : t
    )
    return {
      taskQueue: updated,
      clientsLost: state.clientsLost + 1,
      nps: Math.max(0, state.nps - 5),
    }
  }),

  incrementClicks: () => set((state) => ({
    totalClicks: state.totalClicks + 1,
  })),

  unlockHarper: () => {
    const state = get()
    set({
      harperUnlocked: true,
      gamePhase: 'harper',
      beforeHarperStats: {
        tasksCompleted: state.tasksCompleted,
        avgTimePerTask: state.tasksCompleted > 0
          ? state.realTimeElapsed / state.tasksCompleted
          : 0,
        clientsLost: state.clientsLost,
        discoveryCalls: state.discoveryCalls,
        policiesBound: state.policiesBound,
        revenue: state.revenue,
        nps: state.nps,
        adminRatio: (state.adminTime + state.sellingTime) > 0
          ? state.adminTime / (state.adminTime + state.sellingTime)
          : 0,
        totalClicks: state.totalClicks,
      },
    })
  },

  unlockTool: (tool) => set((state) => ({
    unlockedTools: [...state.unlockedTools, tool],
  })),

  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),

  endGame: () => set({ isRunning: false, screen: 'end' }),

  resetGame: () => set({
    screen: 'start',
    gamePhase: 'start',
    gameTimeMinutes: 0,
    realTimeElapsed: 0,
    isRunning: false,
    taskQueue: [],
    activeTask: null,
    revenue: 0,
    nps: 72,
    tasksCompleted: 0,
    clientsLost: 0,
    totalClicks: 0,
    adminTime: 0,
    sellingTime: 0,
    discoveryCalls: 0,
    policiesBound: 0,
    harperUnlocked: false,
    unlockedTools: [],
    beforeHarperStats: null,
  }),
}))
