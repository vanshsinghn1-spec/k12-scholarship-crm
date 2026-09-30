# K12 Hunar — Scholarship CRM Demo

A frontend demo for the **K12 Hunar Scholarship Management CRM**, built as part of the Frontend Developer Assessment.

- **Live Demo**: [https://vanshsinghn1-spec.github.io/k12-scholarship-crm/](https://vanshsinghn1-spec.github.io/k12-scholarship-crm/)
- **Repository**: [https://github.com/vanshsinghn1-spec/k12-scholarship-crm](https://github.com/vanshsinghn1-spec/k12-scholarship-crm)

## Features

- **Dashboard Summary Cards** — Total Scholarships, Published, Draft, and Expired at a glance.
- **State Filters** — Filter scholarships by Bihar, Haryana, and Jharkhand (or view All).
- **Scholarship Table** — View all scholarship records with name, state, class, deadline, and status.
- **Inline Status Change** — Change a scholarship's status between Published, Draft, and Expired directly from the table.
- **Add / Edit Scholarship** — A form with all required fields: name, state, provider, applicable class, eligibility criteria, amount, deadline, official link, and status.
- **Student Preview** — A "Preview" button shows how a scholarship card would appear to students, including eligibility, amount, deadline, and an apply link.
- **Responsive Design** — Works on desktop, tablet, and mobile views.
- **Form Validation** — Required fields are validated before submission.
- **Toast Notifications** — Feedback on actions (add, edit, status change, delete).

## Tech Stack

- **React** (via Vite) — component-based UI
- **Vanilla CSS** — custom design system with CSS variables, no Tailwind
- **Local JS data** — sample scholarship records stored in `src/data/scholarships.js`

## How to Run

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

The app will open at `http://localhost:5173` (or the next available port).

## Project Structure

```
scholarship-crm/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx              # Entry point
│   ├── App.jsx               # Root component with state management
│   ├── index.css             # Design system & all styles
│   ├── data/
│   │   └── scholarships.js   # 9 sample scholarship records
│   └── components/
│       ├── Sidebar.jsx       # Sidebar navigation
│       ├── Header.jsx        # Top header with Add button
│       ├── SummaryCards.jsx   # 4 summary cards
│       ├── FilterBar.jsx     # State filter chips
│       ├── ScholarshipTable.jsx  # Table with inline status & actions
│       ├── ScholarshipForm.jsx   # Add/Edit modal form
│       ├── PreviewModal.jsx      # Student-facing preview
│       └── Toast.jsx             # Toast notifications
```

## How Key Features Work

### State Filter
Clicking a filter chip (All / Bihar / Haryana / Jharkhand) filters the scholarship list by the selected state. The "All" chip resets the filter to show every record.

### Status Change
Each table row has a dropdown `<select>` styled as a status badge. Changing it immediately updates the scholarship's status in the app state and shows a toast notification.

### Add / Edit Form
Clicking "Add Scholarship" opens a modal form with fields for name, state, provider, class, eligibility, amount, deadline, link, and status. When editing, the form is pre-filled with the existing data. Required fields are validated on submit.

### Student Preview
The eye icon in the Actions column opens a modal that simulates how the scholarship would look to a student — a styled card with the scholarship name, provider, class, deadline, eligibility, amount, and an "Apply Now" button linked to the official URL.

## AI Tools & References Used

- **Google Gemini / Antigravity IDE** — Used for scaffolding the project structure, generating components, and writing CSS.
- **K12 Hunar website** (https://www.k12hunar.com/scholarships) — Referenced for design inspiration and card layout.
- **Vite** (https://vitejs.dev) — Build tool and dev server.

## Notes

- This is a **frontend-only demo** — no backend, authentication, or payment features.
- Data is stored in-memory; refreshing the page resets to the 9 sample records.
- Designed to be a small, complete, working demo rather than a large unfinished project.
