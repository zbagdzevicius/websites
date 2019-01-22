import { ContactComponent } from './contact/contact.component';
import { ExpoComponent } from './expo/expo.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesComponent } from './services/services.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'paslaugos', component: ServicesComponent },
  { path: 'expo', component: ExpoComponent },
  { path: '*', component: HomeComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes
  )]
})
export class AppRoutingModule { }
