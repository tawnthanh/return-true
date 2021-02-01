from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, ValidationError
from app.models import User, Request
from flask_login import current_user


def request_exists(form, field):
    title = field.data
    user = current_user.to_dict()
    request = Request.query.filter(Request.title == form.data["title"],
                                   Request.userId == user["id"]).first()
    if request:
        raise ValidationError("This request already exist")


def request_exists_except_current(form, field):
    title = field.data
    user = current_user.to_dict()
    request = Request.query.filter(Request.title == form.data["title"],
                                   Request.userId == user["id"],
                                   Request.id != form.data["id"]).first()
    if request:
        raise ValidationError("This request already exist")


class RequestForm(FlaskForm):
    title = StringField("title", validators=[DataRequired(), request_exists])


class RequestEditForm(FlaskForm):
    id = IntegerField("id", validators=[DataRequired()])
    title = StringField("title", validators=[DataRequired(),
                        request_exists_except_current])
