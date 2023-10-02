import os
from flask import send_from_directory
from app.api import html_views


@html_views.route('/', methods=['GET'])
@html_views.route('/control', methods=['GET'])
def index():
    return send_from_directory(html_views.static_folder, 'index.html')

@html_views.route('/assets/<path:filename>', methods=['GET'])
def serve_static(filename):
    return send_from_directory(os.path.join(html_views.static_folder, 'assets'), filename)





