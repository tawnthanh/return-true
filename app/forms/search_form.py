from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
from app.models import User, Profile


def search_exists(form, field):
    search = field.data
    user = User.query.filter(User.username.ilike("%{search}%")).all()
    if not user:
        raise ValidationError("ReferenceError: No Search Results")


class SearchForm(FlaskForm):
    search = StringField("search", validators=[DataRequired(), search_exists])
