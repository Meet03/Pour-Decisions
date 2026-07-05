import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import GameShell from '../components/GameShell'
import HoloCard from '../components/HoloCard'
import TierPicker from '../components/TierPicker'
import { dares, truths } from '../data/truthOrDare'
import type { Tier } from '../data/tiers'
import { rarityByTier } from '../data/rarity'
import { useGame } from '../context/GameContext'
import { useScore } from '../context/ScoreContext'
import { sfx } from '../lib/sound'

function pick(arr: string[], avoid?: string) {
  let item = arr[Math.floor(Math.random() * arr.length)]
  if (arr.length > 1) {
    while (item === avoid) item = arr[Math.floor(Math.random() * arr.length)]
  }
  return item
}

export default function TruthOrDare() {
  const [tier, setTier] = useState<Tier>('chill')
  const [turn, setTurn] = useState(0)
  const [card, setCard] = useState<{ kind: 'truth' | 'dare'; text: string } | null>(null)
  const { players } = useGame()
  const { award } = useScore()

  const currentPlayer = useMemo(
    () => (players.length > 0 ? players[turn % players.length] : null),
    [players, turn],
  )

  function draw(kind: 'truth' | 'dare') {
    sfx.flip()
    const pool = kind === 'truth' ? truths[tier] : dares[tier]
    setCard({ kind, text: pick(pool, card?.text) })
  }

  function nextPlayer() {
    if (currentPlayer && card) {
      award(currentPlayer, card.kind === 'dare' ? 3 : 2, card.kind === 'dare' ? 'dares' : 'truths')
    }
    setCard(null)
    setTurn((t) => t + 1)
  }

  function chickenOut() {
    if (currentPlayer) award(currentPlayer, 0, 'chickens')
    setCard(null)
    setTurn((t) => t + 1)
  }

  return (
    <GameShell title="Truth or Dare" emoji="🔥" slug="truth-or-dare">
      <TierPicker
        value={tier}
        onChange={(t) => {
          setTier(t)
          setCard(null)
        }}
      />

      <div className="mt-6 flex flex-1 flex-col">
        <p className="text-center text-lg">
          {currentPlayer ? (
            <>
              <span className="font-extrabold text-pink">{currentPlayer}</span>
              <span className="text-white/60">, it's your turn!</span>
            </>
          ) : (
            <span className="text-white/60">Add players on the home screen for turn order — or just pass the phone!</span>
          )}
        </p>

        <AnimatePresence mode="wait">
          {card ? (
            <motion.div
              key={card.text}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="mt-5 flex flex-1 flex-col"
            >
              <HoloCard rarity={rarityByTier[tier]} className="flex min-h-[260px] flex-1 flex-col items-center justify-center p-8 text-center">
                <div className="relative z-[2] flex flex-col items-center">
                  <span
                    className={`rounded-full px-4 py-1 text-xs font-extrabold uppercase tracking-widest ${
                      card.kind === 'truth' ? 'bg-cyan/15 text-cyan' : 'bg-flame/15 text-flame'
                    }`}
                  >
                    {card.kind}
                  </span>
                  <p className="mt-5 text-2xl font-bold leading-snug text-balance">{card.text}</p>
                </div>
              </HoloCard>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  onClick={() => draw(card.kind)}
                  className="rounded-full bg-white/10 py-3.5 font-bold text-white/70 transition-colors hover:bg-white/15"
                >
                  Re-roll 🎲
                </button>
                <button
                  onClick={nextPlayer}
                  className="rounded-full bg-pink py-3.5 font-bold text-white shadow-lg shadow-pink/30 transition-transform active:scale-95"
                >
                  Done → next {currentPlayer && `(+${card.kind === 'dare' ? 3 : 2})`}
                </button>
              </div>
              {currentPlayer && (
                <button
                  onClick={chickenOut}
                  className="mt-3 w-full text-center text-sm font-semibold text-white/30 hover:text-white/50"
                >
                  😬 Chickened out (skip, no points)
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="choose"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="mt-5 grid flex-1 grid-cols-2 gap-3"
            >
              <button
                onClick={() => draw('truth')}
                className="flex min-h-[260px] flex-col items-center justify-center rounded-3xl border border-cyan/30 bg-cyan/10 text-3xl font-extrabold text-cyan transition-all hover:bg-cyan/20 active:scale-[0.98]"
              >
                <span className="text-5xl">🫢</span>
                <span className="mt-3">Truth</span>
              </button>
              <button
                onClick={() => draw('dare')}
                className="flex min-h-[260px] flex-col items-center justify-center rounded-3xl border border-flame/30 bg-flame/10 text-3xl font-extrabold text-flame transition-all hover:bg-flame/20 active:scale-[0.98]"
              >
                <span className="text-5xl">😈</span>
                <span className="mt-3">Dare</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </GameShell>
  )
}
