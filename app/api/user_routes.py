from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import db, User, Message

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/messages/<int:dialogueId>', methods=['GET', 'POST'])
@login_required
def messages(dialogueId):
    messages = Message.query.filter(Message.dialogueId==dialogueId).all()
    print(messages)
    msg = []
    for m in messages:
        msg.append(m.to_dict())
    return jsonify(msg)
    # return {"messages": [messages.to_dict() for message in messages]}
