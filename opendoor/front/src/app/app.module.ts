import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';

import { AccountSetupComponent } from './account-setup/account-setup.component';
import {CompanyComponent} from './company/company.component';
import {CompanySearchComponent} from './company-search/company-search.component';
import {CvComponent} from './cv/cv.component';
import {HomeComponent} from './home/home.component';
import {JobComponent} from './job/job.component';
import {JobAdvertsComponent} from './job-adverts/job-adverts.component';
import {JobSearchComponent} from './job-search/job-search.component';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {EmployeeComponent} from './employee/employee.component';
import {EmployeeSearchComponent} from './employee-search/employee-search.component';

import {AccountSetupCompanyService} from './services/account-setup-company.service';
import {AccountSetupEmployeeService} from './services/account-setup-employee.service';
import {LoginService} from './services/login.service';
import {AuthGuardService} from './services/auth-guard.service';

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
  LinkedinLoginProvider
} from 'angular-6-social-login';
import { ProfileCompanyComponent } from './profile-company/profile-company.component';
import { ProfileEmployeeComponent } from './profile-employee/profile-employee.component';
import { JobAddComponent } from './job-add/job-add.component';
import { JobAddCompanyComponent } from './job-add-company/job-add-company.component';
import { JobAddEmployeeComponent } from './job-add-employee/job-add-employee.component';
import { AccountSetupEmployeeComponent } from './account-setup-employee/account-setup-employee.component';
import { AccountSetupCompanyComponent } from './account-setup-company/account-setup-company.component';
import { InterceptorComponent } from './interceptor/interceptor.component';


export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('203614273497647')
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('17759491272-3bhamt76okhe1kiq08ev7c4it324h6rs.apps.googleusercontent.com')
      },
      {
        id: LinkedinLoginProvider.PROVIDER_ID,
        provider: new LinkedinLoginProvider('1098828800522-m2ig6bieilc3tpqvmlcpdvrpvn86q4ks.apps.googleusercontent.com')
      },
    ]
);
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent,
    CompanySearchComponent,
    CvComponent,
    HomeComponent,
    JobComponent,
    JobAdvertsComponent,
    JobSearchComponent,
    LoginComponent,
    ProfileComponent,
    EmployeeComponent,
    EmployeeSearchComponent,
    AccountSetupComponent,
    ProfileCompanyComponent,
    ProfileEmployeeComponent,
    JobAddComponent,
    JobAddCompanyComponent,
    JobAddEmployeeComponent,
    AccountSetupEmployeeComponent,
    AccountSetupCompanyComponent,
    InterceptorComponent
  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorComponent,
      multi: true
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    AccountSetupCompanyService,
    AccountSetupEmployeeService,
    LoginService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
