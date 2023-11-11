import { Injectable } from '@angular/core';
import * as sha256 from 'js-sha256';
import { environment } from './../environments/environment';
const MEMBER_PASSWORD: string = sha256.sha256(environment.memberPassword);


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  login(userPassword: string): boolean {
    userPassword = sha256.sha256(userPassword);
    if ( userPassword == MEMBER_PASSWORD ) {
      console.log('login success');
      localStorage.setItem('token', 'secretToken');
      return true;
    } else {
      localStorage.removeItem('token');
      return false;
    }
  }

  loggedIn(){
    let hasToken = false;
    if (localStorage.getItem('token') == 'secretToken'){
      hasToken = true;
    }
    return hasToken;
  }

  getToken(){
    return localStorage.getItem('token');
  }
}
