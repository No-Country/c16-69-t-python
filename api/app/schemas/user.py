# Archivo solo de ejemplo para un schema del modelo user

from marshmallow import fields

from app import ma
from app.models.user import User

# User Schemas
class UserSchema(ma.SQLAlchemyAutoSchema):
    id = fields.String(dump_only=True) # Este campo se usa solo para volcar datos
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)
    is_active = fields.Bool(dump_only=True)
    password = fields.String(load_only=True)  # Este campo se usa solo para cargar datos

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'address', 'password', 'role', 'avatar_url', 'created_at', 'updated_at', 'reputation', 'is_active']
        load_instance = True

user_schema = UserSchema()
users_schema = UserSchema(many=True)