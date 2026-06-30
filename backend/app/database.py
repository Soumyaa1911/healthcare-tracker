from pymongo import MongoClient
import certifi

client = None
db = None

def init_db(app):
    global client, db
    uri = app.config.get("MONGO_URI")
    client = MongoClient(uri, tlsCAFile=certifi.where())
    db = client["healthcare_tracker"]