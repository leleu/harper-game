import { useEffect, useRef, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { TopBar } from './TopBar'
import { TaskQueue } from './TaskQueue'
import { Workspace } from './Workspace'
import { Scoreboard } from './Scoreboard'
import { HarperUnlockCinematic } from './HarperUnlockCinematic'
import { TaskIntro } from './TaskIntro'
import { PhaseOverlay } from './PhaseOverlay'
import { WelcomeCard } from './WelcomeCard'
import { PauseScreen } from './PauseScreen'
import { DebugControls } from './DebugControls'
import { useGameStore } from '../state/gameStore'
import { createTask } from '../engine/taskFactory'
import { generateSpawnSchedule, getPacingPhase } from '../engine/pacing'
import { useSoundEffects } from '../engine/useSoundEffects'

export function GameShell() {
  useSoundEffects()
  const tick = useGameStore((s) => s.tick)
  const isRunning = useGameStore((s) => s.isRunning)
  const isPaused = useGameStore((s) => s.isPaused)
  const setPaused = useGameStore((s) => s.setPaused)
  const showPauseScreen = useGameStore((s) => s.showPauseScreen)
  const setShowPauseScreen = useGameStore((s) => s.setShowPauseScreen)
  const hasShownWelcomeCard = useGameStore((s) => s.hasShownWelcomeCard)
  const markWelcomeCardShown = useGameStore((s) => s.markWelcomeCardShown)
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
  const tasksCompleted = useGameStore((s) => s.tasksCompleted)
  const clientsLost = useGameStore((s) => s.clientsLost)
  const adminTime = useGameStore((s) => s.adminTime)
  const sellingTime = useGameStore((s) => s.sellingTime)

  const lastTickRef = useRef<number>(0)
  const spawnIndexRef = useRef(0)
  const [currentWelcomeCard, setCurrentWelcomeCard] = useState<string | null>(null)

  const spawnSchedule = useMemo(() => generateSpawnSchedule(), [])

  const totalTime = adminTime + sellingTime
  const adminRatio = totalTime > 0 ? Math.round((adminTime / totalTime) * 100) : 0

  // ESC key to toggle pause screen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowPauseScreen(!showPauseScreen)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showPauseScreen, setShowPauseScreen])

  // Welcome Card 1: Game intro (shows once at start)
  useEffect(() => {
    if (isRunning && realTimeElapsed < 1 && !hasShownWelcomeCard('intro')) {
      setPaused(true)
      setCurrentWelcomeCard('intro')
    }
  }, [isRunning, realTimeElapsed, hasShownWelcomeCard, setPaused])

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
    if (!isRunning || isPaused) return
    while (
      spawnIndexRef.current < spawnSchedule.length &&
      spawnSchedule[spawnIndexRef.current].realTime <= realTimeElapsed
    ) {
      const event = spawnSchedule[spawnIndexRef.current]
      const task = createTask(event.taskType, event.deadline)
      addTask(task)
      spawnIndexRef.current++
    }
  }, [isRunning, isPaused, realTimeElapsed, spawnSchedule, addTask])

  // Update game phase
  useEffect(() => {
    if (!isRunning) return
    const phase = getPacingPhase(realTimeElapsed)
    setGamePhase(phase)
  }, [isRunning, realTimeElapsed, setGamePhase])

  // Harper unlock at 'harper' phase — show WelcomeCard 2 first, then cinematic
  useEffect(() => {
    if (gamePhase === 'harper' && !harperUnlocked) {
      if (!hasShownWelcomeCard('harper-stats')) {
        // Show WelcomeCard 2 with pre-Harper stats before cinematic
        setPaused(true)
        setCurrentWelcomeCard('harper-stats')
      } else {
        // Card already dismissed — proceed to unlock + cinematic
        unlockHarper()
        setPaused(true)
      }
    }
  }, [gamePhase, harperUnlocked, unlockHarper, setPaused, hasShownWelcomeCard])

  // Expire tasks
  useEffect(() => {
    if (isPaused) return
    const expiredIds = taskQueue
      .filter(t => !t.expired && !t.completed && t.deadline <= 0)
      .map(t => t.id)
    expiredIds.forEach(id => expireTask(id))
  }, [taskQueue, expireTask, isPaused])

  // End game at 5PM
  useEffect(() => {
    if (gameTimeMinutes >= 540 && isRunning) {
      endGame()
    }
  }, [gameTimeMinutes, isRunning, endGame])

  const handleDismissWelcome = () => {
    if (currentWelcomeCard) {
      const cardId = currentWelcomeCard
      markWelcomeCardShown(cardId)
      setCurrentWelcomeCard(null)

      if (cardId === 'harper-stats') {
        // After dismissing pre-Harper stats card, trigger the unlock cinematic
        unlockHarper()
        // Stay paused — the cinematic will handle unpausing
      } else {
        setPaused(false)
      }
    }
  }

  return (
    <div className="h-screen flex flex-col bg-midnight relative scan-line-effect">
      <TopBar />
      <div className="flex-1 flex overflow-hidden relative">
        {/* Depth-enhanced ambient background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{
              x: ['-5%', '5%', '-5%'],
              y: ['-3%', '3%', '-3%'],
              opacity: [0.02, 0.04, 0.02],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 left-1/4 w-96 h-96 bg-gold rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: ['5%', '-5%', '5%'],
              opacity: [0.015, 0.03, 0.015],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald rounded-full blur-3xl"
          />
        </div>

        <TaskQueue />
        <div className="flex-1 relative">
          <Workspace />
          <TaskIntro taskType={activeTask?.type ?? null} />
          <PhaseOverlay phase={gamePhase} />
          <HarperUnlockCinematic />
        </div>
        <Scoreboard />
      </div>

      {/* Welcome Card 1: Game Introduction */}
      <WelcomeCard
        isVisible={currentWelcomeCard === 'intro'}
        onDismiss={handleDismissWelcome}
        category="YOUR DAY"
        headline="You have 9 hours and 20 clients."
        body="You're a commercial insurance broker. Emails are flooding in. Clients need certificates. Underwriters want forms filled out. Renewals are coming due. Most brokers spend 57% of their time on this admin work — you're about to feel why."
        bodySecondary="Tasks appear in your inbox on the left as emails arrive, clients call, and deadlines approach. Click a task to start. Complete it before the timer runs out, or the client walks."
        dismissText="Start my day"
      />

      {/* Welcome Card 2: Pre-Harper Stats */}
      <WelcomeCard
        isVisible={currentWelcomeCard === 'harper-stats'}
        onDismiss={handleDismissWelcome}
        category="HALFWAY THROUGH"
        headline="Here's your morning so far."
        body="You've been doing everything manually — forms, portals, follow-ups. Just like a real broker."
        stats={{
          tasksCompleted,
          clientsLost,
          adminRatio,
        }}
        bodySecondary="What if the admin work handled itself?"
        dismissText="Show me"
      />

      {/* Pause Screen */}
      <PauseScreen
        isVisible={showPauseScreen}
        onClose={() => setShowPauseScreen(false)}
      />

      {/* Debug Controls */}
      <DebugControls />
    </div>
  )
}
