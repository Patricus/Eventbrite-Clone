"""empty message

Revision ID: b4fad0e55e1e
Revises: ce81267af7c8
Create Date: 2022-07-27 13:48:55.747541

"""
from alembic import op
import sqlalchemy as sa
import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = 'b4fad0e55e1e'
down_revision = 'ce81267af7c8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('tickets_user_id_fkey', 'tickets', type_='foreignkey')
    op.create_foreign_key(None, 'tickets', 'users', ['user_id'], ['id'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'tickets', type_='foreignkey')
    op.create_foreign_key('tickets_user_id_fkey', 'tickets', 'users', ['user_id'], ['id'])
    # ### end Alembic commands ###
