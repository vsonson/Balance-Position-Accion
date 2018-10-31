import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';
import { RouterExtensions } from "nativescript-angular/router";
import { Observable } from 'rxjs/Observable';
import { SharedService } from './shared.service';
import { Loader } from './../components/loader/loader.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {

  constructor(private router: RouterExtensions, private shared: SharedService){}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    console.log('making req')
    return next.handle(req)
      .map((event) => {
        console.log('inside map')
        console.log(event.type)
        if(event instanceof HttpResponse) {
             console.log('response status', event.status);

          }  
        return event;
      })
      .catch((err: any, caught)=> {

        console.log("Errrrrrrrr", err.status);
        if (err.status === 401) {
              console.info('err.error =', err.error, ';');
              this.shared.removeToken();
              this.router.navigate(['/auth/signin']);
          }
          return Observable.throw(err);
      });
  }

}