from datetime import datetime

class AppointmentModel:
    COLLECTION = "appointments"
    STATUS_OPTIONS = ["scheduled", "completed", "cancelled", "no-show"]

    @staticmethod
    def create_document(patient_id: str, doctor_name: str, date: str,
                        time: str, reason: str, status: str = "scheduled") -> dict:
        return {
            "patient_id": patient_id,
            "doctor_name": doctor_name,
            "date": date,
            "time": time,
            "reason": reason,
            "status": status,
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat(),
        }

    @staticmethod
    def serialize(doc: dict) -> dict:
        doc["_id"] = str(doc["_id"])
        return doc