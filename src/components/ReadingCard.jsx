import { useState } from 'react'
import FocusBanner from './FocusBanner'

export default function ReadingCard({
  item, chunked, focusRime,
  word, emoji, isSight,
  hidePicture, letterCase,
  onZoomLetter, onZoomRime, onDidIt, onNext,
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
      <FocusBanner rime={focusRime} letterCase={letterCase} />

      {/* Picture — always rendered in the DOM but hidden until reveal */}
      <div className={`word-emoji${showPicture && hasImage ? '' : ' word-emoji--hidden'}`}>
        {showPicture ? (emoji || '💬') : '❓'}
      </div>

      <div className="section-label">
        {chunked ? 'Tap a sound to zoom' : 'Tap a letter to zoom'}
      </div>

      {chunked ? (
        <div className="word-display">
          {item.onset && (
            <div
              className="letter-tile letter-tile--chunk"
              onClick={() => onZoomLetter(item.onset[0])}
            >
              {applyCase(item.onset)}
            </div>
          )}
          <div
            className="letter-tile letter-tile--chunk letter-tile--rime"
            onClick={() => onZoomRime(item.rime)}
          >
            {applyCase(item.rime.slice(1))}
          </div>
        </div>
      ) : (
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
      )}

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
