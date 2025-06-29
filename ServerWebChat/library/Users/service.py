from flask import  jsonify, request
from library.model import Users
from library.extensions import db
def service_create_user(data):
    user = Users(data["username"], data["password"], data["email"])
    try:
        db.session.add(user)
    except:
        db.session.rollback()
        return {"error" : "User already exists"}, 500