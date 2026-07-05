import type { Tier } from './tiers'

export type RarityId = 'common' | 'uncommon' | 'rare' | 'legendary'

export interface RarityInfo {
  id: RarityId
  label: string
  icon: 'Circle' | 'Leaf' | 'Gem' | 'Crown'
  glow: string
}

export const rarities: Record<RarityId, RarityInfo> = {
  common: { id: 'common', label: 'Common', icon: 'Circle', glow: '#9ca3af' },
  uncommon: { id: 'uncommon', label: 'Uncommon', icon: 'Leaf', glow: '#b6ff3c' },
  rare: { id: 'rare', label: 'Rare', icon: 'Gem', glow: '#22e6ff' },
  legendary: { id: 'legendary', label: 'Legendary', icon: 'Crown', glow: '#ffb020' },
}

export const rarityByTier: Record<Tier, RarityId> = {
  chill: 'common',
  family: 'uncommon',
  party: 'rare',
  spicy: 'legendary',
}
