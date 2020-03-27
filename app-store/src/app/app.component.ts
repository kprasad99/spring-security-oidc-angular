import { Component, OnInit, OnDestroy } from '@angular/core';
import { OidcConfigService, OidcSecurityService, ConfigResult } from 'angular-auth-oidc-client';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'k-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean;
  isConfigurationLoaded: boolean;
  userData: any;

  apps = [];

  constructor(private http: HttpClient, private oidcConfigService: OidcConfigService, public oidcSecurityService: OidcSecurityService) {
    if (this.oidcSecurityService.moduleSetup) {
      this.doCallbackLogicIfRequired();
    } else {
      this.oidcSecurityService.onModuleSetup.subscribe(() => {
        this.doCallbackLogicIfRequired();
      });
    }
  }

  ngOnInit() {
    this.http.get<any[]>('assets/config/apps.json').subscribe(e => { this.apps = e });
    this.oidcConfigService.onConfigurationLoaded.subscribe((value: ConfigResult) => {
      this.isConfigurationLoaded = true;
    });
    this.oidcSecurityService.getIsAuthorized().subscribe(auth => {
      this.isAuthenticated = auth;
    });
    this.oidcSecurityService.getUserData().subscribe(userData => {
      this.userData = userData;
      console.log(userData);
    });
  }

  ngOnDestroy(): void { }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff();
  }

  launch(app) {
    const token = this.oidcSecurityService.getToken();
    window.open(`${app.url}?src=${encodeURI(window.location.href)}`);
  }

  private doCallbackLogicIfRequired() {
    // Will do a callback, if the url has a code and state parameter.
    this.oidcSecurityService.authorizedCallbackWithCode(window.location.toString());
  }

}