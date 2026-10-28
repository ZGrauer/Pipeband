import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { RESULT_DATA, ResultElement } from './competitions.data';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css'],
})
export class CompetitionsComponent implements OnInit {
  // static so they can be attached before the first render (avoids NG0100 in dev mode)
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource = new MatTableDataSource<ResultElement>(RESULT_DATA);
  displayedColumns: string[] = ['date', 'highlandGames', 'grade', 'event', 'place', 'expand'];
  expanded: ResultElement | null = null;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  toggle(row: ResultElement) {
    this.expanded = this.expanded === row ? null : row;
  }

  ordinal(place: number): string {
    const suffix = ['th', 'st', 'nd', 'rd'];
    const v = place % 100;
    return place + (suffix[(v - 20) % 10] || suffix[v] || suffix[0]);
  }
}
