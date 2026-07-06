import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import GameShell from '../components/GameShell'
import { guessWhoPrompts } from '../data/guessWhoPrompts'
import { useGame } from '../context/GameContext'
import { useScore } from '../context/ScoreContext'

type Stage = 'prompt' | 'collecting' | 'reveal-ready' | 'guessing' | 'done'

interface Answer {
  author: string
  text: string
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function GuessWho() {
  const { players } = useGame()
  const { award } = useScore()
  const [prompt, setPrompt] = useState(() => guessWhoPrompts[Math.floor(Math.random() * guessWhoPrompts.length)])
  const [stage, setStage] = useState<Stage>('prompt')
  const [collectorIndex, setCollectorIndex] = useState(0)
  const [privacyShield, setPrivacyShield] = useState(true)
  const [draft, setDraft] = useState('')
  const [answers, setAnswers] = useState<Answer[]>([])
  const [shuffled, setShuffled] = useState<Answer[]>([])
  const [revealIndex, setRevealIndex] = useState(0)
  const [guessedAuthor, setGuessedAuthor] = useState<string | null>(null)

  function newPrompt() {
    setPrompt(guessWhoPrompts[Math.floor(Math.random() * guessWhoPrompts.length)])
    setStage('collecting')
    setCollectorIndex(0)
    setPrivacyShield(true)
    setDraft('')
    setAnswers([])
    setRevealIndex(0)
    setGuessedAuthor(null)
  }

  function submitAnswer() {
    if (!draft.trim()) return
    const author = players[collectorIndex]
    const nextAnswers = [...answers, { author, text: draft.trim() }]
    setAnswers(nextAnswers)
    setDraft('')
    if (collectorIndex + 1 < players.length) {
      setCollectorIndex((i) => i + 1)
      setPrivacyShield(true)
    } else {
      setShuffled(shuffle(nextAnswers))
      setStage('reveal-ready')
    }
  }

  function guess(player: string) {
    setGuessedAuthor(player)
    const actual = shuffled[revealIndex].author
    if (player === actual) {
      award(player, 2, 'correctGuesses')
    }
  }

  function nextAnswer() {
    const noOneGuessedRight = guessedAuthor !== shuffled[revealIndex].author
    if (noOneGuessedRight) award(shuffled[revealIndex].author, 1, 'timesWasStealthy')
    setGuessedAuthor(null)
    if (revealIndex + 1 < shuffled.length) {
      setRevealIndex((i) => i + 1)
    } else {
      setStage('done')
    }
  }

  if (players.length < 3) {
    return (
      <GameShell title="Guess Who Said It" emoji="🕵️" slug="guess-who">
        <p className="mt-10 text-center text-white/50">
          Add at least 3 players on the home screen — this game needs a crowd to guess from.
        </p>
      </GameShell>
    )
  }

  return (
    <GameShell title="Guess Who Said It" emoji="🕵️" slug="guess-who">
      <AnimatePresence mode="wait">
        {stage === 'prompt' && (
          <motion.div
            key="prompt"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-8 flex flex-1 flex-col items-center justify-center text-center"
          >
            <p className="rounded-full bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-cyan">
              Today's prompt
            </p>
            <p className="mt-4 text-2xl font-bold leading-snug text-balance">{prompt}</p>
            <button
              onClick={() => setStage('collecting')}
              className="mt-8 rounded-full bg-cyan px-8 py-4 text-lg font-extrabold text-night shadow-xl shadow-cyan/30 active:scale-95"
            >
              Start collecting answers 🤫
            </button>
          </motion.div>
        )}

        {stage === 'collecting' && (
          <motion.div
            key="collecting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-8 flex flex-1 flex-col items-center justify-center text-center"
          >
            {privacyShield ? (
              <>
                <p className="text-lg text-white/50">Pass the phone to</p>
                <p className="mt-1 text-3xl font-extrabold text-pink">{players[collectorIndex]}</p>
                <p className="mt-4 max-w-xs text-sm text-white/40">"{prompt}"</p>
                <button
                  onClick={() => setPrivacyShield(false)}
                  className="mt-8 rounded-full bg-cyan px-8 py-4 text-lg font-extrabold text-night shadow-xl shadow-cyan/30 active:scale-95"
                >
                  I'm ready to type 🙈
                </button>
              </>
            ) : (
              <div className="w-full">
                <p className="text-sm text-white/50">{prompt}</p>
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Type your anonymous answer…"
                  maxLength={140}
                  rows={3}
                  autoFocus
                  className="mt-4 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-base outline-none focus:border-cyan"
                />
                <button
                  onClick={submitAnswer}
                  disabled={!draft.trim()}
                  className="mt-4 w-full rounded-full bg-cyan py-3.5 font-extrabold text-night shadow-lg shadow-cyan/30 active:scale-95 disabled:opacity-30"
                >
                  Lock in & pass along →
                </button>
              </div>
            )}
          </motion.div>
        )}

        {stage === 'reveal-ready' && (
          <motion.div
            key="reveal-ready"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-10 flex flex-1 flex-col items-center justify-center text-center"
          >
            <p className="text-3xl">🎉</p>
            <p className="mt-3 text-xl font-bold">All answers are in!</p>
            <p className="mt-1 text-white/50">Time to guess who said what.</p>
            <button
              onClick={() => setStage('guessing')}
              className="mt-8 rounded-full bg-cyan px-8 py-4 text-lg font-extrabold text-night shadow-xl shadow-cyan/30 active:scale-95"
            >
              Start guessing 🕵️
            </button>
          </motion.div>
        )}

        {stage === 'guessing' && (
          <motion.div
            key={`guess-${revealIndex}`}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            className="mt-6 flex flex-1 flex-col"
          >
            <p className="text-center text-xs font-bold uppercase tracking-widest text-white/40">
              Answer {revealIndex + 1} of {shuffled.length}
            </p>
            <div className="mt-3 rounded-2xl border border-white/10 bg-night-card p-6 text-center">
              <p className="text-lg font-semibold leading-snug">"{shuffled[revealIndex].text}"</p>
            </div>

            <p className="mt-4 text-center text-sm text-white/50">Who wrote this?</p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {players.map((p) => {
                const isGuess = guessedAuthor === p
                const isActual = guessedAuthor !== null && shuffled[revealIndex].author === p
                return (
                  <button
                    key={p}
                    onClick={() => !guessedAuthor && guess(p)}
                    disabled={guessedAuthor !== null}
                    className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                      isActual
                        ? 'bg-lime text-night'
                        : isGuess
                          ? 'bg-flame text-white'
                          : 'bg-white/10 text-white/70'
                    }`}
                  >
                    {p} {isActual && '✅'}
                  </button>
                )
              })}
            </div>

            {guessedAuthor && (
              <button
                onClick={nextAnswer}
                className="mt-6 rounded-full bg-cyan py-4 text-lg font-extrabold text-night shadow-xl shadow-cyan/30 active:scale-95"
              >
                {revealIndex + 1 < shuffled.length ? 'Next answer →' : 'Finish 🏁'}
              </button>
            )}
          </motion.div>
        )}

        {stage === 'done' && (
          <motion.div
            key="done"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-10 flex flex-1 flex-col items-center justify-center text-center"
          >
            <p className="text-3xl">🏁</p>
            <p className="mt-3 text-xl font-bold">Round over!</p>
            <button
              onClick={newPrompt}
              className="mt-8 rounded-full bg-cyan px-8 py-4 text-lg font-extrabold text-night shadow-xl shadow-cyan/30 active:scale-95"
            >
              New round 🔄
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </GameShell>
  )
}
