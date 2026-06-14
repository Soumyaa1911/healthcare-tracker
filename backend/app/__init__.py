from flask import Flask
from flask_cors import CORS
from .config import Config
from .database import mongo

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    CORS(app)
    mongo.init_app(app)

    from .routes.appointments import appointments_bp
    from .routes.tasks import tasks_bp
    from .routes.patients import patients_bp

    app.register_blueprint(appointments_bp, url_prefix="/api/appointments")
    app.register_blueprint(tasks_bp, url_prefix="/api/tasks")
    app.register_blueprint(patients_bp, url_prefix="/api/patients")

    return app
