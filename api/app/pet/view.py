from flask import Blueprint, jsonify, request
from datetime import datetime
from app import db
from app.pet.models import Pet
from app.pet.schemas import pet_schema
from marshmallow.exceptions import ValidationError
import re

bp = Blueprint('pets', __name__)

@bp.route('/register', methods=['POST'])
def register_pet():
    """
    Endpoint POST http://127.0.0.1:5000/api/pet/register to create a new pet.

    Required:
    - name          (str)   Unique pet name.
    - breed         (str)   Breed of pet.
    - age           (int)   Age of the pet.
    - size          (str)   Size of the pet.
    - description   (str)   Description of the pet.
    - type          (str)   Value is Wanted or Found.
    - date_lost     (time)  Value is datetime in UTF format.
    - location      (str)   Value of the location of pet.
    
    Return:
    - pet_data      (dict)  Created pet data.
    """
    # Load the data of the request using the schema PetSchema
    pet_schema_ref = pet_schema
    data = request.json
    try:
        validated_data = pet_schema_ref.load(data)

        db.session.add(validated_data)
        db.session.commit()
        
        # Return the pet object created as part of the response.
        pet_data = pet_schema.dump(validated_data)
        return jsonify(pet_data), 200
    except ValidationError as err:
        # Manage the errors of validation and return a message according specific error.
        return jsonify(err.messages), 400
