from flask import Blueprint, request, jsonify
from bson import ObjectId
from bson.errors import InvalidId
from ..database import mongo
from ..models.patient import PatientModel

patients_bp = Blueprint("patients", __name__)

@patients_bp.route("/", methods=["GET"])
def get_patients():
    docs = list(mongo.db[PatientModel.COLLECTION].find().sort("name", 1))
    return jsonify([PatientModel.serialize(d) for d in docs]), 200

@patients_bp.route("/", methods=["POST"])
def create_patient():
    data = request.get_json()
    required = ["name", "dob", "phone", "email"]
    missing = [f for f in required if not data.get(f)]
    if missing:
        return jsonify({"error": f"Missing fields: {missing}"}), 400

    doc = PatientModel.create_document(
        name=data["name"],
        dob=data["dob"],
        phone=data["phone"],
        email=data["email"],
        medical_notes=data.get("medical_notes", ""),
    )
    result = mongo.db[PatientModel.COLLECTION].insert_one(doc)
    doc["_id"] = str(result.inserted_id)
    return jsonify(doc), 201

@patients_bp.route("/<patient_id>", methods=["GET"])
def get_patient(patient_id):
    try:
        doc = mongo.db[PatientModel.COLLECTION].find_one({"_id": ObjectId(patient_id)})
    except InvalidId:
        return jsonify({"error": "Invalid ID"}), 400
    if not doc:
        return jsonify({"error": "Patient not found"}), 404
    return jsonify(PatientModel.serialize(doc)), 200