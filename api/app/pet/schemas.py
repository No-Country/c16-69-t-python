# Archivo solo de ejemplo para un schema del modelo user
import copy
import re
from marshmallow import fields, validate, ValidationError
from app import ma
from app.pet.models import Pet


# User Schemas
class PetSchema(ma.SQLAlchemyAutoSchema):

    id = fields.String(dump_only=True) # Este campo se usa solo para volcar datos
    name = fields.String(required=True)
    breed = fields.String()
    age = fields.Integer()
    size = fields.String()
    description = fields.String()
    status = fields.String(validate=validate.OneOf(['Found', 'Lost']), default='Found')
    type = fields.String(validate=validate.OneOf(['Found', 'Wanted']))
    date_lost = fields.DateTime()
    date_found = fields.DateTime()
    created_by_id = fields.String()
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)
    location = fields.String()
    revised = fields.Boolean()
    
    class Meta:
        model = Pet
        fields = ['id', 'name', 'breed', 'age', 'size', 'description', 'status', 'type', 'date_lost', 'date_found', 'created_by_id', 'created_at', 'updated_at', 'location', 'revised']
        load_instance = True

pet_schema = PetSchema()
pets_schema = PetSchema(many=True)