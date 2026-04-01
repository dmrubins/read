function ToggleSwitch({ checked, onChange }) {
  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <div className="toggle-track" />
      <div className="toggle-thumb" />
    </label>
  )
}

export default function Settings({
  wordLength, setWordLength,
  useSightWords, setUseSightWords,
  hidePicture, setHidePicture,
  letterCase, setLetterCase,
}) {
  return (
    <div className="settings">
      {/* Word length */}
      <div className="setting-row">
        <span className="setting-label">Word length</span>
        <div className="pill-group">
          {[3, 4, 5, 6].map(n => (
            <button
              key={n}
              className={`pill${wordLength === n ? ' active' : ''}`}
              onClick={() => setWordLength(n)}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Letter case */}
      <div className="setting-row">
        <span className="setting-label">Letter case</span>
        <div className="pill-group">
          <button
            className={`pill${letterCase === 'lower' ? ' active' : ''}`}
            onClick={() => setLetterCase('lower')}
          >
            abc
          </button>
          <button
            className={`pill${letterCase === 'upper' ? ' active' : ''}`}
            onClick={() => setLetterCase('upper')}
          >
            ABC
          </button>
        </div>
      </div>

      {/* Sight words */}
      <div className="setting-row">
        <span className="setting-label">Sight words</span>
        <ToggleSwitch
          checked={useSightWords}
          onChange={e => setUseSightWords(e.target.checked)}
        />
      </div>

      {/* Hide picture (reading mode) */}
      <div className="setting-row">
        <span className="setting-label">Hide picture</span>
        <ToggleSwitch
          checked={hidePicture}
          onChange={e => setHidePicture(e.target.checked)}
        />
      </div>
    </div>
  )
}
