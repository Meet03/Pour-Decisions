import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Trophy } from 'lucide-react'
import Leaderboard from '../components/Leaderboard'
import PlayerManager from '../components/PlayerManager'
import { games } from '../data/games'
import { useGame } from '../context/GameContext'

const colorGlow: Record<string, string> = {
  cyan: 'hover:shadow-cyan/25 hover:border-cyan/50',
  pink: 'hover:shadow-pink/25 hover:border-pink/50',
  amber: 'hover:shadow-amber/25 hover:border-amber/50',
  lime: 'hover:shadow-lime/25 hover:border-lime/50',
  flame: 'hover:shadow-flame/25 hover:border-flame/50',
}

export default function Home() {
  const { players } = useGame()
  const [showBoard, setShowBoard] = useState(false)

  return (
    <div className="mx-auto min-h-dvh w-full max-w-lg px-4 pb-10 pt-10">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative text-center"
      >
        <button
          onClick={() => setShowBoard(true)}
          aria-label="Show leaderboard"
          className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
        >
          <Trophy className="h-5 w-5 text-amber" />
        </button>
        <div className="animate-float text-6xl">🍹</div>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight">
          Pour <span className="text-pink">Decisions</span>
        </h1>
        <p className="mt-2 text-white/50">
          Party games, zero downloads. Add your crew, pick a game, pass the phone.
        </p>
      </motion.header>

      <Leaderboard open={showBoard} onClose={() => setShowBoard(false)} />

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-8"
        aria-label="Players"
      >
        <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-white/40">
          Who's playing?{' '}
          {players.length > 0 && <span className="text-pink">({players.length})</span>}
        </h2>
        <PlayerManager />
      </motion.section>

      <section className="mt-8" aria-label="Games">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-white/40">
          Pick a game
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {games.map((g, i) => (
            <motion.div
              key={g.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.06 }}
            >
              <Link
                to={`/${g.slug}`}
                className={`flex h-full flex-col rounded-3xl border border-white/10 bg-night-card p-5 shadow-xl shadow-black/30 transition-all hover:-translate-y-1 hover:shadow-2xl ${colorGlow[g.color]}`}
              >
                <span className="text-4xl">{g.emoji}</span>
                <span className="mt-3 text-lg font-bold leading-tight">{g.title}</span>
                <span className="mt-1 text-sm text-white/45">{g.tagline}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="mt-10 text-center text-xs leading-relaxed text-white/30">
        <p>Drink responsibly. Never drink and drive. 🚕</p>
        <p className="mt-1">
          No account. No downloads. Free forever — share the link, spread the chaos.
        </p>
      </footer>
    </div>
  )
}
