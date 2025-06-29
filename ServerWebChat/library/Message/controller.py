from flask import Blueprint

message = Blueprint("message", __name__)

@message.route("/api/mess")
def hello():
    return "hello mess"