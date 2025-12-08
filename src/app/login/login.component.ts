import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
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
  private lockoutTimerInterval: any = null;
  private unlockTimeout: any = null;

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

  ngOnDestroy() {
    // Clean up timers to prevent memory leaks
    this.stopLockoutTimer();
    if (this.unlockTimeout) {
      clearTimeout(this.unlockTimeout);
      this.unlockTimeout = null;
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
        // Still locked out - start countdown timer
        this.isLockedOut = true;
        this.startLockoutTimer(lockoutTime);
        
        // Clear any existing unlock timeout before creating a new one
        if (this.unlockTimeout) {
          clearTimeout(this.unlockTimeout);
        }
        
        // Set timeout to unlock
        this.unlockTimeout = setTimeout(() => {
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
    this.stopLockoutTimer();
    if (this.unlockTimeout) {
      clearTimeout(this.unlockTimeout);
      this.unlockTimeout = null;
    }
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
        
        // Start countdown timer
        this.startLockoutTimer(lockoutUntil);
        
        // Clear any existing unlock timeout before creating a new one
        if (this.unlockTimeout) {
          clearTimeout(this.unlockTimeout);
        }
        
        // Set timeout to unlock
        this.unlockTimeout = setTimeout(() => {
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

  /**
   * Start the lockout countdown timer
   * Updates the remaining time every second
   * @param lockoutUntil - Timestamp when lockout expires
   */
  private startLockoutTimer(lockoutUntil: number): void {
    // Stop any existing timer first
    this.stopLockoutTimer();
    
    // Update immediately
    this.updateLockoutTimeRemaining(lockoutUntil);
    
    // Update every second
    this.lockoutTimerInterval = setInterval(() => {
      this.updateLockoutTimeRemaining(lockoutUntil);
      
      // If time is up, clear the lockout
      if (this.lockoutTimeRemaining <= 0) {
        this.clearLockout();
      }
    }, 1000); // Update every second for smooth countdown
  }

  /**
   * Stop the lockout countdown timer
   */
  private stopLockoutTimer(): void {
    if (this.lockoutTimerInterval) {
      clearInterval(this.lockoutTimerInterval);
      this.lockoutTimerInterval = null;
    }
  }

  /**
   * Update the lockoutTimeRemaining based on current time
   * @param lockoutUntil - Timestamp when lockout expires
   */
  private updateLockoutTimeRemaining(lockoutUntil: number): void {
    const now = Date.now();
    const remainingMs = lockoutUntil - now;
    
    if (remainingMs <= 0) {
      this.lockoutTimeRemaining = 0;
    } else {
      // Convert to minutes and round up
      this.lockoutTimeRemaining = Math.ceil(remainingMs / 1000 / 60);
    }
  }
}

export interface User {
  username: string;
  password: string;
}