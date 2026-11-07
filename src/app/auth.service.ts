import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

// 'invalid' is a wrong password; 'unavailable' means the login service couldn't be reached
export type LoginResult = 'ok' | 'invalid' | 'unavailable';

/**
 * Members login. The password is checked by the login Lambda (aws/member-login/index.mjs) at
 * /api/login, which sets the CloudFront cookies that unlock /assets/members/*. This service
 * only remembers when that session ends, so the members pages know whether to show.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'kcsapb_auth_token';
  private readonly EXPIRES_KEY = 'kcsapb_auth_expires';

  constructor(private http: HttpClient) { }

  /**
   * Check the password with the login service
   * @param userPassword - Password entered by user
   */
  async login(userPassword: string): Promise<LoginResult> {
    try {
      const reply = await firstValueFrom(
        this.http.post<{ expiresAt?: unknown }>('/api/login', { password: userPassword })
      );
      // Anything but the service's own reply (CloudFront's HTML fallback, say) isn't a login
      if (typeof reply?.expiresAt !== 'number') {
        this.clearAuth();
        return 'unavailable';
      }
      const sessionToken = btoa(Date.now() + ':' + Math.random().toString(36).substring(2, 15));
      localStorage.setItem(this.TOKEN_KEY, sessionToken);
      localStorage.setItem(this.EXPIRES_KEY, reply.expiresAt.toString());
      return 'ok';
    } catch (error) {
      this.clearAuth();
      return error instanceof HttpErrorResponse && error.status === 401 ? 'invalid' : 'unavailable';
    }
  }

  /**
   * Check if user is currently logged in with a session that hasn't expired
   */
  loggedIn(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const expires = Number(localStorage.getItem(this.EXPIRES_KEY));

    if (!token || !expires) {
      return false;
    }
    if (Date.now() >= expires) {
      this.clearAuth();
      return false;
    }
    return true;
  }

  /**
   * Log out the current user, including the file cookies
   */
  logout(): void {
    this.clearAuth();
    this.http.post('/api/logout', {}).subscribe({ error: () => undefined });
  }

  private clearAuth(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.EXPIRES_KEY);
    localStorage.removeItem('kcsapb_auth_time'); // Left behind by the old browser-only login
  }
}
