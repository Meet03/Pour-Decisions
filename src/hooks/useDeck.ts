import { useCallback, useMemo, useRef, useState } from 'react'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Deals items in shuffled order without repeats; reshuffles when exhausted. */
export function useDeck<T>(items: T[]) {
  const order = useRef<T[]>(shuffle(items))
  const index = useRef(0)
  const [current, setCurrent] = useState<T>(() => order.current[0])
  const [count, setCount] = useState(1)

  const itemsKey = useMemo(() => items, [items])

  const next = useCallback(() => {
    index.current += 1
    if (index.current >= order.current.length) {
      order.current = shuffle(itemsKey)
      index.current = 0
    }
    setCurrent(order.current[index.current])
    setCount((c) => c + 1)
  }, [itemsKey])

  const reset = useCallback(
    (newItems: T[]) => {
      order.current = shuffle(newItems)
      index.current = 0
      setCurrent(order.current[0])
      setCount(1)
    },
    [],
  )

  return { current, next, reset, count }
}
