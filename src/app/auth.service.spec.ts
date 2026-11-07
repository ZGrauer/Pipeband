import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
    localStorage.clear();
  });

  function answerLogin(body: string | object, status = 200, statusText = 'OK') {
    const request = http.expectOne('/api/login');
    expect(request.request.method).toBe('POST');
    request.flush(body, { status, statusText });
    return request;
  }

  it('should log in when the login service accepts the password', async () => {
    const result = service.login('right');
    const request = answerLogin({ expiresAt: Date.now() + 60_000 });

    expect(request.request.body).toEqual({ password: 'right' });
    expect(await result).toBe('ok');
    expect(service.loggedIn()).toBeTrue();
  });

  it('should report a wrong password', async () => {
    const result = service.login('wrong');
    answerLogin({ error: 'Incorrect password' }, 401, 'Unauthorized');

    expect(await result).toBe('invalid');
    expect(service.loggedIn()).toBeFalse();
  });

  it('should report the service as unavailable on a server error', async () => {
    const result = service.login('right');
    answerLogin('Bad gateway', 502, 'Bad Gateway');

    expect(await result).toBe('unavailable');
    expect(service.loggedIn()).toBeFalse();
  });

  it('should not treat an HTML page as a login', async () => {
    const result = service.login('right');
    answerLogin('<!doctype html><html></html>');

    expect(await result).toBe('unavailable');
    expect(service.loggedIn()).toBeFalse();
  });

  it('should end the session when it expires', async () => {
    const result = service.login('right');
    answerLogin({ expiresAt: Date.now() - 1 });
    await result;

    expect(service.loggedIn()).toBeFalse();
    expect(localStorage.getItem('kcsapb_auth_token')).toBeNull();
  });

  it('should ignore the old browser-only session keys', () => {
    localStorage.setItem('kcsapb_auth_token', 'old');
    localStorage.setItem('kcsapb_auth_time', Date.now().toString());

    expect(service.loggedIn()).toBeFalse();
  });

  it('should log out locally and clear the file cookies', async () => {
    const result = service.login('right');
    answerLogin({ expiresAt: Date.now() + 60_000 });
    await result;

    service.logout();

    expect(service.loggedIn()).toBeFalse();
    http.expectOne(request => request.url === '/api/logout' && request.method === 'POST').flush({ loggedOut: true });
  });
});
