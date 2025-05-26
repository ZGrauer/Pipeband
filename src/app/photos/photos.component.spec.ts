import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { RouterLinkWithHref } from '@angular/router';
import { Component, Directive, Input, NO_ERRORS_SCHEMA } from '@angular/core';

import { PhotosComponent } from './photos.component';

// Mock MatPaginator to avoid issues with Material components not being true modules
@Component({
  selector: 'mat-paginator',
  template: ''
})
class MockMatPaginatorComponent {
  @Input() length: any;
  @Input() pageSize: any;
  @Input() pageSizeOptions: any;
}

// Mock MatCard and related components
@Component({
  selector: 'mat-card',
  template: '<ng-content></ng-content>'
})
class MockMatCardComponent {}

@Component({
  selector: 'mat-card-header',
  template: '<ng-content></ng-content>'
})
class MockMatCardHeaderComponent {}

@Component({
  selector: 'mat-card-title',
  template: '<ng-content></ng-content>'
})
class MockMatCardTitleComponent {}

@Component({
  selector: 'mat-card-content',
  template: '<ng-content></ng-content>'
})
class MockMatCardContentComponent {}

@Component({
  selector: 'mat-grid-list',
  template: '<ng-content></ng-content>'
})
class MockMatGridListComponent {
  @Input() cols: any;
  @Input() rowHeight: any;
}

@Component({
  selector: 'mat-grid-tile',
  template: '<ng-content></ng-content>'
})
class MockMatGridTileComponent {}


describe('PhotosComponent', () => {
  let component: PhotosComponent;
  let fixture: ComponentFixture<PhotosComponent>;

  const mockGalleries = [
    { galleryId: 'gallery1', title: 'Gallery 1', src: 'src1.jpg' },
    { galleryId: 'gallery2', title: 'Gallery 2', src: 'src2.jpg' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        PhotosComponent,
        MockMatPaginatorComponent, // Declare mock components
        MockMatCardComponent,
        MockMatCardHeaderComponent,
        MockMatCardTitleComponent,
        MockMatCardContentComponent,
        MockMatGridListComponent,
        MockMatGridTileComponent
      ],
      imports: [
        RouterTestingModule // Import RouterTestingModule for routerLink
      ],
      // Use NO_ERRORS_SCHEMA to ignore other Angular Material components if not mocked
      // schemas: [NO_ERRORS_SCHEMA] 
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotosComponent);
    component = fixture.componentInstance;
    
    // Initialize component properties that are normally set in ngOnInit or via Input
    component.galleries = mockGalleries;
    component.pageSize = 2; // Example page size
    component.pageIndex = 0;
    // Manually trigger initial data load for currentGalleriesPage
    component.getServerData({ pageIndex: component.pageIndex, pageSize: component.pageSize, length: component.galleries.length });

    fixture.detectChanges(); // Trigger initial data binding
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display gallery items', () => {
    const galleryItems = fixture.debugElement.queryAll(By.css('mat-card'));
    // Based on mockGalleries and pageSize, we expect 2 items on the first page
    expect(galleryItems.length).toBe(mockGalleries.length); 
  });

  it('should use routerLink for gallery navigation', () => {
    const linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
    
    expect(linkDes.length).toBe(mockGalleries.length); // Ensure all gallery items have links

    linkDes.forEach((linkDe, index) => {
      const routerLinkInstance = linkDe.injector.get(RouterLinkWithHref);
      const expectedRouterLink = `/photos/${mockGalleries[index].galleryId}`;
      expect(routerLinkInstance['commands']).toEqual(['/photos', mockGalleries[index].galleryId]);
      expect(routerLinkInstance.href).toBe(expectedRouterLink);
    });
  });

  it('should have correct image sources and alt text', () => {
    const imgElements = fixture.debugElement.queryAll(By.css('mat-card-content img'));
    expect(imgElements.length).toBe(mockGalleries.length);

    imgElements.forEach((imgEl, index) => {
      expect(imgEl.nativeElement.src).toContain(mockGalleries[index].src);
      expect(imgEl.nativeElement.alt).toBe(mockGalleries[index].title);
    });
  });
  
  // Basic pagination test (can be expanded)
  it('getServerData should update currentGalleriesPage', () => {
    component.galleries = [
      { galleryId: 'g1', title: 'T1', src: 's1.jpg' },
      { galleryId: 'g2', title: 'T2', src: 's2.jpg' },
      { galleryId: 'g3', title: 'T3', src: 's3.jpg' },
    ];
    component.getServerData({ pageIndex: 1, pageSize: 1, length: component.galleries.length });
    expect(component.currentGalleriesPage.length).toBe(1);
    expect(component.currentGalleriesPage[0].galleryId).toBe('g2');
  });

  // Test HostListener for window resize - this is a bit more complex to test thoroughly
  // For simplicity, we'll just check if the galleryColCount changes as expected
  it('should adjust galleryColCount on window resize', () => {
    // Initial state (default or based on ngOnInit logic if not overridden)
    // Let's assume default is 3 as per component logic for wide screens
    component.galleryColCount = 3; // Set a starting value

    // Simulate small screen
    spyOnProperty(window, 'innerWidth').and.returnValue(500);
    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();
    expect(component.galleryColCount).toBe(1);

    // Simulate medium screen
    spyOnProperty(window, 'innerWidth').and.returnValue(800);
    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();
    expect(component.galleryColCount).toBe(2);

    // Simulate large screen
    spyOnProperty(window, 'innerWidth').and.returnValue(1200);
    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();
    expect(component.galleryColCount).toBe(3);
  });

});
