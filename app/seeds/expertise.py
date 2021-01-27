# from app.models import db, Expertise

# e_list = ["Frontend", "Backend", "UX/UI Design", "AI", "Data Analysis"]
# # Adds a demo user, you can add other users here if you want


# def seed_expertise():
#     for e in e_list:
#         new_e = Expertise(type=e)
#         db.session.add(new_e)
#     db.session.commit()
# # Uses a raw SQL query to TRUNCATE the users table.
# # SQLAlchemy doesn't have a built in function to do this
# # TRUNCATE Removes all the data from the table, and resets
# # the auto incrementing primary key


# def undo_expertise():
#     db.session.execute('TRUNCATE expertise;')
#     db.session.commit()
