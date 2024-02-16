
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

from app.config import Settings

app = Flask(__name__)
app.config.from_object(Settings)

# Connections
# db = SQLAlchemy(app)
# ma = Marshmallow(app)

# Root Endpoint
@app.route(f'{app.config["APP_ROOT"]}/')
def root():
    return jsonify(message=f'Welcome to {app.config["APP_NAME"]}')

# Blueprints
from app.views.example import bp as example_bp

app.register_blueprint(example_bp, url_prefix=f'{app.config["APP_ROOT"]}/example')