from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Message, Profile, Location, State, Languages,\
    Expertise

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

    msg = []
    for m in messages:
        msg.append(m.to_dict())

    return jsonify(msg)


@user_routes.route('/messages/<int:dialogueId>', methods=['POST'])
@login_required
def addMessages(dialogueId):
    data = request.get_json()
    user = current_user.to_dict()
    messages = Message(dialogueId=dialogueId,
                       message=data['text'], read=False, senderId=user['id'])
    db.session.add(messages)
    db.session.commit()
    return messages.to_dict()


@user_routes.route('/<id>/profiles')
@login_required
def profiles(id):
    profiles = Profile.query.filter(Profile.userId == id).first()
    return {"profile": profiles.to_dict()}


@user_routes.route('/<userId>/edit-profile')
# @login_required
def profile_form(userId):
    profile = Profile.query.join(User).filter(
        User.id == userId).first()
    if profile:
        profile = profile.to_dict()
        return {"profile": profile}
    else:
        user_info_response = User.query.filter(
            User.username == username).first()
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


@user_routes.route('/<int:id>/edit-profile', methods=["POST", "PATCH"])
# @login_required
def profile_update(id):
    profile = request.get_json()
    profiles = Profile.query.filter(Profile.userId == id).first()
    city = Location.query.filter(Location.city.ilike(profile["city"]))\
                         .filter(State.id == profile["state"]).first()
    location = None
    l_list = Languages.query.all()
    lang_match = [la for la in l_list for lang in profile["languages"]
                  if la.to_dict()["id"] == lang]

    e_list = Expertise.query.all()
    exp_match = [ex for ex in e_list for exp in profile["expertises"]
                 if ex.to_dict()["id"] == exp]

    if city is not None:
        location = city.to_dict()["id"]
    else:
        location = profile["city"]
        new_location = Location(city=location, stateId=profile["state"])
        db.session.add(new_location)
        db.session.commit()
        city = Location.query.filter(Location.city.ilike(profile["city"]))\
                             .filter(State.id == profile["state"]).first()
        location = city.to_dict()["id"]

    if profiles is not None:
        profiles.userId = profile["user_id"]
        profiles.firstName = profile["first_name"]
        profiles.lastName = profile["last_name"]
        profiles.imageUrl = profile["image_url"]
        profiles.bio = profile["bio"]
        profiles.locationId = location
        profiles.level = profile["level"]
        profiles.inPerson = profile["in_person"]
        profiles.personality = profile["personality"]
        profiles.frequencyId = profile["frequency_id"]
        profiles.mentorship = profile["mentorship"]
        profiles.morning = profile["morning"]
        profiles.languages = lang_match
        profiles.expertises = exp_match
        db.session.commit()
        return profiles.to_dict()
        # return {'Successful': ['Profile Updated']}, 200
    else:
        new_profile = Profile(
            userId=profile["user_id"],
            firstName=profile["first_name"],
            lastName=profile["last_name"],
            imageUrl=profile["image_url"],
            bio=profile["bio"],
            locationId=location,
            level=profile["level"],
            inPerson=profile["in_person"],
            personality=profile["personality"],
            frequencyId=profile["frequency_id"],
            mentorship=profile["mentorship"],
            morning=profile["morning"],
        )
        db.session.add(new_profile)
        new_profile.languages = lang_match
        new_profile.expertises = exp_match
        db.session.commit()
    return new_profile.to_dict()
    # return "hi"
