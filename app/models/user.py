from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from app.models import message


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    profile = db.relationship("Profile", back_populates="user")
    msg_sender = db.relationship("Message", back_populates="from_sender")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
        }

    def get_profiles(self):
        return {
            "id": self.id,
            "profile": [profile.to_dict() for profile in self.profiles]
        }

    def show_dialogues(self):
        return {
            "id": self.id,
            "dialogues": [c.to_dict() for c in self.convo]
        }
