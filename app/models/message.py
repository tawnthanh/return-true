from .db import db


class Dialogue(db.Model):
    __tablename__ = "dialogues"

    id = db.Column(db.Integer, primary_key=True)
    user1 = db.Column(db.Integer, db.ForeignKey("users.id"))
    user2 = db.Column(db.Integer, db.ForeignKey("users.id"))

    messages = db.relationship("Message",
                               back_populates="convo", cascade="all")

    def to_dict(self):
        return {
            "id": self.id,
            "user1_id": self.user1,
            "user2_id": self.user2
        }

    

class Message(db.Model):
    __tablename__ = "messages"

    id = db.Column(db.Integer, primary_key=True)
    dialogueId = db.Column(db.Integer, db.ForeignKey("dialogues.id"))
    message = db.Column(db.String, nullable=False)
    read = db.Column(db.Boolean, default=False)

    convo = db.relationship("Dialogue",
                            back_populates="messages", cascade="all")

    def to_dict(self):
        return {
            "id": self.id,
            "dialogue_id": self.dialogueId,
            "message": self.message,
            "read": self.read
        }
