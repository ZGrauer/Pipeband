import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MerchComponent } from './merch.component';

describe('MerchComponent', () => {
  let component: MerchComponent;
  let fixture: ComponentFixture<MerchComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MerchComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MerchComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the "Coming Soon" heading', () => {
    const headingElement = nativeElement.querySelector('h2');
    expect(headingElement).withContext('H2 heading should exist').toBeTruthy();
    // Use toContain for text matching to be less brittle to surrounding whitespace.
    expect(headingElement?.textContent).withContext('Heading text should contain "Coming Soon"').toContain('Coming Soon');
  });
});
