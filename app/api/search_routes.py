from flask import Blueprint, jsonify, session, request
from app.models import User, Profile, Frequency, Location, State, Languages

search_routes = Blueprint('search', __name__)


@search_routes.route('/', methods=["POST"])
def search():
    word = request.get_json()
    users = User.query.join(Profile)\
        .add_columns(User.id, User.username, User.email,
                     Profile.firstName, Profile.bio)\
        .filter(User.username.ilike(f'%{word}%'), Profile.id > 0).all()
    profiles = []
    if users:
        for user in users:
            profiles.append({
                "id": user[1],
                "username": user[2],
                "email": user[3],
                "first_name": user[4],
                "bio": user[5]
            })
        return jsonify(*profiles)
    return {'errors': ['ReferenceError: No Results Found']}, 404

# THIS IS TO TEST THE RESPONSE FROM THE MODEL'S BUILT IN FUNCTIONS


@search_routes.route("/test")
def test():
    profiles = Profile.query.all()
    profile_list = []
    for profile in profiles:
        profile_list.append(profile.to_dict())
    return jsonify(profile_list)

    
