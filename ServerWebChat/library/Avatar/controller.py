from flask import Blueprint, request
from .service import *
avatar = Blueprint("avatar", __name__)


@avatar.route("/api/avatar/update", methods = ["POST"])
def update_avatar():
    # user này đang online
    return service_update_avatar(request)

@avatar.route("/api/avatar/get/q=<username>")
def get_avatar(username):
    return service_get_avatar(username)