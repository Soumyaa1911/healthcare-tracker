from flask import Blueprint, request, jsonify
from bson import ObjectId
from bson.errors import InvalidId
from ..database import mongo
from ..models.appointment import AppointmentModel

appointments_bp = Blueprint("appointments", __name__)

@appointments_bp.route("/", methods=["GET"])
def get_appointments():
    patient_id = request.args.get("patient_id")
    query = {"patient_id": patient_id} if patient_id else {}
    docs = list(mongo.db[AppointmentModel.COLLECTION].find(query).sort("date", 1))
    return jsonify([AppointmentModel.serialize(d) for d in docs]), 200

@appointments_bp.route("/<appointment_id>", methods=["GET"])
def get_appointment(appointment_id):
    try:
        doc = mongo.db[AppointmentModel.COLLECTION].find_one({"_id": ObjectId(appointment_id)})
    except InvalidId:
        return jsonify({"error": "Invalid ID"}), 400
    if not doc:
        return jsonify({"error": "Appointment not found"}), 404
    return jsonify(AppointmentModel.serialize(doc)), 200

@appointments_bp.route("/", methods=["POST"])
def create_appointment():
    data = request.get_json()
    required = ["patient_id", "doctor_name", "date", "time", "reason"]
    missing = [f for f in required if not data.get(f)]
    if missing:
        return jsonify({"error": f"Missing fields: {missing}"}), 400

    doc = AppointmentModel.create_document(**{k: data[k] for k in required})
    result = mongo.db[AppointmentModel.COLLECTION].insert_one(doc)
    doc["_id"] = str(result.inserted_id)
    return jsonify(doc), 201

@appointments_bp.route("/<appointment_id>", methods=["PUT"])
def update_appointment(appointment_id):
    data = request.get_json()
    allowed = ["doctor_name", "date", "time", "reason", "status"]
    updates = {k: data[k] for k in allowed if k in data}
    if not updates:
        return jsonify({"error": "No valid fields to update"}), 400

    from datetime import datetime
    updates["updated_at"] = datetime.utcnow().isoformat()

    try:
        result = mongo.db[AppointmentModel.COLLECTION].update_one(
            {"_id": ObjectId(appointment_id)}, {"$set": updates}
        )
    except InvalidId:
        return jsonify({"error": "Invalid ID"}), 400

    if result.matched_count == 0:
        return jsonify({"error": "Appointment not found"}), 404
    return jsonify({"message": "Updated successfully"}), 200

@appointments_bp.route("/<appointment_id>", methods=["DELETE"])
def delete_appointment(appointment_id):
    try:
        result = mongo.db[AppointmentModel.COLLECTION].delete_one({"_id": ObjectId(appointment_id)})
    except InvalidId:
        return jsonify({"error": "Invalid ID"}), 400
    if result.deleted_count == 0:
        return jsonify({"error": "Appointment not found"}), 404
    return jsonify({"message": "Deleted successfully"}), 200