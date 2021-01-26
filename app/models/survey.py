from .db import db

# this is the through table
answers = db.Table("answers", db.Model.metadata,
    db.Column("requestId", db.Integer, db.ForeignKey("requests.id"), primary_key=True),
    db.Column("questionId", db.Integer, db.ForeignKey("questions.id"), primary_key=True),
    db.Column("answer", db.String, nullable=False))

class Request(db.Model):
    __tablename__ = "requests"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    active = db.Column(db.Boolean, nullable=False)
    questions = db.relationship("Question", secondary=answers, back_populates="requests")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.userId,
            "active": self.active,
        }

class Question(db.Model):
    __tablename__ = "questions"

    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String, nullable=False)
    options = db.Column(db.String, nullable=False)
    questionType = db.Column(db.Integer, nullable=False)
    weight = db.Column(db.Integer)
    requests = db.relationship("Request", secondary=answers, back_populates="questions")

    def to_dict(self):
        return {
            "id": self.id,
            "question": self.question,
            "options": self.options,
            "question_type": self.questionType,
        }
# This is how the file can seed everything in automatically
# r = Request()
# q = Question()
# r.questions.append(q)
# db.session.add(r)
# db.session.commit()
