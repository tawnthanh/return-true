from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
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
        msg.append(m.to_dict())
    print(msg)
    return jsonify(msg)

@user_routes.route('/messages/<int:dialogueId>', methods=['POST'])
@login_required
def addMessages(dialogueId):
    data = request.get_json()
    print('!!!!!!!!!!!!!!!!!', data['text'])
    user = current_user.to_dict()
    print('!!!!!!!!', user)
    messages = Message(dialogueId=dialogueId, message=data['text'], read=False, senderId = user['id'])
    print('!!!!!!!!!!!!!', messages)
    db.session.add(messages)
    db.session.commit()
    print("text=============",messages.to_dict())
    return messages.to_dict()


@user_routes.route('/<id>/profiles')
@login_required
def profiles(id):
    profiles = Profile.query.get(id)
    print(profiles)
    return {"profile": profiles.to_dict()}


# @user_routes.route('/<int:id>/profiles')
# @login_required
# def profile(id):
#     profile = Profile.query.filter_by(id=id).one()
#     return profile.to_dict()

# @user_routes.route('/edit-profile')
# # @login_required
# def profile_form():
#     profile = Profile.query.filter(Profile.username.like("Demo")).first()
#     if profile:
#         return jsonify(profile)
#     return "hi"

@user_routes.route('/<username>/edit-profile')
# @login_required
def profile_form(username):
    profile = Profile.query.join(User).filter(User.username == username).first()
    if profile:
        return {"profile": profile.to_dict()}
    else:
        user_info_response = User.query.filter(User.username == username).first()
        user_info = user_info_response.to_dict()
        default_info = {
            "user_id": user_info["id"],
            "username": user_info["username"],
            "first_name": "",
            "last_name": "",
            "image_url": "",
            "bio": "",
            "location_id": 0,
            "inPerson": None,
            "level": 0,
            "personality": 0,
            "frequency_id": 0,
            "frequency": [],
            "mentorship": None,
            "morning": None,
            "languages": [],
            "expertises": [],
            }
        return {"profile": default_info}
