import GameTile from './GameTile'
import type { GameMeta } from '../data/games'

interface GameRowProps {
  title: string
  emoji: string
  games: GameMeta[]
}

export default function GameRow({ title, emoji, games }: GameRowProps) {
  if (games.length === 0) return null
  return (
    <section className="mb-7">
      <h2 className="mb-2.5 px-4 text-xs font-bold uppercase tracking-widest text-white/40">
        {emoji} {title}
      </h2>
      <div className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 pt-1.5">
        {games.map((g, i) => (
          <GameTile key={g.slug} game={g} index={i} />
        ))}
      </div>
    </section>
  )
}
