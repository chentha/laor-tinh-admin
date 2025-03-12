import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { GeneralFunctionService } from '@core/service/general-function.service';
import { TokenService } from './../service/token.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  token:any;
  constructor(
    private router: Router,
    private allFunction: GeneralFunctionService,
    private auth: AuthService,
    private tokenService: TokenService
  ) {
    // this.token = this.auth.getToken()
    // console.log('token', this.tokenService.getValue())
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
    let token = this.auth.getToken(); // Get the latest token dynamically
    // console.log('token', token)

    let authReq = req; // Start with the original request
  
    if (token) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
    } else {
      // If no token is present, use Basic Auth
      const username = environment.Username;
      const password = environment.Password;
      const basicAuthCredentials = btoa(`${username}:${password}`);
      authReq = req.clone({
        headers: req.headers.set('Authorization', `Basic ${basicAuthCredentials}`),
      });
    }
  

    // Fallback for default headers (if necessary)
    if (!authReq.headers.has('Authorization')) {
      authReq = authReq.clone({
        headers: authReq.headers.set('Authorization', `Bearer ${environment.base_token}`),
      });
    }

    return next.handle(authReq);
  }
}