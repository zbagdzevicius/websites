from flask import request
from flask_restful import Resource

from app import db
from models.user import User

from utils import create_token

class Login(Resource):
    def post(self):
        email = request.get_json().get('email', None)

        if not email:
            return {'status': 'error'}

        # User exists, login
        user = User.query.filter_by(email=email).first()
        if user and user.type != '':
            token = create_token(user.id)

            return {
                'status': 'success',
                'token': token,
                'user_type': user.type,
            }
        # User doesn't exist or user hasn't filled out their profile
        else:
            if not user:
                # First name, last name and user type are set in the profile
                # creation page
                user = User(email=email, firstname='', lastname='', type='')

            db.session.add(user)
            db.session.commit()

            token = create_token(user.id)

            return {'status': 'success', 'token': token, 'msg': 'new_user'}
