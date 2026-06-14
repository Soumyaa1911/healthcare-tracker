const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

export const getAppointments = (patientId) =>
  request(`/appointments/${patientId ? `?patient_id=${patientId}` : ""}`);

export const createAppointment = (payload) =>
  request("/appointments/", { method: "POST", body: JSON.stringify(payload) });

export const updateAppointment = (id, payload) =>
  request(`/appointments/${id}`, { method: "PUT", body: JSON.stringify(payload) });

export const deleteAppointment = (id) =>
  request(`/appointments/${id}`, { method: "DELETE" });

export const getTasks = (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  return request(`/tasks/${params ? `?${params}` : ""}`);
};

export const createTask = (payload) =>
  request("/tasks/", { method: "POST", body: JSON.stringify(payload) });

export const updateTask = (id, payload) =>
  request(`/tasks/${id}`, { method: "PUT", body: JSON.stringify(payload) });

export const deleteTask = (id) =>
  request(`/tasks/${id}`, { method: "DELETE" });

export const getPatients = () => request("/patients/");

export const createPatient = (payload) =>
  request("/patients/", { method: "POST", body: JSON.stringify(payload) });

export const getPatient = (id) => request(`/patients/${id}`);