from app import db
from app.utils import generate_id


class User(db.model):
    __tablename__ = "User"

    id = db.Column(db.String(64), primary_key=True, default=generate_id)
    username = db.Column(db.String(64), unique=True, nullable=False)
    email = db.Column(db.String, unique=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    address = db.Column(db.String)
    password = db.Column(db.String)
    role = db.Column(db.Enum('User', 'Administrator', name='role'))
    avatar_url = db.Column(db.String)
    created_at = db.Column(db.TIMESTAMP)
    updated_at = db.Column(db.TIMESTAMP)
    reputation = db.Column(db.Integer)
    is_active = db.Column(db.Boolean, default=True)

    # Relations
    # ...
