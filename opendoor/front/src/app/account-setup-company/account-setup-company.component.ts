import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Company} from '../services/company-profile.model';
import {AccountSetupCompanyService} from '../services/account-setup-company.service';

@Component({
  selector: 'app-account-setup-company',
  templateUrl: './account-setup-company.component.html',
  styleUrls: ['./account-setup-company.component.css']
})
export class AccountSetupCompanyComponent implements OnInit {

  company = new Company(null);

  constructor(private service: AccountSetupCompanyService) {
}

  ngOnInit() {
  }

  OnSubmit(form: NgForm) {
    this.service.setupCompany(form.value)
      .subscribe((data: any) => {
        console.log(data);
      });
  }

}
