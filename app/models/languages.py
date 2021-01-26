from .db import db


class Languages(db.Model):
    __tablename__ = "languages"

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String, nullable=False, unique=True)

    profile = db.relationship("Profile", secondary="userLanguages", back_populates="languages")


    def to_dict(self):
        return {
            "id": self.id,
            "type": self.type
        }
