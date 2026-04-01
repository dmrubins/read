import { useState } from 'react'

export default function ReadingCard({
  word, emoji, isSight,
  hidePicture, letterCase,
  onZoomLetter, onDidIt, onNext,
}) {
  // If hidePicture is on (and there's actually a picture to reveal),
  // start hidden and require a "Reveal" tap first.
  const hasImage = !isSight && emoji
  const [revealed, setRevealed] = useState(!hidePicture)

  const applyCase = str => letterCase === 'upper' ? str.toUpperCase() : str

  // Show picture when: hidePicture is off, OR the user has tapped Reveal
  const showPicture = !hidePicture || revealed

  return (
    <div className="word-card">
      {isSight && <div className="freq-badge">👁️ Sight word</div>}

      {/* Picture — always rendered in the DOM but hidden until reveal */}
      <div className={`word-emoji${showPicture && hasImage ? '' : ' word-emoji--hidden'}`}>
        {showPicture ? (emoji || '💬') : '❓'}
      </div>

      <div className="section-label">Tap a letter to zoom</div>

      <div className="word-display">
        {[...word].map((l, i) => (
          <div
            key={i}
            className="letter-tile"
            onClick={() => onZoomLetter(l)}
          >
            {applyCase(l)}
          </div>
        ))}
      </div>

      <div style={{ height: 6 }} />

      {/* Reveal → then I Did It */}
      {hasImage && !revealed ? (
        <button className="reveal-btn" onClick={() => setRevealed(true)}>
          Reveal 👀
        </button>
      ) : (
        <button className="did-it-btn" onClick={onDidIt}>
          I did it! 🌟
        </button>
      )}

      {/* Secondary skip */}
      <button className="skip-btn" onClick={onNext}>
        Skip →
      </button>
    </div>
  )
}
