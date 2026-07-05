import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import GameShell from '../components/GameShell'
import { thisOrThat } from '../data/thisOrThat'
import { useGame } from '../context/GameContext'
import { useScore } from '../context/ScoreContext'
import { useDeck } from '../hooks/useDeck'

export default function ThisOrThat() {
  const { current, next, count } = useDeck(thisOrThat)
  const { players } = useGame()
  const { award } = useScore()
  const [voted, setVoted] = useState<'a' | 'b' | null>(null)

  function vote(side: 'a' | 'b') {
    setVoted(side)
    if (players.length > 0) {
      // Whoever's turn it is banks the "majority" win when the room agrees with them
      const player = players[count % players.length]
      award(player, 1, 'thisOrThatWins')
    }
  }

  function advance() {
    setVoted(null)
    next()
  }

  return (
    <GameShell title="This or That" emoji="⚡" slug="this-or-that">
      <div className="mt-6 flex flex-1 flex-col">
        <p className="text-center text-sm font-bold uppercase tracking-widest text-white/40">
          Shout your pick, then tap the winner
        </p>
        <AnimatePresence mode="wait">
          <motion.div
            key={count}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25 }}
            className="mt-5 grid flex-1 grid-cols-2 gap-3"
          >
            <button
              onClick={() => vote('a')}
              className={`flex min-h-[220px] flex-col items-center justify-center gap-3 rounded-3xl border-2 p-5 transition-colors ${
                voted === 'a' ? 'border-cyan bg-cyan/15' : 'border-white/10 bg-night-card'
              }`}
            >
              <span className="text-5xl">{current.emojiA}</span>
              <span className="text-xl font-extrabold text-cyan">{current.a}</span>
            </button>
            <button
              onClick={() => vote('b')}
              className={`flex min-h-[220px] flex-col items-center justify-center gap-3 rounded-3xl border-2 p-5 transition-colors ${
                voted === 'b' ? 'border-pink bg-pink/15' : 'border-white/10 bg-night-card'
              }`}
            >
              <span className="text-5xl">{current.emojiB}</span>
              <span className="text-xl font-extrabold text-pink-soft">{current.b}</span>
            </button>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={advance}
          className="mt-5 rounded-full bg-pink py-4 text-lg font-extrabold text-white shadow-xl shadow-pink/30 active:scale-95"
        >
          Next round →
        </button>
      </div>
    </GameShell>
  )
}
