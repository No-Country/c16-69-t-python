# Archivo solo de ejemplo para un schema del modelo user

from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

from app import ma
from app.models.user import User

# User Schemas
class UserSchema(ma.SQLAlchemyAutoSchema):
    id = fields.String(dump_only=True) # Este campo se usa solo para volcar datos
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)
    password = fields.String(load_only=True)  # Este campo se usa solo para cargar datos

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'created_at', 'updated_at'] 
        load_instance = True

user_schema = UserSchema()
users_schema = UserSchema(many=True)