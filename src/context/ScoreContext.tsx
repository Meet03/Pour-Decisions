import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { badgesFor, emptyStats, type PlayerStats } from '../data/achievements'
import { levelFor } from '../data/xp'
import { sfx } from '../lib/sound'

export type Team = 'A' | 'B'

export interface GameEvent {
  id: string
  type: 'level' | 'badge'
  player: string
  label: string
  emoji: string
}

interface ScoreState {
  points: Record<string, number>
  stats: Record<string, PlayerStats>
  teams: Record<string, Team>
  teamMode: boolean
  toggleTeamMode: () => void
  setTeam: (player: string, team: Team) => void
  addPoints: (player: string, amount: number) => void
  bump: (player: string, statKey: keyof PlayerStats, amount?: number) => void
  award: (player: string, amount: number, statKey?: keyof PlayerStats) => void
  resetScores: () => void
  getPoints: (player: string) => number
  getStats: (player: string) => PlayerStats
  teamTotals: () => Record<Team, number>
  lastEvent: GameEvent | null
}

const ScoreContext = createContext<ScoreState | null>(null)

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function ScoreProvider({ children }: { children: ReactNode }) {
  const [points, setPoints] = useState<Record<string, number>>(() => load('pd-points', {}))
  const [stats, setStats] = useState<Record<string, PlayerStats>>(() => load('pd-stats', {}))
  const [teams, setTeams] = useState<Record<string, Team>>(() => load('pd-teams', {}))
  const [teamMode, setTeamMode] = useState(() => load('pd-team-mode', false))
  const [lastEvent, setLastEvent] = useState<GameEvent | null>(null)

  useEffect(() => localStorage.setItem('pd-points', JSON.stringify(points)), [points])
  useEffect(() => localStorage.setItem('pd-stats', JSON.stringify(stats)), [stats])
  useEffect(() => localStorage.setItem('pd-teams', JSON.stringify(teams)), [teams])
  useEffect(() => localStorage.setItem('pd-team-mode', JSON.stringify(teamMode)), [teamMode])

  const addPoints = (player: string, amount: number) =>
    setPoints((p) => {
      const before = p[player] ?? 0
      const after = before + amount
      const beforeLevel = levelFor(before)
      const afterLevel = levelFor(after)
      if (afterLevel > beforeLevel) {
        setLastEvent({
          id: `${Date.now()}-${Math.random()}`,
          type: 'level',
          player,
          label: `Level ${afterLevel}`,
          emoji: '⭐',
        })
      }
      return { ...p, [player]: after }
    })

  const bump = (player: string, statKey: keyof PlayerStats, amount = 1) =>
    setStats((s) => {
      const before = s[player] ?? emptyStats()
      const after = { ...before, [statKey]: before[statKey] + amount }
      const beforeBadgeIds = new Set(badgesFor(before).map((b) => b.id))
      const newBadge = badgesFor(after).find((b) => !beforeBadgeIds.has(b.id))
      if (newBadge) {
        setLastEvent({
          id: `${Date.now()}-${Math.random()}`,
          type: 'badge',
          player,
          label: newBadge.label,
          emoji: newBadge.emoji,
        })
      }
      return { ...s, [player]: after }
    })

  const award = (player: string, amount: number, statKey?: keyof PlayerStats) => {
    if (amount > 0) sfx.points()
    addPoints(player, amount)
    if (statKey) bump(player, statKey)
  }

  const setTeam = (player: string, team: Team) => setTeams((t) => ({ ...t, [player]: team }))
  const toggleTeamMode = () => setTeamMode((m: boolean) => !m)

  const resetScores = () => {
    setPoints({})
    setStats({})
  }

  const getPoints = (player: string) => points[player] ?? 0
  const getStats = (player: string) => stats[player] ?? emptyStats()

  const teamTotals = () => {
    const totals: Record<Team, number> = { A: 0, B: 0 }
    for (const [player, team] of Object.entries(teams)) {
      totals[team] += points[player] ?? 0
    }
    return totals
  }

  return (
    <ScoreContext.Provider
      value={{
        points,
        stats,
        teams,
        teamMode,
        toggleTeamMode,
        setTeam,
        addPoints,
        bump,
        award,
        resetScores,
        getPoints,
        getStats,
        teamTotals,
        lastEvent,
      }}
    >
      {children}
    </ScoreContext.Provider>
  )
}

export function useScore() {
  const ctx = useContext(ScoreContext)
  if (!ctx) throw new Error('useScore must be used inside ScoreProvider')
  return ctx
}
