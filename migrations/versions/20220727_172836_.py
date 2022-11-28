"""empty message

Revision ID: 5889519005f5
Revises: b4fad0e55e1e
Create Date: 2022-07-27 17:28:36.608517

"""
from alembic import op
import sqlalchemy as sa
import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '5889519005f5'
down_revision = 'b4fad0e55e1e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('bookmarks_user_id_fkey', 'bookmarks', type_='foreignkey')
    op.drop_constraint('bookmarks_event_id_fkey', 'bookmarks', type_='foreignkey')
    op.create_foreign_key(None, 'bookmarks', 'users', ['user_id'], ['id'], ondelete='CASCADE')
    op.create_foreign_key(None, 'bookmarks', 'events', ['event_id'], ['id'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'bookmarks', type_='foreignkey')
    op.drop_constraint(None, 'bookmarks', type_='foreignkey')
    op.create_foreign_key('bookmarks_event_id_fkey', 'bookmarks', 'events', ['event_id'], ['id'])
    op.create_foreign_key('bookmarks_user_id_fkey', 'bookmarks', 'users', ['user_id'], ['id'])
    # ### end Alembic commands ###
