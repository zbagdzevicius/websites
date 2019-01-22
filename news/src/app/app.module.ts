import { NgtUniversalModule } from '@ng-toolkit/universal';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { WpApiLoader, WpApiModule, WpApiStaticLoader } from 'wp-api-angular';
import { Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy, CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { FacebookModule } from 'ngx-facebook';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SingleComponent } from './single/single.component';
import { CategoryComponent } from './category/category.component';


import { PostService } from './service/post.service';
import { ToolsService } from './service/tools.service';
import { PagerService } from './service/pager.service';
import { CategoryService } from './service/category.service';
import { NewPostsComponent } from './new-posts/new-posts.component';
import { HomeComponent } from './home/home.component';


library.add(fas);

export function WpApiLoaderFactory(http: Http) {
  return new WpApiStaticLoader(http, 'http://api.gwiddle.co.uk/wp-json/');
  // return new WpApiStaticLoader(http, 'https://chrislema.com/wp-json/');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SingleComponent,
    CategoryComponent,
    NewPostsComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    NgtUniversalModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    WpApiModule.forRoot({
      provide: WpApiLoader,
      useFactory: (WpApiLoaderFactory),
      deps: [Http]
    }),
    HttpClientModule,
    FontAwesomeModule,
    [
      ShareButtonsModule.forRoot()
    ],
    [
      FacebookModule.forRoot()
    ]
  ],
  providers: [
    PostService,
    ToolsService,
    PagerService,
    CategoryService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
})
export class AppModule {
}
