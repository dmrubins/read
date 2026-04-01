function ToggleSwitch({ checked, onChange }) {
  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <div className="toggle-track" />
      <div className="toggle-thumb" />
    </label>
  )
}

export default function SettingsModal({
  isOpen, onClose,
  wordLength, setWordLength,
  useSightWords, setUseSightWords,
  hidePicture, setHidePicture,
  letterCase, setLetterCase,
}) {
  if (!isOpen) return null

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-sheet" onClick={e => e.stopPropagation()}>

        {/* Drag handle */}
        <div className="settings-sheet-handle" />

        {/* Header row */}
        <div className="settings-sheet-header">
          <span className="settings-sheet-title">⚙️ Settings</span>
          <button className="settings-sheet-close" onClick={onClose}>✕</button>
        </div>

        {/* Settings rows */}
        <div className="settings-sheet-body">

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

          {/* Hide picture */}
          <div className="setting-row">
            <span className="setting-label">Hide picture</span>
            <ToggleSwitch
              checked={hidePicture}
              onChange={e => setHidePicture(e.target.checked)}
            />
          </div>

        </div>
      </div>
    </div>
  )
}
