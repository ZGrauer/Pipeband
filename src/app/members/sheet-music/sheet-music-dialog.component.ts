import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { SheetMusic } from './sheet-music.data';
import { downloadFile, filenameOf } from './sheet-music.utils';

export interface SheetMusicDialogData {
  row: SheetMusic;
  audioOnly: boolean;
}

@Component({
  selector: 'sheet-music-dialog',
  templateUrl: 'sheet-music-dialog.component.html',
  styleUrls: ['sheet-music-dialog.component.css'],
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, PdfViewerModule],
})
export class SheetMusicDialog {
  constructor(
    public dialogRef: MatDialogRef<SheetMusicDialog>,
    @Inject(MAT_DIALOG_DATA) public data: SheetMusicDialogData,
  ) {}

  get subtitle(): string {
    const row = this.data.row;
    return [row.idiom, row.part, row.composer].filter(Boolean).join(' · ');
  }

  download(): void {
    downloadFile(this.data.row.file, filenameOf(this.data.row.file));
  }

  downloadAudio(): void {
    if (this.data.row.audio) {
      downloadFile(this.data.row.audio, filenameOf(this.data.row.audio));
    }
  }

  // The browser's built-in PDF viewer handles printing.
  print(): void {
    window.open(this.data.row.file, '_blank', 'noopener');
  }
}
