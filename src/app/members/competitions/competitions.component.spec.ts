import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';

import { CompetitionsComponent } from './competitions.component';
import { RESULT_DATA } from './competitions.data';

describe('CompetitionsComponent', () => {
  let component: CompetitionsComponent;
  let fixture: ComponentFixture<CompetitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompetitionsComponent],
      imports: [NoopAnimationsModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CompetitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with paginator and sort attached', () => {
    expect(component).toBeTruthy();
    expect(component.dataSource.paginator).toBe(component.paginator);
    expect(component.dataSource.sort).toBe(component.sort);
  });

  it('should expand and collapse a result', () => {
    const row = RESULT_DATA[0];
    component.toggle(row);
    expect(component.expanded).toBe(row);
    component.toggle(row);
    expect(component.expanded).toBeNull();
  });

  it('should show judge scores and files when a row is expanded', () => {
    const firstRow: HTMLElement = fixture.nativeElement.querySelector('tr.result-row');
    firstRow.click();
    fixture.detectChanges();
    const detail: HTMLElement = fixture.nativeElement.querySelector('.detail');
    expect(detail).toBeTruthy();
    expect(detail.textContent).toContain('Piping 1');
    expect(detail.querySelectorAll('.files a').length).toBe(component.expanded!.files.length);
  });

  it('should format places as ordinals', () => {
    expect([1, 2, 3, 4, 11, 12, 13, 21].map(p => component.ordinal(p)))
      .toEqual(['1st', '2nd', '3rd', '4th', '11th', '12th', '13th', '21st']);
  });
});
