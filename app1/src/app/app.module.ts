import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { AutoLoginComponent } from './auto-login/auto-login.component';
import { OidcConfigService, AuthModule, OidcSecurityService, ConfigResult, OpenIdConfiguration } from 'angular-auth-oidc-client';

const oidc_configuration = 'assets/config/oidc.json';

export function loadConfig(oidcConfigService: OidcConfigService) {
  return () => oidcConfigService.load(oidc_configuration);
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
      deps: [OidcConfigService],
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private oidcSecurityService: OidcSecurityService, private oidcConfigService: OidcConfigService) {
    this.oidcConfigService.onConfigurationLoaded.subscribe((configResult: ConfigResult) => {

      // Use the configResult to set the configurations
      const config: OpenIdConfiguration = {
        stsServer: configResult.customConfig.stsServer,
        redirect_url: configResult.customConfig.redirect_url,
        client_id: configResult.customConfig.client_id,
        scope: 'openid profile email oidc',
        response_type: configResult.customConfig.response_type,
        silent_renew: true,
        silent_renew_url: 'assets/silent-renew.html',
        post_login_route: '/home',
        log_console_debug_active: false,
        post_logout_redirect_uri: `${window.location.origin}`,
        start_checksession: true,
        auto_userinfo: false,
        history_cleanup_off: true,
        iss_validation_off: true
      };

      this.oidcSecurityService.setupModule(config, configResult.authWellknownEndpoints);
    });
  }
}
