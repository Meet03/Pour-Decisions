import { useMemo, useRef, useState } from 'react'
import GameShell from '../components/GameShell'
import { wheelPresets } from '../data/wheels'
import { useGame } from '../context/GameContext'

const segColors = ['#ff2e7e', '#22e6ff', '#b6ff3c', '#ffb020', '#ff5d3c', '#a06bff']

export default function Wheel() {
  const { players } = useGame()
  const [presetId, setPresetId] = useState(players.length >= 2 ? 'who' : 'fate')
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const entriesRef = useRef<string[]>([])

  const entries = useMemo(() => {
    const preset = wheelPresets.find((p) => p.id === presetId) ?? wheelPresets[1]
    const list = preset.id === 'who' ? players : preset.entries
    return list.length >= 2 ? list : wheelPresets[1].entries
  }, [presetId, players])
  entriesRef.current = entries

  const seg = 360 / entries.length

  function spin() {
    if (spinning) return
    setResult(null)
    setSpinning(true)
    const winner = Math.floor(Math.random() * entries.length)
    // Land the winner's segment center under the top pointer
    const target =
      rotation +
      1800 +
      (360 - ((winner * seg + seg / 2 + rotation) % 360))
    setRotation(target)
    window.setTimeout(() => {
      setSpinning(false)
      setResult(entriesRef.current[winner])
    }, 4200)
  }

  const gradient = entries
    .map((_, i) => {
      const c = segColors[i % segColors.length]
      return `${c} ${i * seg}deg ${(i + 1) * seg}deg`
    })
    .join(', ')

  return (
    <GameShell title="Spin the Wheel" emoji="🎡" slug="wheel">
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {wheelPresets.map((p) => (
          <button
            key={p.id}
            onClick={() => {
              setPresetId(p.id)
              setResult(null)
            }}
            disabled={p.id === 'who' && players.length < 2}
            className={`rounded-full px-4 py-2 text-sm font-bold transition-colors disabled:opacity-30 ${
              presetId === p.id ? 'bg-pink text-white shadow-lg shadow-pink/30' : 'bg-white/10 text-white/70 hover:bg-white/15'
            }`}
          >
            {p.emoji} {p.label}
          </button>
        ))}
      </div>
      {players.length < 2 && (
        <p className="mt-2 text-center text-xs text-white/40">
          Add 2+ players on the home screen to unlock the "Who drinks?" wheel
        </p>
      )}

      <div className="mt-6 flex flex-1 flex-col items-center justify-center">
        <div className="relative">
          {/* Pointer */}
          <div className="absolute -top-1 left-1/2 z-10 h-0 w-0 -translate-x-1/2 border-x-[14px] border-t-[22px] border-x-transparent border-t-white drop-shadow-lg" />
          {/* Wheel */}
          <div
            className="relative h-72 w-72 rounded-full border-8 border-white/90 shadow-2xl shadow-black/50"
            style={{
              background: `conic-gradient(${gradient})`,
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? 'transform 4.2s cubic-bezier(0.12, 0.6, 0.08, 1)' : 'none',
            }}
          >
            {entries.map((e, i) => (
              <div
                key={`${e}-${i}`}
                className="absolute left-1/2 top-1/2 origin-left"
                style={{ transform: `rotate(${i * seg + seg / 2 - 90}deg)` }}
              >
                <span
                  className="block w-[120px] truncate pl-8 text-left text-xs font-extrabold text-night"
                  style={{ transform: 'rotate(90deg)', transformOrigin: 'left center' }}
                >
                  {e}
                </span>
              </div>
            ))}
            <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white/90 bg-night" />
          </div>
        </div>

        <div className="mt-6 min-h-[40px] text-center" aria-live="polite">
          {result && !spinning && (
            <p className="text-2xl font-extrabold text-pink">🎉 {result}</p>
          )}
        </div>

        <button
          onClick={spin}
          disabled={spinning}
          className="w-full max-w-xs rounded-full bg-pink py-4 text-lg font-extrabold text-white shadow-xl shadow-pink/30 transition-transform active:scale-95 disabled:opacity-50"
        >
          {spinning ? 'Spinning…' : 'SPIN! 🎡'}
        </button>
      </div>
    </GameShell>
  )
}
