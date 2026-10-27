import { SheetMusic, SHEET_MUSIC } from './sheet-music.data';
import { EMPTY_FILTER, SheetMusicFilter, isNew, matchesFilter, parseModified } from './sheet-music.utils';

describe('sheet music utils', () => {
  const now = new Date('2026-10-27T12:00:00');

  const row = (overrides: Partial<SheetMusic> = {}): SheetMusic => ({
    tune: 'test-tune',
    title: 'Test Tune',
    idiom: 'March',
    composer: 'Traditional',
    instrument: 'Pipes',
    modified: '2026-10-01',
    file: 'assets/sheet-music/pipes/test-tune.pdf',
    ...overrides,
  });

  const filter = (overrides: Partial<SheetMusicFilter> = {}): SheetMusicFilter => ({ ...EMPTY_FILTER, ...overrides });

  describe('isNew', () => {
    it('is true for a score modified today', () => {
      expect(isNew(row({ modified: '2026-10-27' }), now)).toBeTrue();
    });

    it('is true exactly 30 days back', () => {
      expect(isNew(row({ modified: '2026-09-27' }), now)).toBeTrue();
    });

    it('is false after 30 days', () => {
      expect(isNew(row({ modified: '2026-09-25' }), now)).toBeFalse();
    });
  });

  describe('matchesFilter', () => {
    it('matches everything with an empty filter', () => {
      expect(matchesFilter(row(), filter(), now)).toBeTrue();
    });

    it('searches title and composer case-insensitively', () => {
      expect(matchesFilter(row({ title: 'Cabar Feidh' }), filter({ text: 'cabar' }), now)).toBeTrue();
      expect(matchesFilter(row({ composer: 'James McHattie' }), filter({ text: 'MCHATTIE' }), now)).toBeTrue();
      expect(matchesFilter(row(), filter({ text: 'nothing like this' }), now)).toBeFalse();
    });

    it('filters by idiom and instrument', () => {
      expect(matchesFilter(row({ idiom: 'Jig' }), filter({ idiom: 'March' }), now)).toBeFalse();
      expect(matchesFilter(row({ instrument: 'Drums' }), filter({ instrument: 'Pipes' }), now)).toBeFalse();
      expect(matchesFilter(row({ instrument: 'Drums' }), filter({ instrument: 'Drums' }), now)).toBeTrue();
    });

    it('filters to new scores only', () => {
      expect(matchesFilter(row({ modified: '2019-01-01' }), filter({ newOnly: true }), now)).toBeFalse();
      expect(matchesFilter(row({ modified: '2026-10-20' }), filter({ newOnly: true }), now)).toBeTrue();
    });

    it('filters to one tune', () => {
      expect(matchesFilter(row({ tune: 'other' }), filter({ tune: 'test-tune' }), now)).toBeFalse();
      expect(matchesFilter(row(), filter({ tune: 'test-tune' }), now)).toBeTrue();
    });

    it('combines every filter', () => {
      const f = filter({ text: 'test', idiom: 'March', instrument: 'Pipes', newOnly: true });
      expect(matchesFilter(row(), f, now)).toBeTrue();
      expect(matchesFilter(row({ idiom: 'Reel' }), f, now)).toBeFalse();
    });
  });

  describe('catalog data', () => {
    it('has a valid date and unique file for every entry', () => {
      const files = new Set<string>();
      SHEET_MUSIC.forEach(entry => {
        expect(isNaN(parseModified(entry.modified).getTime())).withContext(entry.title).toBeFalse();
        expect(files.has(entry.file)).withContext('duplicate ' + entry.file).toBeFalse();
        files.add(entry.file);
      });
    });
  });
});
