from .db import db


class State(db.Model):
    __tablename__ = "states"

    id = db.Column(db.Integer, primary_key=True)
    state = db.Column(db.String, nullable=False, unique=True)
    abbr = db.Column(db.String(2), nullable=False, unique=True)

    locations = db.relationship("Location", back_populates="state",
                                cascade="all")

    def to_dict(self):
        return {
            "id": self.id,
            "state": self.state,
            "abbr": self.abbr
        }

    def get_locations(self):
        return {
            "id": self.id,
            "state": self.state,
            "locations": [location.to_dict() for location in self.locations]
        }


class Location(db.Model):
    __tablename__ = "locations"

    id = db.Column(db.Integer, primary_key=True)
    stateId = db.Column(db.Integer, db.ForeignKey("states.id"), nullable=False)
    city = db.Column(db.String(150), nullable=False)

    state = db.relationship("State", back_populates="locations", cascade="all")
    profile = db.relationship("Profile", back_populates="location")

    def to_dict(self):
        return {
            "id": self.id,
            "state_id": self.stateId,
            "city": self.city
        }

    def get_state(self):
        return {
            "id": self.id,
            "city": self.city,
            "state": self.state.to_dict(),
        }
