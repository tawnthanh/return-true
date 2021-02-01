from flask import Blueprint, jsonify, session, request
from app.models import Dialogue, User, db
from flask_login import current_user
from sqlalchemy import or_

dialogues_routes = Blueprint('dialogues', __name__)

@dialogues_routes.route('/', methods=['POST'])
def new_dialogue():
    """
    Create new dialogue
    """
    data = request.get_json()
    
    user = None
    if current_user.is_authenticated:
        user = current_user.to_dict()
    
    user1 = int(data["userId"]) if int(data["userId"]) < user["id"] else user["id"]
    user2 = int(data["userId"]) if int(data["userId"]) >= user["id"] else user["id"]
    
    new_dialogue = Dialogue(
        user1 = user1,
        user2 = user2
    )
    db.session.add(Dialogue)
    db.session.commit()

    dialogue = new_dialogue.to_dict()
    otherUser = User.query.get(int(data["userId"]))
    otherUser = otherUser.to_dict()

    print ({
        "dialogueId": dialogue["id"],
        "user": otherUser["username"]
    })
    return {
        "dialogueId": dialogue["id"],
        "user": otherUser["username"]
    }

@dialogues_routes.route('/')
def all_dialogues():
    """
    GET all user's dialogues
    """
    print("GET ALL DIALOOOOOOOOGUES")
    user = None
    if current_user.is_authenticated:
        user = current_user.to_dict()

    # result = Dialogue.query.filter(or_(Dialogue.user1 == user["id"], Dialogue.user2 == user["id"]))
    result = db.session.query(Dialogue).filter(or_(Dialogue.user1 == user["id"], Dialogue.user2 == user["id"]))
    
    dialogues = []

    for r in result:
        d = r.to_dict()
        otherUser = None

        if d["user1_id"] == user["id"]:
            otherUser = User.query.get(d["user2_id"])
        else:
            otherUser = User.query.get(d["user1_id"])

        otherUser = otherUser.to_dict()
        dialogues.append({
            "dialogueId": d["id"],
            "user": otherUser["username"]
        })
    
    return {"dialogues": dialogues}
