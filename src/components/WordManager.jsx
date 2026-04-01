import { useState } from 'react'

const LENGTH_LABELS = { 3: '3 letters', 4: '4 letters', 5: '5 letters', 6: '6 letters' }

function LenBadge({ len }) {
  return <span className={`wm-len-badge wm-len-${len}`}>{len}</span>
}

export default function WordManager({ isOpen, onClose, wordData }) {
  const [filter, setFilter]       = useState('all')
  const [newWord, setNewWord]     = useState('')
  const [newEmoji, setNewEmoji]   = useState('')
  const [addError, setAddError]   = useState('')
  const [editingW, setEditingW]   = useState(null)   // word string being edited
  const [editWord, setEditWord]   = useState('')
  const [editEmoji, setEditEmoji] = useState('')

  if (!isOpen) return null

  const allWords = wordData.getAllWords()   // { 3:[...], 4:[...], 5:[...], 6:[...] }

  const displayed =
    filter === 'all'
      ? [3, 4, 5, 6].flatMap(n => allWords[n])
      : allWords[parseInt(filter)] ?? []

  // ── Add ───────────────────────────────────────────────────────────
  function handleAdd() {
    const err = wordData.addWord(newWord, newEmoji)
    if (err) { setAddError(err); return }
    setNewWord('')
    setNewEmoji('')
    setAddError('')
  }

  // ── Edit ──────────────────────────────────────────────────────────
  function startEdit(item) {
    setEditingW(item.w)
    setEditWord(item.w)
    setEditEmoji(item.e ?? '')
  }
  function saveEdit() {
    wordData.editWord(editingW, editWord, editEmoji)
    setEditingW(null)
  }
  function cancelEdit() { setEditingW(null) }

  // ── Reset ─────────────────────────────────────────────────────────
  function handleReset() {
    if (!confirm('Reset all word changes and remove custom words?')) return
    wordData.resetToDefaults()
  }

  return (
    <div className="wm-overlay" onClick={onClose}>
      <div className="wm-sheet" onClick={e => e.stopPropagation()}>

        <div className="wm-handle" />

        {/* Header */}
        <div className="wm-header">
          <span className="wm-title">📝 Word Manager</span>
          <button className="settings-sheet-close" onClick={onClose}>✕</button>
        </div>

        {/* Add word */}
        <div className="wm-add-section">
          <div className="wm-add-row">
            <input
              className="wm-input"
              placeholder="Add a word…"
              value={newWord}
              onChange={e => { setNewWord(e.target.value); setAddError('') }}
              onKeyDown={e => e.key === 'Enter' && handleAdd()}
            />
            <input
              className="wm-emoji-input"
              placeholder="🦄"
              value={newEmoji}
              onChange={e => setNewEmoji(e.target.value)}
            />
            <button className="wm-add-btn" onClick={handleAdd}>+ Add</button>
          </div>
          {addError && <div className="wm-error">{addError}</div>}
        </div>

        {/* Length filter */}
        <div className="wm-filter-tabs">
          {['all', '3', '4', '5', '6'].map(f => (
            <button
              key={f}
              className={`wm-filter-tab${filter === f ? ' active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? `All (${[3,4,5,6].reduce((s,n)=>s+(allWords[n]?.length??0),0)})` : LENGTH_LABELS[f]}
            </button>
          ))}
        </div>

        {/* Word list */}
        <div className="wm-list">
          {displayed.length === 0 && (
            <div className="wm-empty">No words here yet!</div>
          )}

          {displayed.map(item =>
            editingW === item.w && item.isCustom ? (
              /* ── Inline edit row ── */
              <div key={item.w} className="wm-row wm-row--editing">
                <input
                  className="wm-input"
                  value={editWord}
                  onChange={e => setEditWord(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && saveEdit()}
                  style={{ fontSize: '0.95rem' }}
                />
                <input
                  className="wm-emoji-input"
                  value={editEmoji}
                  onChange={e => setEditEmoji(e.target.value)}
                />
                <button className="wm-save-btn"   onClick={saveEdit}>  ✓</button>
                <button className="wm-cancel-btn" onClick={cancelEdit}>✗</button>
              </div>
            ) : (
              /* ── Normal row ── */
              <div key={item.w} className="wm-row">
                <span className="wm-row-emoji">{item.e ?? '👁️'}</span>
                <span className="wm-row-word">{item.w.toUpperCase()}</span>
                <LenBadge len={item.length} />
                {item.isCustom && <span className="wm-badge wm-badge--custom">yours</span>}
                {item.isCustom && (
                  <button className="wm-edit-btn" onClick={() => startEdit(item)}>✏️</button>
                )}
                <button
                  className="wm-delete-btn"
                  onClick={() => wordData.removeWord(item.w, item.isCustom)}
                >
                  🗑️
                </button>
              </div>
            )
          )}
        </div>

        {/* Reset footer */}
        <div className="wm-reset-row">
          <button className="wm-reset-btn" onClick={handleReset}>
            ↩️ Reset all to defaults
          </button>
        </div>

      </div>
    </div>
  )
}
