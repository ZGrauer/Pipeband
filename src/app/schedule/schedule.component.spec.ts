import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import { RouterTestingModule } from '@angular/router/testing';
import { ScheduleComponent } from './schedule.component';
import { By } from '@angular/platform-browser';

describe('ScheduleComponent', () => {
  let component: ScheduleComponent;
  let fixture: ComponentFixture<ScheduleComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScheduleComponent],
      imports: [
        MatListModule,
        RouterTestingModule // For routerLink
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the main heading "2025 Performances"', () => {
    const headingElement = nativeElement.querySelector('.main-content h2');
    expect(headingElement).withContext('Main H2 heading should exist').toBeTruthy();
    expect(headingElement?.textContent).toContain('2025 Performances');
  });

  describe('Event List', () => {
    let listItems: NodeListOf<Element>;

    beforeEach(() => {
      listItems = nativeElement.querySelectorAll('.main-content mat-list mat-list-item');
    });

    it('should display a list of performances', () => {
      const listElement = nativeElement.querySelector('.main-content mat-list');
      expect(listElement).withContext('Mat-list element should exist').toBeTruthy();
      // Based on the HTML, there are 13 events listed for 2025
      expect(listItems.length).toBe(13); 
    });

    it('should display details for "Robert Burns Dinner"', () => {
      const burnsDinnerItem = Array.from(listItems).find(item => item.querySelector('[matListItemTitle]')?.textContent?.includes('Robert Burns Dinner'));
      expect(burnsDinnerItem).withContext('"Robert Burns Dinner" item should exist').toBeTruthy();

      const lines = burnsDinnerItem?.querySelectorAll('[matListItemLine]');
      expect(lines?.[0]?.textContent?.trim()).toBe('Kansas City, MO');
      expect(lines?.[1]?.textContent?.trim()).toBe('January, 2025');

      const linkElement = burnsDinnerItem?.querySelector('[matListItemTitle] a');
      expect(linkElement).withContext('Link for Burns Dinner should exist').toBeTruthy();
      expect(linkElement?.getAttribute('href')).toBe('https://www.kcscot.org/');
      expect(linkElement?.getAttribute('target')).toBe('_blank');
    });

    it('should display details for "Snake Saturday Parade"', () => {
      const snakeParadeItem = Array.from(listItems).find(item => item.querySelector('[matListItemTitle]')?.textContent?.includes('Snake Saturday Parade'));
      expect(snakeParadeItem).withContext('"Snake Saturday Parade" item should exist').toBeTruthy();

      const lines = snakeParadeItem?.querySelectorAll('[matListItemLine]');
      expect(lines?.[0]?.textContent?.trim()).toBe('North Kansas City, MO');
      expect(lines?.[1]?.textContent?.trim()).toBe('Mar 15, 2025');
      
      const linkElement = snakeParadeItem?.querySelector('[matListItemTitle] a');
      expect(linkElement).withContext('Link for Snake Saturday Parade should exist').toBeTruthy();
      expect(linkElement?.getAttribute('href')).toBe('https://snakesaturday.com/');
    });
    
    it('should display details for an event without a link, like "Special Forces Ball"', () => {
      const sfBallItem = Array.from(listItems).find(item => item.querySelector('[matListItemTitle]')?.textContent?.includes('Special Forces Ball'));
      expect(sfBallItem).withContext('"Special Forces Ball" item should exist').toBeTruthy();

      const lines = sfBallItem?.querySelectorAll('[matListItemLine]');
      expect(lines?.[0]?.textContent?.trim()).toBe('Parkville, MO');
      expect(lines?.[1]?.textContent?.trim()).toBe('Apr 12, 2025');

      const linkElement = sfBallItem?.querySelector('[matListItemTitle] a');
      expect(linkElement).withContext('Link for Special Forces Ball should NOT exist').toBeFalsy();
    });
  });

  describe('Past Performances Link', () => {
    it('should display a link to "Past Performances"', () => {
      // Corrected selector: [routerLink] becomes href attribute in DOM
      const linkElement = nativeElement.querySelector('.main-content > a[href="/about"]'); 
      expect(linkElement).withContext('Link to /about (Past Performances) should exist').toBeTruthy();
      
      const headingInsideLink = linkElement?.querySelector('h3');
      expect(headingInsideLink).withContext('H3 inside link should exist').toBeTruthy();
      expect(headingInsideLink?.textContent).toContain('Past Performances');
      
      expect(linkElement?.getAttribute('href')).toBe('/about');
    });
  });

  describe('Images in Right Article', () => {
    it('should display the first image (190720 21_1.webp)', () => {
      const imgElement = nativeElement.querySelector('.right-article img[src="../../assets/190720 21_1.webp"]');
      expect(imgElement).withContext('First image in right article should exist').toBeTruthy();
    });

    it('should display the second image (bass_drum.webp)', () => {
      const imgElement = nativeElement.querySelector('.right-article img[src="../../assets/bass_drum.webp"]');
      expect(imgElement).withContext('Second image (bass drum) in right article should exist').toBeTruthy();
    });
  });
});
