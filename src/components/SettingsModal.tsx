import { AnimatePresence, motion } from 'framer-motion'
import { Beer, Dumbbell, RotateCcw, Settings2, Trash2, X } from 'lucide-react'
import { useGame } from '../context/GameContext'
import { useScore } from '../context/ScoreContext'

interface SettingsModalProps {
  open: boolean
  onClose: () => void
}

export default function SettingsModal({ open, onClose }: SettingsModalProps) {
  const { penaltyMode, togglePenaltyMode, players, removePlayer } = useGame()
  const { resetScores } = useScore()

  function clearAllPlayers() {
    ;[...players].forEach((p) => removePlayer(p))
  }

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
                <Settings2 className="h-6 w-6 text-cyan" /> Settings
              </h2>
              <button
                onClick={onClose}
                aria-label="Close settings"
                className="rounded-full bg-white/10 p-2 hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 flex items-center justify-between rounded-2xl bg-white/5 p-4">
              <div>
                <p className="font-bold">Penalty mode</p>
                <p className="text-xs text-white/40">Switch between sips and forfeits for every game</p>
              </div>
              <button
                onClick={togglePenaltyMode}
                aria-label={`Penalty mode: ${penaltyMode}. Tap to switch.`}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
              >
                {penaltyMode === 'sips' ? (
                  <Beer className="h-5 w-5 text-amber" />
                ) : (
                  <Dumbbell className="h-5 w-5 text-lime" />
                )}
              </button>
            </div>

            <button
              onClick={resetScores}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-white/5 p-4 font-bold text-white/70 hover:bg-white/10"
            >
              <RotateCcw className="h-4 w-4" /> Reset all scores
            </button>

            <button
              onClick={clearAllPlayers}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-flame/10 p-4 font-bold text-flame hover:bg-flame/20"
            >
              <Trash2 className="h-4 w-4" /> Clear all players
            </button>

            <p className="mt-6 text-center text-xs text-white/30">
              Pour Decisions · made for the party, not the hangover 🍹
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
