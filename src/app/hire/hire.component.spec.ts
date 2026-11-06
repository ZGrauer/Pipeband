
describe('HireComponent', () => {
  let component: HireComponent;
  let fixture: ComponentFixture<HireComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HireComponent],
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HireComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the main heading "Hire Us"', () => {
    const headingElement = nativeElement.querySelector('.main-content h2');
    expect(headingElement).toBeTruthy();
    expect(headingElement?.textContent).toContain('Hire Us');
  });

  it('should display the main parade image', () => {
    const imgElement = nativeElement.querySelector('.main-content img.responsive[src*="2022_KCMO_st_patrick_parade.webp"]');
    expect(imgElement).toBeTruthy();
    expect(imgElement?.getAttribute('src')).toBe('../../assets/2022_KCMO_st_patrick_parade.webp');
  });

  it('should compare the four group sizes', () => {
    const titles = Array.from(nativeElement.querySelectorAll('.options mat-card-title')).map(t => t.textContent?.trim());
    expect(titles).toEqual(['Solo Piper', 'Ensemble', 'Mini Band', 'Full Band']);
    const fullBand = nativeElement.querySelectorAll('.options mat-card')[3];
    expect(fullBand.textContent).toContain('8 to 10 pipers and 3 to 4 drummers');
  });

  describe('Tartan Card', () => {
    let tartanCard: HTMLElement | null;

    beforeEach(() => {
      const cards = nativeElement.querySelectorAll('.main-content mat-card');
      tartanCard = Array.from(cards).find(card => card.querySelector('img[src*="tartan.webp"]')) as HTMLElement | null;
    });

    it('should display the tartan card with title and image', () => {
      expect(tartanCard).withContext('Tartan card should exist').toBeTruthy();
      const titleElement = tartanCard?.querySelector('mat-card-title');
      expect(titleElement?.textContent).toContain('Uniform kilt is the MacDonnell of Keppoch tartan');
      const imgElement = tartanCard?.querySelector('img.responsive[src*="tartan.webp"]');
      expect(imgElement).withContext('Tartan image should exist in card').toBeTruthy();
      expect(imgElement?.getAttribute('src')).toBe('../../assets/tartan.webp');
    });
  });

  describe('Booking Contact Card', () => {
    let bookingCard: HTMLElement | null;

    beforeEach(() => {
      // The booking contact card is in the .left-article div
      bookingCard = nativeElement.querySelector('.left-article mat-card');
    });
    
    it('should display the "Booking Contact" title', () => {
      expect(bookingCard).withContext('Booking contact card should exist').toBeTruthy(); 
      const titleElement = bookingCard?.querySelector('mat-card-title');
      expect(titleElement?.textContent).toContain('Booking Contact');
    });

    it('should display Rory McKee\'s contact information', () => {
      expect(bookingCard).withContext('Booking contact card should exist').toBeTruthy();
      const cardContent = bookingCard?.querySelector('mat-card-content')?.textContent;
      expect(cardContent).toContain('Rory McKee');
      const mailtoLink = bookingCard?.querySelector('a[href="mailto:BusinessManager@kcpipeband.org"]');
      expect(mailtoLink).withContext('Mailto link for BusinessManager should exist').toBeTruthy();
      expect(mailtoLink?.textContent).toContain('BusinessManager@kcpipeband.org');
    });
  });

  it('should contain the disclaimer paragraph about Full Band scheduling', () => {
    const paragraphs = nativeElement.querySelectorAll('.main-content p i');
    const disclaimerParagraph = Array.from(paragraphs).find(p => p.textContent?.includes('Please allow a minimum of one to two months in advance'));
    expect(disclaimerParagraph).toBeTruthy();
  });

  it('should contain the disclaimer paragraph about solo performer uniforms', () => {
    const paragraphs = nativeElement.querySelectorAll('.main-content p i');
    const disclaimerParagraph = Array.from(paragraphs).find(p => p.textContent?.includes('Members of the full band and small groups will appear in this uniform'));
    expect(disclaimerParagraph).toBeTruthy();
  });
});
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HireComponent } from './hire.component';

