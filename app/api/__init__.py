from flask import Blueprint

API_V1 = '/api'

api_bp = Blueprint('api', __name__)
html_views = Blueprint('HTML Views', __name__, template_folder='../templates', static_folder='../static', url_prefix='/')
serial_ports_api = Blueprint('Serial Ports', __name__, template_folder='../templates', static_folder='../static', url_prefix=f'{API_V1}/serial')

from app.api import views
from app.api import serial_ports
from app.api import serial_events
