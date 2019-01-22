import {Component} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {LoginService} from '../services/login.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-interceptor',
  templateUrl: './interceptor.component.html',
  styleUrls: ['./interceptor.component.css']
})
export class InterceptorComponent implements HttpInterceptor {

  constructor(public auth: LoginService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        'token': sessionStorage.getItem('token'),
        'Access-Control-Allow-Origin': '*'
      }
    });
    return next.handle(request);
  }

}
