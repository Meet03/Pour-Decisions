import { Link } from 'react-router-dom'
import { Users } from 'lucide-react'
import type { GameMeta } from '../data/games'

const fillMap: Record<string, string> = {
  cyan: 'bg-cyan',
  pink: 'bg-pink',
  amber: 'bg-amber',
  lime: 'bg-lime',
  flame: 'bg-flame',
}

const tilts = ['-rotate-2', 'rotate-2', '-rotate-1', 'rotate-3', 'rotate-1', '-rotate-3']

interface GameTileProps {
  game: GameMeta
  index?: number
}

export default function GameTile({ game, index = 0 }: GameTileProps) {
  return (
    <Link
      to={`/${game.slug}`}
      className={`sticker sticker-lift relative flex h-40 w-32 shrink-0 snap-start flex-col justify-between rounded-2xl p-3 text-night ${
        fillMap[game.color] ?? 'bg-pink'
      } ${tilts[index % tilts.length]}`}
    >
      <span
        className="pointer-events-none absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-night/70 px-1.5 py-0.5 text-[8px] font-bold text-white"
        title={game.players}
      >
        <Users className="h-2.5 w-2.5" /> {game.players}
      </span>
      <span className="wobble text-4xl" style={{ animationDelay: `${(index % 5) * -0.6}s` }}>
        {game.emoji}
      </span>
      <div>
        <p className="text-sm font-extrabold leading-tight">{game.title}</p>
        <p className="mt-0.5 text-[10px] font-bold leading-tight text-night/60">{game.tagline}</p>
      </div>
    </Link>
  )
}
