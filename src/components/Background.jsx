import { useEffect, useRef } from 'react'

export default function Background() {
  const ref = useRef(null)

  useEffect(() => {
    const scene = ref.current
    if (!scene) return

    // Stars
    for (let i = 0; i < 60; i++) {
      const s = document.createElement('div')
      s.className = 'star'
      const size = Math.random() * 3 + 1
      s.style.cssText = [
        `left:${Math.random() * 100}%`,
        `top:${Math.random() * 100}%`,
        `width:${size}px`,
        `height:${size}px`,
        `--dur:${Math.random() * 4 + 2}s`,
        `--op:${Math.random() * 0.7 + 0.3}`,
        `animation-delay:${Math.random() * 5}s`,
      ].join(';')
      scene.appendChild(s)
    }

    // Bubbles
    for (let i = 0; i < 8; i++) {
      const b = document.createElement('div')
      b.className = 'bubble'
      const sz = Math.random() * 80 + 30
      b.style.cssText = [
        `left:${Math.random() * 100}%`,
        `top:${Math.random() * 100}%`,
        `width:${sz}px`,
        `height:${sz}px`,
        `--dur:${Math.random() * 8 + 6}s`,
        `animation-delay:${Math.random() * 6}s`,
      ].join(';')
      scene.appendChild(b)
    }
  }, [])

  return <div className="bg-scene" ref={ref} />
}
