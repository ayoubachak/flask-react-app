from flask import Blueprint

api_bp = Blueprint('api', __name__)
html_views = Blueprint('HTML Views', __name__, template_folder='../templates', static_folder='../static', url_prefix='/')

from app.api import views
