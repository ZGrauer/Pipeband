import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GalleryViewComponent } from './gallery-view.component';
import { By } from '@angular/platform-browser';

describe('GalleryViewComponent', () => {
  let component: GalleryViewComponent;
  let fixture: ComponentFixture<GalleryViewComponent>;
  let httpMock: HttpTestingController;
  let mockActivatedRoute;

  const mockGalleryId = 'test-gallery';
  const mockManifest = [
    { filename: 'image1.jpg', alt: 'Test Image 1' },
    { filename: 'image2.png', alt: 'Test Image 2' },
  ];

  beforeEach(async () => {
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: (key: string) => {
            if (key === 'galleryId') {
              return mockGalleryId;
            }
            return null;
          }
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [
        GalleryViewComponent, // Import the standalone component
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalleryViewComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no unmatched requests are outstanding
  });

  it('should create', () => {
    // Manually set galleryId and trigger ngOnInit as ActivatedRoute mock is for snapshot
    component.galleryId = mockGalleryId;
    component.ngOnInit();
    fixture.detectChanges();
    expect(component).toBeTruthy();
     // Expect a call to fetch the manifest
    const req = httpMock.expectOne(`assets/photos/${mockGalleryId}/manifest.json`);
    req.flush(mockManifest);
  });

  it('should construct the correct manifest path and fetch manifest on ngOnInit', () => {
    component.galleryId = mockGalleryId; // Set input directly for testing ngOnInit
    component.ngOnInit(); // Call ngOnInit manually

    const req = httpMock.expectOne(`assets/photos/${mockGalleryId}/manifest.json`);
    expect(req.request.method).toBe('GET');
    req.flush(mockManifest); // Provide mock data

    expect(component.images).toEqual(mockManifest);
  });
  
  it('should set images property from fetched manifest data', () => {
    component.galleryId = mockGalleryId;
    component.ngOnInit();

    const req = httpMock.expectOne(`assets/photos/${mockGalleryId}/manifest.json`);
    req.flush(mockManifest);

    fixture.detectChanges(); // Update the template with the new data

    expect(component.images).toEqual(mockManifest);
  });

  it('should render img tags with correct src and alt attributes', () => {
    component.galleryId = mockGalleryId;
    component.images = mockManifest; // Set images directly to bypass ngOnInit for this specific test
    fixture.detectChanges(); // Trigger change detection to render the template

    const imgDebugElements = fixture.debugElement.queryAll(By.css('.gallery-item img'));
    expect(imgDebugElements.length).toBe(mockManifest.length);

    imgDebugElements.forEach((imgEl, index) => {
      const expectedSrc = `assets/photos/${mockGalleryId}/${mockManifest[index].filename}`;
      expect(imgEl.nativeElement.src).toContain(expectedSrc);
      expect(imgEl.nativeElement.alt).toBe(mockManifest[index].alt);
    });
  });

  it('should display "Loading images..." message when galleryId is present but images are not yet loaded', () => {
    component.galleryId = mockGalleryId;
    component.images = []; // Ensure images are empty
    fixture.detectChanges();

    const pElement = fixture.debugElement.query(By.css('p'));
    expect(pElement.nativeElement.textContent).toContain(`Loading images for ${mockGalleryId}...`);
  });

  it('should display "No gallery ID provided." message when galleryId is not present', () => {
    component.galleryId = ''; // Set galleryId to empty
    component.ngOnInit(); // Call ngOnInit to reflect the change
    fixture.detectChanges();

    const pElement = fixture.debugElement.query(By.css('p'));
    expect(pElement.nativeElement.textContent).toContain('No gallery ID provided.');
     // No HTTP call should be made if galleryId is not present
    httpMock.expectNone(`assets/photos/${component.galleryId}/manifest.json`);
  });
});
