from flask import Flask
from flask_cors import CORS
from app.extensions import db
from app.api.views import html_views, api_bp
from app.extensions import socketio

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.development')  # Change to the appropriate config file

    # CORS(app)
    socketio.init_app(app)
    db.init_app(app)

    app.register_blueprint(api_bp)
    app.register_blueprint(html_views)

    return app
