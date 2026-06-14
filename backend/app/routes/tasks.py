from flask import Blueprint, request, jsonify
from bson import ObjectId
from bson.errors import InvalidId
from ..database import mongo
from ..models.task import TaskModel

tasks_bp = Blueprint("tasks", __name__)

@tasks_bp.route("/", methods=["GET"])
def get_tasks():
    status = request.args.get("status")
    patient_id = request.args.get("patient_id")
    query = {}
    if status:
        query["status"] = status
    if patient_id:
        query["patient_id"] = patient_id
    docs = list(mongo.db[TaskModel.COLLECTION].find(query).sort("due_date", 1))
    return jsonify([TaskModel.serialize(d) for d in docs]), 200

@tasks_bp.route("/", methods=["POST"])
def create_task():
    data = request.get_json()
    required = ["appointment_id", "patient_id", "title", "due_date"]
    missing = [f for f in required if not data.get(f)]
    if missing:
        return jsonify({"error": f"Missing fields: {missing}"}), 400

    doc = TaskModel.create_document(
        appointment_id=data["appointment_id"],
        patient_id=data["patient_id"],
        title=data["title"],
        due_date=data["due_date"],
        priority=data.get("priority", "medium"),
        notes=data.get("notes", ""),
    )
    result = mongo.db[TaskModel.COLLECTION].insert_one(doc)
    doc["_id"] = str(result.inserted_id)
    return jsonify(doc), 201

@tasks_bp.route("/<task_id>", methods=["PUT"])
def update_task(task_id):
    data = request.get_json()
    allowed = ["title", "due_date", "priority", "status", "notes"]
    updates = {k: data[k] for k in allowed if k in data}
    if not updates:
        return jsonify({"error": "No valid fields to update"}), 400

    from datetime import datetime
    updates["updated_at"] = datetime.utcnow().isoformat()

    try:
        result = mongo.db[TaskModel.COLLECTION].update_one(
            {"_id": ObjectId(task_id)}, {"$set": updates}
        )
    except InvalidId:
        return jsonify({"error": "Invalid ID"}), 400

    if result.matched_count == 0:
        return jsonify({"error": "Task not found"}), 404
    return jsonify({"message": "Updated successfully"}), 200

@tasks_bp.route("/<task_id>", methods=["DELETE"])
def delete_task(task_id):
    try:
        result = mongo.db[TaskModel.COLLECTION].delete_one({"_id": ObjectId(task_id)})
    except InvalidId:
        return jsonify({"error": "Invalid ID"}), 400
    if result.deleted_count == 0:
        return jsonify({"error": "Task not found"}), 404
    return jsonify({"message": "Deleted successfully"}), 200