import { AnimatePresence, motion } from 'framer-motion'
import { RotateCcw, Trophy, Users, X } from 'lucide-react'
import { useGame } from '../context/GameContext'
import { useScore } from '../context/ScoreContext'
import { badgesFor } from '../data/achievements'

interface LeaderboardProps {
  open: boolean
  onClose: () => void
}

export default function Leaderboard({ open, onClose }: LeaderboardProps) {
  const { players } = useGame()
  const { getPoints, getStats, teamMode, toggleTeamMode, teams, setTeam, teamTotals, resetScores } =
    useScore()

  const ranked = [...players].sort((a, b) => getPoints(b) - getPoints(a))
  const totals = teamMode ? teamTotals() : null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-night-card p-6 shadow-2xl sm:rounded-3xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-xl font-extrabold">
                <Trophy className="h-6 w-6 text-amber" /> Leaderboard
              </h2>
              <button
                onClick={onClose}
                aria-label="Close leaderboard"
                className="rounded-full bg-white/10 p-2 hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 flex items-center justify-between gap-2">
              <button
                onClick={toggleTeamMode}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                  teamMode ? 'bg-pink text-white' : 'bg-white/10 text-white/70 hover:bg-white/15'
                }`}
              >
                <Users className="h-4 w-4" /> Team mode {teamMode ? 'on' : 'off'}
              </button>
              <button
                onClick={resetScores}
                className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white/70 hover:bg-white/15"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset
              </button>
            </div>

            {teamMode && totals && (
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-cyan/10 p-4 text-center">
                  <p className="text-xs font-bold uppercase tracking-widest text-cyan">Team A</p>
                  <p className="mt-1 text-3xl font-extrabold">{totals.A}</p>
                </div>
                <div className="rounded-2xl bg-pink/10 p-4 text-center">
                  <p className="text-xs font-bold uppercase tracking-widest text-pink">Team B</p>
                  <p className="mt-1 text-3xl font-extrabold">{totals.B}</p>
                </div>
              </div>
            )}

            {players.length === 0 ? (
              <p className="mt-8 text-center text-white/40">
                Add players on the home screen to start tracking scores.
              </p>
            ) : (
              <ul className="mt-5 space-y-2.5">
                {ranked.map((p, i) => {
                  const badges = badgesFor(getStats(p))
                  return (
                    <li
                      key={p}
                      className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3"
                    >
                      <span className="w-6 text-center text-lg font-extrabold text-white/30">
                        {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-bold">{p}</p>
                        {badges.length > 0 && (
                          <p className="mt-0.5 text-xs text-white/40">
                            {badges.map((b) => `${b.emoji} ${b.label}`).join('  ·  ')}
                          </p>
                        )}
                      </div>
                      {teamMode && (
                        <div className="flex shrink-0 gap-1">
                          {(['A', 'B'] as const).map((t) => (
                            <button
                              key={t}
                              onClick={() => setTeam(p, t)}
                              className={`h-7 w-7 rounded-full text-xs font-extrabold transition-colors ${
                                teams[p] === t
                                  ? t === 'A'
                                    ? 'bg-cyan text-night'
                                    : 'bg-pink text-white'
                                  : 'bg-white/10 text-white/40'
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      )}
                      <span className="shrink-0 text-lg font-extrabold text-amber">{getPoints(p)}</span>
                    </li>
                  )
                })}
              </ul>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
