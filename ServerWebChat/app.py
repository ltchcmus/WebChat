from library import create_app



app = create_app()

@app.route("/")
def welcome():
    return "Trang Backend created by Lê Thành Công"

if __name__ == '__main__':
    app.run(debug=True)