import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import GameShell from '../components/GameShell'
import { useGame } from '../context/GameContext'
import { useScore } from '../context/ScoreContext'

type Stage = 'turn-start' | 'writing' | 'reveal-ready' | 'guessing' | 'revealed'

export default function TwoTruths() {
  const { players } = useGame()
  const { award } = useScore()
  const [turn, setTurn] = useState(0)
  const [stage, setStage] = useState<Stage>('turn-start')
  const [statements, setStatements] = useState(['', '', ''])
  const [lieIndex, setLieIndex] = useState<number | null>(null)

  const writer = players.length > 0 ? players[turn % players.length] : null

  function reset() {
    setStatements(['', '', ''])
    setLieIndex(null)
    setStage('turn-start')
  }

  function lockIn() {
    if (statements.every((s) => s.trim()) && lieIndex !== null) setStage('reveal-ready')
  }

  function groupGuessed(correct: boolean) {
    if (!writer) return
    if (correct) {
      for (const p of players) if (p !== writer) award(p, 1, 'correctGuesses')
    } else {
      award(writer, 3, 'timesFooledOthers')
    }
    setStage('revealed')
  }

  function nextPlayer() {
    setTurn((t) => t + 1)
    reset()
  }

  if (players.length < 2) {
    return (
      <GameShell title="Two Truths & a Lie" emoji="🎭" slug="two-truths">
        <p className="mt-10 text-center text-white/50">
          Add at least 2 players on the home screen to play this one.
        </p>
      </GameShell>
    )
  }

  return (
    <GameShell title="Two Truths & a Lie" emoji="🎭" slug="two-truths">
      <AnimatePresence mode="wait">
        {stage === 'turn-start' && (
          <motion.div
            key="start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-10 flex flex-1 flex-col items-center justify-center text-center"
          >
            <p className="text-2xl font-bold">
              <span className="text-pink">{writer}</span>, it's your turn to fool everyone!
            </p>
            <p className="mt-2 text-white/50">Think of 2 true statements and 1 lie about yourself.</p>
            <button
              onClick={() => setStage('writing')}
              className="mt-8 rounded-full bg-pink px-8 py-4 text-lg font-extrabold text-white shadow-xl shadow-pink/30 active:scale-95"
            >
              I'm ready 🤫
            </button>
          </motion.div>
        )}

        {stage === 'writing' && (
          <motion.div
            key="writing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 flex flex-1 flex-col"
          >
            <p className="text-center text-sm text-white/50">
              Type 3 statements, then tap the one that's the lie
            </p>
            <div className="mt-4 space-y-3">
              {statements.map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <button
                    onClick={() => setLieIndex(i)}
                    aria-label={`Mark statement ${i + 1} as the lie`}
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg font-extrabold transition-colors ${
                      lieIndex === i ? 'bg-flame text-white' : 'bg-white/10 text-white/40'
                    }`}
                  >
                    {i + 1}
                  </button>
                  <input
                    value={s}
                    onChange={(e) => {
                      const next = [...statements]
                      next[i] = e.target.value
                      setStatements(next)
                    }}
                    placeholder={`Statement ${i + 1}`}
                    maxLength={90}
                    className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm outline-none focus:border-pink"
                  />
                </div>
              ))}
            </div>
            <p className="mt-2 text-center text-xs text-white/30">
              Tap the number next to your lie
            </p>
            <button
              onClick={lockIn}
              disabled={!statements.every((s) => s.trim()) || lieIndex === null}
              className="mt-6 rounded-full bg-pink py-4 text-lg font-extrabold text-white shadow-xl shadow-pink/30 active:scale-95 disabled:opacity-30"
            >
              Lock it in 🔒
            </button>
          </motion.div>
        )}

        {stage === 'reveal-ready' && (
          <motion.div
            key="reveal-ready"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-10 flex flex-1 flex-col items-center justify-center text-center"
          >
            <p className="text-3xl">🤐</p>
            <p className="mt-3 text-xl font-bold">Pass the phone back to the group!</p>
            <button
              onClick={() => setStage('guessing')}
              className="mt-8 rounded-full bg-pink px-8 py-4 text-lg font-extrabold text-white shadow-xl shadow-pink/30 active:scale-95"
            >
              We're ready 👀
            </button>
          </motion.div>
        )}

        {(stage === 'guessing' || stage === 'revealed') && (
          <motion.div
            key="guessing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 flex flex-1 flex-col"
          >
            <p className="text-center text-sm text-white/50">Which one is the lie?</p>
            <div className="mt-4 space-y-3">
              {statements.map((s, i) => {
                const isLie = i === lieIndex
                const show = stage === 'revealed'
                return (
                  <div
                    key={i}
                    className={`rounded-2xl border p-4 text-sm font-semibold transition-colors ${
                      show
                        ? isLie
                          ? 'border-flame bg-flame/15 text-flame'
                          : 'border-lime/30 bg-lime/10 text-lime'
                        : 'border-white/10 bg-white/5'
                    }`}
                  >
                    {s} {show && isLie && '❌ the lie!'}
                  </div>
                )
              })}
            </div>

            {stage === 'guessing' ? (
              <>
                <p className="mt-4 text-center text-xs text-white/40">
                  Discuss, then reveal — did the group guess right?
                </p>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => groupGuessed(true)}
                    className="rounded-full bg-lime py-3.5 font-extrabold text-night active:scale-95"
                  >
                    Group guessed right ✅
                  </button>
                  <button
                    onClick={() => groupGuessed(false)}
                    className="rounded-full bg-flame py-3.5 font-extrabold text-white active:scale-95"
                  >
                    Group got fooled 🎭
                  </button>
                </div>
              </>
            ) : (
              <button
                onClick={nextPlayer}
                className="mt-6 rounded-full bg-pink py-4 text-lg font-extrabold text-white shadow-xl shadow-pink/30 active:scale-95"
              >
                Next player →
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </GameShell>
  )
}
