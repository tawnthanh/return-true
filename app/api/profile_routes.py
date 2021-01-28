from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Profile, db

profile_routes = Blueprint('profiles', __name__)


@profile_routes.route('/<int:id>')
@login_required
def profiles():
    profiles = Profile.query.all()
    return {"profiles": [profile.to_dict() for profile in profiles]}


# @profile_routes.route('/<int:id>')
# @login_required
# def profile(id):
#     profile = Profile.query.filter_by(id=id).one()
#     return profile.to_dict()
