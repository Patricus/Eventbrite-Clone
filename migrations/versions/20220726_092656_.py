"""empty message

Revision ID: be68757b6551
Revises: 7046ba0dffc8
Create Date: 2022-07-26 09:26:56.067247

"""
from alembic import op
import sqlalchemy as sa
import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = 'be68757b6551'
down_revision = '7046ba0dffc8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('bookmarks',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('user_id', sa.Integer(), nullable=True),
                    sa.Column('event_id', sa.Integer(), nullable=True),
                    sa.ForeignKeyConstraint(['event_id'], ['events.id'], ),
                    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    # ### end Alembic commands ###

    if environment == "production":
        op.execute(f"ALTER TABLE bookmarks SET SCHEMA {SCHEMA};")


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('bookmarks')
    # ### end Alembic commands ###
