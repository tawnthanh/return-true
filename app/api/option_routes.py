from flask import Blueprint, jsonify, session, request
from app.models import db, Languages, Question, Expertise, Frequency

option_routes = Blueprint('options', __name__)

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


@option_routes.route('/languages')
def all_languages():
    """
    GET all languages
    """

    result = db.session.query(Languages).all()
    
    languages = [l.to_dict() for l in result]
    return {"languages": languages}

@option_routes.route('/questions')
def all_questions():
    """
    GET all questions
    """

    result = db.session.query(Question).all()
    
    questions = [q.to_dict() for q in result]
    return {"questions": questions}

@option_routes.route('/frequencies')
def all_frequencies():
    """
    GET all frequencies
    """

    result = db.session.query(Frequency).all()
    
    frequencies = [f.to_dict() for f in result]
    return {"frequencies": frequencies}

@option_routes.route('/expertise')
def all_expertise():
    """
    GET all expertise
    """

    result = db.session.query(Expertise).all()
    
    expertise = [e.to_dict() for e in result]
    return {"expertise": expertise}
