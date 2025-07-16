import os
from flask import send_file, request,jsonify
from werkzeug.utils import secure_filename

constPath = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'instance', 'avatars')
constExt = ['jpg', 'jpeg', 'png', 'webp']

def service_update_avatar(request):
    if 'avatar' not in request.files: 
        return {'error': 'Trường avatar không tồn tại'}, 400
    if 'username' not in request.form:
        return {'error': 'Trường username không tồn tại'}, 400

    file = request.files['avatar'] #object ảnh
    username = request.form['username']

    try:
        for ext in constExt:
            old_path = os.path.join(constPath, f"{username}.{ext}")
            if os.path.exists(old_path):
                os.remove(old_path)


        filename = secure_filename(file.filename)
        ext = os.path.splitext(filename)[1].lower()  # bao gồm dấu chấm: '.jpg'

    
        save_path = os.path.join(constPath, f"{username}{ext}")
        file.save(save_path)

        return {'message': 'success'}, 200

    except Exception as e:
        return {'error': 'Fail', 'message': str(e)}, 500

def service_get_avatar(username):
 
    for ext in constExt:
        path = os.path.join(constPath, f"{username}.{ext}")
        if os.path.exists(path):
            return send_file(path)

    fallback = os.path.join(constPath, 'noimage.png')
    return send_file(fallback)
