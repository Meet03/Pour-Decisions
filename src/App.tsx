import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
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
      <Route path="*" element={<Home />} />
    </Routes>
  )
}
