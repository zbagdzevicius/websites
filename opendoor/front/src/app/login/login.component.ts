import {Component, OnInit} from '@angular/core';
// import {AuthentificationService} from '../services/authentification.service';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) {

  }

  ngOnInit() {
  }

  public socialSignIn(socialPlatform: string) {
    this.loginService.socialSignIn(socialPlatform);
  }


}
