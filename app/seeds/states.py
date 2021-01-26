from werkzeug.security import generate_password_hash
from app.models import db, State

states = [('Alabama', 'AK'), ('Alaska', 'AL'), ('Arizona', 'AR'), ('Arkansas', 'AZ'), ('California', 'CA'), ('Colorado', 'CO'), ('Connecticut', 'CT'), ('Delaware', 'DE'), ('Florida', 'FL'), ('Georgia', 'GA'), ('Hawaii', 'HI'), ('Idaho', 'IA'), ('Illinois', 'ID'), ('Indiana', 'IL'), ('Iowa', 'IN'), ('Kansas', 'KS'), ('Kentucky', 'KY'), ('Louisiana', 'LA'), ('Maine', 'MA'), ('Maryland', 'MD'), ('Massachusetts', 'ME'), ('Michigan', 'MI'), ('Minnesota', 'MN'), ('Mississippi', 'MO'), ('Missouri', 'MS'), ('Montana', 'MT'), ('Nebraska', 'NC'), ('Nevada', 'ND'), ('New Hampshire', 'NE'), ('New Jersey', 'NH'), ('New Mexico', 'NJ'), ('New York', 'NM'), ('North Carolina', 'NV'), ('North Dakota', 'NY'), ('Ohio', 'OH'), ('Oklahoma', 'OK'), ('Oregon', 'OR'), ('Pennsylvania', 'PA'), ('Rhode Island', 'RI'), ('South Carolina', 'SC'), ('South Dakota', 'SD'), ('Tennessee', 'TN'), ('Texas', 'TX'), ('Utah', 'UT'), ('Vermont', 'VA'), ('Virginia', 'VT'), ('Washington', 'WA'), ('West Virginia', 'WI'), ('Wisconsin', 'WV'), ('Wyoming', 'WY')]
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
    db.session.execute('TRUNCATE states;')
    db.session.commit()


print(states)
