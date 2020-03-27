import { Component, OnInit, OnDestroy } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'k-auto-login',
  template: ''
})
export class AutoLoginComponent implements OnInit, OnDestroy {

  lang: any;

  constructor(private router: Router, private route: ActivatedRoute, public oidcSecurityService: OidcSecurityService) {
    this.oidcSecurityService.onModuleSetup.subscribe(() => {
      this.onModuleSetup();
    });
  }

  ngOnInit() {
    if (this.oidcSecurityService.moduleSetup) {
      this.onModuleSetup();
    }
  }

  ngOnDestroy(): void {
  }

  private onModuleSetup() {
    // console.log('KP-1');
    // this.route.queryParams.subscribe(e => {
    //   if (e?.token) {
    //     sessionStorage.setItem('token', e.token);
    //   } else if (!sessionStorage.getItem('token')) {
    //     sessionStorage.removeItem('token');
    //   }
    //   console.log('KP-2');
    // });
    this.oidcSecurityService.authorize();
  }

}
