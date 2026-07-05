export interface HowToPlayInfo {
  steps: string[]
  scoring: string
}

export const howToPlay: Record<string, HowToPlayInfo> = {
  'never-have-i-ever': {
    steps: [
      'Read the statement out loud to the group.',
      'Anyone who HAS done it takes a sip (or a forfeit, if you flipped the mode).',
      'Tap the card to bring up the next one.',
    ],
    scoring: 'No points here — this one is just for laughs and gasps. 🙊',
  },
  'truth-or-dare': {
    steps: [
      'The named player picks Truth or Dare.',
      'Answer the truth honestly, or complete the dare in front of the group.',
      'Not feeling it? Re-roll for a new card, or chicken out and pass — no hard feelings.',
      'Tap "Done → next" to lock in your points and move to the next player.',
    ],
    scoring: 'Completing a truth earns +2, a dare earns +3. Chickening out earns 0 but is tracked (too many and you\'ll unlock the 🐔 Chicken badge).',
  },
  'most-likely-to': {
    steps: [
      'Read the prompt out loud.',
      'Everyone counts down "1, 2, 3" and points at who they think fits best.',
      'Whoever gets the most fingers pointed at them takes the sip or forfeit.',
      'Tap the card for the next round.',
    ],
    scoring: 'No points tracked — just pure group judgement. 👉',
  },
  'would-you-rather': {
    steps: [
      'Read both options out loud.',
      'Everyone calls out or shows which one they\'d pick.',
      'Whichever side has fewer votes takes the sip or forfeit.',
      'Tap the card for the next dilemma.',
    ],
    scoring: 'No points tracked — the losing minority just pays the price. 🗳️',
  },
  kings: {
    steps: [
      'Tap "Draw a card" to flip the next card from the deck.',
      'Follow the rule shown for that rank (Waterfall, Mate, Question Master, etc.).',
      'Keep drawing — watch the Kings counter, since the 4th King finishes the King\'s Cup.',
      'Restart anytime to reshuffle a fresh deck.',
    ],
    scoring: 'No points tracked — Kings Cup runs on its own rules and consequences. 👑',
  },
  wheel: {
    steps: [
      'Pick a wheel: "Who drinks?" (needs 2+ players), "Wheel of fate", or "Dare roulette".',
      'Tap SPIN and let it land.',
      'Whoever (or whatever) it lands on faces the result.',
    ],
    scoring: 'No points tracked — the wheel is judge, jury, and referee. 🎡',
  },
  'two-truths': {
    steps: [
      'The named player privately writes 2 true statements and 1 lie, and marks which is the lie.',
      'Pass the phone back — the group reads all 3 and debates which is fake.',
      'Reveal the lie, then tap whether the group guessed right or got fooled.',
      'Play passes to the next player.',
    ],
    scoring: 'If the group guesses correctly, everyone except the writer earns +1. If the group gets fooled, the writer earns +3 and edges closer to the 🎭 Best Liar badge.',
  },
  'guess-who': {
    steps: [
      'A random prompt appears for the whole group.',
      'Pass the phone to each player privately — they type one anonymous answer, then pass it on.',
      'Once everyone has answered, the app shuffles and reveals one answer at a time.',
      'For each one, the group guesses who wrote it by tapping a name.',
    ],
    scoring: 'A correct guess earns the guesser +2 (and builds toward the 🕵️ Mastermind badge). If nobody guesses correctly, the secret author earns +1 for staying stealthy 🥷.',
  },
  'this-or-that': {
    steps: [
      'Two options appear — everyone shouts or points at their pick.',
      'Tap whichever side the room clearly favored.',
      'Tap "Next round" to keep the rapid-fire pace going.',
    ],
    scoring: 'The player whose turn it is banks +1 for keeping the round moving — rack up 5 to unlock the ⚡ Quick Draw badge.',
  },
  'category-blitz': {
    steps: [
      'A category and starting letter appear.',
      'Tap "Start!" to begin the 30-second countdown.',
      'Everyone shouts out answers before the buzzer.',
      'When time\'s up, the group decides who had the best (or most) answers and taps their name.',
    ],
    scoring: 'The round winner earns +2 — 3 wins unlocks the 📝 Wordsmith badge.',
  },
  'hot-seat': {
    steps: [
      'The named player takes the hot seat for 60 seconds.',
      'Tap "Start the clock" and start firing through rapid questions.',
      'Tap "Next question" after each answer to keep the pace up.',
      'When the timer hits zero, the round ends automatically.',
    ],
    scoring: 'The player in the hot seat earns +1 point for every question they answer before time runs out.',
  },
  charades: {
    steps: [
      'Pick Hindi, English, or Mixed movies.',
      'The named player taps ready, then privately views the movie title — nobody else should look!',
      'Start the 60-second clock and act out the title using gestures only — no talking, mouthing words, or spelling.',
      'Tap "Got it!" when the group guesses correctly to move to the next title, or "Skip" if it\'s a lost cause.',
    ],
    scoring: 'The actor earns +2 for every movie the group correctly guesses. Nail 8 total across the night to unlock the 🎬 Charades Champ badge.',
  },
}
