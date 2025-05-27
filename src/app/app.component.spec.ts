import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MetaService } from './meta.service';
import { NavigationEnd, Router, Event as RouterEvent, ActivatedRoute, convertToParamMap } from '@angular/router'; // Aliased Event
import { of, Subject } from 'rxjs';

// Mock MetaService
class MockMetaService {
  updateTitle = jasmine.createSpy('updateTitle');
  updateDescription = jasmine.createSpy('updateDescription');
}

// Mock ActivatedRoute
const mockActivatedRoute = {
  snapshot: {
    paramMap: convertToParamMap({}),
    queryParamMap: convertToParamMap({})
  },
  firstChild: null, // Default, can be overridden in tests
  outlet: 'primary', // Default
  data: of({}), // Default, emits empty data initially
};


describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let nativeElement: HTMLElement;
  let router: Router;
  let mockRouterEvents: Subject<RouterEvent>; // Use aliased RouterEvent
  let mockMetaService: MockMetaService;

  beforeEach(async () => {
    mockRouterEvents = new Subject<RouterEvent>(); 
    mockMetaService = new MockMetaService();

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]), 
        NoopAnimationsModule, 
        MatTabsModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
      ],
      declarations: [AppComponent],
      providers: [
        { provide: MetaService, useValue: mockMetaService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
    }).compileComponents();

    router = TestBed.inject(Router); // Inject router BEFORE component creation
    // Spy on router events - BEFORE component constructor subscribes
    spyOnProperty(router, 'events', 'get').and.returnValue(mockRouterEvents.asObservable());

    fixture = TestBed.createComponent(AppComponent); // Component constructor will now use the spied-upon router.events
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    // router = TestBed.inject(Router); // Already injected

    fixture.detectChanges(); // Initial binding
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the correct title 'KC St. Andrews Pipes and Drums'`, () => {
    expect(component.title).toEqual('KC St. Andrews Pipes and Drums');
  });

  it('should render the main title text', () => {
    const titleElement = nativeElement.querySelector('h1#title-text');
    expect(titleElement).toBeTruthy();
    expect(titleElement?.textContent).toContain('Welcome to the Kansas City St. Andrew Pipes & Drums');
  });

  it('should render the band logo', () => {
    const logoElement = nativeElement.querySelector('img#title-icon');
    expect(logoElement).toBeTruthy();
    expect(logoElement?.getAttribute('src')).toContain('../assets/band_logo.webp');
  });

  it('should render the tab navigation bar', () => {
    const tabNavBarElement = nativeElement.querySelector('nav[mat-tab-nav-bar]');
    expect(tabNavBarElement).toBeTruthy();
  });

  it('should render the correct number of navigation links in the tab bar', () => {
    const tabLinks = nativeElement.querySelectorAll('nav[mat-tab-nav-bar] a[mat-tab-link]');
    expect(tabLinks.length).toBe(component.navLinks.length);
  });
  
  it('should render the toolbar menu button', () => {
    const menuButtonElement = nativeElement.querySelector('mat-toolbar button[mat-icon-button][aria-label="menu icon"]');
    expect(menuButtonElement).toBeTruthy();
    const iconElement = menuButtonElement?.querySelector('mat-icon');
    expect(iconElement?.textContent).toBe('menu');
  });

  it('should render the router outlet', () => {
    const routerOutletElement = nativeElement.querySelector('router-outlet');
    expect(routerOutletElement).toBeTruthy();
  });

  it('should render the footer', () => {
    const footerElement = nativeElement.querySelector('footer');
    expect(footerElement).toBeTruthy();
  });

  it('should display copyright information in the footer', () => {
    const footerText = nativeElement.querySelector('footer .col-2')?.textContent;
    expect(footerText).toContain('© Copyright 2023 Kansas City St. Andrew Pipes & Drums');
  });

  it('should initialize navLinks with correct number of links', () => {
    expect(component.navLinks).toBeInstanceOf(Array);
    expect(component.navLinks.length).toBe(8); // Based on current component code
    expect(component.navLinks[0].label).toBe('Home');
    expect(component.navLinks[7].label).toBe('Members');
  });
  
  describe('Router event handling', () => {
    it('should update currentRoute and isMembersRoute on NavigationEnd', () => {
      const testUrl = '/members';
      mockRouterEvents.next(new NavigationEnd(1, testUrl, testUrl));
      fixture.detectChanges();
      expect(component.currentRoute).toBe(testUrl);
      expect(component.isMembersRoute).toBeTrue();

      const anotherUrl = '/about';
      mockRouterEvents.next(new NavigationEnd(2, anotherUrl, anotherUrl));
      fixture.detectChanges();
      expect(component.currentRoute).toBe(anotherUrl);
      expect(component.isMembersRoute).toBeFalse();
    });

    it('should update activeLinkIndex on NavigationEnd', () => {
      const urlSpy = spyOnProperty(router, 'url', 'get');

      // First navigation: to /about
      urlSpy.and.returnValue('/about');
      mockRouterEvents.next(new NavigationEnd(1, '/about', '/about'));
      fixture.detectChanges();
      
      const aboutLink = component.navLinks.find(link => link.link === './about');
      expect(component.activeLinkIndex)
        .withContext("Active index should be for /about (url: '/about')")
        .toBe(aboutLink ? aboutLink.index : -1);
      // expect(component.activeLinkIndex).withContext("Active index for /about should be 1").toBe(1); // More specific check

      // Second navigation: to /
      urlSpy.and.returnValue('/');
      mockRouterEvents.next(new NavigationEnd(2, '/', '/'));
      fixture.detectChanges();
      
      const homeLink = component.navLinks.find(link => link.link === './');
      expect(component.activeLinkIndex)
        .withContext("Active index should be for / (url: '/')")
        .toBe(homeLink ? homeLink.index : -1);
      // expect(component.activeLinkIndex).withContext("Active index for / should be 0").toBe(0); // More specific check
    });

    it('should call MetaService with route data on NavigationEnd', () => {
      const routeData = { title: 'Test Title', description: 'Test Description' };
      // Create a mock route structure for this specific test
      const mockChildRoute = {
        firstChild: null,
        outlet: 'primary',
        data: of(routeData),
        snapshot: { paramMap: convertToParamMap({}), queryParamMap: convertToParamMap({}) }
      };
      const currentMockActivatedRoute = TestBed.inject(ActivatedRoute);
      (currentMockActivatedRoute as any).firstChild = mockChildRoute; // Set up the child route for the meta service logic

      mockRouterEvents.next(new NavigationEnd(1, '/test', '/test'));
      fixture.detectChanges(); // ngOnInit subscription for meta service

      expect(mockMetaService.updateTitle).toHaveBeenCalledWith(routeData.title);
      expect(mockMetaService.updateDescription).toHaveBeenCalledWith(routeData.description);

      // Clean up to avoid interference with other tests
      (currentMockActivatedRoute as any).firstChild = null; 
      (currentMockActivatedRoute as any).data = of({}); // Reset data
    });
  });
});
