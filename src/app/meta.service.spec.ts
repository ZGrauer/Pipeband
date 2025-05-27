import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { MetaService } from './meta.service';

describe('MetaService', () => {
  let service: MetaService;
  let titleService: Title;
  let metaService: Meta;

  // Create spy objects for Title and Meta services
  const titleSpy = jasmine.createSpyObj('Title', ['setTitle']);
  const metaSpy = jasmine.createSpyObj('Meta', ['updateTag']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MetaService,
        { provide: Title, useValue: titleSpy },
        { provide: Meta, useValue: metaSpy }
      ]
    });
    service = TestBed.inject(MetaService);
    titleService = TestBed.inject(Title);
    metaService = TestBed.inject(Meta);

    // Reset spies before each test to ensure clean slate
    titleSpy.setTitle.calls.reset();
    metaSpy.updateTag.calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('updateTitle()', () => {
    it('should call Title.setTitle() if title is provided', () => {
      const newTitle = 'Test Page Title';
      service.updateTitle(newTitle);
      expect(titleService.setTitle).toHaveBeenCalledWith(newTitle);
    });

    it('should not call Title.setTitle() if title is empty', () => {
      service.updateTitle('');
      expect(titleService.setTitle).not.toHaveBeenCalled();
    });

    it('should not call Title.setTitle() if title is null', () => {
      service.updateTitle(null as any); // Use 'as any' to bypass string type for null test
      expect(titleService.setTitle).not.toHaveBeenCalled();
    });

    it('should not call Title.setTitle() if title is undefined', () => {
      service.updateTitle(undefined as any); // Use 'as any' for undefined test
      expect(titleService.setTitle).not.toHaveBeenCalled();
    });
  });

  describe('updateDescription()', () => {
    it('should call Meta.updateTag() for description if description is provided', () => {
      const newDescription = 'This is a test page description.';
      service.updateDescription(newDescription);
      expect(metaService.updateTag).toHaveBeenCalledWith({ name: 'description', content: newDescription });
    });

    it('should not call Meta.updateTag() if description is empty', () => {
      service.updateDescription('');
      expect(metaService.updateTag).not.toHaveBeenCalled();
    });

    it('should not call Meta.updateTag() if description is null', () => {
      service.updateDescription(null as any);
      expect(metaService.updateTag).not.toHaveBeenCalled();
    });

    it('should not call Meta.updateTag() if description is undefined', () => {
      service.updateDescription(undefined as any);
      expect(metaService.updateTag).not.toHaveBeenCalled();
    });
  });

  // Tests for updateMeta() are omitted as the method is not implemented in the service.
  // If updateMeta were implemented, tests would look like:
  // describe('updateMeta()', () => {
  //   it('should update OG title and OG description meta tags', () => {
  //     const ogTitle = 'Test OG Title';
  //     const ogDescription = 'Test OG Description';
  //     service.updateMeta(ogTitle, ogDescription); // Assuming updateMeta takes these params
  //     expect(metaService.updateTag).toHaveBeenCalledWith({ property: 'og:title', content: ogTitle });
  //     expect(metaService.updateTag).toHaveBeenCalledWith({ property: 'og:description', content: ogDescription });
  //   });
  //   // ... tests for empty/null/undefined inputs for updateMeta ...
  // });
});
