from flask import Blueprint, jsonify, session, request
from app.models import db, Question

question_routes = Blueprint('question', __name__)

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


@question_routes.route('/')
def all_questions():
    """
    GET all questions
    """

    result = db.session.query(Question).all()
    
    questions = [q.to_dict() for q in result]
    return {"questions": questions}
