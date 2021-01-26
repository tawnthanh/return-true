from .db import db

class Profile(db.Model):
    __tablename__ = "profiles"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    firstName = db.Column(db.String, nullable=False)
    lastName = db.Column(db.String)
    imageUrl = db.Column(db.String)
    bio = db.Column(db.String(2000))
    locationId = db.Column(db.Integer, db.ForeignKey("locations.id"))
    inPerson = db.Column(db.Boolean, nullable=False)
    level = db.Column(db.Integer, nullable=False)
    frequency = db.Column(db.String, nullable=False)
    projectInterest = db.Column(db.String)

    def to_dict(self):
      return {
        "id": self.id,
        "first_name": self.firstName,
        "last_name": self.lastName[0],
        "bio": self.bio,
        "location_id": self.locationId,
        "in_person": self.inPerson,
        "level": self.level,
        "frequency": self.frequency,
        "project_interest": self.projectInterest,
      }
