export default function ReadingCard({
  word, emoji, isSight,
  hidePicture, letterCase,
  onZoomLetter, onDidIt, onNext,
}) {
  const applyCase = str => letterCase === 'upper' ? str.toUpperCase() : str

  return (
    <div className="word-card">
      {isSight && <div className="freq-badge">👁️ Sight word</div>}

      {/* Picture */}
      {!hidePicture && (
        <div className="word-emoji">
          {emoji || '💬'}
        </div>
      )}

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

      {/* Primary success action */}
      <button className="did-it-btn" onClick={onDidIt}>
        I did it! 🌟
      </button>

      {/* Secondary skip */}
      <button className="skip-btn" onClick={onNext}>
        Skip →
      </button>
    </div>
  )
}
