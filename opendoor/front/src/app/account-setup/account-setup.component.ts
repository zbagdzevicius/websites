import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-account-setup',
  templateUrl: './account-setup.component.html',
  styleUrls: ['./account-setup.component.css']
})
export class AccountSetupComponent implements OnInit {

  public user_type;

  constructor() {
  }

  ngOnInit() {
  }

  public select(user_type) {
    this.user_type = user_type;
  }

}
