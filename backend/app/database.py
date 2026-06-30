from pymongo import MongoClient

client = None
db = None

def init_db(app):
    global client, db
    uri = app.config.get("MONGO_URI")
    client = MongoClient(uri)
    db = client.get_default_database()