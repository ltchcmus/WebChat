from flask import Flask
from .extensions import db, mail
import os
from .Users.controller import users
from .Message.controller import message
from flask_cors import CORS



def create_database(app):

    if not os.path.exists(os.path.join(app.root_path,"..", "instance", "chat.db")):
        with app.app_context():
            db.create_all()
            print("✅ Database created!")
  

    
def create_app(config_file = "config.py"):
    app = Flask(__name__)
    CORS(app)
    app.config.from_pyfile(config_file)

    db.init_app(app)
    mail.init_app(app)
    create_database(app)
    app.register_blueprint(users)
    app.register_blueprint(message)
    return app