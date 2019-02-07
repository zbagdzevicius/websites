from tests import BaseTestCase

from app import app, db
import json

from models.user import User, Company

from utils import create_token, is_token_valid

class TestLogin(BaseTestCase):
    def test_empty_email(self):
        response = json.loads(self.client.post('/login').data)
        assert response.get('status') == 'error'

    def test_user_does_not_exist(self):
        email = 'test@test.com'

        response = json.loads(self.client.post('/login', json=dict(
            email=email,
        )).data)

        assert response.get('status') == 'success'
        assert response.get('token', None) != None
        assert response.get('msg', '') == 'new_user'

        with app.app_context():
            assert User.query.filter_by(email=email).first() != None

    def test_user_exists_without_profile(self):
        email = 'test@test.com'

        with app.app_context():
            user = User(email=email, firstname='', lastname='', type='')
            db.session.add(user)
            db.session.commit()

        response = json.loads(self.client.post('/login', json=dict(
            email=email
        )).data)

        assert response.get('status') == 'success'
        assert response.get('token', '') != None
        assert response.get('msg', '') == 'new_user'

    def test_user_exists_with_profile(self):
        email = 'test@test.com'

        with app.app_context():
            user = User(email=email, firstname='', lastname='', type='company')
            db.session.add(user)

            company = Company(user_id=user.id, company_name='test',
                              recruiter_job_title='test', job_openings=10)
            db.session.add(company)
            db.session.commit()

        response = json.loads(self.client.post('/login', json=dict(
            email=email
        )).data)

        assert response.get('status') == 'success'
        assert response.get('token', '') != None
        assert response.get('msg', '') == ''

    def test_valid_token(self):
        email = 'test@test.com'
        response = json.loads(self.client.post('/login', json=dict(
            email=email
        )).data)

        assert is_token_valid(response.get('token')) == True

    def test_invalid_token(self):
        assert is_token_valid('invalid_token') == False

    def test_expired_token(self):
        token = create_token('test@test.com', expiration_time=-1)
        assert is_token_valid(token) == False

if __name__ == '__main__':
    unittest.main()
