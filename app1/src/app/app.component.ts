import { Component } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Router } from '@angular/router';

@Component({
  selector: 'k-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {

  userData: any;
  isAuthenticated: boolean;

  constructor(public oidcSecurityService: OidcSecurityService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.oidcSecurityService
      .checkAuth()

      .subscribe((isAuthenticated) => {
        if (!isAuthenticated) {
          console.log(window.location.pathname);
          if ('/autologin' !== window.location.pathname) {
            this.write('redirect', window.location.pathname);
            this.router.navigate(['/autologin']);
          }
        }
        if (isAuthenticated) {
          console.log("logged-in");
          this.navigateToStoredEndpoint();
        }
      });
  }

  ngOnDestroy(): void {
  }

  login() {
    console.log('start login');
    this.oidcSecurityService.authorize();
  }

  refreshSession() {
    console.log('start refreshSession');
    this.oidcSecurityService.authorize();
  }

  logout() {
    console.log('start logoff');
    this.oidcSecurityService.logoff();
  }

  private navigateToStoredEndpoint() {
    const path = this.read('redirect');

    if (this.router.url === path) {
      return;
    }

    if (path.toString().includes('/unauthorized')) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate([path]);
    }
  }

  private read(key: string): any {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }

    return;
  }

  private write(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

}
