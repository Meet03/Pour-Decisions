import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import GameShell from '../components/GameShell'
import { emojiClues } from '../data/emojiPictionary'
import { useGame } from '../context/GameContext'
import { useScore } from '../context/ScoreContext'
import { sfx } from '../lib/sound'
import { useDeck } from '../hooks/useDeck'

export default function EmojiPictionary() {
  const { current, next, count } = useDeck(emojiClues)
  const { players } = useGame()
  const { award } = useScore()
  const [revealed, setRevealed] = useState(false)

  function reveal() {
    sfx.flip()
    setRevealed(true)
  }

  function advance() {
    setRevealed(false)
    next()
  }

  function giveWinTo(player: string) {
    award(player, 2, 'emojiWins')
    advance()
  }

  return (
    <GameShell title="Emoji Pictionary" emoji="🔤" slug="emoji-pictionary">
      <div className="mt-6 flex flex-1 flex-col items-center">
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber">
          {current.hint}
        </span>

        <AnimatePresence mode="wait">
          <motion.div
            key={count}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="sticker mt-4 flex min-h-[180px] w-full flex-col items-center justify-center rounded-3xl bg-night-card p-6 text-center"
          >
            <p className="text-6xl">{current.emojis}</p>
            {revealed && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 text-2xl font-extrabold text-lime"
              >
                {current.answer}
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>

        {!revealed ? (
          <button
            onClick={reveal}
            className="sticker mt-5 w-full rounded-full bg-amber py-4 text-lg font-extrabold text-night active:scale-95"
          >
            Reveal answer 👀
          </button>
        ) : (
          <>
            {players.length > 0 && (
              <div className="mt-4 w-full">
                <p className="text-center text-xs text-white/40">Who got it first?</p>
                <div className="mt-2 flex flex-wrap justify-center gap-2">
                  {players.map((p) => (
                    <button
                      key={p}
                      onClick={() => giveWinTo(p)}
                      className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold hover:bg-white/15"
                    >
                      {p} +2
                    </button>
                  ))}
                </div>
              </div>
            )}
            <button
              onClick={advance}
              className="sticker mt-4 w-full rounded-full bg-pink py-4 text-lg font-extrabold text-night active:scale-95"
            >
              Next clue →
            </button>
          </>
        )}
      </div>
    </GameShell>
  )
}
