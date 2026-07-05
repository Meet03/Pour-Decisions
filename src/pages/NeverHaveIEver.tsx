import { useState } from 'react'
import GameShell from '../components/GameShell'
import PromptCard from '../components/PromptCard'
import TierPicker from '../components/TierPicker'
import { neverHaveIEver } from '../data/neverHaveIEver'
import type { Tier } from '../data/tiers'
import { penaltyText, useGame } from '../context/GameContext'
import { useDeck } from '../hooks/useDeck'

export default function NeverHaveIEver() {
  const [tier, setTier] = useState<Tier>('chill')
  const { current, next, reset, count } = useDeck(neverHaveIEver[tier])
  const { penaltyMode } = useGame()

  function changeTier(t: Tier) {
    setTier(t)
    reset(neverHaveIEver[t])
  }

  return (
    <GameShell title="Never Have I Ever" emoji="🙊" slug="never-have-i-ever">
      <TierPicker value={tier} onChange={changeTier} />
      <PromptCard cardKey={`${tier}-${count}`} onNext={next}>
        <span className="text-2xl font-bold leading-snug text-balance">{current}</span>
        <span className="mt-6 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-amber">
          Done it? {penaltyText(penaltyMode, tier)}! {tier === 'family' ? '🙈' : '🍻'}
        </span>
      </PromptCard>
    </GameShell>
  )
}
