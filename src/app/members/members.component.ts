import { Component, OnInit, AfterViewInit, ChangeDetectorRef, HostListener, Inject, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatAccordion} from '@angular/material/expansion';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

import { StlModelViewerModule } from 'angular-stl-model-viewer';

export interface DialogData {
  file_path: string;
}

export interface ResultElement {
  date: Date;
  highlandGames: string;
  grade: number;
  event: string;
  place: number;
  totalPoints: number;
  pipingJudge1: number;
  pipingJudge2: number;
  drummingJudge: number;
  ensembleJudge: number;
  files: object[];
}

// Data for the competition results table
const RESULT_DATA: ResultElement[] = [
  {
    date: new Date('2025-06-14 00:00:00'),
    highlandGames: 'Chicago',
    grade: 4,
    event: 'Medley',
    place: 2,
    totalPoints: 12,
    pipingJudge1: 2,
    pipingJudge2: 2,
    drummingJudge: 3,
    ensembleJudge: 5,
    files: [ 
      {
        path: '../../assets/score-sheets/2025_Chicago_G4_Results.jpg',
        name: 'Band Results',
      },
      {
        path: '../../assets/score-sheets/2025_Chicago_G4_Medley_KC_St_Andrew_PC_Drumming_Judge.mp3',
        name: 'Drumming MP3',
      },
      {
        path: '../../assets/score-sheets/2025_Chicago_G4_Medley_KC_St_Andrew_PC_Ensemble_Judge.mp3',
        name: 'Ensemble MP3',
      },
      {
        path: '../../assets/score-sheets/2025_Chicago_G4_Medley_KC_St_Andrew_PC_Piping_Judge_1.mp3',
        name: 'Piping 1 MP3',
      },
      {
        path: '../../assets/score-sheets/2025_Chicago_G4_Medley_KC_St_Andrew_PC_Piping_Judge_2.mp3',
        name: 'Piping 2 MP3',
      },
     ],
  },{
    date: new Date('2024-09-14 00:00:00'),
    highlandGames: 'Tulsa',
    grade: 5,
    event: 'QMM',
    place: 1,
    totalPoints: 5,
    pipingJudge1: 1,
    pipingJudge2: 1,
    drummingJudge: 2,
    ensembleJudge: 1,
    files: [ 
      {
        path: '../../assets/score-sheets/2024_Tulsa_Games_Results.pdf',
        name: 'PDF',
      },
     ],
  },{
    date: new Date('2024-07-13 00:00:00'),
    highlandGames: 'Minnesota',
    grade: 5,
    event: 'QMM',
    place: 1,
    totalPoints: 5,
    pipingJudge1: 1,
    pipingJudge2: 1,
    drummingJudge: 2,
    ensembleJudge: 1,
    files: [
      {
        path: '../../assets/score-sheets/2024_Minnesota_G5_QMM_KC_St_Andrew_Drumming_Judge_1.mp3',
        name: 'Drumming MP3',
      },
      {
        path: '../../assets/score-sheets/2024_Minnesota_G5_QMM_KC_St_Andrew_Ensemble_Judge_1.mp3',
        name: 'Ensemble MP3',
      },
      {
        path: '../../assets/score-sheets/2024_Minnesota_G5_QMM_KC_St_Andrew_Piping_Judge_1.mp3',
        name: 'Piping 1 MP3',
      },
      {
        path: '../../assets/score-sheets/2024_Minnesota_G5_QMM_KC_St_Andrew_Piping_Judge_2.mp3',
        name: 'Piping 2 MP3',
      },
    ],
  },{
    date: new Date('2024-06-15 00:00:00'),
    highlandGames: 'Chicago',
    grade: 5,
    event: 'QMM',
    place: 1,
    totalPoints: 11,
    pipingJudge1: 1,
    pipingJudge2: 1,
    drummingJudge: 6,
    ensembleJudge: 3,
    files: [
      {
        path: '../../assets/score-sheets/2024_Chicago_G5_QMM_KC_St_Andrew_PC_Drumming_Judge.mp3',
        name: 'Drumming MP3',
      },
      {
        path: '../../assets/score-sheets/2024_Chicago_G5_QMM_KC_St_Andrew_PC_Ensemble_Judge.mp3',
        name: 'Ensemble MP3',
      },
      {
        path: '../../assets/score-sheets/2024_Chicago_G5_QMM_KC_St_Andrew_PC_Piping_Judge_1.mp3',
        name: 'Piping 1 MP3',
      },
      {
        path: '../../assets/score-sheets/2024_Chicago_G5_QMM_KC_St_Andrew_PC_Piping_Judge_2.mp3',
        name: 'Piping 2 MP3',
      },
    ],
  },{
    date: new Date('2024-05-11 00:00:00'),
    highlandGames: 'St Louis',
    grade: 5,
    event: 'QMM',
    place: 1,
    totalPoints: 5,
    pipingJudge1: 2,
    pipingJudge2: 1,
    drummingJudge: 1,
    ensembleJudge: 1,
    files: [
      {
        path: '../../assets/score-sheets/2024_St_Louis_G5_QMM_KC_St_Andrew_PD_Drumming_Judge.mp3',
        name: 'Drumming MP3',
      },
      {
        path: '../../assets/score-sheets/2024_St_Louis_G5_QMM_KC_St_Andrew_PD_Ensemble_Judge.mp3',
        name: 'Ensemble MP3',
      },
      {
        path: '../../assets/score-sheets/2024_St_Louis_G5_QMM_KC_St_Andrew_PD_Piping_Judge_1.mp3',
        name: 'Piping 1 MP3',
      },
      {
        path: '../../assets/score-sheets/2024_St_Louis_G5_QMM_KC_St_Andrew_PD_Piping_Judge_2.mp3',
        name: 'Piping 2 MP3',
      },
    ],
  },
  {
    date: new Date('2023-09-16 00:00:00'),
    highlandGames: 'Tulsa',
    grade: 5,
    event: 'QMM',
    place: 2,
    totalPoints: 7,
    pipingJudge1: 3,
    pipingJudge2: 2,
    drummingJudge: 1,
    ensembleJudge: 1,
    files: [
      {
        path: '../../assets/score-sheets/2023_Tulsa_Games_Results.pdf',
        name: 'PDF',
      },
    ],
  },
  {
    date: new Date('2023-06-17 00:00:00'),
    highlandGames: 'Chicago',
    grade: 5,
    event: 'QMM',
    place: 6,
    totalPoints: 25,
    pipingJudge1: 9,
    pipingJudge2: 9,
    drummingJudge: 3,
    ensembleJudge: 4,
    files: [
      {
        path: '../../assets/score-sheets/2023_Chicago_Games_Results.pdf',
        name: 'PDF',
      },
    ],
  },
];

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements AfterViewInit, OnInit {
  dataSource = new MatTableDataSource<ResultElement>(RESULT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  bandConstitutionPdfSrc = '../../assets/Kansas_City_St_Andrew_Pipe_Band_CONSTITUTION.pdf';
  bandConstitutionPdfFilename = 'Kansas_City_St_Andrew_Pipe_Band_CONSTITUTION.pdf';

  drumMajorPdfSrc = '../../assets/drum_major_manual.pdf';
  drumMajorPdfFilename = 'drum_major_manual.pdf';

  displayedColumns: string[] = ['date', 'highlandGames', 'grade', 'event', 'place', 'totalPoints', 'pdfPath'];
  //dataSource = RESULT_DATA;

  panel = 0;

  public screenWidth: any;

  constructor(private _authService: AuthService, private router: Router, private cdref: ChangeDetectorRef, public dialog: MatDialog) {}

  ngOnInit() {
    this.isLoggedIn();
  }

  ngAfterViewInit() {
    this.onWindowResize();
    this.cdref.detectChanges();
    this.dataSource.paginator = this.paginator;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth = window.innerWidth;

    // Adjust the # of columns based on CSS and screen width.
    // This ensures all data is clearly displayed with the available screen size
    if ( this.screenWidth > 2050 || (this.screenWidth > 1250 && this.screenWidth < 1500) ) {
      this.displayedColumns = ['date', 'highlandGames', 'grade', 'event', 'place', 'pipingJudge1', 'pipingJudge2', 'drummingJudge', 'ensembleJudge', 'totalPoints', 'pdfPath'];
    } else if ( this.screenWidth < 1250 && this.screenWidth > 750 ) {
      this.displayedColumns = ['date', 'highlandGames', 'grade', 'event', 'place', 'totalPoints', 'pdfPath']
    } else if ( this.screenWidth < 750 && this.screenWidth > 550 || (this.screenWidth > 1500 && this.screenWidth < 2050) ) {
      this.displayedColumns = ['date', 'highlandGames', 'event', 'place', 'pdfPath'];
    } else {
      this.displayedColumns = ['date', 'highlandGames', 'place', 'pdfPath'];
    }
  }

  isLoggedIn() {
    if (!this._authService.loggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  downloadBandConstitutionPDF() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', this.bandConstitutionPdfSrc);
    link.setAttribute('download', this.bandConstitutionPdfFilename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  downloadDrumMajorPDF() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', this.drumMajorPdfSrc);
    link.setAttribute('download', this.drumMajorPdfFilename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  openPreviewStlDialog(filePath: string): void {
    const dialogRef = this.dialog.open(StlDialog, {
      data: {file_path: filePath},
    })
  }

  setPanel(index: number) {
    this.panel = index;
  }
}

@Component({
  selector: 'stl-dialog',
  templateUrl: 'stl-dialog.html',
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