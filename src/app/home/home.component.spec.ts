import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        MatCardModule,
        RouterTestingModule // For routerLink
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Main Content Tests
  describe('Main Content', () => {
    it('should display the main heading "2024 Midwest Grade 5 Champion Supreme"', () => {
      const headingElement = nativeElement.querySelector('.main-content h2');
      expect(headingElement).withContext('Main heading H2 should exist').toBeTruthy();
      expect(headingElement?.textContent).toContain('2024 Midwest Grade 5 Champion Supreme');
    });

    it('should display the subheading about being the area\'s finest and oldest pipe and drum corps', () => {
      const subheadingElement = nativeElement.querySelector('.main-content h4');
      expect(subheadingElement).withContext('Subheading H4 should exist').toBeTruthy();
      expect(subheadingElement?.textContent).toContain('Kansas City St. Andrew Pipes and Drums is truly the area\'s finest and oldest pipe and drum corps.');
    });

    it('should display the 1964 Memorial Day Parade image', () => {
      // Corrected the selector to use spaces as in the actual src, or use a partial match that is safe
      const imgElement = nativeElement.querySelector('.main-content img[src="../../assets/1964 Memorial_day_parade_800.jpg"]');
      expect(imgElement).withContext('1964 parade image should exist').toBeTruthy();
      expect(imgElement?.getAttribute('alt')).toBe('1964 Memorial Day Parade, North Kansas City');
    });
    
    it('should display the 2024 Chicago Highland Games image wrapped in a link', () => {
      const linkElement = nativeElement.querySelector('.main-content article a[href*="2024_Chicago.jpeg"]');
      expect(linkElement).withContext('Link around 2024 Chicago image should exist').toBeTruthy();
      const imgElement = linkElement?.querySelector('img[src*="2024_Chicago_800.jpeg"]');
      expect(imgElement).withContext('2024 Chicago image should exist').toBeTruthy();
      expect(imgElement?.getAttribute('alt')).toBe('2024 Chicago Highland Games Band Photo');
    });

    it('should contain a list of band achievements', () => {
      const listElement = nativeElement.querySelector('.main-content ul');
      expect(listElement).withContext('Achievements list (ul) should exist').toBeTruthy();
      const listItems = listElement?.querySelectorAll('li');
      expect(listItems?.length).toBeGreaterThanOrEqual(3); 
      if (listItems) { // Check if listItems is not null
        expect(listItems[0]?.textContent).toContain('The band has traveled in recent years to compete');
      } else {
        fail('Achievements list items not found');
      }
    });
  });

  // Hire Us Card Tests
  describe('Hire Us Card', () => {
    let hireUsCard: HTMLElement | null;

    beforeEach(() => {
      const cards = nativeElement.querySelectorAll('.left-article mat-card');
      hireUsCard = Array.from(cards).find(card => card.querySelector('mat-card-title')?.textContent?.includes('Hire Us')) as HTMLElement | null;
    });

    it('should display the "Hire Us" title', () => {
      expect(hireUsCard).withContext('Hire Us card should exist').toBeTruthy();
      const titleElement = hireUsCard?.querySelector('mat-card-title');
      expect(titleElement?.textContent).toContain('Hire Us');
    });

    it('should contain a routerLink to the hire page', () => {
      expect(hireUsCard).withContext('Hire Us card should exist').toBeTruthy();
      // Corrected selector: [routerLink] becomes href attribute in DOM
      const linkElement = hireUsCard?.querySelector('a[href="/hire"]'); 
      expect(linkElement).withContext('RouterLink to /hire (href="/hire") should exist').toBeTruthy();
      expect(linkElement?.textContent).toContain('Hire us');
    });

    it('should contain a mailto link for the Business Manager', () => {
      expect(hireUsCard).withContext('Hire Us card should exist').toBeTruthy();
      const mailtoLink = hireUsCard?.querySelector('a[href="mailto:BusinessManager@kcpipeband.org"]');
      expect(mailtoLink).withContext('Mailto link for Business Manager should exist').toBeTruthy();
      expect(mailtoLink?.textContent).toContain('BusinessManager@kcpipeband.org');
    });
  });

  // Join the Band Card Tests
  describe('Join the Band Card', () => {
    let joinCard: HTMLElement | null;
    
    beforeEach(() => {
      const cards = nativeElement.querySelectorAll('.left-article mat-card');
      joinCard = Array.from(cards).find(card => card.querySelector('mat-card-title')?.textContent?.includes('Join the Band')) as HTMLElement | null;
    });

    it('should display the "Join the Band" title and subtitle', () => {
      expect(joinCard).withContext('Join the Band card should exist').toBeTruthy();
      const titleElement = joinCard?.querySelector('mat-card-title');
      expect(titleElement?.textContent).toContain('Join the Band');
      const subtitleElement = joinCard?.querySelector('mat-card-subtitle');
      expect(subtitleElement).withContext('Join the band subtitle should exist').toBeTruthy();
      expect(subtitleElement?.textContent).toContain('Practice and Instruction');
    });

    it('should display bagpipe student contact (Dorothy May)', () => {
      expect(joinCard).withContext('Join the Band card should exist').toBeTruthy();
      const cardContent = joinCard?.querySelector('mat-card-content')?.textContent;
      expect(cardContent).toContain('Dorothy May');
      const mailtoLink = joinCard?.querySelector('a[href*="mailto:BagpipeLessons@kcpipeband.org"]');
      expect(mailtoLink).withContext('Mailto for BagpipeLessons should exist').toBeTruthy();
      expect(mailtoLink?.textContent).toContain('BagpipeLessons@kcpipeband.org');
    });

    it('should display drum student contact (Kyle Womelduff)', () => {
      expect(joinCard).withContext('Join the Band card should exist').toBeTruthy();
      const cardContent = joinCard?.querySelector('mat-card-content')?.textContent;
      expect(cardContent).toContain('Kyle Womelduff');
      const mailtoLink = joinCard?.querySelector('a[href*="mailto:DrumLessons@kcpipeband.org"]');
      expect(mailtoLink).withContext('Mailto for DrumLessons should exist').toBeTruthy();
      expect(mailtoLink?.textContent).toContain('DrumLessons@kcpipeband.org');
    });

    it('should display the practice address with a Google Maps link', () => {
      expect(joinCard).withContext('Join the Band card should exist').toBeTruthy();
      const addressLink = joinCard?.querySelector('a[href="https://goo.gl/maps/53YHKBX58Lx6jknA7"]');
      expect(addressLink).withContext('Google Maps link for practice address should exist').toBeTruthy();
      expect(addressLink?.textContent).toContain("St Andrew's Episcopal Church");
    });
  });

  // 60 years of Piping Card Tests
  describe('60 years of Piping Card', () => {
    let kcurCard: HTMLElement | null;

    beforeEach(() => {
      // This card is the only one in .right-article
      kcurCard = nativeElement.querySelector('.right-article mat-card');
    });

    it('should display the "60 years of Piping" title and subtitle', () => {
      expect(kcurCard).withContext('60 years of Piping card should exist').toBeTruthy();
      const titleElement = kcurCard?.querySelector('mat-card-title');
      expect(titleElement?.textContent).toContain('60 years of Piping');
      const subtitleElement = kcurCard?.querySelector('mat-card-subtitle');
      expect(subtitleElement).withContext('60 years of Piping subtitle should exist').toBeTruthy();
      expect(subtitleElement?.textContent).toContain('KCUR Radio Feature');
    });

    it('should contain a link to the KCUR article', () => {
      expect(kcurCard).withContext('60 years of Piping card should exist').toBeTruthy();
      const linkElement = kcurCard?.querySelector('a[href*="kcur.org"]');
      expect(linkElement).withContext('Link to KCUR article should exist').toBeTruthy();
      expect(linkElement?.textContent).toContain('Read full story here...');
      expect(linkElement?.getAttribute('target')).toBe('_blank');
    });
  });
});
