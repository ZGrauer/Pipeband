import { TestBed } from '@angular/core/testing';

import { EventService } from './event.service';

describe('EventService', () => {
  let service: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of events', () => {
    const events = service.getEvents();
    expect(events.length).toBe(3);
    expect(events[0].title).toBe('Labor Day Parade');
  });
});
