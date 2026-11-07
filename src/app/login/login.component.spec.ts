import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './login.component';
import { AuthService, LoginResult } from '../auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let element: HTMLElement;
  let auth: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    localStorage.clear();
    auth = jasmine.createSpyObj<AuthService>('AuthService', ['login', 'loggedIn']);
    auth.loggedIn.and.returnValue(false);
    router = jasmine.createSpyObj<Router>('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule,
        NoopAnimationsModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule
      ],
      providers: [
        { provide: AuthService, useValue: auth },
        { provide: Router, useValue: router }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    localStorage.clear();
  });

  async function logInWith(result: LoginResult, password = 'typed') {
    auth.login.and.resolveTo(result);
    component.userPassword = password;
    await component.loginUser();
    fixture.detectChanges();
  }

  it('should show a password field and a submit button', () => {
    expect(element.querySelector('input[name="password"]')).toBeTruthy();
    expect(element.querySelector('button[type="submit"]')?.textContent).toContain('Submit');
  });

  it('should send members who are already logged in to the members page', () => {
    auth.loggedIn.and.returnValue(true);
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['/members']);
  });

  it('should toggle password visibility', () => {
    const input = element.querySelector('input[name="password"]') as HTMLInputElement;
    expect(input.type).toBe('password');
    (element.querySelector('button[matSuffix]') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(input.type).toBe('text');
  });

  it('should go to the members page when the password is right', async () => {
    await logInWith('ok', 'right');

    expect(auth.login).toHaveBeenCalledWith('right');
    expect(router.navigate).toHaveBeenCalledWith(['/members']);
    expect(component.loginAttempts).toBe(0);
  });

  it('should show an error and count the attempt when the password is wrong', async () => {
    await logInWith('invalid');

    expect(element.textContent).toContain('Invalid password');
    expect(element.textContent).toContain('4 attempt(s) remaining');
    expect(component.userPassword).toBe('');
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should not count an attempt when the login service is unavailable', async () => {
    await logInWith('unavailable');

    expect(element.textContent).toContain("Couldn't reach the login service");
    expect(element.textContent).not.toContain('Invalid password');
    expect(component.loginAttempts).toBe(0);
    expect(component.userPassword).toBe('typed');
  });

  it('should lock the form after five wrong passwords', async () => {
    for (let attempt = 0; attempt < 5; attempt++) {
      await logInWith('invalid');
    }

    expect(component.isLockedOut).toBeTrue();
    expect(element.querySelector('form')).toBeNull();
    expect(element.textContent).toContain('Account Temporarily Locked');

    await logInWith('ok');
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
