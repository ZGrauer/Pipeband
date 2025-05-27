import { TestBed } from '@angular/core/testing';
import * as sha256 from 'js-sha256';
import { AuthService } from './auth.service';
import { environment } from './../environments/environment'; // Import the actual environment

// The AuthService uses sha256(environment.memberPassword) internally.
// To test the "successful login" path, we must use the same environment.memberPassword
// that the service was compiled with.

describe('AuthService', () => {
  let service: AuthService;
  let getItemSpy: jasmine.Spy;
  let setItemSpy: jasmine.Spy;
  let removeItemSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);

    // Spy on localStorage methods
    getItemSpy = spyOn(localStorage, 'getItem').and.callThrough();
    setItemSpy = spyOn(localStorage, 'setItem').and.callThrough();
    removeItemSpy = spyOn(localStorage, 'removeItem').and.callThrough();

    // It's important to clear localStorage before each test to ensure isolation
    localStorage.clear(); 
  });

  afterEach(() => {
    // Clear localStorage after each test to ensure no side effects
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login() method', () => {
    it('should return true and set token in localStorage on successful login', () => {
      // Use the actual environment.memberPassword for the "correct" password input
      const correctPassword = environment.memberPassword;
      const result = service.login(correctPassword);
      
      expect(result).withContext(`Login failed. Check if environment.memberPassword ('${correctPassword}') is correctly configured for tests.`).toBeTrue();
      expect(setItemSpy).toHaveBeenCalledWith('token', 'secretToken');
      expect(removeItemSpy).not.toHaveBeenCalled(); // Should not be called on success
    });

    it('should return false and remove token from localStorage on failed login', () => {
      const incorrectPassword = 'wrongPassword';
      const result = service.login(incorrectPassword);

      expect(result).toBeFalse();
      expect(removeItemSpy).toHaveBeenCalledWith('token');
      expect(setItemSpy).not.toHaveBeenCalledWith('token', 'secretToken'); // Should not be called on failure
    });

    it('should re-hash the input password for comparison', () => {
      // This test implicitly checks that hashing occurs.
      // To be very explicit about the input password being hashed:
      const sha256Spy = spyOn(sha256, 'sha256').and.callThrough();
      const correctPasswordForHashTest = environment.memberPassword; // Re-define/access here for clarity
      service.login(correctPasswordForHashTest); 
      // The first call to sha256 inside login() is for the input userPassword.
      // The MEMBER_PASSWORD was already hashed at service load time.
      expect(sha256Spy.calls.allArgs().some(args => args[0] === correctPasswordForHashTest)).toBeTrue();
    });
  });

  describe('loggedIn() method', () => {
    it('should return true if token in localStorage is "secretToken"', () => {
      localStorage.setItem('token', 'secretToken'); // Setup condition
      expect(service.loggedIn()).toBeTrue();
      expect(getItemSpy).toHaveBeenCalledWith('token');
    });

    it('should return false if token in localStorage is different', () => {
      localStorage.setItem('token', 'wrongToken'); // Setup condition
      expect(service.loggedIn()).toBeFalse();
      expect(getItemSpy).toHaveBeenCalledWith('token');
    });

    it('should return false if no token exists in localStorage', () => {
      localStorage.removeItem('token'); // Ensure no token
      expect(service.loggedIn()).toBeFalse();
      expect(getItemSpy).toHaveBeenCalledWith('token');
    });
  });

  describe('getToken() method', () => {
    it('should return the token if it exists in localStorage', () => {
      const testToken = 'myTestTokenValue';
      localStorage.setItem('token', testToken);
      expect(service.getToken()).toBe(testToken);
      expect(getItemSpy).toHaveBeenCalledWith('token');
    });

    it('should return null if no token exists in localStorage', () => {
      localStorage.removeItem('token');
      expect(service.getToken()).toBeNull();
      expect(getItemSpy).toHaveBeenCalledWith('token');
    });
  });
});
