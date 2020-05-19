import { Component, OnInit, OnDestroy } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'k-auto-login',
  template: ''
})
export class AutoLoginComponent implements OnInit, OnDestroy {

  lang: any;

  constructor(public oidcSecurityService: OidcSecurityService) {
  }

  ngOnInit() {
    this.oidcSecurityService.authorize();
  }

  ngOnDestroy(): void {
  }

}
