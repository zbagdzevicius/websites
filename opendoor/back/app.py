import unittest
import coverage

from flask import Flask
from models import db
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from settings import DATABASE_URI

from flask_restful import Api

from rest.login import Login
from rest.company import CompanyProfile
from rest.employee import EmployeeProfile

import os

def run_tests():
    cov = coverage.Coverage()
    cov.start()

    suite = unittest.TestLoader().discover('tests')
    unittest.TextTestRunner(verbosity=2).run(suite)

    cov.stop()
    cov.save()
    cov.html_report()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
migrate = Migrate(app, db)

api = Api(app)
api.add_resource(Login, '/login')

api.add_resource(CompanyProfile, '/user/company/profile')
api.add_resource(EmployeeProfile, '/user/employee/profile')
