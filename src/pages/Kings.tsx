import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { RotateCcw } from 'lucide-react'
import GameShell from '../components/GameShell'
import { kingsRules, suits } from '../data/kings'

interface Card {
  rank: string
  suit: string
}

function buildDeck(): Card[] {
  const deck: Card[] = []
  for (const rule of kingsRules) {
    for (const suit of suits) deck.push({ rank: rule.rank, suit })
  }
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[deck[i], deck[j]] = [deck[j], deck[i]]
  }
  return deck
}

export default function Kings() {
  const [deck, setDeck] = useState<Card[]>(buildDeck)
  const [drawn, setDrawn] = useState<Card | null>(null)

  // Kings drawn so far = 4 minus the kings still waiting in the deck
  const kingsCount = useMemo(() => 4 - deck.filter((c) => c.rank === 'K').length, [deck])

  const rule = drawn ? kingsRules.find((r) => r.rank === drawn.rank) : null
  const isRed = drawn ? drawn.suit === '♥️' || drawn.suit === '♦️' : false

  function draw() {
    if (deck.length === 0) return
    const [top, ...rest] = deck
    setDrawn(top)
    setDeck(rest)
  }

  function restart() {
    setDeck(buildDeck())
    setDrawn(null)
  }

  return (
    <GameShell title="Kings Cup" emoji="👑" slug="kings">
      <div className="mt-4 flex items-center justify-between text-sm text-white/50">
        <span>
          Cards left: <span className="font-bold text-white">{deck.length}</span>
        </span>
        <span>
          Kings drawn: <span className={`font-bold ${kingsCount >= 3 ? 'text-flame' : 'text-white'}`}>{kingsCount}</span>/4
        </span>
        <button
          onClick={restart}
          className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 font-semibold text-white/70 hover:bg-white/15"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Restart
        </button>
      </div>

      <div className="mt-5 flex flex-1 flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {drawn && rule ? (
            <motion.div
              key={`${drawn.rank}${drawn.suit}${deck.length}`}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-xs rounded-3xl border border-white/10 bg-white p-8 text-center text-night shadow-2xl"
            >
              <div className={`text-6xl font-extrabold ${isRed ? 'text-flame' : 'text-night'}`}>
                {drawn.rank}
                <span className="ml-2 text-5xl">{drawn.suit}</span>
              </div>
              <h2 className="mt-4 text-2xl font-extrabold text-pink">{rule.name}</h2>
              <p className="mt-2 leading-relaxed text-night/70">{rule.rule}</p>
              {drawn.rank === 'K' && kingsCount === 4 && (
                <p className="mt-3 rounded-2xl bg-flame/10 px-3 py-2 text-sm font-bold text-flame">
                  4th King! Down the King's Cup! 🍺👑
                </p>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="back"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex h-64 w-full max-w-xs items-center justify-center rounded-3xl border-2 border-dashed border-white/15 text-white/40"
            >
              {deck.length === 0 ? 'Deck finished! Restart to go again.' : 'Tap draw to flip the first card'}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={draw}
          disabled={deck.length === 0}
          className="mt-6 w-full max-w-xs rounded-full bg-pink py-4 text-lg font-extrabold text-white shadow-xl shadow-pink/30 transition-transform active:scale-95 disabled:opacity-40"
        >
          Draw a card 🃏
        </button>
      </div>
    </GameShell>
  )
}
