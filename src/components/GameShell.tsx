import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Beer, Dumbbell, HelpCircle, Trophy } from 'lucide-react'
import { useGame } from '../context/GameContext'
import Leaderboard from './Leaderboard'
import HowToPlay from './HowToPlay'

interface GameShellProps {
  title: string
  emoji: string
  slug: string
  children: ReactNode
}

export default function GameShell({ title, emoji, slug, children }: GameShellProps) {
  const { penaltyMode, togglePenaltyMode } = useGame()
  const [showBoard, setShowBoard] = useState(false)
  const [showHelp, setShowHelp] = useState(false)

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-4 pb-8 pt-4">
      <header className="flex items-center justify-between gap-1.5">
        <Link
          to="/"
          aria-label="Back to games"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="truncate px-1 text-base font-bold sm:text-lg">
          <span className="mr-1">{emoji}</span>
          {title}
        </h1>
        <div className="flex shrink-0 gap-1.5">
          <button
            onClick={() => setShowHelp(true)}
            aria-label="How to play"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
          >
            <HelpCircle className="h-5 w-5 text-cyan" />
          </button>
          <button
            onClick={() => setShowBoard(true)}
            aria-label="Show leaderboard"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
          >
            <Trophy className="h-5 w-5 text-amber" />
          </button>
          <button
            onClick={togglePenaltyMode}
            aria-label={`Penalty mode: ${penaltyMode}. Tap to switch.`}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
          >
            {penaltyMode === 'sips' ? (
              <Beer className="h-5 w-5 text-amber" />
            ) : (
              <Dumbbell className="h-5 w-5 text-lime" />
            )}
          </button>
        </div>
      </header>

      <main className="flex flex-1 flex-col">{children}</main>

      <p className="mt-6 text-center text-xs text-white/30">
        {penaltyMode === 'sips'
          ? 'Drink responsibly. Never drink and drive. 🚕'
          : 'Forfeit mode — no drinks required. 💪'}
      </p>

      <Leaderboard open={showBoard} onClose={() => setShowBoard(false)} />
      <HowToPlay slug={slug} open={showHelp} onClose={() => setShowHelp(false)} />
    </div>
  )
}
