import { Component, OnInit } from '@angular/core';

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
];

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent {
  bandConstitutionPdfSrc = '../../assets/Kansas_City_St_Andrew_Pipe_Band_CONSTITUTION.pdf';
  bandConstitutionPdfFilename = 'Kansas_City_St_Andrew_Pipe_Band_CONSTITUTION.pdf';

  drumMajorPdfSrc = '../../assets/drum_major_manual.pdf';
  drumMajorPdfFilename = 'drum_major_manual.pdf';

  displayedColumns: string[] = ['date', 'highlandGames', 'grade', 'event', 'place', 'totalPoints', 'pdfPath'];
  dataSource = RESULT_DATA;

  constructor(private _authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.isLoggedIn();
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
