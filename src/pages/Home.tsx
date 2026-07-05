import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Crown, UserPlus } from 'lucide-react'
import GameRow from '../components/GameRow'
import Leaderboard from '../components/Leaderboard'
import { games } from '../data/games'
import { gameCategories } from '../data/categories'
import { useGame } from '../context/GameContext'
import { useScore } from '../context/ScoreContext'

export default function Home() {
  const { players } = useGame()
  const { getPoints } = useScore()
  const [showBoard, setShowBoard] = useState(false)

  const leader = players.length > 0 ? [...players].sort((a, b) => getPoints(b) - getPoints(a))[0] : null
  const leaderPts = leader ? getPoints(leader) : 0

  return (
    <div className="mx-auto min-h-dvh w-full max-w-lg pb-28 pt-8">
      {/* Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-4 rounded-3xl border border-white/10 bg-gradient-to-br from-night-card to-night-soft p-6 text-center shadow-xl shadow-black/30"
      >
        <div className="animate-float text-5xl">🍹</div>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight">
          Pour <span className="text-pink">Decisions</span>
        </h1>

        {players.length === 0 ? (
          <Link
            to="/players"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-pink px-6 py-3 font-extrabold text-white shadow-lg shadow-pink/30 active:scale-95"
          >
            <UserPlus className="h-4 w-4" /> Add your crew <ArrowRight className="h-4 w-4" />
          </Link>
        ) : leaderPts > 0 ? (
          <button
            onClick={() => setShowBoard(true)}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-bold hover:bg-white/15"
          >
            <Crown className="h-4 w-4 text-amber" /> {leader} leads with {leaderPts} pts
          </button>
        ) : (
          <p className="mt-3 text-sm text-white/50">
            {players.length} player{players.length === 1 ? '' : 's'} ready — pick a game below 👇
          </p>
        )}
      </motion.div>

      {/* Game rows */}
      <div className="mt-8">
        {gameCategories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
          >
            <GameRow
              title={cat.title}
              emoji={cat.emoji}
              games={cat.slugs.map((slug) => games.find((g) => g.slug === slug)).filter((g) => g !== undefined)}
            />
          </motion.div>
        ))}
      </div>

      <p className="mt-2 px-4 text-center text-xs text-white/25">
        Drink responsibly. Never drink and drive. 🚕
      </p>

      <Leaderboard open={showBoard} onClose={() => setShowBoard(false)} />
    </div>
  )
}
