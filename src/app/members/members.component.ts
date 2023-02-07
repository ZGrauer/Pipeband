import { Component, OnInit } from '@angular/core';

import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent {
  pdfSrc = "../../assets/Kansas_City_St_Andrew_Pipe_Band_CONSTITUTION.pdf";

  constructor(private _authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.isLoggedIn();
  }

  isLoggedIn(){
    if(!this._authService.loggedIn()) {
      this.router.navigate(['/login']);
    }
  }
}
