import { useState, useCallback } from 'react';
import './index.css';
import initialData from './data/scholarships';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import FilterBar from './components/FilterBar';
import ScholarshipTable from './components/ScholarshipTable';
import ScholarshipForm from './components/ScholarshipForm';
import PreviewModal from './components/PreviewModal';
import Toast from './components/Toast';

function App() {
  const [scholarships, setScholarships] = useState(initialData);
  const [stateFilter, setStateFilter] = useState('All');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formModal, setFormModal] = useState({ open: false, scholarship: null });
  const [previewModal, setPreviewModal] = useState({ open: false, scholarship: null });
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const filteredScholarships = stateFilter === 'All'
    ? scholarships
    : scholarships.filter((s) => s.state === stateFilter);

  const counts = {
    total: scholarships.length,
    published: scholarships.filter((s) => s.status === 'Published').length,
    draft: scholarships.filter((s) => s.status === 'Draft').length,
    expired: scholarships.filter((s) => s.status === 'Expired').length,
  };

  const handleStatusChange = useCallback((id, newStatus) => {
    setScholarships((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    );
    showToast(`Status updated to ${newStatus}`);
  }, [showToast]);

  const handleSave = useCallback((scholarship) => {
    if (scholarship.id) {
      setScholarships((prev) =>
        prev.map((s) => (s.id === scholarship.id ? scholarship : s))
      );
      showToast('Scholarship updated successfully');
    } else {
      const newScholarship = {
        ...scholarship,
        id: Math.max(0, ...scholarships.map((s) => s.id)) + 1,
      };
      setScholarships((prev) => [...prev, newScholarship]);
      showToast('Scholarship added successfully');
    }
    setFormModal({ open: false, scholarship: null });
  }, [scholarships, showToast]);

  const handleDelete = useCallback((id) => {
    setScholarships((prev) => prev.filter((s) => s.id !== id));
    showToast('Scholarship deleted', 'info');
  }, [showToast]);

  return (
    <div className="app-layout">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <main className="main-content">
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          onAddClick={() => setFormModal({ open: true, scholarship: null })}
        />

        <section className="dashboard-content">
          <SummaryCards counts={counts} />

          <FilterBar
            activeFilter={stateFilter}
            onFilterChange={setStateFilter}
          />

          <ScholarshipTable
            scholarships={filteredScholarships}
            onStatusChange={handleStatusChange}
            onEdit={(s) => setFormModal({ open: true, scholarship: s })}
            onPreview={(s) => setPreviewModal({ open: true, scholarship: s })}
            onDelete={handleDelete}
          />
        </section>
      </main>

      {formModal.open && (
        <ScholarshipForm
          scholarship={formModal.scholarship}
          onSave={handleSave}
          onClose={() => setFormModal({ open: false, scholarship: null })}
        />
      )}

      {previewModal.open && (
        <PreviewModal
          scholarship={previewModal.scholarship}
          onClose={() => setPreviewModal({ open: false, scholarship: null })}
        />
      )}

      <Toast toasts={toasts} />
    </div>
  );
}

export default App;
