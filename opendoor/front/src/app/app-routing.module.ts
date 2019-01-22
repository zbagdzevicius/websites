import {NgModule} from '@angular/core';
import {RouterModule, Routes, CanActivate} from '@angular/router';

import {AccountSetupComponent} from './account-setup/account-setup.component';
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
import {JobAddComponent} from './job-add/job-add.component';
import {AuthGuardService as AuthGuard} from './services/auth-guard.service';

const routes: Routes = [
  {path: 'setup', component: AccountSetupComponent, canActivate: [AuthGuard]},
  {path: 'company', component: CompanyComponent, canActivate: [AuthGuard]},
  {path: 'companySearch', component: CompanySearchComponent, canActivate: [AuthGuard]},
  {path: 'cv', component: CvComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'job', component: JobComponent, canActivate: [AuthGuard]},
  {path: 'addjob', component: JobAddComponent, canActivate: [AuthGuard]},
  {path: 'jobAdverts', component: JobAdvertsComponent, canActivate: [AuthGuard]},
  {path: 'jobSearch', component: JobSearchComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'employee', component: EmployeeComponent, canActivate: [AuthGuard]},
  {path: 'employeeSearch', component: EmployeeSearchComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'login'},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
