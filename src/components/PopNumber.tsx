import { motion } from 'framer-motion'

interface PopNumberProps {
  value: number | string
  className?: string
}

/** Number that does a springy pop every time its value changes. */
export default function PopNumber({ value, className }: PopNumberProps) {
  return (
    <motion.span
      key={String(value)}
      initial={{ scale: 1.35 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 500, damping: 17 }}
      className={`inline-block ${className ?? ''}`}
    >
      {value}
    </motion.span>
  )
}
