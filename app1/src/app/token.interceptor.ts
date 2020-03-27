import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: OidcSecurityService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getToken();
    if (token !== '') {
      const tokenValue = `Bearer ${token}`;
      request = request.clone({
        setHeaders: {
          Authorization: tokenValue
        }
      });
    }
    return next.handle(request);
  }

}
