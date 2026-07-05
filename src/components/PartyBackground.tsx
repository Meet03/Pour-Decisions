const doodles: Array<{ char: string; top: string; left?: string; right?: string; color: string; delay: string; size: string }> = [
  { char: '✦', top: '10%', left: '7%', color: '#ff2e7e', delay: '0s', size: '20px' },
  { char: '✳', top: '22%', right: '9%', color: '#22e6ff', delay: '-2s', size: '16px' },
  { char: '〰', top: '46%', left: '4%', color: '#b6ff3c', delay: '-4s', size: '22px' },
  { char: '★', top: '64%', right: '6%', color: '#ffb020', delay: '-1s', size: '14px' },
  { char: '✦', top: '82%', left: '12%', color: '#22e6ff', delay: '-5s', size: '16px' },
  { char: '◦', top: '35%', right: '20%', color: '#ff6ba6', delay: '-3s', size: '18px' },
  { char: '✳', top: '74%', right: '26%', color: '#ff5d3c', delay: '-6s', size: '13px' },
]

/** Fixed full-screen party layer: drifting color blobs + floating doodles. */
export default function PartyBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
      {doodles.map((d, i) => (
        <span
          key={i}
          className="doodle"
          style={{
            top: d.top,
            left: d.left,
            right: d.right,
            color: d.color,
            animationDelay: d.delay,
            fontSize: d.size,
          }}
        >
          {d.char}
        </span>
      ))}
    </div>
  )
}
