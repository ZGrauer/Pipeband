import { Injectable } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { startOfDay } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  getEvents(): CalendarEvent[] {
    return [
      {
        start: new Date('2025-09-01'),
        title: 'Labor Day Parade',
      },
      {
        start: new Date('2025-10-31'),
        title: 'Halloween Performance',
      },
      {
        start: new Date('2025-11-27'),
        title: 'Thanksgiving Day Parade',
      },
    ];
  }

  constructor() { }
}
