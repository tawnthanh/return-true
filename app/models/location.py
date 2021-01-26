from .db import db

class State(db.Model):
    __tablename__ = "states"

    id = db.Column(db.Integer, primary_key=True)
    state = db.Column(db.String, nullable=False, unique=True)
    abbr = db.Column(db.String(2), nullable=False, unique=True)

    def to_dict(self):
        return {
          "id": self.id,
          "state": self.state,
          "abbr": self.abbr
        }


class Location(db.Model):
    __tablename__ = "locations"

    id = db.Column(db.Integer, primary_key=True)
    stateId = db.Column(db.Integer, db.ForeignKey("states.id"), nullable=False)
    city = db.Column(db.String(150), unique=True)

    def to_dict(self):
        return {
          "id": self.id,
          "state_id": self.stateId,
          "city": self.city
        }
