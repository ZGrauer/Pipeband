import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { JoinComponent } from './join.component';

describe('JoinComponent', () => {
  let fixture: ComponentFixture<JoinComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JoinComponent],
      imports: [RouterTestingModule, MatButtonModule, MatCardModule, MatIconModule]
    }).compileComponents();

    fixture = TestBed.createComponent(JoinComponent);
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should show the practice time and place', () => {
    const practice = element.querySelector('.practice')?.textContent;
    expect(practice).toContain('Tuesday nights, 7:00 to 9:00 PM');
    expect(practice).toContain('6401 Wornall Terrace');
  });

  it('should link to the piping and drumming contacts', () => {
    expect(element.querySelector('a[href^="mailto:BagpipeLessons@kcpipeband.org"]')).toBeTruthy();
    expect(element.querySelector('a[href^="mailto:DrumLessons@kcpipeband.org"]')).toBeTruthy();
  });
});
