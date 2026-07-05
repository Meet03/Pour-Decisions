export interface WheelPreset {
  id: string
  label: string
  emoji: string
  entries: string[]
}

export const wheelPresets: WheelPreset[] = [
  {
    id: 'who',
    label: 'Who drinks?',
    emoji: '🎯',
    entries: [],
  },
  {
    id: 'fate',
    label: 'Wheel of fate',
    emoji: '🎰',
    entries: [
      'Take 2 sips',
      'Give 2 sips',
      'Everyone drinks!',
      'Waterfall!',
      'Do a dare',
      'Safe — nothing happens',
      'Swap seats with anyone',
      'Make a new rule',
      'Compliment someone',
      'Show your last photo',
    ],
  },
  {
    id: 'dares',
    label: 'Dare roulette',
    emoji: '🎲',
    entries: [
      'Dance for 30 seconds',
      'Speak in an accent',
      'Sing the next song',
      'Do 10 push-ups',
      'Tell an embarrassing story',
      'Let someone check your phone for 10s',
      'Imitate someone here',
      'Freestyle rap',
    ],
  },
]
