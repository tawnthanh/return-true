from flask import Blueprint, jsonify, session, request
from app.models import User

search_routes = Blueprint('search', __name__)


@search_routes.route('/', methods=["POST", "GET"])
def search():
    # users = User.query.filter(User.username.ilike(f'%{word}%').all())
    users = User.query.filter(User.username.like("%And%")).all()
    profiles = []
    if users:
        for user in users:
            profiles.append(user.to_dict())
        return jsonify(*profiles)
    return {'errors': ['ReferenceError: No Results Found']}, 404
