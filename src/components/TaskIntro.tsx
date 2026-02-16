import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { TaskType } from '../state/gameStore'

const INTROS: Record<TaskType, { title: string; source: string; line: string }> = {
  'acord-form': {
    title: 'ACORD 125 — Commercial Application',
    source: '📧 New client email + phone intake notes',
    line: 'The universal insurance form. You gather info from multiple sources — client emails, phone notes, last year\'s policy — and fill out every field. Underwriters reject sloppy submissions.',
  },
  'carrier-submission': {
    title: 'Carrier Submission',
    source: '💻 Log into carrier portals (Hartford EBC, myAIG, Hiscox)',
    line: "E&S risks go to 10-20+ markets. Each carrier has its own portal with different login, different forms, different required fields. Same data, entered over and over.",
  },
  'quote-comparison': {
    title: 'Quote Comparison',
    source: '📧 Quotes arriving via email over days/weeks',
    line: "Quotes come back in PDFs, spreadsheets, sometimes just email text. You build a comparison spreadsheet by hand to find the best coverage — not just the cheapest price.",
  },
  'coi-issuance': {
    title: 'Certificate of Insurance (ACORD 25)',
    source: '📧 Urgent email from landlord/GC/vendor',
    line: "Proof of coverage for a specific job or lease. Everyone needs one yesterday. You pull policy details, fill out the ACORD 25 form, and email it back. Agencies issue hundreds daily.",
  },
  'follow-up-email': {
    title: 'Follow-up Email',
    source: '📧 Check submission status, chase underwriters',
    line: "You submitted to 15 carriers last week. No universal tracking system. You email each underwriter individually, check portals manually, play phone tag. It never stops.",
  },
  'renewal-processing': {
    title: 'Renewal Processing',
    source: '📅 Calendar reminder: policy expiring in 90 days',
    line: "Request loss runs, updated apps, current values. Chase underwriters for quotes. Review coverage gaps. If you miss the deadline, your client has no coverage on day 1. The cycle never ends.",
  },
  'discovery-call': {
    title: 'Discovery Call',
    source: '📞 Scheduled call with new prospect',
    line: "The real job — understanding their business, identifying exposures, matching complex risks to the right E&S markets. This is where expertise matters. No AI can replace building trust.",
  },
  'proposal-presentation': {
    title: 'Proposal Presentation',
    source: '📞 Scheduled presentation call',
    line: "Present the options. Explain trade-offs between premium, coverage, deductibles. Answer questions. This is where relationships and expertise close deals.",
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
  const [currentIntro, setCurrentIntro] = useState<{ title: string; source: string; line: string } | null>(null)

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
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="absolute top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
        >
          <div className="bg-slate-800 rounded-2xl px-6 py-4 card-elevated-lg max-w-lg text-center border border-gold/20">
            <p className="text-[10px] text-gold/60 uppercase tracking-[0.15em] font-semibold mb-1.5">
              {currentIntro.title}
            </p>
            <p className="text-xs text-mist/80 mb-2 italic">
              {currentIntro.source}
            </p>
            <p className="text-[13px] text-pearl/90 leading-relaxed">
              {currentIntro.line}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
