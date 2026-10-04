import { FAMILY_BY_RIME, familyTip } from '../data/words'

export default function RimeModal({ rime, letterCase, onClose }) {
  const fam = FAMILY_BY_RIME[rime]
  if (!fam) return null
  const fmt = s => letterCase === 'upper' ? s.toUpperCase() : s.toLowerCase()
  const rhymes = fam.words.slice(0, 4)

  return (
    <div className="zoom-overlay" onClick={onClose}>
      <div className="zoom-card rime-card" onClick={e => e.stopPropagation()}>
        <div className="rime-title">"{rime.toUpperCase()}" SOUND</div>
        <div className="rime-rhymes">
          {rhymes.map(([w, e]) => (
            <div key={w} className="rime-rhyme">
              <span className="rime-rhyme-emoji">{e}</span>
              <span className="rime-rhyme-word">
                {fmt(w.slice(0, w.length - (rime.length - 1)))}
                <span className="rime-rhyme-end">{fmt(rime.slice(1))}</span>
              </span>
            </div>
          ))}
        </div>
        <div className="rime-words">{rhymes.map(([w]) => w).join(', ')}</div>
        <div className="rime-tip">{familyTip(rime)}</div>
        <button className="zoom-close" onClick={onClose}>✓ Got it!</button>
      </div>
    </div>
  )
}
