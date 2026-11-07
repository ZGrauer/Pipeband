import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';

export const BOOKING_EMAIL = 'BusinessManager@kcpipeband.org';

export interface GroupOption {
  name: string;
  size: string;
  bestFor: string;
  note?: string;
}

// Today's date as YYYY-MM-DD in local time, matching what <input type="date"> produces
function localToday(): string {
  return new Date().toLocaleDateString('en-CA');
}

function notInPast(control: AbstractControl): ValidationErrors | null {
  return control.value && control.value < localToday() ? { past: true } : null;
}

@Component({
  selector: 'app-hire',
  templateUrl: './hire.component.html',
  styleUrls: ['./hire.component.css']
})
export class HireComponent {
  @ViewChild('bookingRequest') bookingRequest?: ElementRef<HTMLElement>;

  private readonly fb = inject(FormBuilder);

  readonly bookingEmail = BOOKING_EMAIL;
  readonly today = localToday();
  readonly detailsMaxLength = 1000;

  readonly groupOptions: GroupOption[] = [
    {
      name: 'Solo Piper',
      size: '1 piper',
      bestFor: 'Weddings, funerals and memorials, birthdays, anniversaries, dinner parties and dedications.',
      note: 'Ask about adding a drummer for another powerful dimension to the music.'
    },
    {
      name: 'Ensemble',
      size: '2 to 4 pipers, or 2 to 3 pipers and a drummer',
      bestFor: 'Smaller events, especially where space is tight: business lunches, wedding receptions, golf tournaments and parties.'
    },
    {
      name: 'Mini Band',
      size: '4 pipers and 2 drummers',
      bestFor: 'Medium events that want the feel of a larger band where space or volume rules out the Full Band.'
    },
    {
      name: 'Full Band',
      size: '8 to 10 pipers and 3 to 4 drummers',
      bestFor: 'Commencements, concerts, dinners, military events, parades and corporate events, or a once-in-a-lifetime wedding.',
      note: 'Please allow at least one to two months to arrange.*'
    }
  ];

  readonly eventTypes = [
    'Wedding',
    'Funeral or memorial',
    'Party or celebration',
    'Corporate event',
    'Parade',
    'Concert or festival',
    'Military or civic ceremony',
    'Other'
  ];

  readonly groupChoices = [...this.groupOptions.map(option => option.name), 'Not sure yet'];

  readonly bookingForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    eventType: ['', Validators.required],
    group: ['Not sure yet'],
    date: ['', [Validators.required, notInPast]],
    time: [''],
    location: ['', Validators.required],
    details: ['', Validators.maxLength(this.detailsMaxLength)]
  });

  emailOpened = false;

  scrollToForm(): void {
    this.bookingRequest?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  submit(): void {
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }
    this.openEmail(this.buildMailto());
    this.emailOpened = true;
  }

  buildMailto(): string {
    const request = this.bookingForm.getRawValue();
    const date = formatDate(request.date);
    const lines = [
      'Hello,',
      '',
      "I'd like to request a booking with the Kansas City St. Andrew Pipes & Drums.",
      '',
      `Name: ${request.name}`,
      `Email: ${request.email}`,
      `Phone: ${request.phone || 'Not given'}`,
      `Event type: ${request.eventType}`,
      `Date: ${date}`,
      `Start time: ${formatTime(request.time) || 'Not given'}`,
      `Location: ${request.location}`,
      `Group: ${request.group}`
    ];
    if (request.details.trim()) {
      lines.push('', 'Details:', request.details.trim());
    }
    const subject = `Booking request: ${request.eventType}, ${date}`;
    return `mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\r\n'))}`;
  }

  // Separate so tests can check the link without leaving the page
  openEmail(url: string): void {
    window.location.href = url;
  }
}

// "2027-06-12" -> "Saturday, June 12, 2027"
function formatDate(value: string): string {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
}

// "14:30" -> "2:30 PM"
function formatTime(value: string): string {
  if (!value) {
    return '';
  }
  const [hours, minutes] = value.split(':').map(Number);
  const suffix = hours < 12 ? 'AM' : 'PM';
  return `${hours % 12 || 12}:${String(minutes).padStart(2, '0')} ${suffix}`;
}
