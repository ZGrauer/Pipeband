
describe('HireComponent', () => {
  let component: HireComponent;
  let fixture: ComponentFixture<HireComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HireComponent],
      imports: [MatCardModule]
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

  it('should contain a paragraph about Solo Pipers', () => {
    const paragraphs = nativeElement.querySelectorAll('.main-content p');
    const soloPiperParagraph = Array.from(paragraphs).find(p => p.textContent?.includes('Solo Pipers are appropriate for weddings'));
    expect(soloPiperParagraph).toBeTruthy();
  });

  it('should contain a paragraph about Full Band option', () => {
    const paragraphs = nativeElement.querySelectorAll('.main-content p');
    const fullBandParagraph = Array.from(paragraphs).find(p => p.textContent?.includes('A Full Band is our most visually and audibly impressive option'));
    expect(fullBandParagraph).toBeTruthy();
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
import { MatCardModule } from '@angular/material/card';
import { HireComponent } from './hire.component';

describe('HireComponent', () => {
  let component: HireComponent;
  let fixture: ComponentFixture<HireComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HireComponent],
      imports: [MatCardModule]
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

  it('should contain a paragraph about Solo Pipers', () => {
    const paragraphs = nativeElement.querySelectorAll('.main-content p');
    const soloPiperParagraph = Array.from(paragraphs).find(p => p.textContent?.includes('Solo Pipers are appropriate for weddings'));
    expect(soloPiperParagraph).toBeTruthy();
  });

  it('should contain a paragraph about Full Band option', () => {
    const paragraphs = nativeElement.querySelectorAll('.main-content p');
    const fullBandParagraph = Array.from(paragraphs).find(p => p.textContent?.includes('A Full Band is our most visually and audibly impressive option'));
    expect(fullBandParagraph).toBeTruthy();
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
