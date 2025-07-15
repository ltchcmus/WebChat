from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail
from flask_socketio import SocketIO, emit
from flask import Flask
from threading import Lock
app = Flask(__name__)
db = SQLAlchemy()
mail = Mail()
socketio = SocketIO(cors_allowed_origins='*')
lock = Lock()
userConnects = set()
fIdToUserName = dict()
