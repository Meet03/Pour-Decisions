export type Tier = 'chill' | 'family' | 'party' | 'spicy'

export interface TierInfo {
  id: Tier
  label: string
  emoji: string
  description: string
  color: string
  adult?: boolean
}

export const tiers: TierInfo[] = [
  {
    id: 'chill',
    label: 'Chill',
    emoji: '🧊',
    description: 'Easy-going, safe for any crowd',
    color: 'cyan',
  },
  {
    id: 'family',
    label: 'Family',
    emoji: '🏠',
    description: 'Sibling & cousin chaos — all ages, zero drinks',
    color: 'lime',
  },
  {
    id: 'party',
    label: 'Party',
    emoji: '🎉',
    description: 'Louder, bolder, more embarrassing',
    color: 'pink',
  },
  {
    id: 'spicy',
    label: 'Spicy',
    emoji: '🌶️',
    description: 'Flirty & daring — grown-ups only',
    color: 'flame',
    adult: true,
  },
]
