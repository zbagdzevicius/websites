from . import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    firstname = db.Column(db.String(30), nullable=False)
    lastname = db.Column(db.String(30), nullable=False)
    type = db.Column(db.String(8), nullable=False)

class Company(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    company_name = db.Column(db.String(30), nullable=False)
    recruiter_job_title = db.Column(db.String(50), nullable=False)
    job_openings = db.Column(db.Integer, nullable=False)

class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    birth = db.Column(db.Date, nullable=False)
    city = db.Column(db.String(30), nullable=False)
    telephone = db.Column(db.String(12), nullable=False)
    description = db.Column(db.Text, nullable=False)
    work_experience = db.Column(db.Integer, nullable=False)

class EmployeeKeyword(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'))
    keyword = db.Column(db.String(30), nullable=False)
