from flask import Blueprint, request
from .service import *
message = Blueprint("message", __name__)

@message.route("/api/message/add", methods = ["POST"])
def add_message():
    return service_add_message(request.get_json())

@message.route("/api/message/get", methods = ["POST"])
def get_message():
    return service_get_message(request.get_json())


