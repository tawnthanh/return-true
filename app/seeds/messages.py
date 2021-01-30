from app.models import db, Dialogue, Message

def create_dialogue():
    dialogues = Dialogue(user1=1, user2=2)
    db.session.add(dialogues)
    db.session.commit()


def create_message():


    messages = [
        ["Violets are BLUEE!!",True,1, 1],
        ["Roses are red",False,1, 2],

    ]

    for message in messages:
        message1 = Message(message=message[0],dialogueId=message[2],read=message[1], senderId=message[3])
        db.session.add(message1)
    db.session.commit()
