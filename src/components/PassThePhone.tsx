import { motion } from 'framer-motion'

interface PassThePhoneProps {
  /** e.g. "Pass the phone to" or "Pass the phone back to the group" */
  title: string
  /** Player name, highlighted in the accent color. Omit for group hand-offs. */
  name?: string | null
  subtitle?: string
  cta: string
  onReady: () => void
  /** Tailwind color token already defined in the theme: pink | cyan | lime | amber | flame */
  accent?: string
}

const accentBtn: Record<string, string> = {
  pink: 'bg-pink text-night shadow-pink/30',
  cyan: 'bg-cyan text-night shadow-cyan/30',
  lime: 'bg-lime text-night shadow-lime/30',
  amber: 'bg-amber text-night shadow-amber/30',
  flame: 'bg-flame text-night shadow-flame/30',
}

const accentText: Record<string, string> = {
  pink: 'text-pink',
  cyan: 'text-cyan',
  lime: 'text-lime',
  amber: 'text-amber',
  flame: 'text-flame',
}

export default function PassThePhone({
  title,
  name,
  subtitle,
  cta,
  onReady,
  accent = 'pink',
}: PassThePhoneProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="mt-10 flex flex-1 flex-col items-center justify-center text-center"
    >
      <motion.span
        animate={{ rotate: [0, -12, 12, -8, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.2 }}
        className="text-5xl"
        aria-hidden="true"
      >
        🤳
      </motion.span>
      <p className="mt-4 text-lg text-white/60">{title}</p>
      {name && <p className={`text-3xl font-extrabold ${accentText[accent] ?? 'text-pink'}`}>{name}</p>}
      {subtitle && <p className="mt-2 max-w-xs text-sm text-white/40">{subtitle}</p>}
      <button
        onClick={onReady}
        className={`sticker mt-8 rounded-full px-8 py-4 text-lg font-extrabold active:scale-95 ${
          accentBtn[accent] ?? accentBtn.pink
        }`}
      >
        {cta}
      </button>
    </motion.div>
  )
}
