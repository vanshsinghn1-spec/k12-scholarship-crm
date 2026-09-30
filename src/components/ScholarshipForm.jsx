import { useState, useEffect } from 'react';

const EMPTY_FORM = {
  name: '',
  state: '',
  provider: '',
  applicableClass: '',
  eligibility: '',
  amount: '',
  deadline: '',
  officialLink: '',
  status: 'Draft',
};

export default function ScholarshipForm({ scholarship, onSave, onClose }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const isEditing = !!scholarship;

  useEffect(() => {
    if (scholarship) {
      setForm({ ...EMPTY_FORM, ...scholarship });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [scholarship]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Scholarship name is required';
    if (!form.state) newErrors.state = 'State is required';
    if (!form.provider.trim()) newErrors.provider = 'Provider name is required';
    if (!form.applicableClass.trim()) newErrors.applicableClass = 'Applicable class is required';
    if (!form.status) newErrors.status = 'Status is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(form);
  };

  return (
    <div className="modal-overlay" onClick={onClose} id="scholarship-form-modal">
      <div className="modal modal--form" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isEditing ? 'Edit Scholarship' : 'Add Scholarship'}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <form className="modal-body" onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            {/* Scholarship Name */}
            <div className="form-group form-group--full">
              <label className="form-label" htmlFor="form-name">
                Scholarship Name <span className="required">*</span>
              </label>
              <input
                id="form-name"
                className="form-input"
                type="text"
                placeholder="e.g. Post-Matric Scholarship SC ST"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>

            {/* State */}
            <div className="form-group">
              <label className="form-label" htmlFor="form-state">
                State <span className="required">*</span>
              </label>
              <select
                id="form-state"
                className="form-select"
                value={form.state}
                onChange={(e) => handleChange('state', e.target.value)}
              >
                <option value="">Select state</option>
                <option value="Bihar">Bihar</option>
                <option value="Haryana">Haryana</option>
                <option value="Jharkhand">Jharkhand</option>
              </select>
              {errors.state && <span className="form-error">{errors.state}</span>}
            </div>

            {/* Provider */}
            <div className="form-group">
              <label className="form-label" htmlFor="form-provider">
                Provider Name <span className="required">*</span>
              </label>
              <input
                id="form-provider"
                className="form-input"
                type="text"
                placeholder="e.g. Government of Bihar"
                value={form.provider}
                onChange={(e) => handleChange('provider', e.target.value)}
              />
              {errors.provider && <span className="form-error">{errors.provider}</span>}
            </div>

            {/* Applicable Class */}
            <div className="form-group">
              <label className="form-label" htmlFor="form-class">
                Applicable Class <span className="required">*</span>
              </label>
              <input
                id="form-class"
                className="form-input"
                type="text"
                placeholder="e.g. Class 9-10"
                value={form.applicableClass}
                onChange={(e) => handleChange('applicableClass', e.target.value)}
              />
              {errors.applicableClass && <span className="form-error">{errors.applicableClass}</span>}
            </div>

            {/* Deadline */}
            <div className="form-group">
              <label className="form-label" htmlFor="form-deadline">
                Application Deadline
              </label>
              <input
                id="form-deadline"
                className="form-input"
                type="date"
                value={form.deadline}
                onChange={(e) => handleChange('deadline', e.target.value)}
              />
            </div>

            {/* Eligibility */}
            <div className="form-group form-group--full">
              <label className="form-label" htmlFor="form-eligibility">
                Eligibility Criteria
              </label>
              <textarea
                id="form-eligibility"
                className="form-textarea"
                placeholder="Describe the eligibility requirements..."
                value={form.eligibility}
                onChange={(e) => handleChange('eligibility', e.target.value)}
                rows={3}
              />
            </div>

            {/* Amount */}
            <div className="form-group form-group--full">
              <label className="form-label" htmlFor="form-amount">
                Scholarship Amount / Benefit
              </label>
              <input
                id="form-amount"
                className="form-input"
                type="text"
                placeholder="e.g. Up to ₹15,000 per annum"
                value={form.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
              />
            </div>

            {/* Official Link */}
            <div className="form-group">
              <label className="form-label" htmlFor="form-link">
                Official Application Link
              </label>
              <input
                id="form-link"
                className="form-input"
                type="url"
                placeholder="https://..."
                value={form.officialLink}
                onChange={(e) => handleChange('officialLink', e.target.value)}
              />
            </div>

            {/* Status */}
            <div className="form-group">
              <label className="form-label" htmlFor="form-status">
                Status <span className="required">*</span>
              </label>
              <select
                id="form-status"
                className="form-select"
                value={form.status}
                onChange={(e) => handleChange('status', e.target.value)}
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
                <option value="Expired">Expired</option>
              </select>
              {errors.status && <span className="form-error">{errors.status}</span>}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" id="form-submit-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              {isEditing ? 'Save Changes' : 'Add Scholarship'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
