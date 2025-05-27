import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

// Mock AuthService
class MockAuthService {
  loggedIn(): boolean {
    return false; // Default to not logged in
  }
}

// Mock Router
class MockRouter {
  navigate(commands: any[]): Promise<boolean> {
    return Promise.resolve(true); // Mock basic navigation
  }
  // Mock for creating UrlTree if needed, though not strictly necessary for this guard's current logic
  // parseUrl(url: string): UrlTree { return new UrlTree(); } 
}

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let router: Router;
  let loggedInSpy: jasmine.Spy;
  let navigateSpy: jasmine.Spy;

  // Dummy route and state snapshots, as they are not used by the guard's logic but are required by the method signature
  const dummyRoute = {} as ActivatedRouteSnapshot;
  const dummyState = { url: '/test' } as RouterStateSnapshot; // Added url for completeness, though not used

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);

    // Set up spies on the methods of the mock instances
    loggedInSpy = spyOn(authService, 'loggedIn').and.callThrough();
    navigateSpy = spyOn(router, 'navigate').and.callThrough();
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate', () => {
    it('should return true if user is logged in (AuthService.loggedIn() returns true)', () => {
      loggedInSpy.and.returnValue(true); // Simulate user being logged in

      const canActivateResult = guard.canActivate(dummyRoute, dummyState);
      
      expect(canActivateResult).toBe(true);
      expect(authService.loggedIn).toHaveBeenCalledTimes(1);
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should return false and navigate to /login if user is not logged in (AuthService.loggedIn() returns false)', () => {
      loggedInSpy.and.returnValue(false); // Simulate user NOT being logged in

      const canActivateResult = guard.canActivate(dummyRoute, dummyState);

      expect(canActivateResult).toBe(false);
      expect(authService.loggedIn).toHaveBeenCalledTimes(1);
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('should ensure canActivate return type is compatible (boolean in this case)', () => {
        // This test primarily confirms that the return type aligns with expectations.
        // Given the guard's current logic, it always returns a boolean.
        loggedInSpy.and.returnValue(false); // Scenario leading to boolean false
        let result = guard.canActivate(dummyRoute, dummyState);
        expect(typeof result === 'boolean').toBeTrue();
        expect(result).toBeFalse();

        loggedInSpy.and.returnValue(true); // Scenario leading to boolean true
        result = guard.canActivate(dummyRoute, dummyState);
        expect(typeof result === 'boolean').toBeTrue();
        expect(result).toBeTrue();
    });
  });
});
