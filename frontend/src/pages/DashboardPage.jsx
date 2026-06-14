import React from "react";
import { useAppointments } from "../hooks/useAppointments";
import { useTasks } from "../hooks/useTasks";

export default function DashboardPage({ onNavigate }) {
  const { appointments, loading: aLoading } = useAppointments();
  const { tasks, loading: tLoading } = useTasks();

  const scheduled    = appointments.filter((a) => a.status === "scheduled").length;
  const pendingTasks = tasks.filter((t) => t.status !== "done").length;
  const highPriority = tasks.filter((t) => t.priority === "high" && t.status !== "done").length;

  const stats = [
    { label: "Scheduled Appointments", value: scheduled,    color: "#3b82f6", page: "appointments" },
    { label: "Open Tasks",             value: pendingTasks, color: "#f59e0b", page: "tasks" },
    { label: "High-Priority Tasks",    value: highPriority, color: "#ef4444", page: "tasks" },
  ];

  return (
    <>
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Overview of appointments and follow-up tasks</p>
      </div>

      {(aLoading || tLoading) ? (
        <p className="loading">Loading…</p>
      ) : (
        <div className="card-grid" style={{ maxWidth: 760 }}>
          {stats.map(({ label, value, color, page }) => (
            <div
              key={label}
              className="card"
              style={{ cursor: "pointer", borderTop: `3px solid ${color}` }}
              onClick={() => onNavigate(page)}
            >
              <p style={{ fontSize: "2rem", fontWeight: 700, color }}>{value}</p>
              <p style={{ color: "var(--muted)", fontSize: ".9rem" }}>{label}</p>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 40 }}>
        <h2 style={{ marginBottom: 16 }}>Upcoming Appointments</h2>
        {appointments.filter((a) => a.status === "scheduled").length === 0 ? (
          <p className="empty-msg">No upcoming appointments.</p>
        ) : (
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
            {appointments
              .filter((a) => a.status === "scheduled")
              .slice(0, 5)
              .map((a) => (
                <li key={a._id} className="card" style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
                  <span style={{ fontSize: ".85rem", color: "var(--muted)", minWidth: 90 }}>
                    {a.date} {a.time}
                  </span>
                  <span style={{ fontWeight: 600 }}>{a.doctor_name}</span>
                  <span style={{ color: "var(--muted)", fontSize: ".85rem" }}>— {a.reason}</span>
                </li>
              ))}
          </ul>
        )}
      </div>
    </>
  );
}