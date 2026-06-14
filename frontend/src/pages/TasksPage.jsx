import React, { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import TaskCard from "../components/tasks/TaskCard";

const INITIAL_FORM = {
  appointment_id: "",
  patient_id: "",
  title: "",
  due_date: "",
  priority: "medium",
  notes: "",
};

export default function TasksPage() {
  const [filter, setFilter] = useState("all");
  const { tasks, loading, error, add, update, remove } = useTasks(
    filter !== "all" ? { status: filter } : {}
  );
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await add(form);
      setForm(INITIAL_FORM);
      setShowForm(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1>Tasks</h1>
          <p>Track follow-up tasks for each appointment</p>
        </div>
        <button className="btn-primary" onClick={() => setShowForm((v) => !v)}>
          {showForm ? "Cancel" : "+ New Task"}
        </button>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {["all", "pending", "in-progress", "done"].map((s) => (
          <button
            key={s}
            className={`nav-link ${filter === s ? "active" : ""}`}
            style={{ width: "auto", padding: "6px 14px" }}
            onClick={() => setFilter(s)}
          >
            {s}
          </button>
        ))}
      </div>

      {showForm && (
        <div className="form-container">
          <h2>New Task</h2>
          <div className="form-grid">
            {[
              { name: "title", label: "Title", type: "text", placeholder: "e.g. Follow-up blood test" },
              { name: "due_date", label: "Due Date", type: "date" },
              { name: "appointment_id", label: "Appointment ID", type: "text", placeholder: "MongoDB ObjectId" },
              { name: "patient_id", label: "Patient ID", type: "text", placeholder: "MongoDB ObjectId" },
            ].map(({ name, label, type, placeholder }) => (
              <div className="form-group" key={name}>
                <label>{label}</label>
                <input
                  name={name}
                  type={type}
                  value={form[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  required
                />
              </div>
            ))}

            <div className="form-group">
              <label>Priority</label>
              <select name="priority" value={form.priority} onChange={handleChange}>
                {["low", "medium", "high"].map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div className="form-group full-width">
              <label>Notes</label>
              <textarea name="notes" value={form.notes} onChange={handleChange} rows={2} />
            </div>
          </div>

          <button className="btn-primary" onClick={handleSubmit} disabled={submitting} style={{ marginTop: 16 }}>
            {submitting ? "Saving…" : "Add Task"}
          </button>
        </div>
      )}

      {error && <p className="error-msg">{error}</p>}
      {loading && <p className="loading">Loading tasks…</p>}
      {!loading && tasks.length === 0 && <p className="empty-msg">No tasks found.</p>}

      <div className="card-grid">
        {tasks.map((t) => (
          <TaskCard
            key={t._id}
            task={t}
            onStatusChange={(id, status) => update(id, { status })}
            onDelete={remove}
          />
        ))}
      </div>
    </>
  );
}