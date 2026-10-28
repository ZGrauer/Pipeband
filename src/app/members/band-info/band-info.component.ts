import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DocumentDialog } from '../shared/document-dialog.component';
import { downloadFile, filenameOf } from '../shared/download';
import { BandDocument, DOCUMENTS, OFFICERS } from './band-info.data';

@Component({
  selector: 'app-band-info',
  templateUrl: './band-info.component.html',
  styleUrls: ['./band-info.component.css'],
})
export class BandInfoComponent {
  officers = OFFICERS;
  documents = DOCUMENTS;

  constructor(public dialog: MatDialog) {}

  view(doc: BandDocument) {
    this.dialog.open(DocumentDialog, {
      data: { title: doc.title, subtitle: doc.description, file: doc.file },
      maxWidth: '95vw',
      width: '1000px',
    });
  }

  download(doc: BandDocument) {
    downloadFile(doc.file, filenameOf(doc.file));
  }
}
