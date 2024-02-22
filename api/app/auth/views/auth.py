from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash
from datetime import datetime
from app import db
from app.auth.models.user import User
from app.auth.schemas.user import user_schema
from marshmallow.exceptions import ValidationError
import re

bp = Blueprint('auth', __name__)

@bp.route('/register', methods=['POST'])
def register():
    """
    Endpoint POST http://127.0.0.1:5000/api/auth/register to create a new user.

    Required:
    - username      (str)   Unique username.
    - email         (str)   Unique email.
    - password      (str)   Password of the user.
    - first_name    (str)   Name of the user.
    - last_name     (str)   Lastname of the user.
    - address       (str)   Address of the user.

    Optional:
    - avatar_url    (str)   User url image.

    Return:
    - user_data     (dict)  Created user data.
    """
    # Load the data of the request using the schema UserSchema
    user_schema_ref = user_schema
    data = request.json
    try:
        data["password"] = generate_password_hash(data.get("password"))
        validated_data = user_schema_ref.load(data)

        db.session.add(validated_data)
        db.session.commit()
        
        # Return the user object created as part of the response.
        user_data = user_schema.dump(validated_data)
        return jsonify(user_data), 200
    except ValidationError as err:
        # Manage the errors of validation and return a message according specific error.
        return jsonify(err.messages), 400

@bp.route('/login', methods=['POST'])
def login():
    return jsonify(message='')