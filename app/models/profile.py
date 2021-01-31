from .db import db

userLanguages = db.Table("userLanguages", db.Model.metadata,
                         db.Column("profileId", db.Integer, db.ForeignKey(
                             "profiles.id"), primary_key=True),
                         db.Column("languagesId", db.Integer, db.ForeignKey(
                             "languages.id"), primary_key=True),
                         )

userExpertise = db.Table("userExpertise", db.Model.metadata,
                         db.Column("profileId", db.Integer, db.ForeignKey(
                             "profiles.id"), primary_key=True),
                         db.Column("expertiseId", db.Integer, db.ForeignKey(
                             "expertise.id"), primary_key=True),
                         )


class Frequency(db.Model):
    __tablename__ = "frequencies"

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String, nullable=False, unique=True)

    profiles = db.relationship(
        "Profile", back_populates="frequency", cascade="all")

    def to_dict(self):
        return {
            "id": self.id,
            "type": self.type,
        }

    def get_all_profiles(self):
        return {
            "id": self.id,
            "type": self.type,
            "profiles": [profile.to_dict() for profile in self.profiles]
        }


class Profile(db.Model):
    __tablename__ = "profiles"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    firstName = db.Column(db.String, nullable=False)
    lastName = db.Column(db.String, nullable=False)
    imageUrl = db.Column(db.String)
    bio = db.Column(db.String(2000))
    locationId = db.Column(db.Integer, db.ForeignKey("locations.id"))
    inPerson = db.Column(db.Boolean, nullable=False)
    level = db.Column(db.Integer, nullable=False)
    personality = db.Column(db.Boolean, default=False)
    frequencyId = db.Column(db.Integer, db.ForeignKey(
        "frequencies.id"), nullable=False)
    mentorship = db.Column(db.Boolean, nullable=False, default=False)
    morning = db.Column(db.Boolean, nullable=False, default=False)

    languages = db.relationship(
        "Languages", secondary=userLanguages, back_populates="profiles",
        cascade="all")
    expertises = db.relationship(
        "Expertise", secondary=userExpertise, back_populates="profiles",
        cascade="all")
    frequency = db.relationship(
        "Frequency", back_populates="profiles", cascade="all")

    user = db.relationship(
        "User", back_populates="profile")

    location = db.relationship(
        "Location", back_populates="profile")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.userId,
            "username": self.user.username,
            "first_name": self.firstName,
            "last_name": self.lastName,
            "image_url": self.imageUrl,
            "bio": self.bio,
            "location_id": self.locationId,
            "in_person": self.inPerson,
            "level": self.level,
            "personality": self.personality,
            "frequency_id": self.frequencyId,
            "frequency": self.frequency.to_dict(),
            "mentorship": self.mentorship,
            "morning": self.morning,
            "languages": [language.to_dict() for language in self.languages],
            "expertises": [expert.to_dict() for expert in self.expertises],
            "users": self.user.to_dict(),
        }
