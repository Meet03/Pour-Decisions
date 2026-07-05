// Tiny Web Audio synth — no audio files, all sounds generated live.
// AudioContext is created lazily on first user gesture (browser requirement).

let ctx: AudioContext | null = null
let muted = false
try {
  muted = localStorage.getItem('pd-muted') === 'true'
} catch {
  /* private mode */
}

export function isMuted() {
  return muted
}

export function setMuted(m: boolean) {
  muted = m
  try {
    localStorage.setItem('pd-muted', String(m))
  } catch {
    /* private mode */
  }
}

function ac(): AudioContext | null {
  if (muted) return null
  try {
    if (!ctx) ctx = new AudioContext()
    if (ctx.state === 'suspended') void ctx.resume()
    return ctx
  } catch {
    return null
  }
}

function tone(
  freq: number,
  start: number,
  dur: number,
  type: OscillatorType = 'sine',
  gain = 0.12,
) {
  const c = ac()
  if (!c) return
  const o = c.createOscillator()
  const g = c.createGain()
  o.type = type
  o.frequency.value = freq
  g.gain.setValueAtTime(gain, c.currentTime + start)
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + start + dur)
  o.connect(g)
  g.connect(c.destination)
  o.start(c.currentTime + start)
  o.stop(c.currentTime + start + dur + 0.05)
}

export const sfx = {
  /** Soft blip for any button/link tap */
  tap: () => tone(620, 0, 0.06, 'sine', 0.05),
  /** Card flip / draw swoosh */
  flip: () => {
    tone(320, 0, 0.09, 'triangle', 0.09)
    tone(540, 0.05, 0.11, 'triangle', 0.09)
  },
  /** Points earned — little coin chirp */
  points: () => {
    tone(660, 0, 0.08, 'square', 0.05)
    tone(990, 0.08, 0.14, 'square', 0.05)
  },
  /** Level up / badge unlocked — rising fanfare */
  levelup: () => {
    ;[523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.09, 0.18, 'triangle', 0.09))
  },
  /** Timer ran out — descending buzzer */
  buzzer: () => {
    tone(170, 0, 0.35, 'sawtooth', 0.09)
    tone(120, 0.08, 0.4, 'sawtooth', 0.08)
  },
}
