export default function Header({ jewels, onReset, onOpenSettings, onOpenWordManager }) {
  return (
    <div className="header">
      <div className="logo">✨ Magic Words</div>
      <div className="jewel-bar">
        <div className="jewel-count">
          <span className="jewel-icon">💎</span>
          <span>{jewels}</span>
        </div>
        <button className="words-btn" onClick={onOpenWordManager} aria-label="Word Manager">
          📝
        </button>
        <button className="settings-btn" onClick={onOpenSettings} aria-label="Settings">
          ⚙️
        </button>
        <button className="reset-btn" onClick={onReset}>Reset</button>
      </div>
    </div>
  )
}
