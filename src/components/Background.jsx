import { useEffect, useRef } from 'react'

const SPARKLE_COLORS = [
  'rgba(244,114,182,VAL)',  // pink
  'rgba(167,139,250,VAL)',  // lavender
  'rgba(34,211,238,VAL)',   // cyan
  'rgba(74,222,128,VAL)',   // green
  'rgba(251,191,36,VAL)',   // gold
  'rgba(248,113,113,VAL)',  // coral
  'rgba(196,181,253,VAL)',  // light lavender
]

function randColor(opacity) {
  const base = SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)]
  return base.replace('VAL', opacity)
}

export default function Background() {
  const ref = useRef(null)

  useEffect(() => {
    const scene = ref.current
    if (!scene) return

    // Sparkle dots
    for (let i = 0; i < 55; i++) {
      const s = document.createElement('div')
      s.className = 'sparkle'
      const size = Math.random() * 6 + 2
      s.style.cssText = [
        `left:${Math.random() * 100}%`,
        `top:${Math.random() * 100}%`,
        `width:${size}px`,
        `height:${size}px`,
        `background:${randColor(0.85)}`,
        `--dur:${Math.random() * 4 + 2}s`,
        `--op:1`,
        `animation-delay:${Math.random() * 6}s`,
      ].join(';')
      scene.appendChild(s)
    }

    // Soft pastel orbs
    for (let i = 0; i < 7; i++) {
      const b = document.createElement('div')
      b.className = 'bubble'
      const sz = Math.random() * 100 + 40
      b.style.cssText = [
        `left:${Math.random() * 100}%`,
        `top:${Math.random() * 100}%`,
        `width:${sz}px`,
        `height:${sz}px`,
        `background:${randColor(0.12)}`,
        `--dur:${Math.random() * 10 + 7}s`,
        `animation-delay:${Math.random() * 7}s`,
      ].join(';')
      scene.appendChild(b)
    }
  }, [])

  return <div className="bg-scene" ref={ref} />
}
