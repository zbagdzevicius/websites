import { HomeComponent } from './home/home.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CategoryComponent} from './category/category.component';
import {SingleComponent} from './single/single.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: ':slug', component: SingleComponent},
  {path: ':slug/:slug', component: CategoryComponent, pathMatch: 'full'},
];


@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes
    // , {enableTracing: true}
  )]
})
export class AppRoutingModule {
}
