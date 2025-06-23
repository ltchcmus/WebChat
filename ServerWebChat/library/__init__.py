from flask import Flask, request, Blueprint
from .extensions import db
import os
from .model import Users, Message

def create_database(app):
    db_path = os.path.join(app.root_path, "chat.db")
    if not os.path.exists(db_path):
        with app.app_context():
            db.create_all()
            print("✅ Database created!")

    
def create_app(config_file = "config.py"):
    app = Flask(__name__)
    app.config.from_pyfile(config_file)

    db.init_app(app)
    create_database(app)
    return app