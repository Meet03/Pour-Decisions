import { useEffect, useRef, useState } from 'react'
import GameShell from '../components/GameShell'
import { hotSeatQuestions } from '../data/hotSeatQuestions'
import { useGame } from '../context/GameContext'
import { useScore } from '../context/ScoreContext'

const ROUND_SECONDS = 60

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function HotSeat() {
  const { players } = useGame()
  const { award } = useScore()
  const [turn, setTurn] = useState(0)
  const [deck, setDeck] = useState(() => shuffle(hotSeatQuestions))
  const [qIndex, setQIndex] = useState(0)
  const [answered, setAnswered] = useState(0)
  const [seconds, setSeconds] = useState(ROUND_SECONDS)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<number | undefined>(undefined)

  const player = players.length > 0 ? players[turn % players.length] : null

  useEffect(() => {
    if (!running) return
    intervalRef.current = window.setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          window.clearInterval(intervalRef.current)
          setRunning(false)
          if (player) award(player, answered, undefined)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => window.clearInterval(intervalRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running])

  function start() {
    setSeconds(ROUND_SECONDS)
    setAnswered(0)
    setDeck(shuffle(hotSeatQuestions))
    setQIndex(0)
    setRunning(true)
  }

  function nextQuestion() {
    setAnswered((a) => a + 1)
    setQIndex((i) => (i + 1) % deck.length)
  }

  function nextPlayer() {
    setTurn((t) => t + 1)
    setSeconds(ROUND_SECONDS)
    setRunning(false)
    setAnswered(0)
  }

  if (players.length === 0) {
    return (
      <GameShell title="Hot Seat" emoji="💺" slug="hot-seat">
        <p className="mt-10 text-center text-white/50">
          Add players on the home screen so everyone gets a turn in the hot seat.
        </p>
      </GameShell>
    )
  }

  return (
    <GameShell title="Hot Seat" emoji="💺" slug="hot-seat">
      <div className="mt-6 flex flex-1 flex-col items-center text-center">
        <p className="text-lg">
          <span className="font-extrabold text-pink">{player}</span> is in the hot seat
        </p>

        <p className="mt-4 text-5xl font-extrabold">{seconds}s</p>

        {running ? (
          <>
            <div className="mt-6 flex min-h-[140px] w-full items-center justify-center rounded-3xl border border-white/10 bg-night-card p-6">
              <p className="text-xl font-bold leading-snug">{deck[qIndex]}</p>
            </div>
            <p className="mt-2 text-xs text-white/40">Answered: {answered}</p>
            <button
              onClick={nextQuestion}
              disabled={seconds === 0}
              className="mt-5 w-full rounded-full bg-pink py-4 text-lg font-extrabold text-white shadow-xl shadow-pink/30 active:scale-95 disabled:opacity-40"
            >
              Next question →
            </button>
          </>
        ) : seconds === 0 ? (
          <>
            <p className="mt-4 text-xl font-extrabold text-flame">⏰ Time's up!</p>
            <p className="mt-1 text-white/50">
              {player} answered {answered} question{answered === 1 ? '' : 's'} (+{answered} pts)
            </p>
            <button
              onClick={nextPlayer}
              className="mt-6 w-full rounded-full bg-pink py-4 text-lg font-extrabold text-white shadow-xl shadow-pink/30 active:scale-95"
            >
              Next player →
            </button>
          </>
        ) : (
          <button
            onClick={start}
            className="mt-8 w-full rounded-full bg-pink py-4 text-lg font-extrabold text-white shadow-xl shadow-pink/30 active:scale-95"
          >
            Start the clock ⏱️
          </button>
        )}
      </div>
    </GameShell>
  )
}
