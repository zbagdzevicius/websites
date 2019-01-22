from flask import request
from flask_restful import Resource

from app import db
from models.user import User, Employee, EmployeeKeyword

from utils import get_token

class EmployeeProfile(Resource):
    def post(self):
        token = get_token(request)

        if not token:
            return {'status': 'invalid_token'}

        data = request.get_json()

        fields = {
            'firstName': None, 'lastName': None, 'birth': None, 'city': None,
            'telephone': None, 'description': None,
            'workExperience': None,
        }

        for field in fields.keys():
            fields[field] = data.get(field, None)

        user = User.query.filter_by(id=token['user_id']).first()

        if user.type != '':
            try:
                Employee.query.filter_by(user_id=user.id).update(dict(
                    city=fields['city'],
                    telephone=fields['telephone'],
                    description=fields['description'],
                    work_experience=fields['workExperience']
                ))
                db.session.commit();

                return {'status': 'success', 'token': token['new_token']}
            except:
                return {'status': 'error'}
        else:
            try:
                User.query.filter_by(id=user.id).update(dict(
                    firstname=fields['firstName'],
                    lastname=fields['lastName'],
                    type='employee'
                ))

                employee = Employee(
                    user_id=user.id,
                    birth=fields['birth'],
                    city=fields['city'],
                    telephone=fields['telephone'],
                    description=fields['description'],
                    work_experience=fields['workExperience'],
                )
                db.session.add(employee)

                for keyword in data.getlist('keywords'):
                    employee_keyword = EmployeeKeyword(
                        employee_id=employee.id,
                        keyword=keyword
                    )
                    db.session.add(employee_keyword)

                db.session.commit()

                return {'status': 'success', 'token': token['new_token']}
            except:
                return {'status': 'error'}

    def get(self):
        token = get_token(request)

        if not token:
            return {'status': 'invalid_token'}

        user = User.query.filter_by(id=token['user_id']).first()

        if user:
            profile = Employee.query.filter_by(user_id=user.id).first()
            keywords = EmployeeKeyword.query.filter_by(employee_id=profile.id).all()

            all_keywords = []
            for keyword in keywords:
                all_keywords.append(keyword.keyword)

            return {
                'status': 'success',
                'token': token['new_token'],
                'firstName': user.firstname,
                'lastName': user.lastname,
                'birth': profile.birth.strftime('%Y-%m-%d'),
                'city': profile.city,
                'telephone': profile.telephone,
                'description': profile.description,
                'workExperience': profile.work_experience,
                'keywords': all_keywords
            }
        else:
            return {'status': 'error'}
