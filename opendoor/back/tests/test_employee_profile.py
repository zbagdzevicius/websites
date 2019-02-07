from tests import BaseTestCase

from app import app, db
import json

from utils import decode_token

from models.user import User, Employee, EmployeeKeyword

from datetime import date

class TestEmployeeProfile(BaseTestCase):
    def test_invalid_token(self):
        response = json.loads(self.client.post('/user/employee/profile', headers=dict(
            token='invalid_token',
        )).data)
        assert response.get('status') == 'invalid_token'

    def test_empty_fields(self):
        response = json.loads(self.client.post('/login', json=dict(
            email='test@test.com',
        )).data)
        token = response['token']

        response = json.loads(self.client.post('/user/employee/profile', headers=dict(
            token=token,
        )).data)

        assert response.get('status') == 'error'

    def test_valid_fields(self):
        response = json.loads(self.client.post('/login', json=dict(
            email='test@test.com',
        )).data)
        token = response['token']

        response = json.loads(self.client.post('/user/employee/profile', json=dict(
            firstname='test',
            lastname='test',
            birth='1900-01-01',
            city='test',
            telephone='+37061234567',
            description='test test test',
            work_experience=10
        ), headers=dict(token=token)).data)

        assert response.get('status') == 'success'

        decoded_token = decode_token(token)

        with app.app_context():
            assert Employee.query.filter_by(user_id=decoded_token['user_id']).first() != None

    def test_profile_editing(self):
        email = 'test@test.com'

        response = json.loads(self.client.post('/login', json=dict(
            email='test@test.com',
        )).data)
        token = response['token']

        response = json.loads(self.client.post('/user/employee/profile', json=dict(
            firstname='test',
            lastname='test',
            birth='1900-01-01',
            city='test',
            telephone='+37061234567',
            description='test test test',
            work_experience=10
        ), headers=dict(token=token)).data)

        response = json.loads(self.client.post('/user/employee/profile', json=dict(
            firstname='test2',
            lastname='test2',
            birth='1902-01-01',
            city='test2',
            telephone='+37061234568',
            description='test2 test2 test2',
            work_experience=200
        ), headers=dict(token=token)).data)

        with app.app_context():
            user = User.query.filter_by(email=email).first()
            profile = Employee.query.filter_by(user_id=user.id).first()

            assert user.firstname == 'test'
            assert user.lastname == 'test'
            assert profile.birth == date(1900, 1, 1)
            assert profile.city == 'test2'
            assert profile.telephone == '+37061234568'
            assert profile.description == 'test2 test2 test2'
            assert profile.work_experience == 200

    def test_get_profile(self):
        email = 'test@test.com'

        response = json.loads(self.client.post('/login', json=dict(
            email='test@test.com',
        )).data)
        token = response['token']

        response = json.loads(self.client.post('/user/employee/profile', json=dict(
            firstname='test',
            lastname='test',
            birth='1900-01-01',
            city='test',
            telephone='+37061234567',
            description='test test test',
            work_experience=10
        ), headers=dict(token=token)).data)

        response = json.loads(self.client.get('/user/employee/profile', headers=dict(
            token=token
        )).data)

        assert response['status'] == 'success'
        assert response['firstname'] == 'test'
        assert response['lastname'] == 'test'
        assert response['birth'] == '1900-01-01'
        assert response['city'] == 'test'
        assert response['telephone'] == '+37061234567'
        assert response['description'] == 'test test test'
        assert response['work_experience'] == 10
