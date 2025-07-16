from .extensions import db
from datetime import datetime, timezone
class Users(db.Model):
    id = db.Column(db.Integer, primary_key= True)
    username = db.Column(db.String(80), unique = True, nullable = False)
    password = db.Column(db.String(128), nullable = False)
    email = db.Column(db.String(128), nullable = False)
    create_at = db.Column(db.DateTime, default = datetime.now(timezone.utc))
    isvalid = db.Column(db.Boolean, default = False)
    code = db.Column(db.Integer, nullable = False)
    def __init__(self, username, password, email):
        self.username = username
        self.password = password
        self.email = email
    

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.String(80), db.ForeignKey('users.username'), nullable=False)
    receiver_id = db.Column(db.String(80), db.ForeignKey('users.username'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    #is_read = db.Column(db.Boolean, default=False)
    def __init__(self, sender_id, receiver_id, content):
        self.sender_id = sender_id
        self.receiver_id = receiver_id
        self.content = content

    
    
