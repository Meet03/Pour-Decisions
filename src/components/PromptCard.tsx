import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface PromptCardProps {
  /** Change this to animate in a new card */
  cardKey: string | number
  onNext: () => void
  children: ReactNode
  footer?: ReactNode
}

export default function PromptCard({ cardKey, onNext, children, footer }: PromptCardProps) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="relative mt-6 flex flex-1 items-stretch">
        <AnimatePresence mode="popLayout">
          <motion.button
            key={cardKey}
            onClick={onNext}
            initial={{ opacity: 0, x: 80, rotate: 4 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: -80, rotate: -4 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="flex min-h-[320px] w-full cursor-pointer flex-col items-center justify-center rounded-3xl border border-white/10 bg-night-card p-8 text-center shadow-2xl shadow-black/40 active:scale-[0.99]"
          >
            {children}
          </motion.button>
        </AnimatePresence>
      </div>
      {footer}
      <p className="mt-4 text-center text-sm text-white/40">Tap the card for the next one</p>
    </div>
  )
}
