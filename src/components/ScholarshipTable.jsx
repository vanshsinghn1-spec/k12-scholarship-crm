function formatDeadline(dateStr) {
  if (!dateStr) return 'Not stated';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function getDeadlineClass(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const now = new Date();
  if (d < now) return 'deadline-passed';
  const daysLeft = (d - now) / (1000 * 60 * 60 * 24);
  if (daysLeft <= 30) return 'deadline-soon';
  return '';
}

export default function ScholarshipTable({
  scholarships,
  onStatusChange,
  onEdit,
  onPreview,
  onDelete,
}) {
  if (scholarships.length === 0) {
    return (
      <div className="table-container">
        <div className="empty-state">
          <div className="empty-state-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            </svg>
          </div>
          <h3>No scholarships found</h3>
          <p>Try changing the filter or add a new scholarship.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="table-container" id="scholarship-table">
      <div className="table-scroll">
        <table className="scholarship-table">
          <thead>
            <tr>
              <th>Scholarship Name</th>
              <th>State</th>
              <th>Class</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {scholarships.map((s) => (
              <tr key={s.id}>
                <td>
                  <span className="scholarship-name">{s.name}</span>
                </td>
                <td>
                  <span className="scholarship-state">
                    <span className={`state-dot state-dot--${s.state.toLowerCase()}`} />
                    {s.state}
                  </span>
                </td>
                <td>{s.applicableClass}</td>
                <td>
                  <span className={getDeadlineClass(s.deadline)}>
                    {formatDeadline(s.deadline)}
                  </span>
                </td>
                <td>
                  <select
                    className={`status-select status-select--${s.status.toLowerCase()}`}
                    value={s.status}
                    onChange={(e) => onStatusChange(s.id, e.target.value)}
                    aria-label={`Change status for ${s.name}`}
                    id={`status-select-${s.id}`}
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                    <option value="Expired">Expired</option>
                  </select>
                </td>
                <td>
                  <div className="actions-cell">
                    <button
                      className="action-btn action-btn--preview"
                      onClick={() => onPreview(s)}
                      title="Preview student view"
                      aria-label={`Preview ${s.name}`}
                      id={`preview-btn-${s.id}`}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </button>
                    <button
                      className="action-btn action-btn--edit"
                      onClick={() => onEdit(s)}
                      title="Edit scholarship"
                      aria-label={`Edit ${s.name}`}
                      id={`edit-btn-${s.id}`}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <button
                      className="action-btn action-btn--delete"
                      onClick={() => {
                        if (window.confirm(`Delete "${s.name}"?`)) {
                          onDelete(s.id);
                        }
                      }}
                      title="Delete scholarship"
                      aria-label={`Delete ${s.name}`}
                      id={`delete-btn-${s.id}`}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
