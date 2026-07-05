import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useScore, type GameEvent } from '../context/ScoreContext'
import ConfettiBurst from './ConfettiBurst'

export default function GameEventToast() {
  const { lastEvent } = useScore()
  const [visible, setVisible] = useState<GameEvent | null>(null)

  useEffect(() => {
    if (!lastEvent) return
    setVisible(lastEvent)
    const t = window.setTimeout(() => setVisible(null), 3000)
    return () => window.clearTimeout(t)
  }, [lastEvent])

  return (
    <div className="pointer-events-none fixed inset-x-0 top-6 z-[70] flex justify-center px-4">
      <AnimatePresence>
        {visible && (
          <motion.div
            key={visible.id}
            initial={{ opacity: 0, y: -30, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="relative overflow-visible rounded-2xl border border-white/15 bg-night-card px-6 py-4 text-center shadow-2xl shadow-black/50"
          >
            <ConfettiBurst burstKey={visible.id} />
            <p className="text-xs font-bold uppercase tracking-widest text-white/50">
              {visible.type === 'level' ? '⭐ Level Up' : '🏆 Achievement Unlocked'}
            </p>
            <p className="mt-1 text-lg font-extrabold">
              <span className="text-pink">{visible.player}</span>{' '}
              <span className="text-white">
                {visible.emoji} {visible.label}
              </span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
