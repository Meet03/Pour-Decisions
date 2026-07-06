import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { RotateCcw } from 'lucide-react'
import GameShell from '../components/GameShell'
import PassThePhone from '../components/PassThePhone'
import PopNumber from '../components/PopNumber'
import { feudQuestions, type FeudQuestion } from '../data/familyFeud'
import { useGame } from '../context/GameContext'
import { sfx } from '../lib/sound'

type Stage = 'pass-to-host' | 'choose-team' | 'hosting' | 'steal' | 'round-result'
type Team = 'A' | 'B'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function FamilyFeud() {
  const { players } = useGame()
  const [deck] = useState<FeudQuestion[]>(() => shuffle(feudQuestions))
  const [qIndex, setQIndex] = useState(0)
  const [hostTurn, setHostTurn] = useState(0)
  const [stage, setStage] = useState<Stage>('pass-to-host')
  const [controlling, setControlling] = useState<Team>('A')
  const [revealed, setRevealed] = useState<Set<number>>(new Set())
  const [strikes, setStrikes] = useState(0)
  const [boardTotal, setBoardTotal] = useState(0)
  const [teamScores, setTeamScores] = useState({ A: 0, B: 0 })
  const [roundWinner, setRoundWinner] = useState<Team | null>(null)

  const question = deck[qIndex % deck.length]
  const host = players.length > 0 ? players[hostTurn % players.length] : null
  const stealingTeam: Team = controlling === 'A' ? 'B' : 'A'

  function bankRound(team: Team, total: number) {
    setTeamScores((s) => ({ ...s, [team]: s[team] + total }))
    setRoundWinner(team)
    setStage('round-result')
  }

  function reveal(i: number) {
    if (revealed.has(i)) return
    sfx.points()
    const next = new Set(revealed)
    next.add(i)
    setRevealed(next)
    const total = boardTotal + question.answers[i].points
    setBoardTotal(total)
    if (next.size === question.answers.length) bankRound(controlling, total)
  }

  function strike() {
    sfx.buzzer()
    if (strikes >= 2) {
      setStrikes(3)
      setStage('steal')
    } else {
      setStrikes((s) => s + 1)
    }
  }

  function stealReveal(i: number) {
    if (revealed.has(i)) return
    sfx.points()
    const next = new Set(revealed)
    next.add(i)
    setRevealed(next)
    bankRound(stealingTeam, boardTotal + question.answers[i].points)
  }

  function stealFail() {
    sfx.buzzer()
    bankRound(controlling, boardTotal)
  }

  function nextRound() {
    setQIndex((i) => i + 1)
    setHostTurn((t) => t + 1)
    setControlling((c) => (c === 'A' ? 'B' : 'A'))
    setRevealed(new Set())
    setStrikes(0)
    setBoardTotal(0)
    setRoundWinner(null)
    setStage('pass-to-host')
  }

  function newMatch() {
    setTeamScores({ A: 0, B: 0 })
    nextRound()
  }

  return (
    <GameShell title="Family Feud" emoji="📋" slug="family-feud">
      <div className="mt-4 flex items-center justify-center gap-3">
        <div className="sticker -rotate-1 rounded-2xl bg-cyan px-4 py-2 text-center text-night">
          <p className="text-[10px] font-bold uppercase tracking-widest">Team A</p>
          <p className="text-2xl font-extrabold">
            <PopNumber value={teamScores.A} />
          </p>
        </div>
        <button
          onClick={newMatch}
          aria-label="Start a new match"
          className="rounded-full bg-white/10 p-2.5 text-white/50 hover:bg-white/15"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
        <div className="sticker rotate-1 rounded-2xl bg-amber px-4 py-2 text-center text-night">
          <p className="text-[10px] font-bold uppercase tracking-widest">Team B</p>
          <p className="text-2xl font-extrabold">
            <PopNumber value={teamScores.B} />
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {stage === 'pass-to-host' && (
          <PassThePhone
            key="pass-to-host"
            title={host ? 'Pass the phone to' : 'Pass the phone to today\'s host'}
            name={host}
            subtitle="Keep the board hidden from the group — you're the host this round!"
            cta="Show me the board 👀"
            onReady={() => setStage('choose-team')}
            accent="flame"
          />
        )}

        {stage === 'choose-team' && (
          <motion.div
            key="choose-team"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-8 flex flex-1 flex-col items-center justify-center text-center"
          >
            <p className="rounded-full bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-white/50">
              Question
            </p>
            <p className="mt-3 max-w-xs text-xl font-bold leading-snug text-balance">{question.prompt}</p>
            <p className="mt-4 text-sm text-white/40">Which team shouted an answer first?</p>
            <div className="mt-5 grid w-full grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setControlling('A')
                  setStage('hosting')
                }}
                className="sticker rounded-2xl bg-cyan py-4 font-extrabold text-night active:scale-95"
              >
                Team A
              </button>
              <button
                onClick={() => {
                  setControlling('B')
                  setStage('hosting')
                }}
                className="sticker rounded-2xl bg-amber py-4 font-extrabold text-night active:scale-95"
              >
                Team B
              </button>
            </div>
          </motion.div>
        )}

        {stage === 'hosting' && (
          <motion.div
            key="hosting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 flex flex-1 flex-col"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white/50">
                Team {controlling} is answering
              </span>
              <span className="text-sm font-bold text-amber">
                Board: <PopNumber value={boardTotal} /> pts
              </span>
            </div>

            <p className="mt-2 text-center text-lg font-bold leading-snug text-balance">{question.prompt}</p>

            <div className="mt-4 space-y-2">
              {question.answers.map((a, i) => {
                const isRevealed = revealed.has(i)
                return (
                  <button
                    key={a.text}
                    onClick={() => reveal(i)}
                    disabled={isRevealed}
                    className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition-colors ${
                      isRevealed
                        ? 'border-lime/40 bg-lime/10 text-lime'
                        : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    <span className="font-bold">
                      {i + 1}. {a.text}
                    </span>
                    <span className="font-extrabold">{a.points}</span>
                  </button>
                )
              })}
            </div>

            <div className="mt-5 flex items-center justify-center gap-2">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-lg font-extrabold ${
                    i < strikes ? 'bg-flame text-night' : 'bg-white/10 text-white/20'
                  }`}
                >
                  ✕
                </span>
              ))}
            </div>

            <button
              onClick={strike}
              className="sticker mt-4 rounded-full bg-flame py-3.5 font-extrabold text-night active:scale-95"
            >
              Wrong guess — Strike ✕
            </button>
          </motion.div>
        )}

        {stage === 'steal' && (
          <motion.div
            key="steal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 flex flex-1 flex-col"
          >
            <p className="text-center text-lg font-bold">
              3 strikes! Team {stealingTeam} gets one shot to steal {boardTotal} pts
            </p>
            <div className="mt-4 space-y-2">
              {question.answers.map((a, i) => {
                const isRevealed = revealed.has(i)
                if (isRevealed) return null
                return (
                  <button
                    key={a.text}
                    onClick={() => stealReveal(i)}
                    className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-white/70 hover:bg-white/10"
                  >
                    <span className="font-bold">
                      {i + 1}. {a.text}
                    </span>
                    <span className="font-extrabold">{a.points}</span>
                  </button>
                )
              })}
            </div>
            <button
              onClick={stealFail}
              className="mt-4 rounded-full bg-white/10 py-3.5 font-bold text-white/70 hover:bg-white/15"
            >
              Steal failed — no match ✕
            </button>
          </motion.div>
        )}

        {stage === 'round-result' && (
          <motion.div
            key="round-result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-10 flex flex-1 flex-col items-center justify-center text-center"
          >
            <p className="text-3xl">🎉</p>
            <p className="mt-3 text-xl font-bold">
              Team {roundWinner} banks {boardTotal} points!
            </p>
            <button
              onClick={nextRound}
              className="sticker mt-8 rounded-full bg-pink px-8 py-4 text-lg font-extrabold text-night active:scale-95"
            >
              Next round →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </GameShell>
  )
}
