from flask import Blueprint, jsonify, request
from datetime import datetime
from app import db
from app.pet.models import Pet
from app.pet.schemas import pet_schema, pets_schema
from marshmallow.exceptions import ValidationError
import re

bp = Blueprint('pets', __name__)

@bp.route('/register', methods=['POST'])
def register_pet():
    """
    Endpoint POST http://127.0.0.1:5000/api/pets/register to create a new pet.

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

@bp.route('/', methods=['GET'])
def get_pets():
    """
    Endpoint GET to list the pets with pagination.
    Examples:
    - http://127.0.0.1:5000/api/pets
    - http://127.0.0.1:5000/api/pets?page=1&per_page=4

    Query Parameters:
    - page      (int)   Page number (default 1).
    - per_page  (int)   Number of pets per page (default 10).

    Return:
    - pets_data (list)  List of pets on the specified page.
    """
    try:
        # Pagination parameters.
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 5))

        # Query to get paged pets.
        pets = Pet.query.paginate(page=page, per_page=per_page)

        # Serialize results.
        pets_data = pets_schema.dump(pets.items)

        # Build paginated response.
        response = {
            "pets": pets_data,
            "total_pages": pets.pages,
            "total_pets": pets.total,
            "current_page": page
        }

        return jsonify(response), 200
    except Exception as e:
        # Handle the error and return an appropriate error message.
        return jsonify({"message": "Error al listar mascotas.", "error": str(e)}), 500
