import { LETTER_WORDS } from '../data/words'

export default function LetterZoomModal({ letter, letterCase, currentWord, onClose }) {
  const key = letter.toLowerCase()
  const entry = LETTER_WORDS[key] || { word: letter.toUpperCase(), emoji: '🔤' }
  const primaryMatches = entry.word.toLowerCase() === (currentWord || '').toLowerCase()
  const example = primaryMatches && entry.alt ? entry.alt : entry
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
