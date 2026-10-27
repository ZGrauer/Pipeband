import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { SHEET_MUSIC, SheetMusic } from './sheet-music.data';
import { SheetMusicDialog } from './sheet-music-dialog.component';
import {
  EMPTY_FILTER,
  InstrumentFilter,
  SheetMusicFilter,
  downloadFile,
  filenameOf,
  isNew,
  matchesFilter,
  parseModified,
} from './sheet-music.utils';

@Component({
  selector: 'app-sheet-music',
  templateUrl: './sheet-music.component.html',
  styleUrls: ['./sheet-music.component.css'],
})
export class SheetMusicComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<SheetMusic>(SHEET_MUSIC);
  displayedColumns: string[] = ['title', 'idiom', 'composer', 'instrument', 'modified', 'actions'];

  filter: SheetMusicFilter = { ...EMPTY_FILTER };
  idioms: string[] = [...new Set(SHEET_MUSIC.map(row => row.idiom))].sort();
  newCount = SHEET_MUSIC.filter(row => isNew(row)).length;

  private readonly tuneCounts = new Map<string, number>();
  private resizeObserver?: ResizeObserver;

  constructor(public dialog: MatDialog, private host: ElementRef<HTMLElement>, private zone: NgZone) {
    SHEET_MUSIC.forEach(row => this.tuneCounts.set(row.tune, (this.tuneCounts.get(row.tune) ?? 0) + 1));

    this.dataSource.filterPredicate = (row, filterJson) => matchesFilter(row, JSON.parse(filterJson));
    this.dataSource.sortingDataAccessor = (row, column) => {
      switch (column) {
        case 'title': return row.title.toLowerCase().replace(/^the /, '');
        case 'idiom': return row.idiom.toLowerCase();
        case 'composer': return (row.composer ?? '').toLowerCase();
        case 'modified': return row.modified;
        default: return (row as any)[column];
      }
    };
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // The members page puts this table in a column that is narrower than the window,
    // so trim columns by the width available to the table rather than the window width.
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => this.zone.run(() => this.updateColumns(this.host.nativeElement.clientWidth)));
      this.resizeObserver.observe(this.host.nativeElement);
    }
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect();
  }

  updateColumns(width: number) {
    if (width === 0) {
      return; // panel not laid out yet
    }
    if (width >= 900) {
      this.displayedColumns = ['title', 'idiom', 'composer', 'instrument', 'modified', 'actions'];
    } else if (width >= 600) {
      this.displayedColumns = ['title', 'idiom', 'instrument', 'modified', 'actions'];
    } else {
      this.displayedColumns = ['title', 'instrument', 'actions'];
    }
  }

  // Columns hidden on narrow screens are shown under the title instead, and sorted via the "Sort by" menu.
  hidden(column: string): boolean {
    return !this.displayedColumns.includes(column);
  }

  sortBy(value: string) {
    const [active, direction] = value.split(':') as [string, 'asc' | 'desc'];
    this.sort.active = active;
    this.sort.direction = direction;
    this.sort.sortChange.emit({ active, direction });
  }

  applyFilter() {
    this.dataSource.filter = JSON.stringify(this.filter);
    this.dataSource.paginator?.firstPage();
  }

  setText(text: string) {
    this.filter.text = text;
    this.applyFilter();
  }

  setIdiom(idiom: string) {
    this.filter.idiom = idiom;
    this.applyFilter();
  }

  setInstrument(instrument: InstrumentFilter) {
    this.filter.instrument = instrument;
    this.applyFilter();
  }

  setNewOnly(newOnly: boolean) {
    this.filter.newOnly = newOnly;
    this.applyFilter();
  }

  showTune(row: SheetMusic) {
    this.filter = { ...EMPTY_FILTER, tune: row.tune };
    this.applyFilter();
  }

  clearFilters() {
    this.filter = { ...EMPTY_FILTER };
    this.applyFilter();
  }

  get hasFilter(): boolean {
    return JSON.stringify(this.filter) !== JSON.stringify(EMPTY_FILTER);
  }

  get tuneTitle(): string {
    return SHEET_MUSIC.find(row => row.tune === this.filter.tune)?.title ?? '';
  }

  // Number of scores sharing this tune, when more than just this one (e.g. pipes plus drums).
  relatedCount(row: SheetMusic): number {
    const count = this.tuneCounts.get(row.tune) ?? 1;
    return count > 1 ? count : 0;
  }

  isNew(row: SheetMusic): boolean {
    return isNew(row);
  }

  modifiedDate(row: SheetMusic): Date {
    return parseModified(row.modified);
  }

  view(row: SheetMusic) {
    this.dialog.open(SheetMusicDialog, {
      data: { row, audioOnly: false },
      maxWidth: '95vw',
      width: '1000px',
    });
  }

  play(row: SheetMusic) {
    this.dialog.open(SheetMusicDialog, {
      data: { row, audioOnly: true },
      maxWidth: '95vw',
    });
  }

  download(row: SheetMusic) {
    downloadFile(row.file, filenameOf(row.file));
  }
}
