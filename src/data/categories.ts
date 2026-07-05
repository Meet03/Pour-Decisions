export interface GameCategory {
  title: string
  emoji: string
  slugs: string[]
}

export const gameCategories: GameCategory[] = [
  {
    title: 'Chaos Starters',
    emoji: '🔥',
    slugs: ['truth-or-dare', 'never-have-i-ever', 'most-likely-to', 'would-you-rather'],
  },
  {
    title: 'Wildcards',
    emoji: '🎲',
    slugs: ['kings', 'wheel'],
  },
  {
    title: 'Mind Games',
    emoji: '🎭',
    slugs: ['two-truths', 'guess-who'],
  },
  {
    title: 'Quick Fire',
    emoji: '⚡',
    slugs: ['this-or-that', 'category-blitz', 'hot-seat'],
  },
  {
    title: 'Showtime',
    emoji: '🎬',
    slugs: ['charades'],
  },
]
