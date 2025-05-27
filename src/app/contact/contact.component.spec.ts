import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { RouterTestingModule } from '@angular/router/testing';
import { ContactComponent } from './contact.component';
import { By } from '@angular/platform-browser';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactComponent],
      imports: [
        MatCardModule,
        RouterTestingModule // For routerLink
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Booking Card Tests
  describe('Booking Card', () => {
    let bookingCard: HTMLElement | null;

    beforeEach(() => {
      bookingCard = nativeElement.querySelector('.main-content mat-card');
    });

    it('should display the "Booking" title', () => {
      const titleElement = bookingCard?.querySelector('mat-card-title');
      expect(titleElement?.textContent).toContain('Booking');
    });

    it('should contain a link to the "Hire Us" page', () => {
      const hireLink = bookingCard?.querySelector('a[routerLink="/hire"]');
      expect(hireLink).toBeTruthy();
      expect(hireLink?.textContent).toContain('Hire Us');
    });

    it('should display Rory McKee\'s contact information', () => {
      const cardContent = bookingCard?.querySelector('mat-card-content')?.textContent;
      expect(cardContent).toContain('Rory McKee');
      const mailtoLink = bookingCard?.querySelector('a[href="mailto:BusinessManager@kcpipeband.org"]');
      expect(mailtoLink).toBeTruthy();
      expect(mailtoLink?.textContent).toContain('BusinessManager@kcpipeband.org');
    });
  });

  // Lessons Card Tests
  describe('Lessons Card', () => {
    let lessonsCard: HTMLElement | null;

    beforeEach(() => {
      lessonsCard = nativeElement.querySelector('.left-article mat-card');
    });

    it('should display the "Lessons" title', () => {
      const titleElement = lessonsCard?.querySelector('mat-card-title');
      expect(titleElement?.textContent).toContain('Lessons');
    });

    it('should display practice information', () => {
      const cardContent = lessonsCard?.querySelector('mat-card-content')?.textContent;
      expect(cardContent).toContain('The Kansas City St. Andrew Pipes & Drums practices Tuesday nights from 7:00pm to 9:00pm at St. Andrew\'s Episcopal Church.');
    });

    it('should display bagpipe student contact (Dorothy May)', () => {
      const cardContent = lessonsCard?.querySelector('mat-card-content')?.textContent;
      expect(cardContent).toContain('Dorothy May');
      const mailtoLink = lessonsCard?.querySelector('a[href*="mailto:BagpipeLessons@kcpipeband.org"]');
      expect(mailtoLink).toBeTruthy();
      expect(mailtoLink?.textContent).toContain('BagpipeLessons@kcpipeband.org');
    });

    it('should display drum student contact (Kyle Womelduff)', () => {
      const cardContent = lessonsCard?.querySelector('mat-card-content')?.textContent;
      expect(cardContent).toContain('Kyle Womelduff');
      const mailtoLink = lessonsCard?.querySelector('a[href*="mailto:DrumLessons@kcpipeband.org"]');
      expect(mailtoLink).toBeTruthy();
      expect(mailtoLink?.textContent).toContain('DrumLessons@kcpipeband.org');
    });

    it('should display the practice address with a Google Maps link', () => {
      const addressLink = lessonsCard?.querySelector('a[href="https://goo.gl/maps/53YHKBX58Lx6jknA7"]');
      expect(addressLink).toBeTruthy();
      expect(addressLink?.textContent).toContain("St Andrew's Episcopal Church");
      expect(addressLink?.textContent).toContain("6401 Wornall Terrace, Kansas City, MO 64113");
    });
  });

  // Mailing Address & General Questions Card Tests
  describe('Mailing Address & General Questions Card', () => {
    let addressCard: HTMLElement | null;

    beforeEach(() => {
      addressCard = nativeElement.querySelector('.right-article mat-card');
    });

    it('should display the "Mailing Address & General Questions" title', () => {
      const titleElement = addressCard?.querySelector('mat-card-title');
      expect(titleElement?.textContent).toContain('Mailing Address & General Questions');
    });

    it('should display the PO Box address', () => {
      const cardContent = addressCard?.querySelector('mat-card-content')?.textContent;
      expect(cardContent).toContain('PO Box 648');
      expect(cardContent).toContain('Shawnee Mission, KS 66201-0648');
    });

    it('should display the general contact email', () => {
      const mailtoLink = addressCard?.querySelector('a[href="mailto:PipesandDrumsKC@kcpipeband.org"]');
      expect(mailtoLink).toBeTruthy();
      expect(mailtoLink?.textContent).toContain('PipesandDrumsKC@kcpipeband.org');
    });
  });
});
