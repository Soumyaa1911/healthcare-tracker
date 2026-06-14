from datetime import datetime

class PatientModel:
    COLLECTION = "patients"

    @staticmethod
    def create_document(name: str, dob: str, phone: str,
                        email: str, medical_notes: str = "") -> dict:
        return {
            "name": name,
            "dob": dob,
            "phone": phone,
            "email": email,
            "medical_notes": medical_notes,
            "created_at": datetime.utcnow().isoformat(),
        }

    @staticmethod
    def serialize(doc: dict) -> dict:
        doc["_id"] = str(doc["_id"])
        return doc