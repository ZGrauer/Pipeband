import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Meta } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let fixture: ComponentFixture<NotFoundComponent>;
  let meta: Meta;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NotFoundComponent, RouterTestingModule],
    });
    fixture = TestBed.createComponent(NotFoundComponent);
    meta = TestBed.inject(Meta);
    fixture.detectChanges();
  });

  it('should show a message and links back into the site', () => {
    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelector('h2')?.textContent).toContain('Page not found');
    expect(element.querySelectorAll('a').length).toBe(4);
  });

  it('should ask crawlers not to index the page, then clear that on leaving', () => {
    expect(meta.getTag('name="robots"')?.content).toBe('noindex');
    fixture.destroy();
    expect(meta.getTag('name="robots"')).toBeNull();
  });
});
