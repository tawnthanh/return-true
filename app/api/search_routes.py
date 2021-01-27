from flask import Blueprint, jsonify, session, request
from app.models import User

search_routes = Blueprint('search', __name__)


@search_routes.route('/', methods=["POST"])
def search():
    word = request.get_json()
    users = User.query.filter(User.username.like(f'%{word}%')).all()
    profiles = []
    if users:
        for user in users:
            profiles.append(user.to_dict())
        return jsonify(*profiles)
    return {'errors': ['ReferenceError: No Results Found']}, 404
