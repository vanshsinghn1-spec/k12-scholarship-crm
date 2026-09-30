export default function Header({ onMenuClick, onAddClick }) {
  return (
    <header className="main-header">
      <div className="main-header-left">
        <button
          className="mobile-menu-btn"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 6h16" />
            <path d="M4 12h16" />
            <path d="M4 18h16" />
          </svg>
        </button>
        <h1>Scholarship Dashboard</h1>
      </div>
      <div className="main-header-right">
        <button className="btn btn-primary" onClick={onAddClick} id="add-scholarship-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
          Add Scholarship
        </button>
      </div>
    </header>
  );
}
