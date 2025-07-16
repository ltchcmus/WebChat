from library.extensions import socketio, lock, userConnects, fIdToUserName, fUserNameToId
from flask_socketio import emit, disconnect
from flask import request, jsonify  # ✅ thêm import jsonify

@socketio.on('connect')
def handle_connect(auth):
    print('🔌 User attempting to connect')
    print('📝 Auth data:', auth)
    
    try:
        with lock:
            token = auth.get('token') if auth else None
            print("🔑 TOKEN:", token)
            
            if not token:
                print("❌ No token provided, disconnecting")
                disconnect()
                return {'status': 'error', 'message': 'No token provided'}  # ✅ thêm jsonify ở đây
                
            userConnects.add(token)
            fIdToUserName[request.sid] = token
            fUserNameToId[token] = request.sid
            print(f"✅ User {token} connected with session ID: {request.sid}")
            print(f"👥 Total connected users: {len(userConnects)}")
            
            emit('connect_response', {
                'status': 'success', 
                'message': 'Connected successfully',
                'user': token
            })
            
    except Exception as e:
        print(f"❌ Error during connection: {e}")
        disconnect()
        return {'status': 'error', 'message': 'Internal server error'}  # ✅ thêm jsonify ở đây

@socketio.on('disconnect')
def handle_disconnect(reason):
    print('🔌 User disconnected with reason', reason)
    try:
        with lock:
            if request.sid in fIdToUserName:
                token = fIdToUserName[request.sid]
                del fIdToUserName[request.sid]
                del fUserNameToId[token]
                userConnects.discard(token)
                print(f"✅ User {token} disconnected")
                print(f"👥 Total connected users: {len(userConnects)}")
    except Exception as e:
        print(f"❌ Error during disconnection: {e}")

@socketio.on_error_default
def default_error_handler(e):
    print(f"❌ SocketIO error: {e}")


@socketio.on('private_Message')
def handle_private_message(data):
    sender = data['sender']
    receive = data['receive']
    mess = data['mess']
    id_receive = fUserNameToId[receive]

    if id_receive:
        emit('receive_message', {
            'user' : sender,
            'data' : mess
        }, room = id_receive)

    