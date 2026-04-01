import { useState, useMemo } from 'react'
import { CORRECT_PHRASES } from '../data/words'

function getLetterChoices(correct) {
  const alpha = 'abcdefghijklmnopqrstuvwxyz'.split('')
  const wrong = alpha.filter(l => l !== correct).sort(() => Math.random() - 0.5).slice(0, 3)
  return [correct, ...wrong].sort(() => Math.random() - 0.5)
}

function getWordChoices(correct, wordPool) {
  const others = wordPool
    .filter(x => x.w !== correct)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map(x => x.w)
  return [correct, ...others].sort(() => Math.random() - 0.5)
}

export default function SpellingCard({
  word, emoji, isSight,
  spellMode, spelledSoFar, currentLetterIdx,
  wordPool, letterCase,
  onSetSpellMode, onPickLetter, onPickWord, onNext,
}) {
  const [wrongFlash, setWrongFlash] = useState(null)

  const applyCase = str => letterCase === 'upper' ? str.toUpperCase() : str

  // Compute completion locally — avoids any prop-sync lag from parent
  // spelledSoFar only ever contains correct letters, so length check is enough
  const allDone = word.length > 0 && spelledSoFar.length === word.length

  // Choices memoized — only regenerate when word / index changes
  const letterChoices = useMemo(
    () => getLetterChoices(word[currentLetterIdx] || 'a'),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [word, currentLetterIdx],
  )
  const wordChoices = useMemo(
    () => getWordChoices(word, wordPool),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [word],
  )
  // Pick phrase once when completion flips to true
  const correctPhrase = useMemo(
    () => CORRECT_PHRASES[Math.floor(Math.random() * CORRECT_PHRASES.length)],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allDone],
  )

  function handleLetterClick(letter) {
    if (letter.toLowerCase() !== word[currentLetterIdx]) {
      setWrongFlash(letter)
      setTimeout(() => setWrongFlash(null), 400)
    }
    onPickLetter(letter)
  }

  const slots = [...word].map((l, i) => {
    let cls = 'spell-slot'
    if (spelledSoFar[i] !== undefined) {
      cls += spelledSoFar[i] === l ? ' filled correct' : ' filled wrong'
    } else if (i === currentLetterIdx) {
      cls += ' active-slot'
    }
    return (
      <div key={i} className={cls}>
        {spelledSoFar[i] ? applyCase(spelledSoFar[i]) : ''}
      </div>
    )
  })

  return (
    <div className={`word-card${allDone ? ' word-card--success' : ''}`}>
      {isSight && <div className="freq-badge">👁️ Sight word</div>}

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, width: '100%' }}>
        {!isSight && (
          <div className="word-emoji" style={{ fontSize: '3.5rem' }}>{emoji}</div>
        )}
        <div className="spell-mode-toggle">
          <button
            className={`spell-mode-btn${spellMode === 'letter' ? ' active' : ''}`}
            onClick={() => onSetSpellMode('letter')}
          >
            Letter by letter
          </button>
          <button
            className={`spell-mode-btn${spellMode === 'word' ? ' active' : ''}`}
            onClick={() => onSetSpellMode('word')}
          >
            Whole word
          </button>
        </div>
      </div>

      <div className="spelling-word">{slots}</div>

      {allDone ? (
        <div className="spell-success">
          <div className="spell-success-phrase">{correctPhrase}</div>
          <button className="did-it-btn" onClick={onNext}>Next word ✨</button>
        </div>
      ) : spellMode === 'letter' ? (
        <>
          <div className="section-label">Pick letter {currentLetterIdx + 1}</div>
          <div className="spell-choices">
            {letterChoices.map(c => (
              <button
                key={c}
                className={`choice-btn${wrongFlash === c ? ' wrong-flash' : ''}`}
                onClick={() => handleLetterClick(c)}
              >
                {applyCase(c)}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="section-label">Which word is it?</div>
          <div className="spell-choices">
            {wordChoices.map(w => (
              <button
                key={w}
                className="choice-btn word-choice"
                onClick={() => onPickWord(w)}
              >
                {applyCase(w)}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
