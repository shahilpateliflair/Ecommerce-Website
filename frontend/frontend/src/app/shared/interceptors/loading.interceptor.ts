import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoadingService } from '../loading.service';
var pendingRequest = 0;
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loading:LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loading.showLoading();
    pendingRequest=pendingRequest+1;
    return next.handle(request).pipe(
      tap({
        next:(event)=>{
          if(event.type===HttpEventType.Response){
            this.handleHideLoading();
          }
        },
        error:(_)=>{
          this.handleHideLoading
        }
        
      })
    )
   
  }
  handleHideLoading(){
      pendingRequest=pendingRequest-1;
      if(pendingRequest===0)
      this.loading.hideLoading();
  }
}
