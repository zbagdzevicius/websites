import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService, FacebookLoginProvider, GoogleLoginProvider, LinkedinLoginProvider, SocialUser} from 'angular-6-social-login';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private socialAuthService: AuthService, private router: Router) {
  }

  private _userType: String;


  get userType(): String {
    return this._userType;
  }

  set userType(value: String) {
    this._userType = value;
  }

  private _user: SocialUser;

  get user(): SocialUser {
    return this._user;
  }

  set user(value: SocialUser) {
    this._user = value;
  }

  private _loggedIn: boolean;

  get loggedIn(): boolean {
    return this._loggedIn;
  }

  set loggedIn(value: boolean) {
    this._loggedIn = value;
  }

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    } else if (socialPlatform === 'linkedin') {
      socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        if (userData.email !== undefined) {
          console.log(socialPlatform + ' sign in data : ', userData.email);
          this.socialAuthService.authState.subscribe((user) => {
            this._user = user;
            this._loggedIn = (user != null);
            sessionStorage.setItem('loggedIn', this.loggedIn.toString());
            this.createToken(userData.email);
          });
        } else {
          console.log('please login to continue');
        }
      }
    );
  }

  public logout() {
    this.loggedIn = undefined;
    console.log('logout success');
  }

  public createToken(email) {
    return this.http.post('/login', {'email': email}).subscribe(data => {
      if (data['status'] === 'success') {
        sessionStorage.setItem('token', data['token']);
        this.userType = data['msg'];
        console.log(this.userType);
        if (this.userType === 'new_user') {
          this.router.navigate(['setup']);
        } else {
          this.router.navigate(['home']);
        }
      }
    });
  }

  public checkIfLoggedIn() {
    if (this.loggedIn !== true) {
      this.router.navigate(['login']);
    }
  }
}
