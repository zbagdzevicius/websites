from flask import request
from flask_restful import Resource

from app import db
from models.user import User, Company

from utils import get_token

class CompanyProfile(Resource):
    def post(self):
        token = get_token(request)

        if not token:
            return {'status': 'invalid_token'}

        data = request.get_json()

        fields = {
            'firstName': None, 'lastName': None, 'companyName': None,
            'recruiterJobTitle': None, 'jobOpenings': None,
        }

        for field in fields.keys():
            fields[field] = data.get(field, None)

        user = User.query.filter_by(id=token['user_id']).first()

        if user.type != '':
            try:
                Company.query.filter_by(user_id=user.id).update(dict(
                    company_name=fields['companyName'],
                    recruiter_job_title=fields['recruiterJobTitle'],
                    job_openings=int(fields['jobOpenings'])
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
                    type='company'
                ))

                company = Company(
                    user_id=user.id,
                    company_name=fields['companyName'],
                    recruiter_job_title=fields['recruiterJobTitle'],
                    job_openings=fields['jobOpenings']
                )
                db.session.add(company)
                db.session.commit()

                return {'status': 'success', 'token': token['new_token']}
            except Exception as err:
                print(err)
                return {'status': 'error'}

    def get(self):
        token = get_token(request)

        if not token:
            return {'status': 'invalid_token'}

        user = User.query.filter_by(id=token['user_id']).first()

        if user:
            profile = Company.query.filter_by(user_id=user.id).first()

            return {
                'status': 'success',
                'token': token['new_token'],
                'firstName': user.firstname,
                'lastName': user.lastname,
                'companyName': profile.company_name,
                'recruiterJobTitle': profile.recruiter_job_title,
                'jobOpenings': profile.job_openings
            }
        else:
            return {'status': 'error'}
