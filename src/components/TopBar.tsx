import { useGameStore } from '../state/gameStore'

export function TopBar() {
  const gameTimeMinutes = useGameStore((s) => s.gameTimeMinutes)
  const revenue = useGameStore((s) => s.revenue)
  const nps = useGameStore((s) => s.nps)
  const soundEnabled = useGameStore((s) => s.soundEnabled)
  const toggleSound = useGameStore((s) => s.toggleSound)

  // Convert game minutes to display time (0 = 8:00 AM, 540 = 5:00 PM)
  const totalMinutes = Math.floor(gameTimeMinutes)
  const hours = Math.floor(totalMinutes / 60) + 8
  const minutes = totalMinutes % 60
  const displayHour = hours > 12 ? hours - 12 : hours
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const timeString = `${displayHour}:${minutes.toString().padStart(2, '0')} ${ampm}`

  const progressPercent = (gameTimeMinutes / 540) * 100

  return (
    <div className="h-14 bg-harper-teal flex items-center px-5 gap-6 shrink-0">
      {/* Logo */}
      <div className="text-harper-beige font-semibold text-lg tracking-tight mr-2">
        Harper
      </div>

      {/* Clock + progress bar */}
      <div className="flex-1 flex items-center gap-3">
        <span className="font-mono text-sm text-harper-beige/80 w-20">{timeString}</span>
        <div className="flex-1 h-2 bg-harper-teal-mid rounded-full overflow-hidden">
          <div
            className="h-full bg-harper-coral rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <span className="font-mono text-sm text-harper-beige/60">5:00 PM</span>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-5 text-sm">
        <div className="text-harper-beige/80">
          <span className="text-harper-beige/50 text-xs uppercase tracking-wider mr-1.5">Revenue</span>
          <span className="font-mono font-medium text-harper-green-light">
            ${revenue.toLocaleString()}
          </span>
        </div>
        <div className="text-harper-beige/80">
          <span className="text-harper-beige/50 text-xs uppercase tracking-wider mr-1.5">NPS</span>
          <span className="font-mono font-medium">{nps}</span>
        </div>
      </div>

      {/* Mute toggle */}
      <button
        onClick={toggleSound}
        className="text-harper-beige/50 hover:text-harper-beige transition-colors text-lg cursor-pointer"
        title={soundEnabled ? 'Mute' : 'Unmute'}
      >
        {soundEnabled ? '🔊' : '🔇'}
      </button>
    </div>
  )
}
