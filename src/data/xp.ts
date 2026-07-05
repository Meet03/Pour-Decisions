export const XP_PER_LEVEL = 10

export function levelFor(points: number): number {
  return Math.floor(Math.max(points, 0) / XP_PER_LEVEL) + 1
}

export function xpProgress(points: number) {
  const clamped = Math.max(points, 0)
  const into = clamped % XP_PER_LEVEL
  return { level: levelFor(points), into, total: XP_PER_LEVEL }
}
