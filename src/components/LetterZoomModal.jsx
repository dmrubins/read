import { LETTER_WORDS } from '../data/words'

export default function LetterZoomModal({ letter, letterCase, onClose }) {
  const key = letter.toLowerCase()
  const example = LETTER_WORDS[key] || { word: letter.toUpperCase(), emoji: '🔤' }
  const displayLetter = letterCase === 'upper' ? letter.toUpperCase() : letter.toLowerCase()

  return (
    <div className="zoom-overlay" onClick={onClose}>
      <div className="zoom-card" onClick={e => e.stopPropagation()}>
        <div className="zoom-letter">{displayLetter}</div>
        <div className="zoom-is-for">is for</div>
        <div className="zoom-example-emoji">{example.emoji}</div>
        <div className="zoom-example-word">{example.word}</div>
        <button className="zoom-close" onClick={onClose}>✓ Got it!</button>
      </div>
    </div>
  )
}
