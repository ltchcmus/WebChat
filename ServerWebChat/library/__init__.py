from .extensions import db, mail, app, socketio
import os
from .Users.controller import users
from .Message.controller import message
from flask_cors import CORS



def create_database(app):

    if not os.path.exists(os.path.join(app.root_path,"..", "instance", "chat.db")):
        with app.app_context():
            db.create_all()
            print("✅ Database created!")
  

    
def init(config_file = "config.py"):
    CORS(app)
    app.config.from_pyfile(config_file)

    db.init_app(app)
    mail.init_app(app)
    socketio.init_app(app, cors_allowed_origins='*')
    from library.Websocket import controller
    create_database(app)
    app.register_blueprint(users)
    app.register_blueprint(message)