from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import db, User, Message, Profile

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


@user_routes.route('/messages/<int:dialogueId>', methods=['GET'])
@login_required
def messages(dialogueId):
    messages = Message.query.filter(Message.dialogueId == dialogueId).all()
    print(messages)
    msg = []
    for m in messages:
        msg.append(m.msg())
    print(msg)
    return jsonify(msg)
    # return {"messages": [messages.to_dict() for message in messages]}


@user_routes.route('/<id>/profiles')
@login_required
def profiles(id):
    profiles = Profile.query.all()
    profile_list = []
    for profile in profiles:
        profile_list.append(profile.to_dict())
    print(profile_list)
    return jsonify(profile_list)


# @user_routes.route('/<int:id>/profiles')
# @login_required
# def profile(id):
#     profile = Profile.query.filter_by(id=id).one()
#     return profile.to_dict()

@user_routes.route('/edit-profile')
# @login_required
def profile_form():
    profile = Profile.query.filter(Profile.username.like("Demo")).first()
    if profile:
        return jsonify(profile)
    return "hi"
