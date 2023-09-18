import { Component, OnInit, AfterViewInit, ChangeDetectorRef, HostListener  } from '@angular/core';

import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

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
  pdfPath: string;
}

// Data for the competition results table
const RESULT_DATA: ResultElement[] = [
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
    pdfPath: '../../assets/score-sheets/2023_Chicago_Games_Results.pdf',
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
    pdfPath: '../../assets/score-sheets/2023_Tulsa_Games_Results.pdf',
  },
];

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements AfterViewInit, OnInit {
  bandConstitutionPdfSrc = '../../assets/Kansas_City_St_Andrew_Pipe_Band_CONSTITUTION.pdf';
  bandConstitutionPdfFilename = 'Kansas_City_St_Andrew_Pipe_Band_CONSTITUTION.pdf';

  drumMajorPdfSrc = '../../assets/drum_major_manual.pdf';
  drumMajorPdfFilename = 'drum_major_manual.pdf';

  displayedColumns: string[] = ['date', 'highlandGames', 'grade', 'event', 'place', 'totalPoints', 'pdfPath'];
  dataSource = RESULT_DATA;

  public screenWidth: any;

  constructor(private _authService: AuthService, private router: Router, private cdref: ChangeDetectorRef) {}

  ngOnInit() {
    this.isLoggedIn();
  }

  ngAfterViewInit() {
    this.onWindowResize();
    this.cdref.detectChanges();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth = window.innerWidth;

    // Adjust the # of columns based on CSS and screen width.
    // This ensures all data is clearly displayed with the available screen size
    if ( this.screenWidth > 2050 || (this.screenWidth > 1250 && this.screenWidth < 1500) ) {
      this.displayedColumns = ['date', 'highlandGames', 'grade', 'event', 'place', 'pipingJudge1', 'pipingJudge2', 'drummingJudge', 'totalPoints', 'pdfPath'];
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
}
