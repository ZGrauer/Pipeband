import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { downloadFile, filenameOf } from './download';

// Shared viewer for sheet music and band documents: a PDF, an optional recording, or both.
export interface DocumentDialogData {
  title: string;
  subtitle?: string;
  notes?: string;
  file?: string;
  audio?: string;
}

@Component({
  selector: 'document-dialog',
  templateUrl: 'document-dialog.component.html',
  styleUrls: ['document-dialog.component.css'],
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, PdfViewerModule],
})
export class DocumentDialog {
  constructor(
    public dialogRef: MatDialogRef<DocumentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DocumentDialogData,
  ) {}

  // The PDF viewer resolves relative paths against the page URL (e.g. /members/info/),
  // so resolve against the app's base href instead.
  get fileUrl(): string {
    return this.data.file ? new URL(this.data.file, document.baseURI).href : '';
  }

  download(): void {
    if (this.data.file) {
      downloadFile(this.data.file, filenameOf(this.data.file));
    }
  }

  downloadAudio(): void {
    if (this.data.audio) {
      downloadFile(this.data.audio, filenameOf(this.data.audio));
    }
  }

  // The browser's built-in PDF viewer handles printing.
  print(): void {
    if (this.data.file) {
      window.open(this.data.file, '_blank', 'noopener');
    }
  }
}
