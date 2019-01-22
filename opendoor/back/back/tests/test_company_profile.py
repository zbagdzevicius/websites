from tests import BaseTestCase

from app import app, db
import json

from utils import decode_token

from models.user import User, Company

class TestCompanyProfile(BaseTestCase):
    def test_invalid_token(self):
        response = json.loads(self.client.post('/user/company/profile', headers=dict(
            token='invalid_token',
        )).data)
        assert response.get('status') == 'invalid_token'

    def test_empty_fields(self):
        response = json.loads(self.client.post('/login', json=dict(
            email='test@test.com',
        )).data)
        token = response['token']

        response = json.loads(self.client.post('/user/company/profile', headers=dict(
            token=token
        )).data)

        assert response.get('status') == 'error'

    def test_valid_fields(self):
        response = json.loads(self.client.post('/login', json=dict(
            email='test@test.com',
        )).data)
        token = response['token']

        response = json.loads(self.client.post('/user/company/profile', json=dict(
            firstname='test',
            lastname='test',
            company_name='test',
            recruiter_job_title='test',
            job_openings=10,
        ), headers=dict(token=token)).data)

        assert response.get('status') == 'success'

        decoded_token = decode_token(token)

        with app.app_context():
            assert Company.query.filter_by(user_id=decoded_token['user_id']).first() != None

    def test_profile_editing(self):
        email = 'test@test.com'

        response = json.loads(self.client.post('/login', json=dict(
            email='test@test.com',
        )).data)
        token = response['token']

        response = json.loads(self.client.post('/user/company/profile', json=dict(
            firstname='test',
            lastname='test',
            company_name='test',
            recruiter_job_title='test',
            job_openings=10,
        ), headers=dict(token=token)).data)

        response = json.loads(self.client.post('/user/company/profile', json=dict(
            firstname='test2',
            lastname='test2',
            company_name='test2',
            recruiter_job_title='test2',
            job_openings=100,
        ), headers=dict(token=token)).data)

        with app.app_context():
            user = User.query.filter_by(email=email).first()
            profile = Company.query.filter_by(user_id=user.id).first()

            assert user.firstname == 'test'
            assert user.lastname == 'test'
            assert profile.company_name == 'test2'
            assert profile.recruiter_job_title == 'test2'
            assert profile.job_openings == 100

    def test_get_profile(self):
        email = 'test@test.com'

        response = json.loads(self.client.post('/login', json=dict(
            email='test@test.com',
        )).data)
        token = response['token']

        response = json.loads(self.client.post('/user/company/profile', json=dict(
            firstname='test',
            lastname='test',
            company_name='test',
            recruiter_job_title='test',
            job_openings=10
        ), headers=dict(token=token)).data)

        response = json.loads(self.client.get('/user/company/profile', headers=dict(
            token=token,
        )).data)

        assert response['status'] == 'success'
        assert response['firstname'] == 'test'
        assert response['lastname'] == 'test'
        assert response['company_name'] == 'test'
        assert response['recruiter_job_title'] == 'test'
        assert response['job_openings'] == 10
