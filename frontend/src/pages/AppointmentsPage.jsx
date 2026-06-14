import React, { useEffect, useState } from "react";
import { useAppointments } from "../hooks/useAppointments";
import AppointmentCard from "../components/appointments/AppointmentCard";
import AppointmentForm from "../components/appointments/AppointmentForm";
import { getPatients } from "../utils/api";

export default function AppointmentsPage() {
  const { appointments, loading, error, add, update, remove } = useAppointments();
  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getPatients().then(setPatients).catch(() => {});
  }, []);

  const handleStatusChange = (id, status) => update(id, { status });

  return (
    <>
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1>Appointments</h1>
          <p>Schedule and manage patient appointments</p>
        </div>
        <button className="btn-primary" onClick={() => setShowForm((v) => !v)}>
          {showForm ? "Cancel" : "+ New Appointment"}
        </button>
      </div>

      {showForm && (
        <AppointmentForm
          patients={patients}
          onSubmit={async (payload) => {
            await add(payload);
            setShowForm(false);
          }}
        />
      )}

      {error && <p className="error-msg">{error}</p>}
      {loading && <p className="loading">Loading appointments…</p>}

      {!loading && appointments.length === 0 && (
        <p className="empty-msg">No appointments yet. Create one above.</p>
      )}

      <div className="card-grid">
        {appointments.map((a) => (
          <AppointmentCard
            key={a._id}
            appointment={a}
            onStatusChange={handleStatusChange}
            onDelete={remove}
          />
        ))}
      </div>
    </>
  );
}