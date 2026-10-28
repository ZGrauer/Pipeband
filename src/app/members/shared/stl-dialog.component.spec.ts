import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { StlDialog } from './stl-dialog.component';

describe('StlDialog', () => {
  let component: StlDialog;
  let fixture: ComponentFixture<StlDialog>;
  const dialogRef = { close: jasmine.createSpy('close') };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, StlDialog],
      providers: [
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { file_path: null } },
      ],
    });
    // Leave out the 3D viewer so the test doesn't try to load a model file
    TestBed.overrideComponent(StlDialog, {
      set: { imports: [MatIconModule, MatDialogModule, MatButtonModule], schemas: [NO_ERRORS_SCHEMA] },
    });
    await TestBed.compileComponents();

    fixture = TestBed.createComponent(StlDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onNoClick should close the dialog', () => {
    component.onNoClick();
    expect(dialogRef.close).toHaveBeenCalled();
  });
});
