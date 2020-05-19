import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'k-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit {

  userData: any;
  adminReqData: any;
  userReqData: any;

  constructor(public oidcSecurityService: OidcSecurityService, private auth: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    this.oidcSecurityService.userData$.subscribe(userData => {
      this.userData = userData;
    });
  }

  logout() {
    this.oidcSecurityService.logoffLocal();
    this.userData = undefined;
  }

  admin() {
    this.http.get('/api/admin',{
      responseType: 'text'
    }).subscribe((e) => {
      this.adminReqData = 'You can access admin data';
    }, (e: HttpErrorResponse) => {
      if (e.status === 403) {
        this.adminReqData = "You can't access admin data";
      }
    });
  }

  user() {
    this.http.get('/api/user',{
      responseType: 'text'
    }).subscribe((e) => {
      this.userReqData = 'You can access user data';
    }, (e: HttpErrorResponse) => {
      if (e.status === 403) {
        this.userReqData = "You can't access user data";
      }
    });
  }

}
