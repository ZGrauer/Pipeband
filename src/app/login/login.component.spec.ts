import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // Using FormsModule for template-driven forms
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './login.component';
import { AuthService } from '../auth.service';
import { By } from '@angular/platform-browser';

// Mock AuthService
class MockAuthService {
  login(password: string): boolean {
    return false; // Default mock behavior, can be spied upon and changed
  }
}

// Mock Router
class MockRouter {
  navigate(commands: any[]): Promise<boolean> {
    return Promise.resolve(true); // Default mock behavior
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let nativeElement: HTMLElement;
  let authService: AuthService;
  let router: Router;
  let authServiceLoginSpy: jasmine.Spy;
  let routerNavigateSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule, // Using FormsModule as the component uses template-driven forms with ngModel
        NoopAnimationsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule
      ],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    
    // Set up spies
    authServiceLoginSpy = spyOn(authService, 'login').and.callThrough();
    routerNavigateSpy = spyOn(router, 'navigate').and.callThrough();

    fixture.detectChanges(); // Trigger initial data binding and ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values: empty password, hidden password, no invalidPassword error', () => {
    expect(component.userPassword).toBe('');
    expect(component.hide).toBeTrue();
    expect(component.invalidPassword).toBeFalse();
    const errorMessage = nativeElement.querySelector('p[style*="color: red"]'); // Assuming error message might have specific styling if it existed initially
    expect(errorMessage).toBeNull(); // Error message should not be present initially
  });

  it('should have a password input field and a submit button', () => {
    const passwordInput = nativeElement.querySelector('input[name="password"]');
    expect(passwordInput).withContext('Password input should exist').toBeTruthy();
    const submitButton = nativeElement.querySelector('button[type="button"].btn-success'); // type is "button"
    expect(submitButton).withContext('Submit button should exist').toBeTruthy();
    expect(submitButton?.textContent).toContain('Submit');
  });

  it('should toggle password visibility and icon when hide button is clicked', fakeAsync(() => {
    const initialHideState = component.hide;
    const visibilityButton = nativeElement.querySelector('button[mat-icon-button][matSuffix]') as HTMLButtonElement;
    expect(visibilityButton).withContext('Visibility toggle button should exist').toBeTruthy();
    
    let icon = visibilityButton.querySelector('mat-icon');
    expect(icon?.textContent).toBe(initialHideState ? 'visibility_off' : 'visibility');

    visibilityButton.click();
    tick(); 
    fixture.detectChanges();

    expect(component.hide).toBe(!initialHideState);
    icon = visibilityButton.querySelector('mat-icon'); // Re-query after change detection
    expect(icon?.textContent).toBe(!initialHideState ? 'visibility_off' : 'visibility');

    // Toggle back
    visibilityButton.click();
    tick();
    fixture.detectChanges();

    expect(component.hide).toBe(initialHideState);
    icon = visibilityButton.querySelector('mat-icon'); // Re-query
    expect(icon?.textContent).toBe(initialHideState ? 'visibility_off' : 'visibility');
  }));

  it('should update userPassword model on input', fakeAsync(() => {
    const passwordInput = nativeElement.querySelector('input[name="password"]') as HTMLInputElement;
    passwordInput.value = 'testpass';
    passwordInput.dispatchEvent(new Event('input')); 
    tick(); // Allow time for ngModel to update
    fixture.detectChanges(); // Reflect ngModel changes
    
    expect(component.userPassword).toBe('testpass');
  }));
  
  it('submit button should call loginUser method when clicked', fakeAsync(() => {
    spyOn(component, 'loginUser'); // Spy on the component's method
    const submitButton = nativeElement.querySelector('button[type="button"].btn-success') as HTMLButtonElement;
    submitButton.click();
    tick();
    expect(component.loginUser).toHaveBeenCalled();
  }));

  describe('loginUser() method', () => {
    it('should call AuthService.login with the current password and navigate to /members on successful login', () => {
      authServiceLoginSpy.and.returnValue(true); // Mock successful login
      component.userPassword = 'correctpassword';
      
      component.loginUser();

      expect(authService.login).toHaveBeenCalledWith('correctpassword');
      expect(router.navigate).toHaveBeenCalledWith(['/members']);
      expect(component.invalidPassword).toBeFalse();
      
      fixture.detectChanges(); // Check if error message is absent
      const errorMessage = nativeElement.querySelector('p'); // The error p tag
      // This p tag might exist if it was previously shown, so check its content or ngIf state
      const errorNgIfElement = nativeElement.querySelector('p.error-message'); // Assuming it has a class for easier selection if error shows
      if (component.invalidPassword) { // Only check textContent if element is supposed to be there
         expect(errorMessage?.textContent).not.toContain('Error! Invalid password');
      } else {
         // Check if the element is truly gone or hidden by *ngIf
         const errorElement = fixture.debugElement.query(By.css('p')); // A more robust way to check *ngIf
         expect(errorElement && errorElement.nativeElement.textContent.includes('Error! Invalid password')).toBeFalsy();

      }
    });

    it('should call AuthService.login and set invalidPassword to true on failed login, displaying error message', () => {
      authServiceLoginSpy.and.returnValue(false); // Mock failed login
      component.userPassword = 'wrongpassword';
      
      component.loginUser();

      expect(authService.login).toHaveBeenCalledWith('wrongpassword');
      expect(router.navigate).not.toHaveBeenCalled();
      expect(component.invalidPassword).toBeTrue();
      
      fixture.detectChanges(); // Update view to show error message based on invalidPassword = true
      const errorMessage = nativeElement.querySelector('p'); // The error <p> tag
      expect(errorMessage).withContext('Error message paragraph should exist').toBeTruthy();
      expect(errorMessage?.textContent).toContain('Error! Invalid password');
    });

    it('should reset invalidPassword flag to false at the start of each loginUser call', () => {
      component.invalidPassword = true; // Simulate previous error state
      fixture.detectChanges(); // Make sure it's rendered if it was true
      expect(nativeElement.querySelector('p')?.textContent).toContain('Error! Invalid password');


      authServiceLoginSpy.and.returnValue(true); // This login attempt will succeed
      component.userPassword = 'anypassword';
      
      component.loginUser(); // invalidPassword should be reset to false internally first
      
      expect(component.invalidPassword).toBeFalse(); 
      expect(authService.login).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/members']); // Because login succeeded

      fixture.detectChanges(); // Update view
      const errorMessageAfterSuccess = nativeElement.querySelector('p');
      // Check if the error element is gone or its text is not the error message
       const errorElement = fixture.debugElement.query(By.css('p'));
       expect(errorElement && errorElement.nativeElement.textContent.includes('Error! Invalid password')).toBeFalsy();
    });
  });
  
  // The form's submit button is bound to [disabled]="!f.form.valid"
  // In template-driven forms, if an input doesn't have `required` or other validators
  // that would make an empty field invalid, f.form.valid can be true.
  it('submit button should be enabled by default as empty password is valid without "required" attribute', () => {
    const submitButton = nativeElement.querySelector('button[type="button"].btn-success') as HTMLButtonElement;
    // Default form state with empty password is valid because 'required' is not on the input
    expect(submitButton.disabled).toBe(false); 
  });
});
