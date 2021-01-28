from .db import db


class Expertise(db.Model):
    __tablename__ = "expertise"

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String, nullable=False, unique=True)

    profiles = db.relationship(
        "Profile", secondary="userExpertise", back_populates="expertises",
        cascade="all")

    def to_dict(self):
        return {
            "id": self.id,
            "type": self.type,
        }

    def get_profiles(self):
        return {
            "id": self.id,
            "profiles": [profile.to_dict() for profile in self.profiles]
        }
