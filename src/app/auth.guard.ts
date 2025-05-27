import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Import AuthService

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  { // Removed "implements CanActivate" as it's deprecated for class guards with canActivate method

  constructor(private authService: AuthService, private router: Router) {} // Inject dependencies

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (this.authService.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']); // Navigate to login
      return false; // Block activation
    }
  }
}
