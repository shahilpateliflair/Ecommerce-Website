import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './shared/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private user:UserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  const user = this.user.currentUser;
  if(user.token){
    request = request.clone({
      setHeaders : {
        access_token : user.token
      }
    })
  }
    return next.handle(request);
  }
}
