from pymongo import MongoClient
import os

client = None
db = None

def init_db(app):
    global client, db
    uri = app.config.get("MONGO_URI")
    client = MongoClient(uri, tls=True, tlsAllowInvalidCertificates=True)
    db = client["healthcare_tracker"]