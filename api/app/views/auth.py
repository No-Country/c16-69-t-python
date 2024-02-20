from flask import Blueprint, jsonify

from app.models.user import User
from app.schemas.user import user_schema

bp = Blueprint('auth', __name__)

@bp.route('/register', methods=['POST'])
def register():
    return jsonify(message='')

@bp.route('/login', methods=['POST'])
def login():
    return jsonify(message='')