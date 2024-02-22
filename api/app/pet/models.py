from app import db
from app.utils import generate_id
from sqlalchemy.sql import func


class Pet(db.Model):
    __tablename__ = "Pet"

    id = db.Column(db.String(64), primary_key=True, default=generate_id)
    name = db.Column(db.String)
    breed = db.Column(db.String)
    age = db.Column(db.Integer)
    size = db.Column(db.String)
    description = db.Column(db.String)
    status = db.Column(db.Enum('Found', 'Lost', name='pet_status'), default='Found')
    type = db.Column(db.Enum('Found', 'Wanted', name='pet_type'))
    date_lost = db.Column(db.TIMESTAMP)
    date_found = db.Column(db.TIMESTAMP)
    created_at = db.Column(db.TIMESTAMP, server_default=func.now())
    updated_at = db.Column(db.TIMESTAMP, server_default=func.now(), onupdate=func.current_timestamp())
    location = db.Column(db.String)
    revised = db.Column(db.Boolean, default=False)

    # Relations of FOREIGN KEY
    created_by_id = db.Column(db.String, db.ForeignKey('User.id'))