from app.models import db, State, Location
from faker import Faker

locations = [('Jenniferland', 'WI'), ('Carolview', 'NE'), ('West Susan', 'UT'),
             ('Josephmouth', 'AL'), ('Lake Stephaniemouth', 'MA'),
             ('South Donnaville', 'KY'), ('East Matthewborough', 'NH'),
             ('Cathyport', 'ND'), ('Sabrinaview', 'WV'),
             ('Port Howardview', 'RI'), ('Dawnfurt', 'KY'),
             ('Reevesmouth', 'NE'), ('Joneston', 'CA'),
             ('Ashleyhaven', 'FL'), ('Traciborough', 'CA'),
             ('Wendyberg', 'GA'), ('Danielstad', 'TN'),
             ('Malden', 'MA'), ('North Audreyport', 'TX'),
             ('New Ashley', 'NC')]

# Adds a location, you can add other users here if you want


def seed_cities():
    for location in locations:
        state = State.query.filter(State.abbr == (location[1])).all()
        randomCity = Location(stateId=state[0].id, city=location[0])

        db.session.add(randomCity)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the location table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_cities():
    db.session.execute('TRUNCATE locations;')
    db.session.commit()

