import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import GameShell from '../components/GameShell'
import HoloCard from '../components/HoloCard'
import PopNumber from '../components/PopNumber'
import { charadeMovies, type CharadeLang } from '../data/charades'
import { useGame } from '../context/GameContext'
import { useScore } from '../context/ScoreContext'
import { sfx } from '../lib/sound'

const ROUND_SECONDS = 60
type LangFilter = CharadeLang | 'mixed'
type Stage = 'setup' | 'privacy' | 'acting' | 'done'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function wordCount(title: string) {
  return title.split(' ').filter(Boolean).length
}

const langLabels: Record<LangFilter, string> = {
  mixed: '🌐 Mixed',
  hindi: '🇮🇳 Hindi',
  english: '🇬🇧 English',
}

export default function Charades() {
  const { players } = useGame()
  const { award } = useScore()
  const [lang, setLang] = useState<LangFilter>('mixed')
  const [turn, setTurn] = useState(0)
  const [stage, setStage] = useState<Stage>('setup')
  const [deck, setDeck] = useState<typeof charadeMovies>([])
  const [wordIndex, setWordIndex] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [seconds, setSeconds] = useState(ROUND_SECONDS)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<number | undefined>(undefined)

  const player = players.length > 0 ? players[turn % players.length] : null
  const currentMovie = deck[wordIndex]

  useEffect(() => {
    if (!running) return
    intervalRef.current = window.setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          window.clearInterval(intervalRef.current)
          setRunning(false)
          sfx.buzzer()
          setStage('done')
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => window.clearInterval(intervalRef.current)
  }, [running])

  function buildDeck() {
    const pool = lang === 'mixed' ? charadeMovies : charadeMovies.filter((m) => m.lang === lang)
    return shuffle(pool)
  }

  function startRound() {
    setDeck(buildDeck())
    setWordIndex(0)
    setCorrect(0)
    setSeconds(ROUND_SECONDS)
    setRunning(true)
    setStage('acting')
  }

  function gotIt() {
    setCorrect((c) => c + 1)
    advanceWord()
  }

  function skip() {
    advanceWord()
  }

  function advanceWord() {
    setWordIndex((i) => {
      if (i + 1 >= deck.length) return 0
      return i + 1
    })
  }

  function finishTurn() {
    if (player && correct > 0) award(player, correct * 2, 'charades')
    setTurn((t) => t + 1)
    setStage('setup')
  }

  if (players.length === 0) {
    return (
      <GameShell title="Dumb Charades" emoji="🎬" slug="charades">
        <p className="mt-10 text-center text-white/50">
          Add players on the home screen so everyone gets a turn acting.
        </p>
      </GameShell>
    )
  }

  return (
    <GameShell title="Dumb Charades" emoji="🎬" slug="charades">
      <div className="mt-4 flex justify-center gap-2">
        {(['mixed', 'hindi', 'english'] as const).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            disabled={stage !== 'setup'}
            className={`rounded-full px-4 py-2 text-sm font-bold transition-colors disabled:opacity-30 ${
              lang === l ? 'bg-lime text-night shadow-lg shadow-lime/30' : 'bg-white/10 text-white/70 hover:bg-white/15'
            }`}
          >
            {langLabels[l]}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {stage === 'setup' && (
          <motion.div
            key="setup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-10 flex flex-1 flex-col items-center justify-center text-center"
          >
            <p className="text-2xl font-bold">
              <span className="text-pink">{player}</span>, you're up to act!
            </p>
            <p className="mt-2 text-white/50">
              60 seconds, movie titles only, no talking or spelling.
            </p>
            <button
              onClick={() => setStage('privacy')}
              className="mt-8 rounded-full bg-lime px-8 py-4 text-lg font-extrabold text-night shadow-xl shadow-lime/30 active:scale-95"
            >
              I'm ready 🎭
            </button>
          </motion.div>
        )}

        {stage === 'privacy' && (
          <motion.div
            key="privacy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-10 flex flex-1 flex-col items-center justify-center text-center"
          >
            <p className="text-3xl">🙈</p>
            <p className="mt-3 max-w-xs text-lg font-bold">
              Only {player} should look at the next screen!
            </p>
            <p className="mt-1 text-sm text-white/40">Everyone else: get ready to guess.</p>
            <button
              onClick={startRound}
              className="mt-8 rounded-full bg-lime px-8 py-4 text-lg font-extrabold text-night shadow-xl shadow-lime/30 active:scale-95"
            >
              Start the clock ⏱️
            </button>
          </motion.div>
        )}

        {stage === 'acting' && currentMovie && (
          <motion.div
            key="acting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4 flex flex-1 flex-col items-center"
          >
            <div className="flex items-center gap-3 text-sm font-bold text-white/50">
              <span>
                ⏱️ <PopNumber value={seconds} />s
              </span>
              <span>·</span>
              <span>✅ {correct}</span>
            </div>

            <HoloCard
              rarity={currentMovie.lang === 'hindi' ? 'rare' : 'uncommon'}
              className="mt-4 flex min-h-[200px] w-full flex-col items-center justify-center p-6 text-center"
            >
              <div className="relative z-[2] flex flex-col items-center">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-lime">
                  {currentMovie.lang === 'hindi' ? '🇮🇳 Hindi' : '🇬🇧 English'} · {wordCount(currentMovie.title)}{' '}
                  word{wordCount(currentMovie.title) === 1 ? '' : 's'}
                </span>
                <p className="mt-4 text-2xl font-extrabold leading-snug text-balance">
                  {currentMovie.title}
                </p>
              </div>
            </HoloCard>

            <div className="mt-5 grid w-full grid-cols-2 gap-3">
              <button
                onClick={skip}
                className="rounded-full bg-white/10 py-4 text-lg font-bold text-white/70 transition-colors hover:bg-white/15 active:scale-95"
              >
                Skip ⏭️
              </button>
              <button
                onClick={gotIt}
                className="rounded-full bg-lime py-4 text-lg font-extrabold text-night shadow-xl shadow-lime/30 active:scale-95"
              >
                Got it! ✅
              </button>
            </div>
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
            <p className="text-3xl">⏰</p>
            <p className="mt-3 text-xl font-bold">Time's up!</p>
            <p className="mt-1 text-white/50">
              {player} nailed {correct} movie{correct === 1 ? '' : 's'} (+{correct * 2} pts)
            </p>
            <button
              onClick={finishTurn}
              className="mt-8 rounded-full bg-lime px-8 py-4 text-lg font-extrabold text-night shadow-xl shadow-lime/30 active:scale-95"
            >
              Next player →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </GameShell>
  )
}
