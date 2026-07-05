import { useState } from 'react'
import GameShell from '../components/GameShell'
import PromptCard from '../components/PromptCard'
import TierPicker from '../components/TierPicker'
import { wouldYouRather } from '../data/wouldYouRather'
import type { Tier } from '../data/tiers'
import { rarityByTier } from '../data/rarity'
import { penaltyText, useGame } from '../context/GameContext'
import { useDeck } from '../hooks/useDeck'

export default function WouldYouRather() {
  const [tier, setTier] = useState<Tier>('chill')
  const { current, next, reset, count } = useDeck(wouldYouRather[tier])
  const { penaltyMode } = useGame()

  function changeTier(t: Tier) {
    setTier(t)
    reset(wouldYouRather[t])
  }

  return (
    <GameShell title="Would You Rather" emoji="🤔" slug="would-you-rather">
      <TierPicker value={tier} onChange={changeTier} />
      <PromptCard cardKey={`${tier}-${count}`} onNext={next} rarity={rarityByTier[tier]}>
        <span className="text-sm font-bold uppercase tracking-widest text-white/40">
          Would you rather…
        </span>
        <span className="mt-4 text-xl font-bold leading-snug text-cyan text-balance">{current.a}</span>
        <span className="my-3 text-sm font-extrabold text-white/40">— OR —</span>
        <span className="text-xl font-bold leading-snug text-pink-soft text-balance">{current.b}</span>
        <span className="mt-6 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-amber">
          Vote! Minority side: {penaltyText(penaltyMode, tier)} 🗳️
        </span>
      </PromptCard>
    </GameShell>
  )
}
