import { Link, useLocation } from 'react-router-dom'
import { Home as HomeIcon, Settings2, Trophy, Users } from 'lucide-react'

interface BottomDockProps {
  onLeaderboard: () => void
  onSettings: () => void
}

export default function BottomDock({ onLeaderboard, onSettings }: BottomDockProps) {
  const { pathname } = useLocation()

  const itemCls = (active: boolean) =>
    `relative flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-bold transition-colors ${
      active ? 'text-night' : 'text-white/50 hover:text-white/80'
    }`

  const activePill = (
    <span className="sticker absolute inset-x-3 inset-y-1 -z-10 -rotate-1 rounded-2xl bg-cyan" aria-hidden="true" />
  )

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-night-card/95 backdrop-blur-md"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="mx-auto flex max-w-lg">
        <Link to="/" className={itemCls(pathname === '/')}>
          {pathname === '/' && activePill}
          <HomeIcon className="h-5 w-5" />
          Home
        </Link>
        <Link to="/players" className={itemCls(pathname === '/players')}>
          {pathname === '/players' && activePill}
          <Users className="h-5 w-5" />
          Players
        </Link>
        <button onClick={onLeaderboard} className={itemCls(false)}>
          <Trophy className="h-5 w-5" />
          Board
        </button>
        <button onClick={onSettings} className={itemCls(false)}>
          <Settings2 className="h-5 w-5" />
          Settings
        </button>
      </div>
    </nav>
  )
}
