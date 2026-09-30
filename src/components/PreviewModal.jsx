function formatDeadline(dateStr) {
  if (!dateStr) return 'Not stated';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function PreviewModal({ scholarship, onClose }) {
  const s = scholarship;

  return (
    <div className="modal-overlay" onClick={onClose} id="preview-modal">
      <div className="modal modal--preview" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: 6, color: 'var(--brand-teal)' }}>
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Student Preview
          </h2>
          <button className="modal-close" onClick={onClose} aria-label="Close preview">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className="modal-body" style={{ paddingTop: 16 }}>
          <div className="preview-card">
            {/* Header */}
            <div className="preview-card-header">
              <div className="preview-card-eyebrow">{s.state} Scholarship</div>
              <h3 className="preview-card-title">{s.name}</h3>
              <p className="preview-card-provider">by {s.provider || 'Government Authority'}</p>
            </div>

            {/* Body */}
            <div className="preview-card-body">
              {/* Class */}
              <div className="preview-detail">
                <div className="preview-detail-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c0 2 4 3 6 3s6-1 6-3v-5" />
                  </svg>
                </div>
                <div className="preview-detail-content">
                  <div className="preview-detail-label">Applicable Class</div>
                  <div className="preview-detail-value">{s.applicableClass}</div>
                </div>
              </div>

              {/* Deadline */}
              <div className="preview-detail">
                <div className="preview-detail-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                </div>
                <div className="preview-detail-content">
                  <div className="preview-detail-label">Application Deadline</div>
                  <div className="preview-detail-value">{formatDeadline(s.deadline)}</div>
                </div>
              </div>

              {/* Eligibility */}
              {s.eligibility && (
                <div className="preview-detail">
                  <div className="preview-detail-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="m16 11 2 2 4-4" />
                    </svg>
                  </div>
                  <div className="preview-detail-content">
                    <div className="preview-detail-label">Eligibility</div>
                    <div className="preview-detail-value">{s.eligibility}</div>
                  </div>
                </div>
              )}

              {/* Amount */}
              {s.amount && (
                <div className="preview-detail">
                  <div className="preview-detail-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                  <div className="preview-detail-content">
                    <div className="preview-detail-label">Scholarship Amount</div>
                    <div className="preview-detail-value">{s.amount}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="preview-card-footer">
              <a
                href={s.officialLink || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="preview-apply-btn"
                onClick={(e) => { if (!s.officialLink) e.preventDefault(); }}
              >
                Apply Now
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
