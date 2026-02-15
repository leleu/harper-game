// Web Audio API sound engine — all sounds synthesized, no audio files needed

let audioCtx: AudioContext | null = null

function getCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext()
  }
  return audioCtx
}

function playTone(frequency: number, duration: number, type: OscillatorType = 'sine', volume = 0.15) {
  try {
    const ctx = getCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = type
    osc.frequency.value = frequency
    gain.gain.value = volume
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + duration)
  } catch {
    // Audio context may not be available
  }
}

function playChord(frequencies: number[], duration: number, type: OscillatorType = 'sine', volume = 0.08) {
  frequencies.forEach(f => playTone(f, duration, type, volume))
}

// ═══════════════════════════════════════════
// Game sounds
// ═══════════════════════════════════════════

export function playTaskComplete() {
  // Crisp click + rising tone
  playTone(800, 0.08, 'square', 0.06)
  setTimeout(() => playTone(1200, 0.1, 'sine', 0.1), 50)
  setTimeout(() => playTone(1600, 0.15, 'sine', 0.08), 100)
}

export function playNewTask() {
  // Soft ding
  playTone(880, 0.15, 'sine', 0.08)
}

export function playNewTaskBurst() {
  // Anxiety-inducing: multiple dings in quick succession
  playTone(880, 0.12, 'sine', 0.06)
  setTimeout(() => playTone(932, 0.12, 'sine', 0.06), 80)
  setTimeout(() => playTone(988, 0.12, 'sine', 0.06), 160)
}

export function playTimerWarning() {
  // Subtle urgency tone — low rumble
  playTone(220, 0.3, 'triangle', 0.05)
  setTimeout(() => playTone(196, 0.3, 'triangle', 0.05), 150)
}

export function playClientLost() {
  // Deflating whomp — descending
  playTone(400, 0.15, 'sine', 0.1)
  setTimeout(() => playTone(300, 0.2, 'sine', 0.08), 100)
  setTimeout(() => playTone(200, 0.3, 'sine', 0.06), 200)
  setTimeout(() => playTone(120, 0.4, 'triangle', 0.04), 300)
}

export function playHarperUnlock() {
  // Clean, bright, distinctive — major chord arpeggio
  playChord([523, 659, 784], 0.3, 'sine', 0.06)
  setTimeout(() => playChord([659, 784, 1047], 0.4, 'sine', 0.08), 200)
  setTimeout(() => playChord([784, 1047, 1319], 0.5, 'sine', 0.06), 400)
}

export function playToolUnlock() {
  // Quick bright ping
  playTone(1047, 0.1, 'sine', 0.08)
  setTimeout(() => playTone(1319, 0.15, 'sine', 0.06), 60)
}

export function playAutoFill() {
  // Rapid soft clicks — typing at 10x speed
  const baseFreq = 600
  for (let i = 0; i < 6; i++) {
    setTimeout(() => {
      playTone(baseFreq + Math.random() * 200, 0.03, 'square', 0.03)
    }, i * 40)
  }
}

export function playFieldClick() {
  // Single soft click
  playTone(700, 0.04, 'square', 0.04)
}

export function playButtonClick() {
  // Satisfying press
  playTone(500, 0.05, 'sine', 0.06)
  setTimeout(() => playTone(800, 0.06, 'sine', 0.04), 30)
}
