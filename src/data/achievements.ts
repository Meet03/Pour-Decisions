export interface PlayerStats {
  dares: number
  truths: number
  chickens: number
  correctGuesses: number
  timesFooledOthers: number
  timesWasStealthy: number
  thisOrThatWins: number
  blitzWins: number
  charades: number
  emojiWins: number
}

export function emptyStats(): PlayerStats {
  return {
    dares: 0,
    truths: 0,
    chickens: 0,
    correctGuesses: 0,
    timesFooledOthers: 0,
    timesWasStealthy: 0,
    thisOrThatWins: 0,
    blitzWins: 0,
    charades: 0,
    emojiWins: 0,
  }
}

export interface Achievement {
  id: string
  label: string
  emoji: string
  check: (stats: PlayerStats) => boolean
}

export const achievements: Achievement[] = [
  { id: 'dare-devil', label: 'Dare Devil', emoji: '🔥', check: (s) => s.dares >= 5 },
  { id: 'truth-teller', label: 'Truth Teller', emoji: '🫢', check: (s) => s.truths >= 5 },
  { id: 'chicken', label: 'Chicken', emoji: '🐔', check: (s) => s.chickens >= 3 },
  { id: 'mastermind', label: 'Mastermind', emoji: '🕵️', check: (s) => s.correctGuesses >= 3 },
  { id: 'best-liar', label: 'Best Liar', emoji: '🎭', check: (s) => s.timesFooledOthers >= 3 },
  { id: 'stealthy', label: 'Stealthy', emoji: '🥷', check: (s) => s.timesWasStealthy >= 2 },
  { id: 'quick-draw', label: 'Quick Draw', emoji: '⚡', check: (s) => s.thisOrThatWins >= 5 },
  { id: 'wordsmith', label: 'Wordsmith', emoji: '📝', check: (s) => s.blitzWins >= 3 },
  { id: 'charades-champ', label: 'Charades Champ', emoji: '🎬', check: (s) => s.charades >= 8 },
  { id: 'emoji-master', label: 'Emoji Master', emoji: '🔤', check: (s) => s.emojiWins >= 5 },
]

export function badgesFor(stats: PlayerStats): Achievement[] {
  return achievements.filter((a) => a.check(stats))
}
