import type { TaskType } from '../state/gameStore'

// Pacing engine: controls task spawn rate based on real elapsed seconds
// Total game: ~600 real seconds (10 minutes)
//
// Timeline:
//   0:00 - 2:30 (0-150s)   = TUTORIAL: one task at a time, generous timers
//   2:30 - 5:30 (150-330s) = RAMP: faster spawns, shorter timers, queue grows
//   5:30 - 6:00 (330-360s) = HARPER UNLOCK: tools activate
//   6:00 - 9:30 (360-570s) = MASTERY: same spawn rate, but tasks are quick
//   9:30 - 10:00 (570-600s) = WIND DOWN: no new tasks, finish queue

export type PacingPhase = 'tutorial' | 'ramp' | 'overwhelm' | 'harper' | 'mastery' | 'winddown'

export interface SpawnEvent {
  realTime: number // seconds since game start
  taskType: TaskType
  deadline: number // seconds
}

// Admin task types (routine, repetitive)
const ADMIN_TYPES: TaskType[] = [
  'acord-form',
  'carrier-submission',
  'coi-issuance',
  'follow-up-email',
  'renewal-processing',
]

// High-value task types (but player can't get to them under pressure)
const QUOTE_TYPE: TaskType = 'quote-comparison'

// Gold tasks (relationship-building, not automatable)
const GOLD_TYPES: TaskType[] = [
  'discovery-call',
  'proposal-presentation',
]

function pickAdmin(): TaskType {
  return ADMIN_TYPES[Math.floor(Math.random() * ADMIN_TYPES.length)]
}

function pickAny(): TaskType {
  // Weighted: 60% admin, 20% quote, 10% discovery, 10% proposal
  const r = Math.random()
  if (r < 0.6) return pickAdmin()
  if (r < 0.8) return QUOTE_TYPE
  if (r < 0.9) return GOLD_TYPES[0]
  return GOLD_TYPES[1]
}

export function generateSpawnSchedule(): SpawnEvent[] {
  const events: SpawnEvent[] = []

  // ═══════════════════════════════════════════
  // TUTORIAL PHASE (0-150s): Introduce task types one at a time
  // ═══════════════════════════════════════════
  const tutorialTypes: TaskType[] = [
    'acord-form',         // First: the core form-filling task
    'follow-up-email',    // Simple, quick
    'coi-issuance',       // Another form variant
    'carrier-submission', // The tedious one
    'quote-comparison',   // Reading comprehension
    'renewal-processing', // Multi-step
    'discovery-call',     // First gold task — teach the concept
  ]

  let t = 3 // start 3 seconds in
  for (const type of tutorialTypes) {
    events.push({ realTime: t, taskType: type, deadline: 35 })
    t += 20 // one task every 20 seconds
  }
  // Tutorial ends around t=143 (~2:23)

  // ═══════════════════════════════════════════
  // RAMP PHASE (150-330s): Volume increases, timers shorten
  // ═══════════════════════════════════════════

  // Phase 2a: Moderate (150-240s) — tasks every 10s, 20s deadlines
  t = 150
  while (t < 240) {
    events.push({ realTime: t, taskType: pickAny(), deadline: 18 })
    t += 8 + Math.random() * 4 // 8-12 seconds between spawns
  }

  // Phase 2b: Heavy (240-330s) — tasks every 6s, 14s deadlines, bursts
  t = 240
  while (t < 330) {
    // Burst: 2-3 tasks at once
    const burstSize = Math.random() < 0.3 ? 3 : 2
    for (let b = 0; b < burstSize; b++) {
      const type = b === 0 && Math.random() < 0.15 ? GOLD_TYPES[Math.floor(Math.random() * 2)] : pickAdmin()
      events.push({ realTime: t + b * 0.5, taskType: type, deadline: 13 + Math.random() * 3 })
    }
    t += 5 + Math.random() * 3 // 5-8 seconds between bursts
  }

  // ═══════════════════════════════════════════
  // MASTERY PHASE (360-570s): Same spawn rate as ramp, but Harper makes tasks quick
  // ═══════════════════════════════════════════
  // Guarantee a few gold tasks so player can earn policies bound
  const guaranteedGold: SpawnEvent[] = [
    { realTime: 380, taskType: 'discovery-call', deadline: 30 },
    { realTime: 420, taskType: 'proposal-presentation', deadline: 30 },
    { realTime: 470, taskType: 'discovery-call', deadline: 30 },
    { realTime: 510, taskType: 'proposal-presentation', deadline: 30 },
  ]
  events.push(...guaranteedGold)

  t = 360
  while (t < 570) {
    const type = pickAny()
    const isGold = type === 'discovery-call' || type === 'proposal-presentation'
    events.push({ realTime: t, taskType: type, deadline: isGold ? 28 : 20 })
    t += 6 + Math.random() * 4 // 6-10 seconds
  }

  // Sort by time
  events.sort((a, b) => a.realTime - b.realTime)

  return events
}

export function getPacingPhase(realSeconds: number): PacingPhase {
  if (realSeconds < 150) return 'tutorial'
  if (realSeconds < 270) return 'ramp'
  if (realSeconds < 330) return 'overwhelm'
  if (realSeconds < 360) return 'harper'
  if (realSeconds < 570) return 'mastery'
  return 'winddown'
}
