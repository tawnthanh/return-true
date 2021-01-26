from .db import db


class Expertise(db.Model):
    __tablename__ = "expertise"

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String, nullable=False, unique=True)

    profile = db.relationship("Profile", secondary="userExpertise", back_populates="expertise")


    def to_dict(self):
        return {
            "id": self.id,
            "type": self.type
        }
