import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

import { PhotosComponent } from './photos.component';
import { By } from '@angular/platform-browser';

// Define a smaller mock galleries array for easier testing of pagination logic
const MOCK_GALLERIES_FULL = [
  { galleryId: 'g1', title: 'Gallery 1', src: 'g1.jpg' },
  { galleryId: 'g2', title: 'Gallery 2', src: 'g2.jpg' },
  { galleryId: 'g3', title: 'Gallery 3', src: 'g3.jpg' },
  { galleryId: 'g4', title: 'Gallery 4', src: 'g4.jpg' },
  { galleryId: 'g5', title: 'Gallery 5', src: 'g5.jpg' },
];

describe('PhotosComponent', () => {
  let component: PhotosComponent;
  let fixture: ComponentFixture<PhotosComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhotosComponent],
      imports: [
        NoopAnimationsModule,
        RouterTestingModule, // For routerLink
        MatGridListModule,
        MatCardModule,
        MatPaginatorModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotosComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    
    // For most tests, override the large galleries array with a smaller mock
    // and set default pagination values
    component.galleries = [...MOCK_GALLERIES_FULL]; 
    component.pageSize = 3; 
    component.pageIndex = 0;
    // Note: ngOnInit will be called by the first fixture.detectChanges() in tests
  });

  it('should create', () => {
    fixture.detectChanges(); // ngOnInit runs here
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set galleryColCount to 3 for large screens on init', () => {
      spyOnProperty(window, 'innerWidth', 'get').and.returnValue(1200);
      component.ngOnInit();
      expect(component.galleryColCount).toBe(3);
    });

    it('should set galleryColCount to 2 for medium screens on init', () => {
      spyOnProperty(window, 'innerWidth', 'get').and.returnValue(800);
      component.ngOnInit();
      expect(component.galleryColCount).toBe(2);
    });

    it('should set galleryColCount to 1 for small screens on init', () => {
      spyOnProperty(window, 'innerWidth', 'get').and.returnValue(500);
      component.ngOnInit();
      expect(component.galleryColCount).toBe(1);
    });
    
    it('should call getServerData and initialize currentGalleriesPage', () => {
      spyOn(component, 'getServerData').and.callThrough();
      component.ngOnInit(); // Call directly
      expect(component.getServerData).toHaveBeenCalledWith(jasmine.objectContaining({
        pageIndex: 0, // component.pageIndex
        pageSize: 3  // component.pageSize
      }));
      expect(component.currentGalleriesPage.length).toBe(3); 
      expect(component.currentGalleriesPage[0].galleryId).toBe(MOCK_GALLERIES_FULL[0].galleryId);
    });
  });

  describe('onWindowResize', () => {
    it('should set galleryColCount to 3 for large screens on resize', () => {
      spyOnProperty(window, 'innerWidth', 'get').and.returnValue(1200);
      component.onWindowResize();
      expect(component.galleryColCount).toBe(3);
    });

    it('should set galleryColCount to 2 for medium screens on resize', () => {
      spyOnProperty(window, 'innerWidth', 'get').and.returnValue(800);
      component.onWindowResize();
      expect(component.galleryColCount).toBe(2);
    });

    it('should set galleryColCount to 1 for small screens on resize', () => {
      spyOnProperty(window, 'innerWidth', 'get').and.returnValue(500);
      component.onWindowResize();
      expect(component.galleryColCount).toBe(1);
    });
  });

  describe('getServerData (Pagination Logic)', () => {
    beforeEach(() => {
        component.galleries = [...MOCK_GALLERIES_FULL]; // Ensure fresh copy for each test
        component.pageSize = 2; 
        component.pageIndex = 0;
        // Initial call to set up currentGalleriesPage, mimicking ngOnInit or first paginator event
        component.getServerData({ pageIndex: 0, pageSize: 2, length: component.galleries.length } as PageEvent);
        fixture.detectChanges();
    });

    it('should update currentGalleriesPage for the first page', () => {
      // Data already set in beforeEach, just verify
      expect(component.currentGalleriesPage.length).toBe(2);
      expect(component.currentGalleriesPage[0].galleryId).toBe(MOCK_GALLERIES_FULL[0].galleryId);
      expect(component.currentGalleriesPage[1].galleryId).toBe(MOCK_GALLERIES_FULL[1].galleryId);
      expect(component.pageSize).toBe(2); // Verify pageSize was updated by the event
    });

    it('should update currentGalleriesPage for the second page', () => {
      component.getServerData({ pageIndex: 1, pageSize: 2, length: component.galleries.length } as PageEvent);
      expect(component.currentGalleriesPage.length).toBe(2);
      expect(component.currentGalleriesPage[0].galleryId).toBe(MOCK_GALLERIES_FULL[2].galleryId);
      expect(component.currentGalleriesPage[1].galleryId).toBe(MOCK_GALLERIES_FULL[3].galleryId);
    });

    it('should handle the last page correctly (fewer items than pageSize)', () => {
      component.getServerData({ pageIndex: 2, pageSize: 2, length: component.galleries.length } as PageEvent);
      expect(component.currentGalleriesPage.length).toBe(1); 
      expect(component.currentGalleriesPage[0].galleryId).toBe(MOCK_GALLERIES_FULL[4].galleryId);
    });
  });

  describe('DOM Rendering', () => {
    beforeEach(() => {
      component.galleries = [...MOCK_GALLERIES_FULL];
      component.pageSize = 2; 
      component.ngOnInit(); // Call ngOnInit to set initial page based on these values
      fixture.detectChanges(); 
    });

    it('should render a mat-grid-list', () => {
      const gridList = nativeElement.querySelector('mat-grid-list');
      expect(gridList).toBeTruthy();
    });

    it('should render the correct number of gallery tiles based on currentGalleriesPage', () => {
      const tiles = nativeElement.querySelectorAll('mat-grid-tile');
      expect(tiles.length).toBe(2); // currentGalleriesPage should have 2 items
    });

    it('should display gallery title, image with src and alt, and correct routerLink for a gallery tile', () => {
      const firstTile = nativeElement.querySelector('mat-grid-tile'); // Get the first tile
      expect(firstTile).toBeTruthy();

      const cardTitle = firstTile?.querySelector('mat-card-title');
      expect(cardTitle?.textContent).toContain(MOCK_GALLERIES_FULL[0].title);

      const imgElement = firstTile?.querySelector('img[mat-card-image]');
      expect(imgElement).toBeTruthy();
      expect(imgElement?.getAttribute('src')).toBe(MOCK_GALLERIES_FULL[0].src);
      expect(imgElement?.getAttribute('alt')).toBe(MOCK_GALLERIES_FULL[0].title);

      const linkElement = firstTile?.querySelector('a');
      expect(linkElement).toBeTruthy();
      expect(linkElement?.getAttribute('href')).toBe(`/photos/${MOCK_GALLERIES_FULL[0].galleryId}`);
    });

    it('should render the mat-paginator', () => {
      const paginator = nativeElement.querySelector('mat-paginator');
      expect(paginator).toBeTruthy();
    });
  });

  it('should update displayed galleries when paginator event occurs (simulated by calling getServerData)', fakeAsync(() => {
    component.galleries = [...MOCK_GALLERIES_FULL];
    component.pageSize = 3; // Initial pageSize for this test
    component.ngOnInit(); // Initial load
    fixture.detectChanges(); 
    tick();
    
    let tiles = nativeElement.querySelectorAll('mat-grid-tile');
    expect(tiles.length).toBe(3); 
    expect(nativeElement.querySelector('mat-card-title')?.textContent).toContain(MOCK_GALLERIES_FULL[0].title);

    // Simulate a paginator event by directly calling getServerData
    component.getServerData({ pageIndex: 1, pageSize: 3, length: component.galleries.length } as PageEvent);
    fixture.detectChanges(); // Re-render with new page data
    tick();

    tiles = nativeElement.querySelectorAll('mat-grid-tile');
    expect(tiles.length).toBe(MOCK_GALLERIES_FULL.length - 3); // 5 - 3 = 2 remaining
    // The first item on the new page should be MOCK_GALLERIES_FULL[3]
    expect(nativeElement.querySelector('mat-card-title')?.textContent).toContain(MOCK_GALLERIES_FULL[3].title);
  }));

});
