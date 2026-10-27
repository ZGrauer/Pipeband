import { SheetMusic } from './sheet-music.data';

export const NEW_WINDOW_DAYS = 30;
const DAY_MS = 24 * 60 * 60 * 1000;

export type InstrumentFilter = 'All' | SheetMusic['instrument'];

export interface SheetMusicFilter {
  text: string;
  idiom: string;
  instrument: InstrumentFilter;
  newOnly: boolean;
  tune: string;
}

export const EMPTY_FILTER: SheetMusicFilter = {
  text: '',
  idiom: '',
  instrument: 'All',
  newOnly: false,
  tune: '',
};

// Parses a YYYY-MM-DD string as a local date so the "new" cutoff doesn't shift with time zone.
export function parseModified(modified: string): Date {
  return new Date(modified + 'T00:00:00');
}

// Compares whole calendar days so the result doesn't depend on the time of day.
export function isNew(row: SheetMusic, now: Date = new Date()): boolean {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const ageDays = Math.round((today.getTime() - parseModified(row.modified).getTime()) / DAY_MS);
  return ageDays <= NEW_WINDOW_DAYS;
}

export function matchesFilter(row: SheetMusic, filter: SheetMusicFilter, now: Date = new Date()): boolean {
  if (filter.tune && row.tune !== filter.tune) {
    return false;
  }
  if (filter.instrument !== 'All' && row.instrument !== filter.instrument) {
    return false;
  }
  if (filter.idiom && row.idiom !== filter.idiom) {
    return false;
  }
  if (filter.newOnly && !isNew(row, now)) {
    return false;
  }
  const text = filter.text.trim().toLowerCase();
  if (text) {
    const haystack = [row.title, row.composer, row.idiom, row.part, row.notes].join(' ').toLowerCase();
    return haystack.includes(text);
  }
  return true;
}

export function downloadFile(path: string, filename: string): void {
  const link = document.createElement('a');
  link.setAttribute('href', path);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function filenameOf(path: string): string {
  return path.substring(path.lastIndexOf('/') + 1);
}
