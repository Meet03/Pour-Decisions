import { useRef, type ReactNode, type MouseEvent } from 'react'
import { Circle, Crown, Gem, Leaf } from 'lucide-react'
import { rarities, type RarityId } from '../data/rarity'

const rarityIcons = { Circle, Leaf, Gem, Crown }

interface HoloCardProps {
  children: ReactNode
  rarity?: RarityId
  className?: string
}

export default function HoloCard({ children, rarity, className }: HoloCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const info = rarity ? rarities[rarity] : null
  const RarityIcon = info ? rarityIcons[info.icon] : null

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el || matchMedia('(hover: none), (prefers-reduced-motion: reduce)').matches) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.setProperty('--rx', `${(0.5 - py) * 14}deg`)
    el.style.setProperty('--ry', `${(px - 0.5) * 14}deg`)
    el.style.setProperty('--mx', `${px * 100}%`)
    el.style.setProperty('--my', `${py * 100}%`)
  }

  function onLeave() {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`holo-card relative overflow-hidden rounded-3xl bg-night-card ${
        rarity === 'legendary' ? 'holo-pulse' : ''
      } ${className ?? ''}`}
      style={
        info
          ? {
              border: `2.5px solid ${info.glow}`,
              boxShadow: `6px 6px 0 ${info.glow}66`,
              background:
                rarity === 'legendary'
                  ? 'linear-gradient(135deg, rgba(255,176,32,0.16), rgba(196,0,255,0.12), rgba(34,230,255,0.14))'
                  : undefined,
            }
          : undefined
      }
    >
      {info && RarityIcon && (
        <span
          className="pointer-events-none absolute right-3 top-3 z-10 inline-flex rotate-3 items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-night"
          style={{ background: info.glow, boxShadow: '2px 2px 0 rgba(5,0,13,0.9)' }}
        >
          <RarityIcon className="h-3 w-3" /> {info.label}
        </span>
      )}
      <div className="holo-shine" aria-hidden="true" />
      {children}
    </div>
  )
}
