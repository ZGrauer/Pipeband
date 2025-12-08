import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Obfuscated bcrypt password hash split into 3 parts (Base64 encoded)
  // To generate these for your production password, run:
  //   node scripts/generate-hash-parts.js "YourProductionPassword"
  // 
  // Note: Bcrypt hashes include the salt as part of the hash string (standard format)
  // Using the CHANGE_ME default password as example (bcrypt hash with 10 rounds):
  private readonly p1 = atob('JDJiJDEwJER2NkMwWXcveTE0ckI=');
  private readonly p2 = atob('UzZ2ajNnOS8ubjFQejNXNGdXdGk=');
  private readonly p3 = atob('REt1cW1kazh5WktSRDlhbzNKcnU=');
  
  // Session configuration
  private readonly SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  private readonly TOKEN_KEY = 'kcsapb_auth_token';
  private readonly AUTH_TIME_KEY = 'kcsapb_auth_time';

  constructor() { }

  /**
   * Authenticate user with password using bcrypt
   * @param userPassword - Password entered by user
   * @returns true if authentication successful, false otherwise
   */
  login(userPassword: string): boolean {
    try {
      // Reconstruct the bcrypt hash from obfuscated parts
      const storedHash = this.p1 + this.p2 + this.p3;
      
      // Use bcrypt to securely compare the password with the stored hash
      // bcrypt.compareSync handles the salt extraction and comparison automatically
      const isValid = bcrypt.compareSync(userPassword, storedHash);
      
      if (isValid) {
        // Generate a session token with timestamp
        const sessionToken = btoa(Date.now() + ':' + Math.random().toString(36).substring(2, 15));
        localStorage.setItem(this.TOKEN_KEY, sessionToken);
        localStorage.setItem(this.AUTH_TIME_KEY, Date.now().toString());
        return true;
      } else {
        this.clearAuth();
        return false;
      }
    } catch (error) {
      console.error('Authentication error:', error);
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
