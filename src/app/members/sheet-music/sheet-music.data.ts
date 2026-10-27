// Sheet music catalog for the members area.
// To add a score: put the PDF in src/assets/sheet-music/pipes or /drums, then add one entry below.
// `modified` is the date the score was added or last revised (YYYY-MM-DD); scores from the last
// 30 days are flagged "New" automatically.
// `tune` groups a tune's pipe and drum scores so they can be linked together.

export type Instrument = 'Pipes' | 'Drums';

export interface SheetMusic {
  tune: string;
  title: string;
  idiom: string;
  composer?: string;
  instrument: Instrument;
  part?: string;
  modified: string;
  file: string;
  audio?: string;
  notes?: string;
}

export const SHEET_MUSIC: SheetMusic[] = [
  { tune: '79th-farewell-to-gibraltar', title: '79th Farewell to Gibraltar', idiom: 'March', instrument: 'Drums', part: 'Bass', modified: '2020-04-14', file: 'assets/sheet-music/drums/79th-farewell-to-gibraltar-bass.pdf', notes: 'Snare arr. Bill McKee, tenor arr. JJ Cameron' },
  { tune: '79th-farewell-to-gibraltar', title: '79th Farewell to Gibraltar', idiom: 'March', instrument: 'Drums', part: 'Snare & Tenor', modified: '2020-04-14', file: 'assets/sheet-music/drums/79th-farewell-to-gibraltar-snare-tenor.pdf', notes: 'Snare arr. Bill McKee, tenor arr. JJ Cameron' },
  { tune: 'amazing-grace', title: 'Amazing Grace / Rest Me Easy', idiom: 'Hymn', composer: 'Traditional', instrument: 'Pipes', modified: '2018-11-14', file: 'assets/sheet-music/pipes/amazing-grace-rest-me-easy.pdf' },
  { tune: 'at-long-last', title: 'At Long Last', idiom: 'March', composer: 'James McHattie', instrument: 'Pipes', modified: '2019-02-05', file: 'assets/sheet-music/pipes/at-long-last.pdf', audio: 'assets/sheet-music/audio/at-long-last.mp3' },
  { tune: 'auld-lang-syne', title: 'Auld Lang Syne', idiom: 'Slow Air', composer: 'Traditional', instrument: 'Pipes', modified: '2023-01-18', file: 'assets/sheet-music/pipes/auld-lang-syne.pdf', notes: 'Written for several pipers, with high and low A parts' },
  { tune: 'because-he-was-a-bonny-lad', title: 'Because He Was a Bonny Lad / The Keel Row', idiom: 'Strathspey', composer: 'PM J. Paton / Traditional', instrument: 'Pipes', modified: '2024-10-02', file: 'assets/sheet-music/pipes/because-he-was-a-bonny-lad-keel-row.pdf' },
  { tune: 'cabar-feidh', title: 'Cabar Feidh', idiom: 'March', composer: 'Traditional', instrument: 'Pipes', modified: '2018-12-18', file: 'assets/sheet-music/pipes/cabar-feidh.pdf', audio: 'assets/sheet-music/audio/cabar-feidh.mp3' },
  { tune: 'castle-dangerous', title: 'Castle Dangerous', idiom: 'Retreat', composer: 'James Haugh', instrument: 'Pipes', modified: '2026-10-22', file: 'assets/sheet-music/pipes/castle-dangerous.pdf' },
  { tune: 'clair-douglasss-midnight-garden', title: 'Clair Douglass\'s Midnight Garden / An Dro', idiom: 'Slow Air', composer: 'Griffin Hall', instrument: 'Pipes', modified: '2021-07-01', file: 'assets/sheet-music/pipes/clair-douglasss-midnight-garden-an-dro.pdf', notes: 'An Dro is a Breton line dance' },
  { tune: 'cock-o-the-north', title: 'Cock o\' the North', idiom: 'March', composer: 'Traditional', instrument: 'Pipes', modified: '2019-01-15', file: 'assets/sheet-music/pipes/cock-o-the-north.pdf', audio: 'assets/sheet-music/audio/cock-o-the-north.mp3' },
  { tune: 'dr-rosss-50th-welcome', title: 'Dr. Ross\'s 50th Welcome to the Argyllshire Gathering', idiom: 'March', composer: 'D. MacLeod', instrument: 'Pipes', modified: '2023-07-28', file: 'assets/sheet-music/pipes/dr-rosss-50th-welcome.pdf' },
  { tune: 'gardens-of-skye', title: 'Gardens of Skye', idiom: 'March', composer: 'Traditional', instrument: 'Pipes', modified: '2025-03-05', file: 'assets/sheet-music/pipes/gardens-of-skye.pdf' },
  { tune: 'glendaruel-highlanders', title: 'Glendaruel Highlanders / Bonny Dundee', idiom: 'March', composer: 'Traditional', instrument: 'Pipes', modified: '2019-01-15', file: 'assets/sheet-music/pipes/glendaruel-highlanders-bonny-dundee.pdf' },
  { tune: 'hard-times', title: 'Hard Times', idiom: 'Slow Air', composer: 'S. Foster, arr. I. McKee', instrument: 'Pipes', modified: '2019-10-01', file: 'assets/sheet-music/pipes/hard-times.pdf', notes: '1st pipes part' },
  { tune: 'heather-macrae', title: 'Heather MacRae', idiom: 'March', instrument: 'Drums', part: 'Bass', modified: '2020-04-14', file: 'assets/sheet-music/drums/heather-macrae-bass.pdf', notes: 'Arr. JJ Cameron' },
  { tune: 'heather-macrae', title: 'Heather MacRae', idiom: 'March', instrument: 'Drums', part: 'Snare & Tenor', modified: '2020-04-14', file: 'assets/sheet-music/drums/heather-macrae-snare-tenor.pdf', notes: 'Arr. JJ Cameron' },
  { tune: 'highland-laddie-black-bear', title: 'Highland Laddie / The Black Bear', idiom: 'March', composer: 'Traditional', instrument: 'Pipes', modified: '2018-12-11', file: 'assets/sheet-music/pipes/highland-laddie-black-bear.pdf', audio: 'assets/sheet-music/audio/highland-laddie-black-bear.mp3' },
  { tune: 'jean-mauchline', title: 'Jean Mauchline', idiom: 'March', composer: 'Willie Bryson', instrument: 'Pipes', modified: '2019-07-30', file: 'assets/sheet-music/pipes/jean-mauchline.pdf', audio: 'assets/sheet-music/audio/jean-mauchline.mp3' },
  { tune: 'jimmy-findlater', title: 'Jimmy Findlater', idiom: 'March', composer: 'PM Gordon Spiers', instrument: 'Pipes', modified: '2022-11-08', file: 'assets/sheet-music/pipes/jimmy-findlater.pdf' },
  { tune: 'john-campbell', title: 'John Campbell', idiom: 'March', composer: 'C. Armstrong', instrument: 'Pipes', modified: '2024-10-05', file: 'assets/sheet-music/pipes/john-campbell.pdf' },
  { tune: 'kesh-jig', title: 'Kesh Jig', idiom: 'Jig', composer: 'Traditional', instrument: 'Pipes', modified: '2024-11-26', file: 'assets/sheet-music/pipes/kesh-jig.pdf' },
  { tune: 'killiecrankie', title: 'Killiecrankie', idiom: 'March', composer: 'Traditional', instrument: 'Pipes', modified: '2022-11-15', file: 'assets/sheet-music/pipes/killiecrankie.pdf' },
  { tune: 'kilworth-hills', title: 'Kilworth Hills', idiom: 'Retreat', composer: 'Pipe Major G. S. McLennan', instrument: 'Pipes', modified: '2022-11-08', file: 'assets/sheet-music/pipes/kilworth-hills.pdf' },
  { tune: 'last-of-the-great-whales', title: 'Last of the Great Whales', idiom: 'Slow Air', composer: 'Andy Barnes, arr. Griffin Hall', instrument: 'Pipes', modified: '2025-10-14', file: 'assets/sheet-music/pipes/last-of-the-great-whales.pdf' },
  { tune: 'leaving-port-askaig', title: 'Leaving Port Askaig', idiom: 'March', composer: 'P/M Wm Ross', instrument: 'Pipes', modified: '2019-01-08', file: 'assets/sheet-music/pipes/leaving-port-askaig.pdf', audio: 'assets/sheet-music/audio/leaving-port-askaig.mp3' },
  { tune: 'lochanside', title: 'Lochanside', idiom: 'Retreat', composer: 'P/M J. McLellan, D.C.M.', instrument: 'Pipes', modified: '2019-01-08', file: 'assets/sheet-music/pipes/lochanside.pdf', audio: 'assets/sheet-music/audio/lochanside-magersfontein.mp3' },
  { tune: 'men-of-erin', title: 'Men of Erin', idiom: 'Other', composer: 'Ian Byrne', instrument: 'Pipes', modified: '2022-08-02', file: 'assets/sheet-music/pipes/men-of-erin.pdf', notes: 'Scanned score, printed sideways' },
  { tune: 'nelson-mandelas-welcome-to-glasgow', title: 'Nelson Mandela\'s Welcome to Glasgow', idiom: 'Jig', composer: 'Blair Douglas', instrument: 'Pipes', modified: '2025-10-25', file: 'assets/sheet-music/pipes/nelson-mandelas-welcome-to-glasgow.pdf' },
  { tune: 'on-the-turning-away', title: 'On the Turning Away', idiom: 'Slow Air', composer: 'David Gilmour and Anthony Moore, arr. Griffin Hall', instrument: 'Pipes', modified: '2024-12-12', file: 'assets/sheet-music/pipes/on-the-turning-away-v1.pdf', notes: 'Earlier version' },
  { tune: 'on-the-turning-away', title: 'On the Turning Away', idiom: 'Slow Air', composer: 'David Gilmour and Anthony Moore, arr. Griffin Hall', instrument: 'Pipes', modified: '2025-02-28', file: 'assets/sheet-music/pipes/on-the-turning-away.pdf', notes: 'Current version' },
  { tune: 'donald-maclean-of-lewis', title: 'Pipe Major Donald MacLean of Lewis', idiom: 'March', composer: 'P/M Donald MacLeod', instrument: 'Pipes', modified: '2018-12-11', file: 'assets/sheet-music/pipes/pipe-major-donald-maclean-of-lewis.pdf', audio: 'assets/sheet-music/audio/donald-maclean-of-lewis.mp3' },
  { tune: 'remembering-doctor-wallace', title: 'Remembering Doctor Wallace', idiom: 'Retreat', composer: 'Griffin Hall', instrument: 'Pipes', modified: '2022-12-03', file: 'assets/sheet-music/pipes/remembering-doctor-wallace.pdf' },
  { tune: 'rocking-the-baby', title: 'Rocking the Baby / Jig of Slurs', idiom: 'Jig', composer: 'Traditional', instrument: 'Drums', part: 'Bass', modified: '2020-04-14', file: 'assets/sheet-music/drums/rocking-the-baby-jig-of-slurs-bass.pdf', notes: 'Midsection arr. Bill McKee, arr. JJ Cameron' },
  { tune: 'rocking-the-baby', title: 'Rocking the Baby / Jig of Slurs', idiom: 'Jig', composer: 'Traditional', instrument: 'Drums', part: 'Snare & Tenor', modified: '2020-04-14', file: 'assets/sheet-music/drums/rocking-the-baby-jig-of-slurs-snare-tenor.pdf', notes: 'Midsection arr. Bill McKee, arr. JJ Cameron' },
  { tune: 'rocking-the-baby', title: 'Rocking the Baby / Jig of Slurs', idiom: 'Jig', composer: 'Traditional', instrument: 'Pipes', modified: '2019-10-22', file: 'assets/sheet-music/pipes/rocking-the-baby-jig-of-slurs.pdf' },
  { tune: 'rowan-tree', title: 'Rowan Tree', idiom: 'Slow Air', composer: 'Traditional', instrument: 'Pipes', modified: '2021-06-12', file: 'assets/sheet-music/pipes/rowan-tree.pdf' },
  { tune: 'scarce-o-tatties', title: 'Scarce o\' Tatties', idiom: 'Jig', composer: 'Traditional', instrument: 'Pipes', modified: '2019-10-16', file: 'assets/sheet-music/pipes/scarce-o-tatties.pdf' },
  { tune: 'scotland-the-brave', title: 'Scotland the Brave / We\'re No Awa\' Tae Bide Awa\'', idiom: 'March', composer: 'Traditional', instrument: 'Pipes', modified: '2019-01-08', file: 'assets/sheet-music/pipes/scotland-the-brave-were-no-awa-tae-bide-awa.pdf' },
  { tune: 'seonaidhs-tune', title: 'Seonaidh\'s Tune', idiom: 'Strathspey', composer: 'Fred Morrison', instrument: 'Pipes', modified: '2024-12-02', file: 'assets/sheet-music/pipes/seonaidhs-tune.pdf' },
  { tune: 'skye-boat-song', title: 'Skye Boat Song', idiom: 'March', composer: 'Annie McLeod', instrument: 'Pipes', modified: '2018-11-14', file: 'assets/sheet-music/pipes/skye-boat-song.pdf' },
  { tune: 'siege-of-delhi', title: 'The Australian Ladies', idiom: 'March', composer: 'P/M William Ferguson', instrument: 'Drums', part: 'Snare & Bass', modified: '2020-04-14', file: 'assets/sheet-music/drums/australian-ladies-snare-bass.pdf', audio: 'assets/sheet-music/audio/quick-march-medley.mp3', notes: 'Quick March Medley tune 4. Drum arr. J. Quigg 2/2019' },
  { tune: 'barren-rocks-of-aden', title: 'The Barren Rocks of Aden / Highland Laddie', idiom: 'March', composer: 'Traditional', instrument: 'Pipes', modified: '2026-10-01', file: 'assets/sheet-music/pipes/barren-rocks-of-aden-highland-laddie.pdf' },
  { tune: 'bloody-fields-of-flanders', title: 'The Bloody Fields of Flanders', idiom: 'Retreat', composer: 'P/M J. MacLellan, D.C.M.', instrument: 'Pipes', modified: '2023-08-18', file: 'assets/sheet-music/pipes/bloody-fields-of-flanders.pdf' },
  { tune: 'caisson-song', title: 'The Caisson Song', idiom: 'March', composer: 'Edmund L. Gruber', instrument: 'Pipes', modified: '2019-04-24', file: 'assets/sheet-music/pipes/caisson-song.pdf', notes: 'Adapted by D. May from the US Army Songbook' },
  { tune: 'dawning-of-the-day', title: 'The Dawning of the Day', idiom: 'March', composer: 'Traditional', instrument: 'Pipes', modified: '2024-01-20', file: 'assets/sheet-music/pipes/dawning-of-the-day.pdf' },
  { tune: 'green-hills-of-tyrol', title: 'The Green Hills of Tyrol / Balmoral', idiom: 'March', composer: 'P.M. J. MacLeod / Traditional', instrument: 'Pipes', modified: '2024-10-24', file: 'assets/sheet-music/pipes/green-hills-of-tyrol-balmoral.pdf', notes: 'Revised 21 Oct 2024' },
  { tune: 'haughs-of-cromdale', title: 'The Haughs of Cromdale', idiom: 'March', composer: 'Traditional', instrument: 'Drums', part: 'Bass', modified: '2020-04-14', file: 'assets/sheet-music/drums/haughs-of-cromdale-bass.pdf', audio: 'assets/sheet-music/audio/quick-march-medley.mp3', notes: 'Quick March Medley tune 1. Drum arr. J. Quigg 1/2019' },
  { tune: 'haughs-of-cromdale', title: 'The Haughs of Cromdale', idiom: 'March', composer: 'Traditional', instrument: 'Drums', part: 'Snare & Tenor', modified: '2020-04-14', file: 'assets/sheet-music/drums/haughs-of-cromdale-snare-tenor.pdf', audio: 'assets/sheet-music/audio/quick-march-medley.mp3', notes: 'Quick March Medley tune 1. Drum arr. J. Quigg 1/2019' },
  { tune: 'haughs-of-cromdale', title: 'The Haughs of Cromdale / The Burning of the Piper\'s Hut', idiom: 'March', composer: 'Traditional', instrument: 'Pipes', modified: '2018-12-12', file: 'assets/sheet-music/pipes/haughs-of-cromdale-burning-of-the-pipers-hut.pdf', audio: 'assets/sheet-music/audio/quick-march-medley.mp3', notes: 'Quick March Medley tune 1' },
  { tune: 'high-road-to-linton', title: 'The High Road to Linton / Lexy McAskill', idiom: 'Reel', composer: 'Traditional / Dr. J.N. McAskill', instrument: 'Pipes', modified: '2024-11-03', file: 'assets/sheet-music/pipes/high-road-to-linton-lexy-mcaskill.pdf' },
  { tune: 'highland-brigade-at-magersfontein', title: 'The Highland Brigade at Magersfontein', idiom: 'Retreat', composer: 'P/M J. MacLellan, D.C.M.', instrument: 'Pipes', modified: '2018-12-05', file: 'assets/sheet-music/pipes/highland-brigade-at-magersfontein.pdf', audio: 'assets/sheet-music/audio/lochanside-magersfontein.mp3' },
  { tune: 'piobaireachd-of-donald-dhu', title: 'The Piobaireachd of Donald Dhu', idiom: 'March', composer: 'Traditional', instrument: 'Pipes', modified: '2023-08-16', file: 'assets/sheet-music/pipes/piobaireachd-of-donald-dhu.pdf' },
  { tune: 'siege-of-delhi', title: 'The Siege of Delhi', idiom: 'March', composer: 'Traditional', instrument: 'Drums', part: 'Snare & Bass', modified: '2020-04-14', file: 'assets/sheet-music/drums/siege-of-delhi-snare-bass.pdf', audio: 'assets/sheet-music/audio/quick-march-medley.mp3', notes: 'Quick March Medley tune 3. Drum arr. J. Quigg 3/2019' },
  { tune: 'siege-of-delhi', title: 'The Siege of Delhi / The Australian Ladies', idiom: 'March', composer: 'Traditional / P/M William Ferguson', instrument: 'Pipes', modified: '2019-02-18', file: 'assets/sheet-music/pipes/siege-of-delhi-australian-ladies.pdf', audio: 'assets/sheet-music/audio/quick-march-medley.mp3', notes: 'Quick March Medley tunes 3 and 4' },
  { tune: 'sound-of-sleat', title: 'The Sound of Sleat', idiom: 'Strathspey & Reel', composer: 'D. MacKinnon', instrument: 'Pipes', modified: '2024-12-10', file: 'assets/sheet-music/pipes/sound-of-sleat.pdf' },
  { tune: 'walter-douglas', title: 'Walter Douglas, M.B.E.', idiom: 'March', composer: 'D. MacLeod', instrument: 'Pipes', modified: '2024-09-28', file: 'assets/sheet-music/pipes/walter-douglas-mbe.pdf' },
  { tune: 'waltzing-matilda', title: 'Waltzing Matilda', idiom: 'March', composer: 'Christina Macpherson, arr. Malcolm MacKenzie', instrument: 'Pipes', modified: '2019-01-15', file: 'assets/sheet-music/pipes/waltzing-matilda.pdf' },
  { tune: 'waltzing-matilda', title: 'Waltzing Matilda (Harmonies)', idiom: 'March', composer: 'Traditional, harmonized by D. May', instrument: 'Pipes', modified: '2019-01-15', file: 'assets/sheet-music/pipes/waltzing-matilda-harmonies.pdf', notes: 'Seconds and thirds' },
  { tune: 'wasted-days', title: 'Wasted Days', idiom: 'March', composer: 'Griffin Hall', instrument: 'Pipes', modified: '2025-10-14', file: 'assets/sheet-music/pipes/wasted-days.pdf' },
  { tune: 'wearin-of-the-green', title: 'Wearin\' of the Green', idiom: 'March', composer: 'Traditional', instrument: 'Pipes', modified: '2019-01-21', file: 'assets/sheet-music/pipes/wearin-of-the-green.pdf', audio: 'assets/sheet-music/audio/wearin-of-the-green.mp3' },
  { tune: 'wha-saw-the-forty-second', title: 'Wha Saw the Forty-Second?', idiom: 'March', composer: 'Traditional', instrument: 'Pipes', modified: '2026-10-07', file: 'assets/sheet-music/pipes/wha-saw-the-forty-second.pdf' },
  { tune: 'when-the-battle-is-oer', title: 'When the Battle is O\'er / Shoals of Herring', idiom: 'Retreat', composer: 'P/M William Robb / Ewan MacColl', instrument: 'Pipes', modified: '2019-09-30', file: 'assets/sheet-music/pipes/when-the-battle-is-oer-shoals-of-herring.pdf', audio: 'assets/sheet-music/audio/when-the-battle-is-oer-shoals-of-herring.mp3' },
  { tune: 'wings-set', title: 'Wings / Rowan Tree / Gardens of Skye', idiom: 'March', composer: 'Traditional', instrument: 'Pipes', modified: '2024-01-18', file: 'assets/sheet-music/pipes/wings-rowan-tree-gardens-of-skye.pdf', audio: 'assets/sheet-music/audio/wings-set.mp3', notes: 'Wings set' },
];
