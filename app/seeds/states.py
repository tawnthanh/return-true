from werkzeug.security import generate_password_hash
from app.models import db, State


states = [('Alabama', 'AL'), ('Alaska', 'AK'), ('Arizona', 'AZ'),
          ('Arkansas', 'AR'), ('California', 'CA'), ('Colorado', 'CO'),
          ('Connecticut', 'CT'), ('Delaware', 'DE'), ('Florida', 'FL'),
          ('Georgia', 'GA'), ('Hawaii', 'HI'), ('Idaho', 'ID'),
          ('Illinois', 'IL'), ('Indiana', 'IN'), ('Iowa', 'IA'),
          ('Kansas', 'KS'), ('Kentucky', 'KY'), ('Louisiana', 'LA'),
          ('Maine', 'ME'), ('Maryland', 'MD'), ('Massachusetts', 'MA'),
          ('Michigan', 'MI'), ('Minnesota', 'MN'), ('Mississippi', 'MS'),
          ('Missouri', 'MO'), ('Montana', 'MT'), ('Nebraska', 'NE'),
          ('Nevada', 'NV'), ('New Hampshire', 'NH'), ('New Jersey', 'NJ'),
          ('New Mexico', 'NM'), ('New York', 'NY'), ('North Carolina', 'NC'),
          ('North Dakota', 'ND'), ('Ohio', 'OH'), ('Oklahoma', 'OK'),
          ('Oregon', 'OR'), ('Pennsylvania', 'PA'), ('Rhode Island', 'RI'),
          ('South Carolina', 'SC'), ('South Dakota', 'SD'),
          ('Tennessee', 'TN'), ('Texas', 'TX'), ('Utah', 'UT'),
          ('Vermont', 'VT'), ('Virginia', 'VA'), ('Washington', 'WA'),
          ('West Virginia', 'WV'), ('Wisconsin', 'WI'), ('Wyoming', 'WY')]


# Adds a demo user, you can add other users here if you want
def seed_states():
    for state_tup in states:
        location = State(state=state_tup[0], abbr=state_tup[1])

        db.session.add(location)

        db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_states():
    db.session.execute('TRUNCATE states CASCADE;')
    db.session.commit()
