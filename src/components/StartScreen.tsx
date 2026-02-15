import { motion } from 'framer-motion'
import { useGameStore } from '../state/gameStore'
import { resetShownIntros } from './TaskIntro'
import { resetScenarioIndex } from '../engine/scenarios'

export function StartScreen() {
  const startGame = useGameStore((s) => s.startGame)

  const handleStart = () => {
    resetShownIntros()
    resetScenarioIndex()
    startGame()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-harper-beige">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg text-center px-6"
      >
        <h1 className="text-4xl font-semibold text-harper-teal mb-2">
          Welcome to <span className="font-accent italic text-harper-coral">Harper</span>
        </h1>

        <p className="text-lg text-harper-teal-mid leading-relaxed mb-2">
          You're a new broker at Harper — an AI-native commercial insurance brokerage. Your clients have risks too complex for standard carriers.
        </p>
        <p className="text-lg text-harper-teal-mid leading-relaxed mb-10">
          Today you'll learn how E&S brokers work — then see why Harper built something different.
        </p>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleStart}
          className="bg-harper-teal text-harper-beige px-8 py-3.5 rounded-full text-lg font-semibold
                     hover:bg-harper-teal-mid transition-colors cursor-pointer"
        >
          Start your day
        </motion.button>
      </motion.div>
    </div>
  )
}
