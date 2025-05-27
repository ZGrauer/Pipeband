import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list'; // For mat-list, mat-list-item, matSubheader
import { MusicComponent } from './music.component';
import { By } from '@angular/platform-browser';

describe('MusicComponent', () => {
  let component: MusicComponent;
  let fixture: ComponentFixture<MusicComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MusicComponent],
      imports: [MatListModule]
    }).compileComponents();

    fixture = TestBed.createComponent(MusicComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the main playlist heading', () => {
    const headingElement = nativeElement.querySelector('.main-content h2');
    expect(headingElement).withContext('Main H2 heading should exist').toBeTruthy();
    expect(headingElement?.textContent).toContain('Kansas City St. Andrew Pipes and Drums Playlist');
  });

  describe('Competition Sets Section', () => {
    let competitionSetsDiv: HTMLElement | null;

    beforeEach(() => {
      // Assuming the first .main-content div holds Competition Sets
      competitionSetsDiv = nativeElement.querySelector('.container > .main-content'); // More specific to avoid nested .main-content if any
    });

    it('should display the "Competition Sets" subheading', () => {
      expect(competitionSetsDiv).withContext('.main-content div for competition sets should exist').toBeTruthy();
      const subheadingElement = competitionSetsDiv?.querySelector('h3');
      expect(subheadingElement).withContext('H3 "Competition Sets" subheading should exist').toBeTruthy();
      expect(subheadingElement?.textContent).toContain('Competition Sets');
    });

    it('should display the "Quick March Medley" subheader', () => {
      expect(competitionSetsDiv).withContext('.main-content div for competition sets should exist').toBeTruthy();
      const qmmHeader = Array.from(competitionSetsDiv!.querySelectorAll('h4[matSubheader]'))
                             .find(h => h.textContent?.includes('Quick March Medley'));
      expect(qmmHeader).withContext('H4 "Quick March Medley" subheader should exist').toBeTruthy();
    });

    it('should list tunes under "Quick March Medley"', () => {
      expect(competitionSetsDiv).withContext('.main-content div for competition sets should exist').toBeTruthy();
      // Find the mat-list associated with "Quick March Medley"
      // This assumes the h4 is a sibling before the mat-list or a direct child of a common parent.
      // A more robust way would be to ensure the H4 and its list are within a dedicated parent div.
      // For now, query all list items within this section and check.
      const listItems = competitionSetsDiv!.querySelectorAll('mat-list mat-list-item'); 
      const tunes = Array.from(listItems).map(item => item.textContent?.trim());
      expect(tunes).toContain('Kilworth Hills');
      expect(tunes).toContain('Remembering Doctor Wallace');
      expect(tunes).toContain('Killiecrankie');
      expect(tunes).toContain('Jimmy Findlater');
    });
  });

  describe('Performance Sets Section', () => {
    let performanceLeftDiv: HTMLElement | null;
    let performanceRightDiv: HTMLElement | null;

    beforeEach(() => {
        performanceLeftDiv = nativeElement.querySelector('.main-content-left');
        performanceRightDiv = nativeElement.querySelector('.main-content-right');
    });
    
    it('should display the "Performance Sets" subheading', () => {
      expect(performanceLeftDiv).withContext('.main-content-left div should exist').toBeTruthy();
      const subheadingElement = performanceLeftDiv?.querySelector('h3');
      expect(subheadingElement).withContext('H3 "Performance Sets" subheading should exist').toBeTruthy();
      expect(subheadingElement?.textContent).toContain('Performance Sets');
    });

    it('should display the "2/4 Marches" subheader and list tunes', () => {
      expect(performanceLeftDiv).withContext('.main-content-left div should exist').toBeTruthy();
      const twoFourHeader = Array.from(performanceLeftDiv!.querySelectorAll('h4[matSubheader]'))
                                .find(h => h.textContent?.includes('2/4 Marches'));
      expect(twoFourHeader).withContext('H4 "2/4 Marches" subheader should exist').toBeTruthy();
      
      // Find tunes specifically after this header, before the next divider/header in its list
      let currentElement = twoFourHeader?.nextElementSibling; // Should be the mat-list or list items
      let foundTunes: (string | null | undefined)[] = [];
      while(currentElement && currentElement.tagName === 'MAT-LIST-ITEM') {
        foundTunes.push(currentElement.textContent?.trim());
        currentElement = currentElement.nextElementSibling;
      }
      // This specific selection logic is a bit complex for a simple query.
      // A simpler check: query all items in the list containing this header.
      const listParent = twoFourHeader?.closest('mat-list');
      if (listParent) {
         const listItems = listParent.querySelectorAll('mat-list-item');
         const tunes = Array.from(listItems).map(item => item.textContent?.trim());
         expect(tunes).toContain('Highland Laddie');
         expect(tunes).toContain('Black Bear');
      } else {
        // Fallback or fail if structure is not as expected
        const allListItemsInLeft = performanceLeftDiv!.querySelectorAll('mat-list-item');
        const tunes = Array.from(allListItemsInLeft).map(item => item.textContent?.trim());
        expect(tunes).toContain('Highland Laddie');
        expect(tunes).toContain('Black Bear');
      }
    });
    
    it('should display the "Slow Airs" subheader and list tunes', () => {
      expect(performanceRightDiv).withContext('.main-content-right div should exist').toBeTruthy();
      const slowAirsHeader = Array.from(performanceRightDiv!.querySelectorAll('h4[matSubheader]'))
                                .find(h => h.textContent?.includes('Slow Airs'));
      expect(slowAirsHeader).withContext('H4 "Slow Airs" subheader should exist').toBeTruthy();

      const listParent = slowAirsHeader?.closest('mat-list');
      if (listParent) {
        const listItems = listParent.querySelectorAll('mat-list-item');
        const tunes = Array.from(listItems).map(item => item.textContent?.trim());
        expect(tunes).toContain('Amazing Grace');
        expect(tunes).toContain('Skye Boat Song');
      } else {
        const allListItemsInRight = performanceRightDiv!.querySelectorAll('mat-list-item');
        const tunes = Array.from(allListItemsInRight).map(item => item.textContent?.trim());
        expect(tunes).toContain('Amazing Grace');
        expect(tunes).toContain('Skye Boat Song');
      }
    });

    it('should display the "Jigs" subheader and list tunes', () => {
      expect(performanceRightDiv).withContext('.main-content-right div should exist').toBeTruthy();
      const jigsHeader = Array.from(performanceRightDiv!.querySelectorAll('h4[matSubheader]'))
                                .find(h => h.textContent?.includes('Jigs'));
      expect(jigsHeader).withContext('H4 "Jigs" subheader should exist').toBeTruthy();

      const listParent = jigsHeader?.closest('mat-list');
      if(listParent) {
        const listItems = listParent.querySelectorAll('mat-list-item');
        const tunes = Array.from(listItems).map(item => item.textContent?.trim());
        expect(tunes).toContain('Scarce O’ Tatties');
        expect(tunes).toContain('Jig of Slurs');
      } else {
        const allListItemsInRight = performanceRightDiv!.querySelectorAll('mat-list-item');
        const tunes = Array.from(allListItemsInRight).map(item => item.textContent?.trim());
        expect(tunes).toContain('Scarce O’ Tatties');
        expect(tunes).toContain('Jig of Slurs');
      }
    });
  });
});
