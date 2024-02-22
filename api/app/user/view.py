from flask import Blueprint, jsonify, request
from datetime import datetime
from app import db
from app.user.models import User
from app.user.schemas import user_schema, users_schema
from marshmallow.exceptions import ValidationError
from werkzeug.exceptions import BadRequest
import re

bp = Blueprint('users', __name__)

@bp.route('/user/<string:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    """
    Endpoint GET http://127.0.0.1:5000/api/users/user/<string:user_id> to get a user by ID.
    
    Required:
    - user_id       (str)   Unique user id.

    Return:
    - user_data     (dict)  User data.
    """
    # Find the user by ID
    try:
        # Query to search an user by id in the database.
        user = User.query.filter_by(id=user_id).first()

        # If the user is not found, return a 404 Not Found.
        if not user:
            return jsonify(message="Usuario no encontrado"), 404

        # Serialize the user and return it as a response.
        user_data = user_schema.dump(user)
        return jsonify(user_data), 200
    except ValueError:
        raise BadRequest("ID de usuario inválido")
    except ValidationError as err:
        # Handle schema validation errors.
        return jsonify(err.messages), 400
