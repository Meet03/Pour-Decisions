import { tiers, type Tier } from '../data/tiers'

const tierStyles: Record<string, { active: string; idle: string }> = {
  cyan: {
    active: 'bg-cyan text-night shadow-lg shadow-cyan/40',
    idle: 'bg-white/10 text-cyan hover:bg-white/15',
  },
  lime: {
    active: 'bg-lime text-night shadow-lg shadow-lime/40',
    idle: 'bg-white/10 text-lime hover:bg-white/15',
  },
  pink: {
    active: 'bg-pink text-white shadow-lg shadow-pink/40',
    idle: 'bg-white/10 text-pink-soft hover:bg-white/15',
  },
  flame: {
    active: 'bg-flame text-white shadow-lg shadow-flame/40',
    idle: 'bg-white/10 text-flame hover:bg-white/15',
  },
}

interface TierPickerProps {
  value: Tier
  onChange: (tier: Tier) => void
}

export default function TierPicker({ value, onChange }: TierPickerProps) {
  return (
    <div className="mt-4">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" role="radiogroup" aria-label="Intensity level">
        {tiers.map((t) => {
          const s = tierStyles[t.color]
          const active = value === t.id
          return (
            <button
              key={t.id}
              role="radio"
              aria-checked={active}
              onClick={() => onChange(t.id)}
              className={`rounded-2xl px-3 py-2.5 text-sm font-bold transition-all ${active ? s.active : s.idle}`}
            >
              {t.emoji} {t.label}
              {t.adult && <span className="ml-1 align-super text-[9px] font-extrabold opacity-70">18+</span>}
            </button>
          )
        })}
      </div>
      <p className="mt-2 text-center text-xs text-white/40">
        {tiers.find((t) => t.id === value)?.description}
      </p>
    </div>
  )
}
