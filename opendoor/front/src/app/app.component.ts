import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private router: Router, private  loginService: LoginService) {
  }

  ngOnInit() {
    console.log(this.loginService.loggedIn);
    this.loginService.checkIfLoggedIn();
  }

  public logout() {
    this.loginService.logout();
  }
}
