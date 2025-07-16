from library.model import Message
from library.extensions import db


def service_add_message(data):
    if 'username1' not in data:
        return {'error' : 'Thiếu username1'}, 500
    if 'username2' not in data:
        return {'error' :'Thiếu username2'}, 500
    if 'mess' not in data:
        return {'error' : 'Thiếu message'}, 500

    try:
        sender = data['username1']
        receive = data['username2']
        mess = data['mess']
        newMess = Message(sender, receive, mess)
        db.session.add(newMess)
        db.session.commit()
        
        return {'message' :"success"}, 200
    except Exception as e:
        return {'error' : 'Fail', 'mess' : str(e)}, 500    
    

def service_get_message(data):
    if 'username1' not in data:
        return {'error' : 'Thiếu username1'}, 500
    if 'username2' not in data:
        return {'error' :'Thiếu username2'}, 500
    try:
        user1 = data['username1']
        user2 = data['username2']
        messagesUser1 = Message.query.filter(Message.sender_id == user1, Message.receiver_id == user2).all()
        messagesUser2 = Message.query.filter(Message.sender_id == user2, Message.receiver_id == user1).all()
        messages = messagesUser1 + messagesUser2
        messages.sort(key = lambda msg : msg.timestamp)
        list_mess = []
        for msg in messages:
            list_mess.append({'user' : msg.sender_id, 'data' : msg.content})

        return {'message' : 'success', 'data': list_mess}, 200
    except Exception as e:
        return {'error' : 'Fail', 'mess' : str(e)}, 500  