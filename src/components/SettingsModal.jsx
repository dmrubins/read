import { FAMILY_GROUPS } from '../data/words'

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
  filterMode, setFilterMode,
  familySel, setFamilySel,
}) {
  if (!isOpen) return null

  const familyMode = filterMode === 'family'
  // Which vowel group is being browsed, derived from the current selection
  const [selKind, selId] = familySel.split(':')
  const activeGroup = FAMILY_GROUPS.find(g =>
    selKind === 'group' ? g.id === selId : g.families.some(f => f.rime === selId)
  ) ?? FAMILY_GROUPS[0]

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

          {/* Filter mode */}
          <div className="setting-row">
            <span className="setting-label">Practice by</span>
            <div className="pill-group">
              <button
                className={`pill${!familyMode ? ' active' : ''}`}
                onClick={() => setFilterMode('length')}
              >
                Word length
              </button>
              <button
                className={`pill${familyMode ? ' active' : ''}`}
                onClick={() => setFilterMode('family')}
              >
                Word family
              </button>
            </div>
          </div>

          {!familyMode ? (
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
          ) : (
            <div className="family-picker">
              <div className="setting-label">Vowel sound</div>
              <div className="pill-wrap">
                {FAMILY_GROUPS.map(g => (
                  <button
                    key={g.id}
                    className={`pill${activeGroup.id === g.id ? ' active' : ''}`}
                    onClick={() => setFamilySel(`group:${g.id}`)}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
              <div className="setting-label">Word family</div>
              <div className="pill-wrap">
                <button
                  className={`pill pill--family${familySel === `group:${activeGroup.id}` ? ' active' : ''}`}
                  onClick={() => setFamilySel(`group:${activeGroup.id}`)}
                >
                  All {activeGroup.label}
                </button>
                {activeGroup.families.map(f => (
                  <button
                    key={f.rime}
                    className={`pill pill--family${familySel === `family:${f.rime}` ? ' active' : ''}`}
                    onClick={() => setFamilySel(`family:${f.rime}`)}
                  >
                    {f.rime}
                  </button>
                ))}
              </div>
            </div>
          )}


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

          {/* Sight words (length mode only) */}
          {!familyMode && (
            <div className="setting-row">
              <span className="setting-label">Sight words</span>
              <ToggleSwitch
                checked={useSightWords}
                onChange={e => setUseSightWords(e.target.checked)}
              />
            </div>
          )}

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
