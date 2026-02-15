// Game clock: 600 real seconds = 540 game minutes (8AM → 5PM)
// That's 0.9 game minutes per real second

export const TOTAL_REAL_SECONDS = 600 // 10 minutes
export const TOTAL_GAME_MINUTES = 540 // 8AM to 5PM = 9 hours = 540 min
export const GAME_MINUTES_PER_REAL_SECOND = TOTAL_GAME_MINUTES / TOTAL_REAL_SECONDS // 0.9

export function gameMinutesToTimeString(gameMinutes: number): string {
  const totalMinutes = Math.floor(gameMinutes)
  const hours = Math.floor(totalMinutes / 60) + 8
  const minutes = totalMinutes % 60
  const displayHour = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours
  const ampm = hours >= 12 ? 'PM' : 'AM'
  return `${displayHour}:${minutes.toString().padStart(2, '0')} ${ampm}`
}

export function realSecondsToGameMinutes(realSeconds: number): number {
  return realSeconds * GAME_MINUTES_PER_REAL_SECOND
}
