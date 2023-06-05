from flask import request, jsonify
from app.api import api_bp
from app.models import User
from app.extensions import db

@api_bp.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    user_list = [{'id': user.id, 'name': user.name} for user in users]
    return jsonify(user_list)

@api_bp.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    name = data.get('name')
    user = User(name=name)
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'})

@api_bp.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get_or_404(user_id)
    data = request.get_json()
    name = data.get('name')
    user.name = name
    db.session.commit()
    return jsonify({'message': 'User updated successfully'})

@api_bp.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'})



