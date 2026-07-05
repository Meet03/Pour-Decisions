import { motion } from 'framer-motion'

const colors = ['#ff2e7e', '#22e6ff', '#b6ff3c', '#ffb020', '#ff5d3c']

interface ConfettiBurstProps {
  /** Change this to trigger a fresh burst */
  burstKey: string | number
}

export default function ConfettiBurst({ burstKey }: ConfettiBurstProps) {
  const particles = Array.from({ length: 20 }, (_, i) => {
    const angle = (i / 20) * Math.PI * 2 + Math.random() * 0.5
    const distance = 60 + Math.random() * 60
    return {
      id: i,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      color: colors[i % colors.length],
      size: 5 + Math.random() * 5,
      rotate: Math.random() * 360,
    }
  })

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
      {particles.map((p) => (
        <motion.span
          key={`${burstKey}-${p.id}`}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{ x: p.x, y: p.y, opacity: 0, rotate: p.rotate }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="absolute rounded-sm"
          style={{ width: p.size, height: p.size, background: p.color }}
        />
      ))}
    </div>
  )
}
