import { useState, useEffect, useCallback } from "react";
import {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "../utils/api";

export function useAppointments(patientId = null) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAppointments(patientId);
      setAppointments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [patientId]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const add = async (payload) => {
    const created = await createAppointment(payload);
    setAppointments((prev) => [...prev, created]);
    return created;
  };

  const update = async (id, payload) => {
    await updateAppointment(id, payload);
    await fetchAll();
  };

  const remove = async (id) => {
    await deleteAppointment(id);
    setAppointments((prev) => prev.filter((a) => a._id !== id));
  };

  return { appointments, loading, error, add, update, remove, refetch: fetchAll };
}