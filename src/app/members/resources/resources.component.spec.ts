import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ResourcesComponent } from './resources.component';
import { ARTICLES, MODEL_FILES, VIDEO_GROUPS } from './resources.data';
import { StlDialog } from '../shared/stl-dialog.component';

describe('ResourcesComponent', () => {
  let component: ResourcesComponent;
  let fixture: ComponentFixture<ResourcesComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResourcesComponent],
      imports: [NoopAnimationsModule, MatDialogModule, MatListModule, MatIconModule, MatButtonModule, MatTooltipModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ResourcesComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should show a thumbnail card linking to YouTube for every video', () => {
    const total = VIDEO_GROUPS.reduce((n, g) => n + g.videos.length, 0);
    const cards = nativeElement.querySelectorAll('a.video-card');
    expect(cards.length).toBe(total);
    expect(cards[0].getAttribute('href')).toBe('https://www.youtube.com/watch?v=' + VIDEO_GROUPS[0].videos[0].id);
    expect(cards[0].querySelector('img')?.getAttribute('src')).toContain(VIDEO_GROUPS[0].videos[0].id);
  });

  it('should show two articles until "Show more" is clicked', () => {
    expect(component.articles.length).toBe(2);
    const more = Array.from(nativeElement.querySelectorAll('button')).find(b => b.textContent?.includes('more')) as HTMLButtonElement;
    more.click();
    fixture.detectChanges();
    expect(component.articles.length).toBe(ARTICLES.length);
    expect(component.hiddenArticleCount).toBe(0);
  });

  it('preview should open the STL dialog', () => {
    const dialog = TestBed.inject(MatDialog);
    spyOn(dialog, 'open');
    component.preview(MODEL_FILES[0]);
    expect(dialog.open).toHaveBeenCalledWith(StlDialog, { data: { file_path: MODEL_FILES[0].preview } });
  });
});
