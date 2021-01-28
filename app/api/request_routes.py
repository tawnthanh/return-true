from flask import Blueprint, jsonify, session, request
from app.models import Request, db, answers,Question
from app.forms import RequestForm
from flask_login import current_user

request_routes = Blueprint('request', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    print ("!!!ERRORS: ",errorMessages)
    return errorMessages

@request_routes.route('/', methods=['POST'])
def new_request():
    """
    Create new request
    """
    form = RequestForm()
    print(request.get_json())
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    user = None
    if current_user.is_authenticated:
        user = current_user.to_dict()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        new_request = Request(
            title = form.data['title'],
            active = False,
            userId = user["id"]
        )
        db.session.add(new_request)
        db.session.commit()
        return new_request.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@request_routes.route('/<int:id>', methods=['DELETE'])
def remove_request(id):
    """
    Remove request
    """
    user = None
    if current_user.is_authenticated:
        user = current_user.to_dict()
    req = Request.query.filter(Request.id == id, Request.userId==user["id"]).first()

    db.session.delete(req)
    db.session.commit()

    return {"success": "true"}

@request_routes.route('/')
def all_requests():
    """
    GET all user's request
    """
    user = None
    if current_user.is_authenticated:
        user = current_user.to_dict()

    reqs = answers.query.join(Request) \ 
    .add_columns(Request.id, Request.userId, Request.title, Request.active,
    answers.answer,answers.questionId)
    .filter(Request.userId==user["id"]).all()

    
    {"requestId": reqs[1]}
    
    return {"requests": [req.to_dict() for req in reqs]}
