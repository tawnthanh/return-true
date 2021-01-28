from flask import Blueprint, jsonify, session, request
from app.models import Request, db, answers,Question
from app.forms import RequestForm, RequestEditForm
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

@request_routes.route('/<int:id>', methods=['PATCH'])
def edit_request(id):
    """
    Create new request
    """
    form = RequestEditForm()
    data = request.get_json()

    # user = None
    if current_user.is_authenticated:
        user = current_user.to_dict()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        req = Request.query.get(id)
        req.title=data["title"]
        req.active=data["active"]
        db.session.commit()
    return data

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

    result = Request.query.filter(Request.userId==user["id"]).all()
    requests = []

    for single_request in result:
        single_request = single_request.to_dict()
        answers_for_request = db.session.query(answers).join(Request).filter(Request.id==single_request["id"]).all()
        single_request["answers"] = [{"questionId": a[1],"answer": a[2]} for a in answers_for_request]
        requests.append(single_request)
    
    return {"requests": requests}
