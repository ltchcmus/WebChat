from flask import Blueprint, request
from .service import *
users = Blueprint("users", __name__)
@users.route("/api/users/CreateUser", methods = ["POST"])
def create_user():
    return service_create_user(request.get_json())



