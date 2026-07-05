import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import HoloCard from './HoloCard'
import type { RarityId } from '../data/rarity'

interface PromptCardProps {
  /** Change this to animate in a new card */
  cardKey: string | number
  onNext: () => void
  children: ReactNode
  footer?: ReactNode
  rarity?: RarityId
}

export default function PromptCard({ cardKey, onNext, children, footer, rarity }: PromptCardProps) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="relative mt-6 flex flex-1 items-stretch">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={cardKey}
            initial={{ opacity: 0, x: 80, rotate: 4 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: -80, rotate: -4 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="w-full"
          >
            <HoloCard rarity={rarity} className="min-h-[320px] w-full">
              <button
                onClick={onNext}
                className="relative z-[2] flex h-full min-h-[320px] w-full cursor-pointer flex-col items-center justify-center p-8 text-center active:scale-[0.99]"
              >
                {children}
              </button>
            </HoloCard>
          </motion.div>
        </AnimatePresence>
      </div>
      {footer}
      <p className="mt-4 text-center text-sm text-white/40">Tap the card for the next one</p>
    </div>
  )
}
