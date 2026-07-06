import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Crown, Dice5, UserPlus } from 'lucide-react'
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
  const navigate = useNavigate()

  const leader = players.length > 0 ? [...players].sort((a, b) => getPoints(b) - getPoints(a))[0] : null
  const leaderPts = leader ? getPoints(leader) : 0

  function surpriseMe() {
    const pick = games[Math.floor(Math.random() * games.length)]
    navigate(`/${pick.slug}`)
  }

  return (
    <div className="mx-auto min-h-dvh w-full max-w-lg pb-28 pt-8">
      {/* Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20, rotate: -1 }}
        animate={{ opacity: 1, y: 0, rotate: -0.5 }}
        transition={{ duration: 0.5 }}
        className="sticker relative mx-4 overflow-hidden rounded-3xl bg-night-card p-6 text-center"
        style={{
          backgroundImage:
            'radial-gradient(circle at 25% 15%, rgba(230,74,128,0.22), transparent 55%), radial-gradient(circle at 80% 85%, rgba(61,214,224,0.16), transparent 55%)',
        }}
      >
        <span className="doodle" style={{ top: '-14px', left: '6%', color: '#a3e635', fontSize: '26px' }} aria-hidden="true">
          ✦
        </span>
        <span className="doodle" style={{ top: '10px', right: '5%', color: '#3dd6e0', fontSize: '18px', animationDelay: '-3s' }} aria-hidden="true">
          ✳
        </span>
        <div className="animate-float text-6xl drop-shadow-[3px_3px_0_rgba(5,0,13,0.85)]">🍹</div>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight">
          Pour <span className="text-pink">Decisions</span>
        </h1>

        {players.length === 0 ? (
          <Link
            to="/players"
            className="sticker mt-5 inline-flex rotate-1 items-center gap-2 rounded-full bg-lime px-6 py-3 font-extrabold text-night"
          >
            <UserPlus className="h-4 w-4" /> Add your crew <ArrowRight className="h-4 w-4" />
          </Link>
        ) : leaderPts > 0 ? (
          <button
            onClick={() => setShowBoard(true)}
            className="sticker mt-5 inline-flex rotate-1 items-center gap-2 rounded-full bg-amber px-5 py-2.5 text-sm font-extrabold text-night"
          >
            <Crown className="h-4 w-4" /> {leader} leads with {leaderPts} pts
          </button>
        ) : (
          <p className="mt-3 text-sm text-white/50">
            {players.length} player{players.length === 1 ? '' : 's'} ready — pick a game below 👇
          </p>
        )}
      </motion.div>

      {/* Surprise Me */}
      <motion.button
        onClick={surpriseMe}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="mx-4 mt-4 flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-white/25 bg-white/5 py-3.5 font-extrabold text-white/70 transition-colors hover:border-flame/60 hover:text-white"
      >
        <Dice5 className="h-5 w-5 text-flame" /> Surprise me! 🎲
      </motion.button>

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
