import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userPassword: string = '';
  hide = true;
  invalidPassword = false;
  
  // Rate limiting properties
  loginAttempts = 0;
  maxAttempts = 5;
  lockoutDuration = 15 * 60 * 1000; // 15 minutes
  isLockedOut = false;
  lockoutTimeRemaining = 0;
  
  private readonly ATTEMPTS_KEY = 'kcsapb_login_attempts';
  private readonly LOCKOUT_KEY = 'kcsapb_lockout_until';

  constructor(private _auth: AuthService, private router: Router) {}
  
  ngOnInit() {
    // Check if already logged in
    if (this._auth.loggedIn()) {
      this.router.navigate(['/members']);
      return;
    }
    
    // Check for existing lockout
    this.checkLockout();
    
    // Load previous login attempts
    const storedAttempts = localStorage.getItem(this.ATTEMPTS_KEY);
    if (storedAttempts) {
      this.loginAttempts = parseInt(storedAttempts);
    }
  }

  /**
   * Check if user is currently locked out due to too many failed attempts
   */
  checkLockout(): void {
    const lockoutUntil = localStorage.getItem(this.LOCKOUT_KEY);
    
    if (lockoutUntil) {
      const lockoutTime = parseInt(lockoutUntil);
      const now = Date.now();
      
      if (now < lockoutTime) {
        // Still locked out
        this.isLockedOut = true;
        this.lockoutTimeRemaining = Math.ceil((lockoutTime - now) / 1000 / 60); // minutes
        
        // Set timeout to unlock
        setTimeout(() => {
          this.clearLockout();
        }, lockoutTime - now);
      } else {
        // Lockout expired
        this.clearLockout();
      }
    }
  }

  /**
   * Clear lockout and reset attempts
   */
  clearLockout(): void {
    this.isLockedOut = false;
    this.lockoutTimeRemaining = 0;
    this.loginAttempts = 0;
    localStorage.removeItem(this.LOCKOUT_KEY);
    localStorage.removeItem(this.ATTEMPTS_KEY);
  }

  /**
   * Attempt to log in user
   */
  loginUser(): void {
    if (this.isLockedOut) {
      return;
    }

    this.invalidPassword = false;
    
    if (this._auth.login(this.userPassword)) {
      // Login successful - clear attempts and navigate
      this.clearLockout();
      this.router.navigate(['/members']);
    } else {
      // Login failed
      this.invalidPassword = true;
      this.loginAttempts++;
      localStorage.setItem(this.ATTEMPTS_KEY, this.loginAttempts.toString());

      // Check if should lock out
      if (this.loginAttempts >= this.maxAttempts) {
        const lockoutUntil = Date.now() + this.lockoutDuration;
        localStorage.setItem(this.LOCKOUT_KEY, lockoutUntil.toString());
        this.isLockedOut = true;
        this.lockoutTimeRemaining = Math.ceil(this.lockoutDuration / 1000 / 60); // minutes
        
        // Set timeout to unlock
        setTimeout(() => {
          this.clearLockout();
        }, this.lockoutDuration);
      }
      
      // Clear password field
      this.userPassword = '';
    }
  }

  /**
   * Get remaining attempts before lockout
   */
  getRemainingAttempts(): number {
    return Math.max(0, this.maxAttempts - this.loginAttempts);
  }
}

export interface User {
  username: string;
  password: string;
}