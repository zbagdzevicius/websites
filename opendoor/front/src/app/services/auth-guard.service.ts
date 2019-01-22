import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {LoginService} from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public router: Router, public service: LoginService) {
  }

  canActivate(): boolean {
    if (!this.service.loggedIn) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
