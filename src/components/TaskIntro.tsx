import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { TaskType } from '../state/gameStore'

const INTROS: Record<TaskType, { title: string; line: string }> = {
  'acord-form': {
    title: 'ACORD 125 — Commercial Application',
    line: 'The universal insurance form. Agency info, SIC codes, loss history — every field matters because underwriters reject sloppy submissions.',
  },
  'carrier-submission': {
    title: 'Carrier Submission',
    line: "E&S risks go to 10-20+ markets. Each carrier has its own portal — Hartford EBC, myAIG, Hiscox Online. Same data, different forms.",
  },
  'quote-comparison': {
    title: 'Quote Comparison',
    line: "E&S quotes come back in different formats over days or weeks. You build the spreadsheet. You find the best coverage, not just the cheapest price.",
  },
  'coi-issuance': {
    title: 'Certificate of Insurance (ACORD 25)',
    line: "Proof of coverage. Landlords, GCs, vendors — everyone needs one yesterday. Agencies issue hundreds daily.",
  },
  'follow-up-email': {
    title: 'Follow-up Email',
    line: "Submission tracking is a constant game of email and phone tag. There's no universal status system — you chase every underwriter yourself.",
  },
  'renewal-processing': {
    title: 'Renewal Processing',
    line: "Start 90-120 days before expiration. Miss the deadline and your client has no coverage. The cycle never ends.",
  },
  'discovery-call': {
    title: 'Discovery Call',
    line: "This is the real job — matching complex risks to the right E&S coverage. No one can automate trust.",
  },
  'proposal-presentation': {
    title: 'Proposal Presentation',
    line: "Present the options, explain the trade-offs. This is where relationships and expertise close deals.",
  },
}

// Track which intros have been shown across the session
const shownIntros = new Set<string>()

export function resetShownIntros() {
  shownIntros.clear()
}

interface TaskIntroProps {
  taskType: TaskType | null
}

export function TaskIntro({ taskType }: TaskIntroProps) {
  const [visible, setVisible] = useState(false)
  const [currentIntro, setCurrentIntro] = useState<{ title: string; line: string } | null>(null)

  useEffect(() => {
    if (!taskType || shownIntros.has(taskType)) {
      setVisible(false)
      return
    }

    const intro = INTROS[taskType]
    if (!intro) return

    shownIntros.add(taskType)
    setCurrentIntro(intro)
    setVisible(true)

    const timer = setTimeout(() => setVisible(false), 3000)
    return () => clearTimeout(timer)
  }, [taskType])

  return (
    <AnimatePresence>
      {visible && currentIntro && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="absolute top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
        >
          <div className="bg-harper-teal/95 backdrop-blur-sm rounded-xl px-6 py-4 shadow-xl max-w-md text-center">
            <p className="text-xs text-harper-beige/60 uppercase tracking-wider font-semibold mb-1">
              {currentIntro.title}
            </p>
            <p className="text-sm text-harper-beige leading-relaxed">
              {currentIntro.line}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
