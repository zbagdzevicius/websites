"""user

Revision ID: 69dec13b2f76
Revises: 
Create Date: 2018-06-21 16:53:24.656061

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '69dec13b2f76'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('firstname', sa.String(length=30), nullable=False),
    sa.Column('lastname', sa.String(length=30), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user')
    # ### end Alembic commands ###
