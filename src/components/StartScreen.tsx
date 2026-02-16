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
    <div className="min-h-screen flex items-center justify-center noise-bg scan-line-effect relative overflow-hidden">
      {/* Ambient orbs - enhanced with more layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: ['-10%', '10%', '-10%'],
            y: ['-5%', '5%', '-5%'],
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: ['10%', '-10%', '10%'],
            y: ['5%', '-5%', '5%'],
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald rounded-full blur-3xl"
        />
        {/* Additional depth layers */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]"
          style={{
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.03) 0%, transparent 70%)',
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="max-w-2xl text-center px-8 relative z-10"
      >
        {/* Top decorative element - enhanced with animation */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-2 h-2 rounded-full bg-gold"
            style={{
              boxShadow: '0 0 10px rgba(212, 175, 55, 0.6), 0 0 20px rgba(212, 175, 55, 0.3)',
            }}
          />
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        </motion.div>

        {/* Title - enhanced typography */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-7xl font-bold text-pearl mb-6 tracking-tight leading-none"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 800 }}
        >
          Welcome to{' '}
          <motion.span
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="inline-block font-serif italic text-gold-bright relative"
            style={{
              textShadow: '0 0 40px rgba(212, 175, 55, 0.5), 0 0 20px rgba(244, 208, 63, 0.4), 0 4px 12px rgba(0, 0, 0, 0.6)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
            }}
          >
            <motion.span
              className="absolute inset-0 text-gold-bright opacity-50 blur-md"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              Harper
            </motion.span>
            <span className="relative">Harper</span>
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="space-y-4 mb-14 max-w-xl mx-auto"
        >
          <p className="text-xl text-pearl-dim leading-relaxed font-light">
            You're a new broker at an AI-native commercial insurance brokerage.
            Your clients have risks too complex for standard carriers.
          </p>
          <p className="text-base text-mist leading-relaxed">
            Today you'll learn how E&S brokers work — then discover why
            Harper built something different.
          </p>
        </motion.div>

        {/* CTA Button - enhanced with ripple effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="relative"
        >
          {/* Pulsing rings */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
            className="absolute inset-0 rounded-full bg-gold blur-xl"
            style={{ transform: 'translateZ(0)' }}
          />

          <motion.button
            whileHover={{
              scale: 1.05,
              y: -3,
              boxShadow: `
                0 0 60px rgba(212, 175, 55, 0.5),
                0 12px 32px rgba(0, 0, 0, 0.5),
                inset 0 1px 0 rgba(255, 255, 255, 0.4),
                0 0 0 2px rgba(212, 175, 55, 0.6)
              `,
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            data-testid="start-button"
            className="relative group px-14 py-5 rounded-full text-lg font-bold cursor-pointer
                       bg-gradient-to-br from-gold via-gold-bright to-gold-dim
                       text-midnight overflow-hidden"
            style={{
              boxShadow: `
                0 0 40px rgba(212, 175, 55, 0.4),
                0 8px 28px rgba(0, 0, 0, 0.5),
                inset 0 2px 0 rgba(255, 255, 255, 0.3),
                inset 0 -1px 0 rgba(0, 0, 0, 0.2),
                0 0 0 1px rgba(212, 175, 55, 0.5)
              `,
              letterSpacing: '0.05em',
            }}
          >
            {/* Shine effect */}
            <motion.div
              animate={{
                x: ['-200%', '200%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
              className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
            />

            {/* Hover shimmer */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.2) 50%, transparent 70%)',
                backgroundSize: '200% 200%',
              }}
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            />

            <span className="relative z-10">Start your day</span>
          </motion.button>
        </motion.div>

        {/* Time indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-10 flex items-center justify-center gap-2"
        >
          <div className="w-1 h-1 rounded-full bg-mist/40" />
          <p className="text-xs text-mist/60 uppercase tracking-widest font-medium">
            ~ 10 minutes
          </p>
          <div className="w-1 h-1 rounded-full bg-mist/40" />
        </motion.div>
      </motion.div>
    </div>
  )
}
