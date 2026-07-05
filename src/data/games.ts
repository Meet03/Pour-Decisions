export interface GameMeta {
  slug: string
  title: string
  emoji: string
  tagline: string
  color: string
  needsPlayers?: boolean
}

export const games: GameMeta[] = [
  {
    slug: 'never-have-i-ever',
    title: 'Never Have I Ever',
    emoji: '🙊',
    tagline: 'Done it? Drink up.',
    color: 'cyan',
  },
  {
    slug: 'truth-or-dare',
    title: 'Truth or Dare',
    emoji: '🔥',
    tagline: 'Pick your poison.',
    color: 'pink',
    needsPlayers: true,
  },
  {
    slug: 'most-likely-to',
    title: 'Most Likely To',
    emoji: '👉',
    tagline: 'Point on three… 1, 2, 3!',
    color: 'amber',
  },
  {
    slug: 'would-you-rather',
    title: 'Would You Rather',
    emoji: '🤔',
    tagline: 'Minority drinks.',
    color: 'lime',
  },
  {
    slug: 'kings',
    title: 'Kings Cup',
    emoji: '👑',
    tagline: 'No deck? No problem.',
    color: 'flame',
  },
  {
    slug: 'wheel',
    title: 'Spin the Wheel',
    emoji: '🎡',
    tagline: 'Let fate decide.',
    color: 'pink',
    needsPlayers: true,
  },
  {
    slug: 'two-truths',
    title: 'Two Truths & a Lie',
    emoji: '🎭',
    tagline: 'Spot the fib.',
    color: 'lime',
    needsPlayers: true,
  },
  {
    slug: 'guess-who',
    title: 'Guess Who Said It',
    emoji: '🕵️',
    tagline: 'Anonymous answers, public guessing.',
    color: 'cyan',
    needsPlayers: true,
  },
  {
    slug: 'this-or-that',
    title: 'This or That',
    emoji: '⚡',
    tagline: 'Rapid-fire votes.',
    color: 'amber',
  },
  {
    slug: 'category-blitz',
    title: 'Category Blitz',
    emoji: '📝',
    tagline: 'Beat the buzzer.',
    color: 'flame',
  },
  {
    slug: 'hot-seat',
    title: 'Hot Seat',
    emoji: '💺',
    tagline: 'One player, rapid questions.',
    color: 'pink',
    needsPlayers: true,
  },
]
