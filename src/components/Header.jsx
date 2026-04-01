export default function Header({ jewels, onReset, onOpenSettings }) {
  return (
    <div className="header">
      <div className="logo">✨ Magic Words</div>
      <div className="jewel-bar">
        <div className="jewel-count">
          <span className="jewel-icon">💎</span>
          <span>{jewels}</span>
        </div>
        <button className="settings-btn" onClick={onOpenSettings} aria-label="Settings">
          ⚙️
        </button>
        <button className="reset-btn" onClick={onReset}>Reset</button>
      </div>
    </div>
  )
}
