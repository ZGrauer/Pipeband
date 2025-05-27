import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutComponent ],
      imports: [ MatCardModule ] // Import MatCardModule here
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement; // Get the native element
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the main title "About Us"', () => {
    const titleElement = nativeElement.querySelector('.title h2');
    expect(titleElement).toBeTruthy();
    expect(titleElement?.textContent).toContain('About Us');
  });

  it('should render the "Past Performances and Partnerships" heading', () => {
    const headingElement = nativeElement.querySelector('.main-content h3');
    expect(headingElement).toBeTruthy();
    expect(headingElement?.textContent).toContain('Past Performances and Partnerships');
  });

  it('should render the "Awards & Honors" heading', () => {
    // Query all h3 elements in .main-content and check the second one
    const headingElements = nativeElement.querySelectorAll('.main-content h3');
    expect(headingElements.length).toBeGreaterThanOrEqual(2); // Ensure there are at least two h3s
    const awardsHeadingElement = Array.from(headingElements).find(el => el.textContent?.includes('Awards & Honors'));
    expect(awardsHeadingElement).toBeTruthy();
    expect(awardsHeadingElement?.textContent).toContain('Awards & Honors');
  });

  it('should render the "Links" card title', () => {
    const cardTitleElement = nativeElement.querySelector('.left-article mat-card-title');
    expect(cardTitleElement).toBeTruthy();
    expect(cardTitleElement?.textContent).toContain('Links');
  });

  it('should render the "Tartan" card title', () => {
    const cardTitleElement = nativeElement.querySelector('.right-article mat-card-title');
    expect(cardTitleElement).toBeTruthy();
    expect(cardTitleElement?.textContent).toContain('Tartan');
  });

  it('should render the tartan description paragraph', () => {
    const paragraphElement = nativeElement.querySelector('.right-article mat-card-content p');
    expect(paragraphElement).toBeTruthy();
    expect(paragraphElement?.textContent).toContain('Our uniform kilt is the MacDonnell of Keppoch tartan');
  });

  it('should render the Facebook link with correct href and text', () => {
    const linkElement = nativeElement.querySelector('.left-article mat-card-content ul li a[href*="facebook.com"]');
    expect(linkElement).toBeTruthy();
    expect(linkElement?.getAttribute('href')).toBe('https://www.facebook.com/Kansas-City-St-Andrew-Pipes-and-Drums-273250496949');
    const spanElement = linkElement?.querySelector('span');
    expect(spanElement).toBeTruthy();
    expect(spanElement?.textContent).toContain('Kansas City St. Andrew Pipes and Drums Facebook');
  });

  it('should list "The Kansas City St. Patrick\'s Day Parade" as a past performance', () => {
    const listItems = nativeElement.querySelectorAll('.main-content ul:first-of-type li'); // First ul in main-content
    const performanceExists = Array.from(listItems).some(item => item.textContent?.includes("The Kansas City St. Patrick's Day Parade"));
    expect(performanceExists).toBeTrue();
  });

  it('should list "Rob McAtee - 2023" under "Pipe Major Award"', () => {
    // Find the h4 for "Pipe Major Award"
    const allH4s = nativeElement.querySelectorAll('.main-content h4');
    let headingElement: Element | undefined;
    allH4s.forEach(h4 => {
        if (h4.textContent?.includes('Pipe Major Award')) {
            headingElement = h4;
        }
    });

    expect(headingElement).withContext('Could not find "Pipe Major Award" h4 element').toBeTruthy();
    if (!headingElement) {
      fail('Could not find "Pipe Major Award" h4 element');
      return; // Keep TS happy
    }

    const pipeMajorAwardList = headingElement.nextElementSibling;
    expect(pipeMajorAwardList).withContext('"Pipe Major Award" h4 should have a following sibling UL element').toBeTruthy();
    
    if (pipeMajorAwardList) {
        const listItems = pipeMajorAwardList.querySelectorAll('li');
        const awardExists = Array.from(listItems).some((item: Element) => item.textContent?.includes("Rob McAtee - 2023"));
        expect(awardExists).withContext('"Rob McAtee - 2023" not found in list').toBeTrue();
    } else {
        fail('Pipe Major Award list (ul element) was not found after its h4 heading.');
    }
  });

});
