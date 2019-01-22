import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from '../services/employee-profile.model';
import {AccountSetupEmployeeService} from '../services/account-setup-employee.service';

@Component({
  selector: 'app-account-setup-employee',
  templateUrl: './account-setup-employee.component.html',
  styleUrls: ['./account-setup-employee.component.css']
})
export class AccountSetupEmployeeComponent implements OnInit {

  employee = new Employee(null);

  constructor(private service: AccountSetupEmployeeService) { }

  ngOnInit() {
  }

  OnSubmit(form: NgForm) {
    console.log(form);
    this.service.setupEmployee(form.value)
      .subscribe((data: any) => {
        console.log(data);
      });
  }

}
