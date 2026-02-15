import { useEffect, useRef, useMemo } from 'react'
import { TopBar } from './TopBar'
import { TaskQueue } from './TaskQueue'
import { Workspace } from './Workspace'
import { Scoreboard } from './Scoreboard'
import { HarperUnlock } from './HarperUnlock'
import { TaskIntro } from './TaskIntro'
import { PhaseOverlay } from './PhaseOverlay'
import { useGameStore } from '../state/gameStore'
import { createTask } from '../engine/taskFactory'
import { generateSpawnSchedule, getPacingPhase } from '../engine/pacing'
import { useSoundEffects } from '../engine/useSoundEffects'

export function GameShell() {
  useSoundEffects()
  const tick = useGameStore((s) => s.tick)
  const isRunning = useGameStore((s) => s.isRunning)
  const addTask = useGameStore((s) => s.addTask)
  const taskQueue = useGameStore((s) => s.taskQueue)
  const expireTask = useGameStore((s) => s.expireTask)
  const realTimeElapsed = useGameStore((s) => s.realTimeElapsed)
  const gameTimeMinutes = useGameStore((s) => s.gameTimeMinutes)
  const gamePhase = useGameStore((s) => s.gamePhase)
  const setGamePhase = useGameStore((s) => s.setGamePhase)
  const harperUnlocked = useGameStore((s) => s.harperUnlocked)
  const unlockHarper = useGameStore((s) => s.unlockHarper)
  const endGame = useGameStore((s) => s.endGame)
  const activeTask = useGameStore((s) => s.activeTask)
  const lastTickRef = useRef<number>(0)
  const spawnIndexRef = useRef(0)

  const spawnSchedule = useMemo(() => generateSpawnSchedule(), [])

  // Game loop
  useEffect(() => {
    if (!isRunning) return

    let animationFrameId: number
    lastTickRef.current = performance.now()

    const gameLoop = (now: number) => {
      const delta = (now - lastTickRef.current) / 1000
      lastTickRef.current = now
      tick(delta)
      animationFrameId = requestAnimationFrame(gameLoop)
    }

    animationFrameId = requestAnimationFrame(gameLoop)
    return () => cancelAnimationFrame(animationFrameId)
  }, [isRunning, tick])

  // Spawn tasks
  useEffect(() => {
    if (!isRunning) return
    while (
      spawnIndexRef.current < spawnSchedule.length &&
      spawnSchedule[spawnIndexRef.current].realTime <= realTimeElapsed
    ) {
      const event = spawnSchedule[spawnIndexRef.current]
      const task = createTask(event.taskType, event.deadline)
      addTask(task)
      spawnIndexRef.current++
    }
  }, [isRunning, realTimeElapsed, spawnSchedule, addTask])

  // Update game phase
  useEffect(() => {
    if (!isRunning) return
    const phase = getPacingPhase(realTimeElapsed)
    setGamePhase(phase)
  }, [isRunning, realTimeElapsed, setGamePhase])

  // Harper unlock at 'harper' phase
  useEffect(() => {
    if (gamePhase === 'harper' && !harperUnlocked) {
      unlockHarper()
    }
  }, [gamePhase, harperUnlocked, unlockHarper])

  // Expire tasks
  useEffect(() => {
    const expiredIds = taskQueue
      .filter(t => !t.expired && !t.completed && t.deadline <= 0)
      .map(t => t.id)
    expiredIds.forEach(id => expireTask(id))
  }, [taskQueue, expireTask])

  // End game at 5PM
  useEffect(() => {
    if (gameTimeMinutes >= 540 && isRunning) {
      endGame()
    }
  }, [gameTimeMinutes, isRunning, endGame])

  return (
    <div className="h-screen flex flex-col bg-harper-beige">
      <TopBar />
      <div className="flex-1 flex overflow-hidden">
        <TaskQueue />
        <div className="flex-1 relative">
          <Workspace />
          <TaskIntro taskType={activeTask?.type ?? null} />
          <PhaseOverlay phase={gamePhase} />
          <HarperUnlock />
        </div>
        <Scoreboard />
      </div>
    </div>
  )
}
