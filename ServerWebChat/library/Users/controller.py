from flask import Blueprint, request
from .service import *
users = Blueprint("users", __name__)
@users.route("/api/users/create-user", methods = ["POST"])
def create_user():
    return service_create_user(request.get_json())



@users.route("/api/users/confirm-user-ok", methods = ["POST"])
def confirm_user_ok():
    return service_confirm_user_ok(request.get_json())

@users.route("/api/users/confirm-user-send-again", methods = ["POST"])
def confirm_user_send_again():
    return service_confirm_user_send_again(request.get_json())


@users.route("/api/users/login-user", methods = ["POST"])
def login_user():
    return service_login_user(request.get_json())