
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_jwt_extended import JWTManager
from flask_cors import CORS

from app.config import Settings

app = Flask(__name__)
app.config.from_object(Settings)
CORS(app)

# Connections
db = SQLAlchemy(app)
ma = Marshmallow(app)
jwt = JWTManager(app)

# Root Endpoint
@app.route(f'{app.config["APP_ROOT"]}/')
def root():
    return jsonify(message=f'Welcome to {app.config["APP_NAME"]}')

# Import the Blueprints
from app.auth.view import bp as auth_bp
from app.user.view import bp as users_bp
from app.pet.view import bp as pets_bp

# Register the blueprint of the modules.
app.register_blueprint(auth_bp, url_prefix=f'{app.config["APP_ROOT"]}/auth')
app.register_blueprint(users_bp, url_prefix=f'{app.config["APP_ROOT"]}/users')
app.register_blueprint(pets_bp, url_prefix=f'{app.config["APP_ROOT"]}/pets')
