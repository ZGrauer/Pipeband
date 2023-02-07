import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userPassword: string = '' ;
  allowedPassword = 'Andrew2023';
  hide = true;
  invalidPassword = false;

  constructor(private _auth: AuthService, private router: Router) {}
  ngOnInit() {}

  loginUser() {
    this.invalidPassword = false;
    if ( this._auth.login(this.userPassword)) {
      this.router.navigate(['/members']);
    } else {
      this.invalidPassword = true;
    }
  }
}

export interface User {
  username: string;
  password: string;
}