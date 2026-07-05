import { useState, type FormEvent } from 'react'
import { Plus, X } from 'lucide-react'
import { useGame } from '../context/GameContext'

export default function PlayerManager() {
  const { players, addPlayer, removePlayer } = useGame()
  const [name, setName] = useState('')

  function submit(e: FormEvent) {
    e.preventDefault()
    addPlayer(name)
    setName('')
  }

  return (
    <div>
      <form onSubmit={submit} className="flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Add a player…"
          aria-label="Player name"
          maxLength={20}
          className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-base outline-none transition-colors placeholder:text-white/30 focus:border-pink"
        />
        <button
          type="submit"
          aria-label="Add player"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink text-white shadow-lg shadow-pink/30 transition-transform active:scale-95"
        >
          <Plus className="h-6 w-6" />
        </button>
      </form>

      {players.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {players.map((p) => (
            <span
              key={p}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 py-1.5 pl-4 pr-2 text-sm font-semibold"
            >
              {p}
              <button
                onClick={() => removePlayer(p)}
                aria-label={`Remove ${p}`}
                className="rounded-full p-1 text-white/50 hover:bg-white/10 hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
