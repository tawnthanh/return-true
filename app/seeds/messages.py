from app.models import db, Dialogue, Message

dialogues = Dialogue(user1=1, user2=2)
db.session.add(dialogues)

messages = [
    {"message":"Violets are BLUEE!!", "dialogueId": 1, "userId": 1},
    {"message":"Roses are red", "dialogueId": 1, "userId": 2},
]

for message in messages:
    message1 = Message(message)
    db.session.add(message1)
db.session.commit()
