import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Company} from './company-profile.model';


@Injectable({
  providedIn: 'root'
})
export class AccountSetupCompanyService {

  constructor(private http: HttpClient) {
  }

  setupCompany(company: Company) {
    const formdata: Company = {
      firstName: company.firstName,
      lastName: company.lastName,
      companyName: company.companyName,
      recruiterJobTitle: company.recruiterJobTitle,
      jobOpenings: company.jobOpenings,
    }
    return this.http.post('/user/company/profile', formdata);
  }
}
