import { Component, Inject } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StlModelViewerModule } from 'angular-stl-model-viewer';

export interface DialogData {
  file_path: string;
}

@Component({
  selector: 'stl-dialog',
  templateUrl: 'stl-dialog.component.html',
  standalone: true,
  imports: [MatIconModule, MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, StlModelViewerModule],
})
export class StlDialog {
  constructor(
    public dialogRef: MatDialogRef<StlDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
