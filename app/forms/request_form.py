from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import User, Request
from flask_login import current_user

def request_exists(form, field):
    title = field.data
    user = current_user.to_dict()
    request = Request.query.filter(Request.title == form.data["title"], Request.userId == user["id"]).first()
    if request:
        raise ValidationError("This request already exist")

class RequestForm(FlaskForm):
    title = StringField("title", validators=[DataRequired(), request_exists])

