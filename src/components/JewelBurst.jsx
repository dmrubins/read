import { useState, useEffect } from 'react'
import { GEMS } from '../data/words'

export default function JewelBurst({ triggerKey }) {
  const [gems, setGems] = useState([])

  useEffect(() => {
    if (triggerKey === 0) return
    const newGems = Array.from({ length: 12 }, (_, i) => {
      const angleRad = Math.random() * 2 * Math.PI
      const dist = 80 + Math.random() * 120
      return {
        id: i,
        gem: GEMS[Math.floor(Math.random() * GEMS.length)],
        tx: Math.cos(angleRad) * dist,
        ty: Math.sin(angleRad) * dist,
        tr: Math.random() * 360,
        delay: Math.random() * 0.2,
      }
    })
    setGems(newGems)
    const t = setTimeout(() => setGems([]), 1400)
    return () => clearTimeout(t)
  }, [triggerKey])

  return (
    <div className="jewel-burst">
      {gems.map(g => (
        <div
          key={g.id}
          className="burst-gem"
          style={{
            left: '50%',
            top: '50%',
            '--tx': `${g.tx}px`,
            '--ty': `${g.ty}px`,
            '--tr': `${g.tr}deg`,
            animationDelay: `${g.delay}s`,
          }}
        >
          {g.gem}
        </div>
      ))}
    </div>
  )
}
