import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  allowedPassword = 'Andrew2023';

  constructor() { }

  login(userPassword: string): boolean {
    if ( userPassword == this.allowedPassword ) {
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
