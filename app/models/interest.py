from .db import db
from .user import User

userInterests = db.Table("userInterests", db.Model.metadata,
    db.Column("userId", db.Integer, db.ForeignKey("users.id")),
    db.Column("interestId", db.Integer, db.ForeignKey("interests.id")))

class Interest(db.Model):
    __tablename__ = "interests"

    id = db.Column(db.Integer, primary_key=True)
    interest = db.Column(db.String, nullable=False)

    def to_dict(self):
        return {
          "id": self.id,
          "interest": self.interest
        }
