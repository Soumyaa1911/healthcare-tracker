from datetime import datetime

class TaskModel:
    COLLECTION = "tasks"
    PRIORITY_OPTIONS = ["low", "medium", "high"]
    STATUS_OPTIONS = ["pending", "in-progress", "done"]

    @staticmethod
    def create_document(appointment_id: str, patient_id: str, title: str,
                        due_date: str, priority: str = "medium",
                        notes: str = "") -> dict:
        return {
            "appointment_id": appointment_id,
            "patient_id": patient_id,
            "title": title,
            "due_date": due_date,
            "priority": priority,
            "status": "pending",
            "notes": notes,
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat(),
        }

    @staticmethod
    def serialize(doc: dict) -> dict:
        doc["_id"] = str(doc["_id"])
        return doc