"""empty message

Revision ID: ce81267af7c8
Revises: 4fe374bb6eee
Create Date: 2022-07-27 13:35:50.321308

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ce81267af7c8'
down_revision = '4fe374bb6eee'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('events_user_id_fkey', 'events', type_='foreignkey')
    op.create_foreign_key(None, 'events', 'users', ['user_id'], ['id'], ondelete='CASCADE')
    op.drop_constraint('user_events_user_id_fkey', 'user_events', type_='foreignkey')
    op.create_foreign_key(None, 'user_events', 'users', ['user_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'user_events', type_='foreignkey')
    op.create_foreign_key('user_events_user_id_fkey', 'user_events', 'users', ['user_id'], ['id'], ondelete='CASCADE')
    op.drop_constraint(None, 'events', type_='foreignkey')
    op.create_foreign_key('events_user_id_fkey', 'events', 'users', ['user_id'], ['id'])
    # ### end Alembic commands ###