describe('HireComponent', () => {
  let component: HireComponent;
  let fixture: ComponentFixture<HireComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HireComponent],
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HireComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the main heading "Hire Us"', () => {
    const headingElement = nativeElement.querySelector('.main-content h2');
    expect(headingElement).toBeTruthy();
    expect(headingElement?.textContent).toContain('Hire Us');
  });

  it('should display the main parade image', () => {
    const imgElement = nativeElement.querySelector('.main-content img.responsive[src*="2022_KCMO_st_patrick_parade.webp"]');
    expect(imgElement).toBeTruthy();
    expect(imgElement?.getAttribute('src')).toBe('../../assets/2022_KCMO_st_patrick_parade.webp');
  });

  it('should compare the four group sizes', () => {
    const titles = Array.from(nativeElement.querySelectorAll('.options mat-card-title')).map(t => t.textContent?.trim());
    expect(titles).toEqual(['Solo Piper', 'Ensemble', 'Mini Band', 'Full Band']);
    const fullBand = nativeElement.querySelectorAll('.options mat-card')[3];
    expect(fullBand.textContent).toContain('8 to 10 pipers and 3 to 4 drummers');
  });

  describe('Tartan Card', () => {
    let tartanCard: HTMLElement | null;

    beforeEach(() => {
      const cards = nativeElement.querySelectorAll('.main-content mat-card');
      tartanCard = Array.from(cards).find(card => card.querySelector('img[src*="tartan.webp"]')) as HTMLElement | null;
    });

    it('should display the tartan card with title and image', () => {
      expect(tartanCard).withContext('Tartan card should exist').toBeTruthy();
      const titleElement = tartanCard?.querySelector('mat-card-title');
      expect(titleElement?.textContent).toContain('Uniform kilt is the MacDonnell of Keppoch tartan');
      const imgElement = tartanCard?.querySelector('img.responsive[src*="tartan.webp"]');
      expect(imgElement).withContext('Tartan image should exist in card').toBeTruthy();
      expect(imgElement?.getAttribute('src')).toBe('../../assets/tartan.webp');
    });
  });

  describe('Booking Contact Card', () => {
    let bookingCard: HTMLElement | null;

    beforeEach(() => {
      // The booking contact card is in the .left-article div
      bookingCard = nativeElement.querySelector('.left-article mat-card');
    });
    
    it('should display the "Booking Contact" title', () => {
      expect(bookingCard).withContext('Booking contact card should exist').toBeTruthy(); 
      const titleElement = bookingCard?.querySelector('mat-card-title');
      expect(titleElement?.textContent).toContain('Booking Contact');
    });

    it('should display Rory McKee\'s contact information', () => {
      expect(bookingCard).withContext('Booking contact card should exist').toBeTruthy();
      const cardContent = bookingCard?.querySelector('mat-card-content')?.textContent;
      expect(cardContent).toContain('Rory McKee');
      const mailtoLink = bookingCard?.querySelector('a[href="mailto:BusinessManager@kcpipeband.org"]');
      expect(mailtoLink).withContext('Mailto link for BusinessManager should exist').toBeTruthy();
      expect(mailtoLink?.textContent).toContain('BusinessManager@kcpipeband.org');
    });
  });

  it('should contain the disclaimer paragraph about Full Band scheduling', () => {
    const paragraphs = nativeElement.querySelectorAll('.main-content p i');
    const disclaimerParagraph = Array.from(paragraphs).find(p => p.textContent?.includes('Please allow a minimum of one to two months in advance'));
    expect(disclaimerParagraph).toBeTruthy();
  });

  it('should contain the disclaimer paragraph about solo performer uniforms', () => {
    const paragraphs = nativeElement.querySelectorAll('.main-content p i');
    const disclaimerParagraph = Array.from(paragraphs).find(p => p.textContent?.includes('Members of the full band and small groups will appear in this uniform'));
    expect(disclaimerParagraph).toBeTruthy();
  });

  describe('Booking request form', () => {
    function fillIn(date = '2099-06-12') {
      component.bookingForm.setValue({
        name: 'Pat Smith',
        email: 'pat@example.com',
        phone: '',
        eventType: 'Wedding',
        group: 'Ensemble',
        date,
        time: '14:30',
        location: 'Loose Park, Kansas City',
        details: 'Outdoors & about 20 minutes'
      });
    }

    it('should not open an email until the required fields are filled in', () => {
      spyOn(component, 'openEmail');
      component.submit();
      expect(component.openEmail).not.toHaveBeenCalled();
      expect(component.bookingForm.controls.name.touched).toBeTrue();
    });

    it('should reject a date that has passed', () => {
      fillIn('2000-01-01');
      expect(component.bookingForm.controls.date.hasError('past')).toBeTrue();
    });

    it('should open an email to the Business Manager with the details', () => {
      spyOn(component, 'openEmail');
      fillIn();
      component.submit();

      const url = (component.openEmail as jasmine.Spy).calls.mostRecent().args[0] as string;
      expect(url.startsWith('mailto:BusinessManager@kcpipeband.org?subject=')).toBeTrue();
      const params = new URLSearchParams(url.split('?')[1]);
      expect(params.get('subject')).toBe('Booking request: Wedding, Friday, June 12, 2099');
      const body = params.get('body') ?? '';
      expect(body).toContain('Name: Pat Smith');
      expect(body).toContain('Start time: 2:30 PM');
      expect(body).toContain('Phone: Not given');
      expect(body).toContain('Outdoors & about 20 minutes');
      expect(component.emailOpened).toBeTrue();
    });
  });
});
