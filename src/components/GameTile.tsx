import { Link } from 'react-router-dom'
import type { GameMeta } from '../data/games'

const bgMap: Record<string, string> = {
  cyan: 'bg-cyan/10 border-cyan/25 hover:border-cyan/60 hover:bg-cyan/15',
  pink: 'bg-pink/10 border-pink/25 hover:border-pink/60 hover:bg-pink/15',
  amber: 'bg-amber/10 border-amber/25 hover:border-amber/60 hover:bg-amber/15',
  lime: 'bg-lime/10 border-lime/25 hover:border-lime/60 hover:bg-lime/15',
  flame: 'bg-flame/10 border-flame/25 hover:border-flame/60 hover:bg-flame/15',
}

export default function GameTile({ game }: { game: GameMeta }) {
  return (
    <Link
      to={`/${game.slug}`}
      className={`flex h-36 w-28 shrink-0 snap-start flex-col justify-between rounded-2xl border p-3 transition-all active:scale-95 ${
        bgMap[game.color] ?? 'bg-white/5 border-white/15'
      }`}
    >
      <span className="text-3xl">{game.emoji}</span>
      <div>
        <p className="text-sm font-extrabold leading-tight">{game.title}</p>
        <p className="mt-0.5 text-[10px] leading-tight text-white/40">{game.tagline}</p>
      </div>
    </Link>
  )
}
