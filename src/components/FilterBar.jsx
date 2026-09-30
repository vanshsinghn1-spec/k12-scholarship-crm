const STATES = ['All', 'Bihar', 'Haryana', 'Jharkhand'];

export default function FilterBar({ activeFilter, onFilterChange }) {
  return (
    <div className="controls-bar" id="filter-bar">
      <div className="filter-group">
        <span className="filter-label">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: 4 }}>
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          Filter by State:
        </span>
        {STATES.map((state) => (
          <button
            key={state}
            className={`filter-chip${activeFilter === state ? ' active' : ''}`}
            onClick={() => onFilterChange(state)}
            id={`filter-${state.toLowerCase()}`}
          >
            {state !== 'All' && (
              <span
                className={`state-dot state-dot--${state.toLowerCase()}`}
                style={{ display: activeFilter === state ? 'none' : 'inline-block' }}
              />
            )}
            {state}
          </button>
        ))}
      </div>
    </div>
  );
}
