import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public get token(): string {
    return sessionStorage.getItem('token');
  }
  public set token(v: string) {
    sessionStorage.setItem('token', v);
  }

  public get userData(): any {
    const userData = sessionStorage.getItem('userData');
    return userData ? JSON.parse(userData) : undefined;
  }
  public set userData(v: any) {
    sessionStorage.setItem('userData', JSON.stringify(v));
  }


  constructor() { }
}
