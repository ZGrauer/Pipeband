import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { MembersComponent } from './members.component';
import { AuthService } from '../auth.service';

class MockAuthService {
  loggedIn(): boolean {
    return true;
  }
  logout(): void {}
}

describe('MembersComponent', () => {
  let component: MembersComponent;
  let fixture: ComponentFixture<MembersComponent>;
  let nativeElement: HTMLElement;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MembersComponent],
      imports: [NoopAnimationsModule, RouterTestingModule, MatTabsModule, MatIconModule, MatButtonModule],
      providers: [{ provide: AuthService, useClass: MockAuthService }],
    }).compileComponents();

    fixture = TestBed.createComponent(MembersComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render a tab link for each section', () => {
    fixture.detectChanges();
    const labels = Array.from(nativeElement.querySelectorAll('a[mat-tab-link]')).map(a => a.textContent?.trim());
    expect(labels.length).toBe(4);
    expect(labels.some(l => l?.includes('Sheet Music'))).toBeTrue();
    expect(labels.some(l => l?.includes('Competitions'))).toBeTrue();
    expect(labels.some(l => l?.includes('Resources'))).toBeTrue();
    expect(labels.some(l => l?.includes('Band Info'))).toBeTrue();
  });

  describe('isLoggedIn()', () => {
    it('should navigate to /login if AuthService.loggedIn() is false', () => {
      spyOn(authService, 'loggedIn').and.returnValue(false);
      component.isLoggedIn();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('should not navigate if AuthService.loggedIn() is true', () => {
      component.isLoggedIn();
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });

  it('logout should clear the session and go to /login', () => {
    spyOn(authService, 'logout');
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
