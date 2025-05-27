import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TokenInterceptorService } from './token-interceptor.service';
import { AuthService } from './auth.service';

// Mock AuthService (even if getToken is not used by interceptor, it's a dependency)
class MockAuthService {
  // getToken(): string | null { return null; } // Not used by interceptor currently
}

describe('TokenInterceptorService', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let getItemSpy: jasmine.Spy;

  const testUrl = '/api/data';
  const testToken = 'test-secret-token';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TokenInterceptorService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptorService,
          multi: true,
        },
        { provide: AuthService, useClass: MockAuthService } // Provide the mock
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);

    // Spy on localStorage.getItem before each test
    getItemSpy = spyOn(localStorage, 'getItem').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
    localStorage.clear(); // Clear localStorage to isolate tests
  });

  it('should be created', () => {
    const interceptor: TokenInterceptorService = TestBed.inject(TokenInterceptorService);
    expect(interceptor).toBeTruthy();
  });

  it('should add an Authorization header when a token is present in localStorage', () => {
    getItemSpy.and.returnValue(testToken); // Mock localStorage to return a token

    httpClient.get(testUrl).subscribe(response => {
      // This subscription is just to trigger the HTTP call
      expect(response).toBeTruthy(); // Or any other check on response if needed
    });

    const httpRequest = httpMock.expectOne(testUrl);
    expect(httpRequest.request.headers.has('Authorization')).toBeTrue();
    expect(httpRequest.request.headers.get('Authorization')).toBe(`Bearer ${testToken}`);
    
    httpRequest.flush({ data: 'success' }); // Provide a mock response
  });

  it('should NOT add an Authorization header when no token is present in localStorage (returns null)', () => {
    getItemSpy.and.returnValue(null); // Mock localStorage to return null (no token)

    httpClient.get(testUrl).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const httpRequest = httpMock.expectOne(testUrl);
    expect(httpRequest.request.headers.has('Authorization')).toBeFalse();
    
    httpRequest.flush({ data: 'success' });
  });
  
  it('should NOT add an Authorization header when token is an empty string in localStorage', () => {
    getItemSpy.and.returnValue(''); // Mock localStorage to return an empty string

    httpClient.get(testUrl).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const httpRequest = httpMock.expectOne(testUrl);
    expect(httpRequest.request.headers.has('Authorization')).toBeFalse();
    
    httpRequest.flush({ data: 'success' });
  });

  it('should handle the request cloning and pass to next.handle', () => {
    getItemSpy.and.returnValue(testToken);

    httpClient.get(testUrl).subscribe();

    const req = httpMock.expectOne(testUrl);
    // Check if the request object passed to next.handle is indeed the modified one.
    // The HttpTestingController gives us the request as it was received by the mock backend,
    // which is *after* all interceptors have run. So, checking req.request.headers (as done above)
    // implicitly tests that next.handle was called with the modified request.
    expect(req.request.method).toBe('GET'); // Just an example to show we can inspect the request
    
    req.flush({ data: 'success' });
  });
});
