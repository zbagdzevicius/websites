from unittest import TestCase

from app import app, db

from settings import TEST_DATABASE_URI

class BaseTestCase(TestCase):
    def setUp(self):
        app.config['SQLALCHEMY_DATABASE_URI'] = TEST_DATABASE_URI
        app.config['TESTING'] = True
        self.client = app.test_client()

        with app.app_context():
            db.create_all()

    def tearDown(self):
        with app.app_context():
            db.drop_all()
