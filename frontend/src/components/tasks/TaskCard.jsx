import React from "react";

const PRIORITY_COLORS = { low: "#22c55e", medium: "#f59e0b", high: "#ef4444" };

export default function TaskCard({ task, onStatusChange, onDelete }) {
  const { _id, title, due_date, priority, status, notes } = task;

  return (
    <div className={`card task-card priority-${priority}`}>
      <div className="card-header">
        <span className="task-title">{title}</span>
        <span
          className="priority-badge"
          style={{ backgroundColor: PRIORITY_COLORS[priority] }}
        >
          {priority}
        </span>
      </div>

      <div className="card-body">
        <p className="detail">
          <span className="label">Due</span> {due_date}
        </p>
        {notes && (
          <p className="detail">
            <span className="label">Notes</span> {notes}
          </p>
        )}
      </div>

      <div className="card-actions">
        <select
          value={status}
          onChange={(e) => onStatusChange(_id, e.target.value)}
          className="status-select"
        >
          {["pending", "in-progress", "done"].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button className="btn-danger" onClick={() => onDelete(_id)}>
          Delete
        </button>
      </div>
    </div>
  );
}