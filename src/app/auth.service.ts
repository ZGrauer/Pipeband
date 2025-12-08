import { Injectable } from '@angular/core';
import * as sha256 from 'js-sha256';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Obfuscated password hash split into 3 parts (Base64 encoded)
  // To generate these for your production password, run:
  //   node scripts/generate-hash-parts.js "YourProductionPassword"
  // 
  // Using the CHANGE_ME default password as example:
  private readonly p1 = atob('NDQyY2JmM2ZkZjBmMjQ3NzcwMzZl');
  private readonly p2 = atob('NjYwYzMyZDZlNGI1Zjc2MjEyMzFi');
  private readonly p3 = atob('ZmYyNzU0NjczYzVhMTg4YTJmNjE0YQ==');
  
  // Session configuration
  private readonly SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  private readonly TOKEN_KEY = 'kcsapb_auth_token';
  private readonly AUTH_TIME_KEY = 'kcsapb_auth_time';

  constructor() { }

  /**
   * Authenticate user with password
   * @param userPassword - Password entered by user
   * @returns true if authentication successful, false otherwise
   */
  login(userPassword: string): boolean {
    // Hash the input password
    const hashedInput = sha256.sha256(userPassword);
    
    // Reconstruct the actual hash from obfuscated parts
    const actualHash = this.p1 + this.p2 + this.p3;
    
    if (hashedInput === actualHash) {
      // Generate a session token with timestamp and partial hash
      const sessionToken = btoa(Date.now() + ':' + hashedInput.substring(0, 16));
      localStorage.setItem(this.TOKEN_KEY, sessionToken);
      localStorage.setItem(this.AUTH_TIME_KEY, Date.now().toString());
      return true;
    } else {
      this.clearAuth();
      return false;
    }
  }

  /**
   * Check if user is currently logged in with valid session
   * @returns true if logged in with valid session, false otherwise
   */
  loggedIn(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const authTime = localStorage.getItem(this.AUTH_TIME_KEY);
    
    if (!token || !authTime) {
      return false;
    }

    // Check if session has expired
    const elapsed = Date.now() - parseInt(authTime);
    
    if (elapsed > this.SESSION_DURATION) {
      this.clearAuth();
      return false;
    }
    
    return true;
  }

  /**
   * Get the current authentication token
   * @returns token string or null if not authenticated
   */
  getToken(): string | null {
    if (this.loggedIn()) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  /**
   * Log out the current user
   */
  logout(): void {
    this.clearAuth();
  }

  /**
   * Get remaining session time in milliseconds
   * @returns milliseconds remaining, or 0 if not logged in
   */
  getSessionTimeRemaining(): number {
    const authTime = localStorage.getItem(this.AUTH_TIME_KEY);
    
    if (!authTime) {
      return 0;
    }
    
    const elapsed = Date.now() - parseInt(authTime);
    const remaining = this.SESSION_DURATION - elapsed;
    
    return remaining > 0 ? remaining : 0;
  }

  /**
   * Clear all authentication data from localStorage
   */
  private clearAuth(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.AUTH_TIME_KEY);
  }
}
