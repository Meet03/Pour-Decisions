import { useEffect, useRef, useState } from 'react'
import { RotateCcw } from 'lucide-react'
import GameShell from '../components/GameShell'
import PopNumber from '../components/PopNumber'
import { blitzCategories, blitzLetters } from '../data/categoryBlitz'
import { useGame } from '../context/GameContext'
import { useScore } from '../context/ScoreContext'
import { sfx } from '../lib/sound'

const ROUND_SECONDS = 30

function randomRound() {
  return {
    category: blitzCategories[Math.floor(Math.random() * blitzCategories.length)],
    letter: blitzLetters[Math.floor(Math.random() * blitzLetters.length)],
  }
}

export default function CategoryBlitz() {
  const { players } = useGame()
  const { award } = useScore()
  const [round, setRound] = useState(randomRound)
  const [seconds, setSeconds] = useState(ROUND_SECONDS)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (!running) return
    intervalRef.current = window.setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          window.clearInterval(intervalRef.current)
          setRunning(false)
          sfx.buzzer()
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => window.clearInterval(intervalRef.current)
  }, [running])

  function start() {
    setSeconds(ROUND_SECONDS)
    setRunning(true)
  }

  function newRound() {
    setRound(randomRound())
    setSeconds(ROUND_SECONDS)
    setRunning(false)
  }

  const pct = (seconds / ROUND_SECONDS) * 100

  return (
    <GameShell title="Category Blitz" emoji="📝" slug="category-blitz">
      <div className="mt-6 flex flex-1 flex-col items-center">
        <div className="rounded-2xl border border-white/10 bg-night-card px-6 py-5 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-white/40">Category</p>
          <p className="mt-1 text-2xl font-extrabold text-cyan">{round.category}</p>
          <p className="mt-3 text-xs font-bold uppercase tracking-widest text-white/40">
            Starting with
          </p>
          <p className="mt-1 text-4xl font-extrabold text-flame">{round.letter}</p>
        </div>

        <div className="relative mt-8 h-40 w-40">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke={seconds <= 5 && running ? '#ff5d3c' : '#ff2e7e'}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 44}
              strokeDashoffset={2 * Math.PI * 44 * (1 - pct / 100)}
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-4xl font-extrabold">
            <PopNumber value={seconds} />
          </div>
        </div>

        {seconds === 0 ? (
          <p className="mt-6 text-xl font-extrabold text-flame">⏰ Time's up!</p>
        ) : (
          <p className="mt-6 text-sm text-white/40">
            {running ? 'Shout your answers before the buzzer!' : 'Ready when you are'}
          </p>
        )}

        {seconds === 0 && players.length > 0 && (
          <div className="mt-4 w-full">
            <p className="text-center text-xs text-white/40">Who won this round?</p>
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              {players.map((p) => (
                <button
                  key={p}
                  onClick={() => award(p, 2, 'blitzWins')}
                  className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold hover:bg-white/15"
                >
                  {p} +2
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 flex w-full gap-3">
          {!running && seconds === ROUND_SECONDS && (
            <button
              onClick={start}
              className="flex-1 rounded-full bg-flame py-4 text-lg font-extrabold text-night shadow-xl shadow-flame/30 active:scale-95"
            >
              Start! ⏱️
            </button>
          )}
          {(seconds < ROUND_SECONDS || running) && (
            <button
              onClick={newRound}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-white/10 py-4 font-bold text-white/70 hover:bg-white/15"
            >
              <RotateCcw className="h-4 w-4" /> New round
            </button>
          )}
        </div>
      </div>
    </GameShell>
  )
}
