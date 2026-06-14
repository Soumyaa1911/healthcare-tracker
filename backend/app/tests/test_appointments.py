import json
import pytest
from unittest.mock import patch, MagicMock
from app import create_app
from app.config import TestingConfig

@pytest.fixture
def client():
    app = create_app(TestingConfig)
    with app.test_client() as client:
        yield client

SAMPLE_APPOINTMENT = {
    "patient_id": "patient123",
    "doctor_name": "Dr. Smith",
    "date": "2024-08-01",
    "time": "09:00",
    "reason": "Annual check-up",
}

def test_create_appointment_success(client):
    with patch("app.routes.appointments.mongo") as mock_mongo:
        inserted = MagicMock()
        inserted.inserted_id = "507f1f77bcf86cd799439011"
        mock_mongo.db.__getitem__.return_value.insert_one.return_value = inserted

        resp = client.post(
            "/api/appointments/",
            data=json.dumps(SAMPLE_APPOINTMENT),
            content_type="application/json",
        )
        assert resp.status_code == 201
        body = resp.get_json()
        assert body["doctor_name"] == "Dr. Smith"
        assert body["status"] == "scheduled"

def test_create_appointment_missing_field(client):
    incomplete = {k: v for k, v in SAMPLE_APPOINTMENT.items() if k != "reason"}
    resp = client.post(
        "/api/appointments/",
        data=json.dumps(incomplete),
        content_type="application/json",
    )
    assert resp.status_code == 400
    assert "Missing fields" in resp.get_json()["error"]

def test_get_appointments(client):
    with patch("app.routes.appointments.mongo") as mock_mongo:
        mock_mongo.db.__getitem__.return_value.find.return_value.sort.return_value = []
        resp = client.get("/api/appointments/")
        assert resp.status_code == 200
        assert isinstance(resp.get_json(), list)

def test_delete_nonexistent_appointment(client):
    with patch("app.routes.appointments.mongo") as mock_mongo:
        result = MagicMock()
        result.deleted_count = 0
        mock_mongo.db.__getitem__.return_value.delete_one.return_value = result

        resp = client.delete("/api/appointments/507f1f77bcf86cd799439011")
        assert resp.status_code == 404