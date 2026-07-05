import { AnimatePresence, motion } from 'framer-motion'
import { HelpCircle, Sparkles, X } from 'lucide-react'
import { howToPlay } from '../data/howToPlay'

interface HowToPlayProps {
  slug: string
  open: boolean
  onClose: () => void
}

export default function HowToPlay({ slug, open, onClose }: HowToPlayProps) {
  const info = howToPlay[slug]
  if (!info) return null

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
                <HelpCircle className="h-6 w-6 text-cyan" /> How to play
              </h2>
              <button
                onClick={onClose}
                aria-label="Close how to play"
                className="rounded-full bg-white/10 p-2 hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <ol className="mt-5 space-y-3">
              {info.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-extrabold text-white/70">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 text-sm leading-relaxed text-white/85">{step}</span>
                </li>
              ))}
            </ol>

            <div className="mt-5 flex items-start gap-3 rounded-2xl bg-amber/10 p-4">
              <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-amber" />
              <p className="text-sm leading-relaxed text-amber">{info.scoring}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
