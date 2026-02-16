import { useGameStore } from '../state/gameStore'

export function TopBar() {
  const gameTimeMinutes = useGameStore((s) => s.gameTimeMinutes)
  const revenue = useGameStore((s) => s.revenue)
  const nps = useGameStore((s) => s.nps)
  const soundEnabled = useGameStore((s) => s.soundEnabled)
  const toggleSound = useGameStore((s) => s.toggleSound)
  const gamePhase = useGameStore((s) => s.gamePhase)

  // Convert game minutes to display time (0 = 8:00 AM, 540 = 5:00 PM)
  const totalMinutes = Math.floor(gameTimeMinutes)
  const hours = Math.floor(totalMinutes / 60) + 8
  const minutes = totalMinutes % 60
  const displayHour = hours > 12 ? hours - 12 : hours
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const timeString = `${displayHour}:${minutes.toString().padStart(2, '0')} ${ampm}`

  const progressPercent = (gameTimeMinutes / 540) * 100
  const isOverwhelm = gamePhase === 'overwhelm' || gamePhase === 'harper'
  const isMastery = gamePhase === 'mastery' || gamePhase === 'winddown'

  const npsColor = nps >= 50 ? 'text-emerald-bright' : nps >= 25 ? 'text-amber' : 'text-crimson'

  return (
    <div className="h-14 bg-slate-800 flex items-center px-5 gap-6 shrink-0 relative overflow-hidden border-b border-slate-700/50">
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/5 pointer-events-none" />

      {/* Logo */}
      <div className="text-pearl font-semibold text-lg tracking-tight mr-2 relative z-10 flex items-center gap-2">
        <span className="font-serif italic text-xl">Harper</span>
        {isMastery && (
          <span className="text-[9px] bg-emerald/20 text-emerald-bright px-1.5 py-0.5 rounded font-sans font-medium tracking-wider uppercase">
            Hub
          </span>
        )}
      </div>

      {/* Clock + progress bar */}
      <div className="flex-1 flex items-center gap-3 relative z-10">
        <span className="font-mono text-sm text-pearl/90 w-20 tabular-nums font-medium">
          {timeString}
        </span>
        <div className="flex-1 h-1.5 bg-slate-700/60 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isOverwhelm
                ? 'bg-crimson progress-striped'
                : isMastery
                  ? 'bg-emerald'
                  : 'bg-crimson/80'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <span className="font-mono text-xs text-pearl/40 tabular-nums">5:00 PM</span>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-5 text-sm relative z-10">
        <div className="flex items-center gap-1.5">
          <span className="text-pearl/40 text-[10px] uppercase tracking-widest font-semibold">Rev</span>
          <span className="font-mono font-medium text-emerald-bright tabular-nums">
            ${revenue.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-pearl/40 text-[10px] uppercase tracking-widest font-semibold">NPS</span>
          <span className={`font-mono font-medium tabular-nums transition-colors duration-300 ${npsColor}`}>
            {nps}
          </span>
        </div>
      </div>

      {/* Mute toggle */}
      <button
        onClick={toggleSound}
        className="text-pearl/40 hover:text-pearl transition-colors text-sm cursor-pointer relative z-10 w-6 h-6 flex items-center justify-center"
        title={soundEnabled ? 'Mute' : 'Unmute'}
      >
        {soundEnabled ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 5.5h2.5L8 2.5v11L4.5 10.5H2a.5.5 0 01-.5-.5V6a.5.5 0 01.5-.5z"/>
            <path d="M11 5.5a3 3 0 010 5M13 3.5a6 6 0 010 9"/>
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 5.5h2.5L8 2.5v11L4.5 10.5H2a.5.5 0 01-.5-.5V6a.5.5 0 01.5-.5z"/>
            <path d="M11 5.5l4 5M15 5.5l-4 5"/>
          </svg>
        )}
      </button>
    </div>
  )
}
