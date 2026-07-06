export interface GameMeta {
  slug: string
  title: string
  emoji: string
  tagline: string
  color: string
  needsPlayers?: boolean
  /** Short player-count hint shown on the tile, e.g. "2+ players" or "Any group" */
  players: string
}

export const games: GameMeta[] = [
  {
    slug: 'never-have-i-ever',
    title: 'Never Have I Ever',
    emoji: '🙊',
    tagline: 'Done it? Drink up.',
    color: 'cyan',
    players: 'Any group',
  },
  {
    slug: 'truth-or-dare',
    title: 'Truth or Dare',
    emoji: '🔥',
    tagline: 'Pick your poison.',
    color: 'pink',
    needsPlayers: true,
    players: '2+ players',
  },
  {
    slug: 'most-likely-to',
    title: 'Most Likely To',
    emoji: '👉',
    tagline: 'Point on three… 1, 2, 3!',
    color: 'amber',
    players: '3+ players',
  },
  {
    slug: 'would-you-rather',
    title: 'Would You Rather',
    emoji: '🤔',
    tagline: 'Minority drinks.',
    color: 'lime',
    players: 'Any group',
  },
  {
    slug: 'kings',
    title: 'Kings Cup',
    emoji: '👑',
    tagline: 'No deck? No problem.',
    color: 'flame',
    players: 'Any group',
  },
  {
    slug: 'wheel',
    title: 'Spin the Wheel',
    emoji: '🎡',
    tagline: 'Let fate decide.',
    color: 'pink',
    needsPlayers: true,
    players: 'Any group',
  },
  {
    slug: 'two-truths',
    title: 'Two Truths & a Lie',
    emoji: '🎭',
    tagline: 'Spot the fib.',
    color: 'lime',
    needsPlayers: true,
    players: '2+ players',
  },
  {
    slug: 'guess-who',
    title: 'Guess Who Said It',
    emoji: '🕵️',
    tagline: 'Anonymous answers, public guessing.',
    color: 'cyan',
    needsPlayers: true,
    players: '3+ players',
  },
  {
    slug: 'this-or-that',
    title: 'This or That',
    emoji: '⚡',
    tagline: 'Rapid-fire votes.',
    color: 'amber',
    players: 'Any group',
  },
  {
    slug: 'category-blitz',
    title: 'Category Blitz',
    emoji: '📝',
    tagline: 'Beat the buzzer.',
    color: 'flame',
    players: 'Any group',
  },
  {
    slug: 'hot-seat',
    title: 'Hot Seat',
    emoji: '💺',
    tagline: 'One player, rapid questions.',
    color: 'pink',
    needsPlayers: true,
    players: '2+ players',
  },
  {
    slug: 'charades',
    title: 'Dumb Charades',
    emoji: '🎬',
    tagline: 'Act it out, no talking!',
    color: 'lime',
    needsPlayers: true,
    players: '4+ players',
  },
  {
    slug: 'family-feud',
    title: 'Family Feud',
    emoji: '📋',
    tagline: 'Team vs team, top answers win.',
    color: 'flame',
    players: '4+ (2 teams)',
  },
  {
    slug: 'emoji-pictionary',
    title: 'Emoji Pictionary',
    emoji: '🔤',
    tagline: 'Guess it from the emojis.',
    color: 'amber',
    players: 'Any group',
  },
]
