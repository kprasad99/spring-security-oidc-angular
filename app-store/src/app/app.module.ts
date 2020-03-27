import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { OidcConfigService, OpenIdConfiguration, OidcSecurityService, ConfigResult, AuthModule } from 'angular-auth-oidc-client';
import { TokenInterceptor } from './token.interceptor';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule} from '@angular/material/divider';

import { FlexLayoutModule } from '@angular/flex-layout';

const oidc_configuration = 'assets/config/oidc.json';

export function loadConfig(oidcConfigService: OidcConfigService) {
  return () => oidcConfigService.load(oidc_configuration);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatRippleModule,
    MatMenuModule,
    MatDividerModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule
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
        scope: 'openid profile email',
        response_type: 'code',
        silent_renew: true,
        silent_renew_url: 'assets/silent-renew.html',
        log_console_debug_active: true,
        post_logout_redirect_uri: `${window.location.origin}`,
        // post_login_route: configResult.customConfig.post_login_route
        // all other properties you want to set
      };

      this.oidcSecurityService.setupModule(config, configResult.authWellknownEndpoints);
    });
  }
}
