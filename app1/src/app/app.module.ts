import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { AutoLoginComponent } from './auto-login/auto-login.component';
import { OidcConfigService, AuthModule } from 'angular-auth-oidc-client';
import { switchMap, map } from 'rxjs/operators';

const oidc_configuration = 'assets/config/oidc.json';

export function loadConfig(oidcConfigService: OidcConfigService, http: HttpClient) {
  const setupAction$ = http.get<any>(oidc_configuration).pipe(
    map((customConfig) => {
      return {
        stsServer: customConfig.stsServer,
        redirectUrl: customConfig.redirect_url,
        clientId: customConfig.client_id,
        responseType: customConfig.response_type,
       // scope: customConfig.scope,
        postLogoutRedirectUri: customConfig.post_logout_redirect_uri,
        startCheckSession: customConfig.start_checksession,
        silentRenew: customConfig.silent_renew,
        silentRenewUrl: customConfig.redirect_url + '/silent-renew.html',
      //  postLoginRoute: customConfig.startup_route,
      //  forbiddenRoute: customConfig.forbidden_route,
      //  unauthorizedRoute: customConfig.unauthorized_route,
      //  logLevel: customConfig.logLevel, // LogLevel.Debug,
        maxIdTokenIatOffsetAllowedInSeconds: customConfig.max_id_token_iat_offset_allowed_in_seconds,
        historyCleanupOff: true,
        // autoUserinfo: false,
      };
    }),
    switchMap((config) => oidcConfigService.withConfig(config))
  );

  return () => setupAction$.toPromise();
}


@NgModule({
  declarations: [
    AppComponent,
    UnauthorizedComponent,
    AutoLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule.forRoot(),
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    OidcConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      deps: [OidcConfigService, HttpClient],
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
