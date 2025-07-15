from library import init
from library.extensions import socketio, app



@app.route("/")
def welcome():
    return "Trang Backend created by Lê Thành Công"

if __name__ == '__main__':
    init()
    socketio.run(app, 
                host='127.0.0.1', 
                port=5000, 
                debug=True,
                allow_unsafe_werkzeug=True)