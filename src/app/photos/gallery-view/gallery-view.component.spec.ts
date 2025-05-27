import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; // HttpClient from @angular/common/http
import { of, throwError } from 'rxjs'; // Added throwError

import { GalleryViewComponent } from './gallery-view.component';
import { By } from '@angular/platform-browser';

interface ManifestItem {
  filename: string;
  alt: string;
}

const MOCK_GALLERY_ID = 'test-gallery';
const MOCK_MANIFEST_DATA: ManifestItem[] = [
  { filename: 'image1.jpg', alt: 'Alt text for image 1' },
  { filename: 'image2.png', alt: 'Alt text for image 2' },
];

describe('GalleryViewComponent', () => {
  let component: GalleryViewComponent;
  let fixture: ComponentFixture<GalleryViewComponent>;
  let nativeElement: HTMLElement;
  let httpMock: HttpTestingController;

  // Helper function to configure TestBed and create the component instance
  function setupTestBedAndCreateComponent(routeParams: any) {
    TestBed.configureTestingModule({
      declarations: [GalleryViewComponent],
      imports: [HttpClientTestingModule], // HttpClientTestingModule provides HttpTestingController and mocks HttpClient
      providers: [
        { 
          provide: ActivatedRoute, 
          useValue: { snapshot: { paramMap: convertToParamMap(routeParams) } } 
        }
        // HttpClient is implicitly provided by HttpClientTestingModule for the component to inject
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GalleryViewComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    httpMock = TestBed.inject(HttpTestingController);
  }

  afterEach(() => {
    httpMock.verify(); 
    TestBed.resetTestingModule(); 
  });

  it('should create, extract galleryId, load and display images on success', () => {
    setupTestBedAndCreateComponent({ galleryId: MOCK_GALLERY_ID });
    fixture.detectChanges(); // ngOnInit runs, HTTP call made here

    expect(component).toBeTruthy();
    expect(component.galleryId).toBe(MOCK_GALLERY_ID);

    const req = httpMock.expectOne(`assets/photos/${MOCK_GALLERY_ID}/manifest.json`);
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_MANIFEST_DATA);
    fixture.detectChanges(); // Update view with loaded images

    // Assertions for successful loading (data, DOM)
    expect(component.images.length).toBe(MOCK_MANIFEST_DATA.length);
    expect(component.images).toEqual(MOCK_MANIFEST_DATA);

    const galleryItems = nativeElement.querySelectorAll('.gallery-item');
    expect(galleryItems.length).toBe(MOCK_MANIFEST_DATA.length);
    
    const firstGalleryItem = nativeElement.querySelector('.gallery-item');
    expect(firstGalleryItem).toBeTruthy();
    const linkElement = firstGalleryItem?.querySelector('a');
    expect(linkElement).toBeTruthy();
    expect(linkElement?.getAttribute('href'))
      .toBe(`assets/photos/${MOCK_GALLERY_ID}/${MOCK_MANIFEST_DATA[0].filename}`);
    const imgElement = linkElement?.querySelector('img');
    expect(imgElement).toBeTruthy();
    const expectedThumbSrc = `assets/photos/${MOCK_GALLERY_ID}/thumbs/${MOCK_MANIFEST_DATA[0].filename.split('.').slice(0, -1).join('.')}_thumb.webp`;
    expect(imgElement?.getAttribute('src')).toBe(expectedThumbSrc);
    expect(imgElement?.getAttribute('alt')).toBe(MOCK_MANIFEST_DATA[0].alt);

    // Check that loading/error messages are not present
    const pElements = nativeElement.querySelectorAll('p');
    pElements.forEach(p => {
        expect(p.textContent).not.toContain(`Loading images for ${MOCK_GALLERY_ID}...`);
        expect(p.textContent).not.toContain('No gallery ID provided.');
    });
    const galleryGrid = nativeElement.querySelector('.gallery-grid');
    expect(galleryGrid).toBeTruthy(); 
  });

  it('should create, extract galleryId, and handle HTTP error for manifest', () => {
    // For this specific error test, we will make HttpClient.get itself return an error.
    // This bypasses HttpTestingController for this request, so verify() won't complain.
    TestBed.configureTestingModule({
      declarations: [GalleryViewComponent],
      imports: [HttpClientTestingModule], // Still need this for other tests and for httpMock.verify()
      providers: [
        { 
          provide: ActivatedRoute, 
          useValue: { snapshot: { paramMap: convertToParamMap({ galleryId: MOCK_GALLERY_ID }) } } 
        }
        // HttpClient will be injected into the component from the testing module.
      ]
    });
    
    // Spy on HttpClient.get BEFORE component creation for this specific test case
    const httpClientFromTestBed = TestBed.inject(HttpClient);
    const errorResponse = new HttpErrorResponse({ error: 'test 404 error', status: 404, statusText: 'Not Found' });
    const httpGetSpy = spyOn<any>(httpClientFromTestBed, 'get').and.returnValue(throwError(() => errorResponse));

    // Now create the component. It will get the HttpClient instance that has the spied 'get' method.
    fixture = TestBed.createComponent(GalleryViewComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    httpMock = TestBed.inject(HttpTestingController); // Initialize httpMock for afterEach->verify, though it won't see this call.
    
    const consoleErrorSpy = spyOn(console, 'error').and.callFake(() => {}); 
    
    fixture.detectChanges(); // ngOnInit runs, calling the spied (erroring) http.get

    expect(component).toBeTruthy();
    expect(component.galleryId).toBe(MOCK_GALLERY_ID);
    expect(httpGetSpy).toHaveBeenCalledWith(`assets/photos/${MOCK_GALLERY_ID}/manifest.json`);
    
    // No httpMock.expectOne for this request as it was intercepted by the direct spy.
    // fixture.detectChanges(); // Already called, or call again if needed after error.

    // Assertions for error handling
    expect(component.images.length).toBe(0);
    const messageElement = nativeElement.querySelector('p');
    expect(messageElement).toBeTruthy();
    expect(messageElement?.textContent).toContain(`Loading images for ${MOCK_GALLERY_ID}...`);
    const galleryGrid = nativeElement.querySelector('.gallery-grid');
    expect(galleryGrid?.children.length === 0 || !galleryGrid).toBeTruthy(); 
  });

  it('should handle no galleryId provided', () => {
    setupTestBedAndCreateComponent({}); // No galleryId
    fixture.detectChanges(); // ngOnInit runs

    expect(component).toBeTruthy();
    expect(component.galleryId).toBe('');
    // No HTTP call expected because of the if(this.galleryId) check in component.
    // httpMock.verify() in afterEach will confirm no unexpected calls were made (if it were active).
    expect(component.images.length).toBe(0);
    const messageElement = nativeElement.querySelector('p');
    expect(messageElement).toBeTruthy();
    expect(messageElement?.textContent).toContain('No gallery ID provided.');
    const galleryGrid = nativeElement.querySelector('.gallery-grid');
    expect(galleryGrid?.children.length === 0 || !galleryGrid).toBeTruthy();
  });
});
