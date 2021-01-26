from .db import db


class Dialogue(db.Model):
    __tablename__ = "dialogues"

    id = db.Column(db.Integer, primary_key=True)
    user1 = db.Column(db.Integer, db.ForeignKey("users.id"))
    user2 = db.Column(db.Integer, db.ForeignKey("users.id"))

    def to_dict(self):
        return {
          "id": self.id,
          "user1": self.user1,
          "user2": self.user2
        }


class Message(db.Model):
    __tablename__ = "messages"

    id = db.Column(db.Integer, primary_key=True)
    dialogueId = db.Column(db.Integer, db.ForeignKey("dialogues.id"))
    message = db.Column(db.String, nullable=False)
    read = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
          "id": self.id,
          "dialogue_id": self.dialogueId,
          "message": self.message,
          "read": self.read
        }
