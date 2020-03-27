import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'k-sso',
  template: '',
})
export class SsoComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private auth: AuthService) { }

  ngOnInit(): void {

    this.route.queryParams.pipe(tap((e: any) => this.auth.token = e?.token), switchMap(e => this.http.get('/auth/realms/universal/protocol/openid-connect/userinfo'))).subscribe(e => {
      this.auth.userData = e;
      this.router.navigateByUrl(`home`);
    }, (e: HttpErrorResponse) => {
      if (e.status === 401) {
        this.router.navigateByUrl(`unauthorized`);
      }
    });
  }

}
