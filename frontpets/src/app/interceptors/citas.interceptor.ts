import { AuthService } from './../services/auth.service';
import { TokenService } from './../services/token.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CitasInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private authService: AuthService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let intReq = request;
    const token = this.tokenService.getToken();

    if(token !== null){
      intReq =request.clone({headers: request.headers.set('Authorization', 'Bearer ' + token)})
    }

    return next.handle(intReq)
  }

}

export const interceptorProvider = [{ provide: HTTP_INTERCEPTORS, useClass: CitasInterceptor, multi: true }];
