import {Injectable} from '@angular/core';
import {Employee} from './employee-profile.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountSetupEmployeeService {

  constructor(private http: HttpClient) {
  }

  setupEmployee(employee: Employee) {
    const body: Employee = {
      firstName: employee.firstName,
      lastName: employee.lastName,
      birth: employee.birth,
      city: employee.city,
      telephone: employee.telephone,
      description: employee.description,
      keywords: employee.keywords,
      work_experience: employee.work_experience,
    };
    return this.http.post('/user/employee/profile', body);
  }
}
