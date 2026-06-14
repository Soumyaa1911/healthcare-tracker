import React from "react";

const STATUS_COLORS = {
  scheduled: "#3b82f6",
  completed: "#22c55e",
  cancelled: "#ef4444",
  "no-show": "#f97316",
};

export default function AppointmentCard({ appointment, onStatusChange, onDelete }) {
  const { _id, doctor_name, date, time, reason, status } = appointment;

  return (
    <div className="card">
      <div className="card-header">
        <span className="doctor-name">{doctor_name}</span>
        <span
          className="status-badge"
          style={{ backgroundColor: STATUS_COLORS[status] || "#6b7280" }}
        >
          {status}
        </span>
      </div>

      <div className="card-body">
        <p className="detail">
          <span className="label">Date & Time</span>
          {date} at {time}
        </p>
        <p className="detail">
          <span className="label">Reason</span>
          {reason}
        </p>
      </div>

      <div className="card-actions">
        <select
          value={status}
          onChange={(e) => onStatusChange(_id, e.target.value)}
          className="status-select"
        >
          {["scheduled", "completed", "cancelled", "no-show"].map((s) => (
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