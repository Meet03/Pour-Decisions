import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type PenaltyMode = 'sips' | 'forfeits'

interface GameState {
  players: string[]
  addPlayer: (name: string) => void
  removePlayer: (name: string) => void
  penaltyMode: PenaltyMode
  togglePenaltyMode: () => void
  /** Random player name, or a fallback word when no players are set */
  randomPlayer: () => string
}

const GameContext = createContext<GameState | null>(null)

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [players, setPlayers] = useState<string[]>(() => load('pd-players', []))
  const [penaltyMode, setPenaltyMode] = useState<PenaltyMode>(() => load('pd-penalty', 'sips'))

  useEffect(() => {
    localStorage.setItem('pd-players', JSON.stringify(players))
  }, [players])

  useEffect(() => {
    localStorage.setItem('pd-penalty', JSON.stringify(penaltyMode))
  }, [penaltyMode])

  const addPlayer = (name: string) => {
    const clean = name.trim().slice(0, 20)
    if (!clean) return
    setPlayers((p) => (p.some((x) => x.toLowerCase() === clean.toLowerCase()) ? p : [...p, clean]))
  }

  const removePlayer = (name: string) => setPlayers((p) => p.filter((x) => x !== name))

  const togglePenaltyMode = () => setPenaltyMode((m) => (m === 'sips' ? 'forfeits' : 'sips'))

  const randomPlayer = () =>
    players.length > 0 ? players[Math.floor(Math.random() * players.length)] : 'Someone'

  return (
    <GameContext.Provider
      value={{ players, addPlayer, removePlayer, penaltyMode, togglePenaltyMode, randomPlayer }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used inside GameProvider')
  return ctx
}

export function penaltyText(mode: PenaltyMode, tier?: string): string {
  // Family tier never uses drinking language, regardless of the global toggle
  if (tier === 'family') return 'do a forfeit'
  return mode === 'sips' ? 'take a sip' : 'do the forfeit'
}
