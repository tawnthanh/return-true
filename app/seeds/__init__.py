from flask.cli import AppGroup
from .users import seed_users, undo_users
from .states import seed_states, undo_states
from .locations import seed_cities, undo_cities
from .profile import seed_languages, seed_frequency, undo_languages, undo_frequency
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_states()
    seed_cities()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_states()
    undo_cities()
    # Add other undo functions here


@seed_commands.command('profile')
def seed_p():
    seed_frequency()
    seed_languages()

@seed_commands.command('undo_profile')
def undo_p():
    undo_frequency()
    undo_languages()
