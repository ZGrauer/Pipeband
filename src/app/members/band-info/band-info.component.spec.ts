import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { BandInfoComponent } from './band-info.component';
import { DOCUMENTS, OFFICERS } from './band-info.data';
import { DocumentDialog } from '../shared/document-dialog.component';

describe('BandInfoComponent', () => {
  let component: BandInfoComponent;
  let fixture: ComponentFixture<BandInfoComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BandInfoComponent],
      imports: [NoopAnimationsModule, MatDialogModule, MatListModule, MatIconModule, MatButtonModule, MatTooltipModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BandInfoComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should list every officer with a mailto link', () => {
    const links = Array.from(nativeElement.querySelectorAll('a[href^="mailto:"]')).map(a => a.getAttribute('href'));
    expect(links).toEqual(OFFICERS.map(o => 'mailto:' + o.email));
  });

  it('should only offer View for PDFs', () => {
    const viewButtons = nativeElement.querySelectorAll('button[aria-label^="View "]');
    expect(viewButtons.length).toBe(DOCUMENTS.filter(d => d.viewable).length);
  });

  it('view should open the document dialog with the file', () => {
    const dialog = TestBed.inject(MatDialog);
    spyOn(dialog, 'open');
    const doc = DOCUMENTS[0];
    component.view(doc);
    expect(dialog.open).toHaveBeenCalledWith(DocumentDialog, jasmine.objectContaining({
      data: { title: doc.title, subtitle: doc.description, file: doc.file },
    }));
  });

  it('download should trigger a file download link', () => {
    const link = jasmine.createSpyObj('HTMLAnchorElement', ['setAttribute', 'click', 'remove']);
    spyOn(document, 'createElement').and.returnValue(link);
    spyOn(document.body, 'appendChild').and.stub();
    const doc = DOCUMENTS[1];
    component.download(doc);
    expect(link.setAttribute).toHaveBeenCalledWith('href', doc.file);
    expect(link.click).toHaveBeenCalled();
    expect(link.remove).toHaveBeenCalled();
  });
});
