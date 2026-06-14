import React, { useState } from "react";
import AppointmentsPage from "./pages/AppointmentsPage";
import TasksPage from "./pages/TasksPage";
import DashboardPage from "./pages/DashboardPage";

const NAV = [
  { key: "dashboard", label: "📊 Dashboard" },
  { key: "appointments", label: "📅 Appointments" },
  { key: "tasks", label: "✅ Tasks" },
];

export default function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-logo">🏥 HealthTrack</div>
        {NAV.map(({ key, label }) => (
          <button
            key={key}
            className={`nav-link ${page === key ? "active" : ""}`}
            onClick={() => setPage(key)}
          >
            {label}
          </button>
        ))}
      </aside>

      <main className="main-content">
        {page === "dashboard"    && <DashboardPage onNavigate={setPage} />}
        {page === "appointments" && <AppointmentsPage />}
        {page === "tasks"        && <TasksPage />}
      </main>
    </div>
  );
}