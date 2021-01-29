from .db import db


class Languages(db.Model):
    __tablename__ = "languages"

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String, nullable=False, unique=True)

    profiles = db.relationship(
        "Profile", secondary="userLanguages", back_populates="languages",
        cascade="all")

    def to_dict(self):
        return {
            "id": self.id,
            "type": self.type
        }

    def get_all_profiles(self):
        return {
            "id": self.id,
            "profiles": [profile.to_dict() for profile in self.profiles]
        }
