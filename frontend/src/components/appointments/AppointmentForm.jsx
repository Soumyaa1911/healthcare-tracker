import React, { useState } from "react";

const INITIAL = {
  patient_id: "",
  doctor_name: "",
  date: "",
  time: "",
  reason: "",
};

export default function AppointmentForm({ onSubmit, patients = [] }) {
  const [form, setForm] = useState(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await onSubmit(form);
      setForm(INITIAL);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h2>New Appointment</h2>
      {error && <p className="error-msg">{error}</p>}

      <div className="form-grid">
        <div className="form-group">
          <label>Patient</label>
          <select name="patient_id" value={form.patient_id} onChange={handleChange} required>
            <option value="">Select patient</option>
            {patients.map((p) => (
              <option key={p._id} value={p._id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Doctor</label>
          <input
            name="doctor_name"
            value={form.doctor_name}
            onChange={handleChange}
            placeholder="Dr. Name"
            required
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input type="date" name="date" value={form.date} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Time</label>
          <input type="time" name="time" value={form.time} onChange={handleChange} required />
        </div>

        <div className="form-group full-width">
          <label>Reason</label>
          <textarea
            name="reason"
            value={form.reason}
            onChange={handleChange}
            placeholder="Purpose of appointment"
            rows={3}
            required
          />
        </div>
      </div>

      <button className="btn-primary" onClick={handleSubmit} disabled={submitting}>
        {submitting ? "Saving…" : "Book Appointment"}
      </button>
    </div>
  );
}