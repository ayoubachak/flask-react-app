from flask_cors import CORS
from app import create_app
from app.extensions import db
from app.extensions import socketio


app = create_app()
CORS(app, resources={r"/api/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5000"]}})
app.app_context().push()

db.create_all()

if __name__ == '__main__':
    socketio.run(app, port=5000, debug=True)
    # app.run(port=5000, debug=True)
