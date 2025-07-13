from flask import  jsonify, request
from library.model import Users, Message
from library.extensions import db, mail
import random
from flask_mail import Message


def sendMail(email,code):
    msg = Message(
        subject="Mã xác thực tài khoản",
        recipients=[email],
        body= f"Mã xác thực của bạn là: {code}",
    )

    mail.send(msg)


def service_create_user(data):
    user = Users(data["username"], data["password"], data["email"])
    try:
        check = Users.query.filter_by(username = data["username"]).first()
        if(check):
            return {"error": "User already exists"}, 500
        user.code = random.randint(100000, 999999)
        db.session.add(user)
        db.session.commit()
        sendMail(data["email"], user.code)
        return {"message" : "Success"}, 200
    except:
        db.session.rollback()
        return {"error" : "add fail"}, 500

def service_confirm_user_ok(data):
    try:

        username = data["username"]
        user = Users.query.filter_by(username = username).first()
        print(user.code) 
        if(user.code != int(data["code"])):
            return {"error" : "invalid code"}, 500

        user.isvalid = True
        db.session.commit()
        return {"message" : "success"}, 200
        
    except:
        return {"error" : "Fail"}, 500


def service_confirm_user_send_again(data):
    try:
        user = Users.query.filter_by(username = data["username"]).first()
        if user:
            user.code = random.randint(100000, 999999)
            db.session.commit()
            sendMail(user.email, user.code)
            return {"message" : "success"} ,200
        else:
            return {"error" : "not exists user"}, 500
    except:
        return {"error" : "Fail"}, 500


def service_login_user(data):
    try:
        
        user = Users.query.filter_by(username = data["username"]).first()
        if user:
            if user.password != data["password"]: return {"error" : "Wrong username or password"}, 500

            return {"message": "success", "isvalid" : user.isvalid}, 200

        else:
            return {"error" : "Wrong username or password"}, 500
    except:
        return {"error" : "Fail"}, 500
    
def service_search_user(name):
    try:
        users = Users.query.filter(Users.username.like(f"%{name}%")).all()
        ans = []
        for user in users:
            ans.append(user.username)
        print(ans)
        return {"message": "success", "data" : ans}, 200
    except:
        return {"error" : "Fail"}, 500
    
def service_get_all_user():
    try:
        users = Users.query.all()
        
        ans = []
        for user in users:
            ans.append(user.username)

        return {"message" : "success", "data" : ans} , 200

    except:
        return {"error" : "Fail"}, 500