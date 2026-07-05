import { useState } from 'react'
import GameShell from '../components/GameShell'
import PromptCard from '../components/PromptCard'
import TierPicker from '../components/TierPicker'
import { mostLikelyTo } from '../data/mostLikelyTo'
import type { Tier } from '../data/tiers'
import { rarityByTier } from '../data/rarity'
import { penaltyText, useGame } from '../context/GameContext'
import { useDeck } from '../hooks/useDeck'

export default function MostLikelyTo() {
  const [tier, setTier] = useState<Tier>('chill')
  const { current, next, reset, count } = useDeck(mostLikelyTo[tier])
  const { penaltyMode } = useGame()

  function changeTier(t: Tier) {
    setTier(t)
    reset(mostLikelyTo[t])
  }

  return (
    <GameShell title="Most Likely To" emoji="👉" slug="most-likely-to">
      <TierPicker value={tier} onChange={changeTier} />
      <PromptCard cardKey={`${tier}-${count}`} onNext={next} rarity={rarityByTier[tier]}>
        <span className="text-2xl font-bold leading-snug text-balance">{current}</span>
        <span className="mt-6 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-amber">
          On 3, everyone points! Most fingers: {penaltyText(penaltyMode, tier)} 👉
        </span>
      </PromptCard>
    </GameShell>
  )
}
