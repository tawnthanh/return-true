"""Create Locations Tables

Revision ID: d3967dc82896
Revises: ffdc0a98111c
Create Date: 2021-01-25 19:54:45.375397

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd3967dc82896'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('locations',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('stateId', sa.Integer(), nullable=False),
    sa.Column('city', sa.String(length=150), nullable=True),
    sa.ForeignKeyConstraint(['stateId'], ['locations.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('city')
    )
    op.create_table('states',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('state', sa.String(), nullable=False),
    sa.Column('abbr', sa.String(length=2), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('abbr'),
    sa.UniqueConstraint('state')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('states')
    op.drop_table('locations')
    # ### end Alembic commands ###
