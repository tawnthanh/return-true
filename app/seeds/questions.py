from app.models import db, Question
"""
Question Types:
1= multiple choice, if at least one match - 100%
2= multiple choice, all checked - 100%, each is 100/n
3=radio
4=toggle
"""

questions = [
    {"question":"Who are you looking for", "options":"teacher,partner,friend,study buddy,code review", "questionType": 1, "weight": 10},
    {"question":"languages", "options": "languages", "questionType":2, "weight": 10},
    {"question":"experience level", "options":"beginner,provicient,expert", "questionType":3, "weight": 10},
    {"question":"area of expertise", "options":"expertise", "questionType":2, "weight": 10},
    {"question":"personality", "options":"introvert,extrovert", "questionType":4, "weight": 10},
    {"question":"filter by state", "options": "", "questionType": 4, "weight": 10},
    {"question":"filter by city", "options": "", "questionType": 4, "weight": 10},
    {"question":"availability", "options": "morning,night", "questionType": 4, "weight": 10},
    {"question":"frequency", "options":"frequencies", "questionType": 3, "weight": 10}
]


# Adds a demo user, you can add other users here if you want
def seed_questions():
    for q in questions:
        question = Question(question=q["question"],options=q["options"],questionType=q["questionType"],weight=q["weight"])
        db.session.add(question)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_questions():
    db.session.execute('TRUNCATE questions;')
    db.session.commit()
