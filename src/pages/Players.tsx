import { motion } from 'framer-motion'
import { Users } from 'lucide-react'
import PlayerManager from '../components/PlayerManager'
import { useGame } from '../context/GameContext'

export default function Players() {
  const { players } = useGame()

  return (
    <div className="mx-auto min-h-dvh w-full max-w-lg px-4 pb-28 pt-10">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <Users className="mx-auto h-10 w-10 text-pink" />
        <h1 className="mt-3 text-3xl font-extrabold">Who's Playing?</h1>
        <p className="mt-2 text-white/50">
          Add everyone here once — every game and the leaderboard uses these names.
        </p>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-8"
      >
        <PlayerManager />
      </motion.div>

      {players.length > 0 && (
        <p className="mt-8 text-center text-sm text-white/30">
          {players.length} player{players.length === 1 ? '' : 's'} ready to play 🎉
        </p>
      )}
    </div>
  )
}
