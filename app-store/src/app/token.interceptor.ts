import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private oidc: OidcSecurityService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.oidc.getToken();
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
