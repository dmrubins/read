import { useState, useMemo, useEffect } from 'react'
import { CORRECT_PHRASES, ALL_ONSETS, FAMILIES } from '../data/words'
import FocusBanner from './FocusBanner'

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

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

function getOnsetChoices(correct) {
  const wrong = shuffle(ALL_ONSETS.filter(o => o !== correct)).slice(0, 3)
  return shuffle([correct, ...wrong])
}

function getRimeChoices(correct) {
  const wrong = shuffle(FAMILIES.map(f => f.rime).filter(r => r !== correct)).slice(0, 3)
  return shuffle([correct, ...wrong])
}

export default function SpellingCard({
  item, focusRime, canChunk,
  word, emoji, isSight,
  spellMode, spelledSoFar, currentLetterIdx,
  wordPool, letterCase,
  onSetSpellMode, onPickLetter, onPickWord,
  onChunkPick, onChunkWrong, onChunkDone, onNext,
}) {
  const [wrongFlash, setWrongFlash] = useState(null)

  // "Spell by chunk" only applies to words that have a rime; otherwise fall back
  const chunkMode = spellMode === 'chunk' && canChunk
  const effMode = spellMode === 'chunk' && !canChunk ? 'letter' : spellMode
  const onset = item?.onset ?? ''
  const rime  = item?.rime ?? ''
  const [onsetDone, setOnsetDone] = useState(!onset)
  useEffect(() => { setOnsetDone(!onset) }, [spellMode, onset])

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
  const onsetChoices = useMemo(() => (chunkMode ? getOnsetChoices(onset) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [word, chunkMode])
  const rimeChoices = useMemo(() => (chunkMode ? getRimeChoices(rime) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [word, chunkMode])

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

  function handleChunkClick(kind, value) {
    const correct = kind === 'onset' ? onset : rime
    if (value !== correct) {
      setWrongFlash(value)
      setTimeout(() => setWrongFlash(null), 400)
      onChunkWrong()
      return
    }
    if (kind === 'onset') {
      onChunkPick()
      setOnsetDone(true)
    } else {
      onChunkDone()
    }
  }

  const chunkSlots = [
    onset && { key: 'onset', text: onset, done: onsetDone, active: !onsetDone },
    { key: 'rime', text: rime.slice(1), done: allDone, active: onsetDone && !allDone, rime: true },
  ].filter(Boolean).map(c => (
    <div
      key={c.key}
      className={`spell-slot spell-slot--chunk${c.rime ? ' spell-slot--rime' : ''}${c.done ? ' filled correct' : c.active ? ' active-slot' : ''}`}
    >
      {c.done ? applyCase(c.text) : ''}
    </div>
  ))

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
      <FocusBanner rime={focusRime} letterCase={letterCase} />

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, width: '100%' }}>
        {!isSight && (
          <div className="word-emoji" style={{ fontSize: '3.5rem' }}>{emoji}</div>
        )}
        <div className="spell-mode-toggle">
          <button
            className={`spell-mode-btn${effMode === 'letter' ? ' active' : ''}`}
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
          {canChunk && (
            <button
              className={`spell-mode-btn${chunkMode ? ' active' : ''}`}
              onClick={() => onSetSpellMode('chunk')}
            >
              Spell by chunk
            </button>
          )}
        </div>
      </div>

      {chunkMode && !allDone && (
        <div className="build-prompt">
          Build the word: <span className="build-prompt-word">{emoji} {applyCase(word)}</span>
        </div>
      )}

      <div className="spelling-word">{chunkMode ? chunkSlots : slots}</div>

      {allDone ? (
        <div className="spell-success">
          <div className="spell-success-phrase">{correctPhrase}</div>
          <button className="did-it-btn" onClick={onNext}>Next word ✨</button>
        </div>
      ) : chunkMode ? (
        <>
          <div className="section-label">
            {onsetDone ? 'Pick the ending sound' : 'Pick the starting sound'}
          </div>
          <div className="spell-choices">
            {(onsetDone ? rimeChoices : onsetChoices).map(c => (
              <button
                key={c}
                className={`choice-btn${onsetDone ? ' choice-btn--rime' : ''}${wrongFlash === c ? ' wrong-flash' : ''}`}
                onClick={() => handleChunkClick(onsetDone ? 'rime' : 'onset', c)}
              >
                {applyCase(c)}
              </button>
            ))}
          </div>
        </>
      ) : effMode === 'letter' ? (
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
