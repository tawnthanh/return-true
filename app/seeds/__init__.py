from flask.cli import AppGroup
from .users import seed_users, undo_users
from .states import seed_states, undo_states
from .locations import seed_cities, undo_cities
from .expertise import seed_expertise, undo_expertise
from .questions import seed_questions, undo_questions
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_states()
    seed_cities()
    seed_expertise()
    seed_questions()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_states()
    undo_cities()
    undo_expertise()
    undo_questions()
    # Add other undo functions here


