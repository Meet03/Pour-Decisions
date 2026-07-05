import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Home from './pages/Home'
import Players from './pages/Players'
import NeverHaveIEver from './pages/NeverHaveIEver'
import TruthOrDare from './pages/TruthOrDare'
import MostLikelyTo from './pages/MostLikelyTo'
import WouldYouRather from './pages/WouldYouRather'
import Kings from './pages/Kings'
import Wheel from './pages/Wheel'
import TwoTruths from './pages/TwoTruths'
import GuessWho from './pages/GuessWho'
import ThisOrThat from './pages/ThisOrThat'
import CategoryBlitz from './pages/CategoryBlitz'
import HotSeat from './pages/HotSeat'
import Charades from './pages/Charades'
import GameEventToast from './components/GameEventToast'
import BottomDock from './components/BottomDock'
import Leaderboard from './components/Leaderboard'
import PartyBackground from './components/PartyBackground'
import SettingsModal from './components/SettingsModal'
import { sfx } from './lib/sound'

const HUB_ROUTES = ['/', '/players']

export default function App() {
  const location = useLocation()
  const [boardOpen, setBoardOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const showDock = HUB_ROUTES.includes(location.pathname)

  // One global listener gives every button and link a tap sound
  useEffect(() => {
    const onTap = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('button, a')) sfx.tap()
    }
    document.addEventListener('click', onTap, { capture: true })
    return () => document.removeEventListener('click', onTap, { capture: true })
  }, [])

  return (
    <>
      <PartyBackground />
      <GameEventToast />
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, scale: 0.97, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -10 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/players" element={<Players />} />
              <Route path="/never-have-i-ever" element={<NeverHaveIEver />} />
              <Route path="/truth-or-dare" element={<TruthOrDare />} />
              <Route path="/most-likely-to" element={<MostLikelyTo />} />
              <Route path="/would-you-rather" element={<WouldYouRather />} />
              <Route path="/kings" element={<Kings />} />
              <Route path="/wheel" element={<Wheel />} />
              <Route path="/two-truths" element={<TwoTruths />} />
              <Route path="/guess-who" element={<GuessWho />} />
              <Route path="/this-or-that" element={<ThisOrThat />} />
              <Route path="/category-blitz" element={<CategoryBlitz />} />
              <Route path="/hot-seat" element={<HotSeat />} />
              <Route path="/charades" element={<Charades />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>
      {showDock && (
        <BottomDock onLeaderboard={() => setBoardOpen(true)} onSettings={() => setSettingsOpen(true)} />
      )}
      <Leaderboard open={boardOpen} onClose={() => setBoardOpen(false)} />
      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  )
}
