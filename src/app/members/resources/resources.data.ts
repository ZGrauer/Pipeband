export interface Video {
  id: string;
  title: string;
}

export interface VideoGroup {
  name: string;
  videos: Video[];
}

export interface ResourceLink {
  title: string;
  url: string;
  isNew?: boolean;
}

export interface ModelFile {
  title: string;
  download: string;
  preview: string;
}

export const VIDEO_GROUPS: VideoGroup[] = [
  {
    name: 'Stretches',
    videos: [
      { id: '_jWxIPrBSdQ', title: 'Finger & Upper Extremity Stretches for Musicians' },
      { id: 'qgIXpSup93s', title: 'Bagpiping Warm-Up Stretches' },
    ],
  },
  {
    name: 'Bagpipes',
    videos: [
      { id: 'ZTdY671h2io', title: 'How to Tie Your Bagpipe Drone Cords' },
      { id: 'ZodkXZ18F48', title: 'How to Tie Ghillie Brogues' },
    ],
  },
  {
    name: 'Uniform',
    videos: [
      { id: '30hRwx0kqHQ', title: 'How to Tie Ghillie Brogues' },
      { id: '4quZookqeHE', title: 'How to Wear Flashes' },
      { id: 'zMNc1HfUSQE', title: 'Where Do You Wear a Kilt Pin?' },
      { id: 'F55ogSPSF9I', title: 'How can you avoid losing your kilt pin?' },
    ],
  },
];

export const PLAYLISTS: ResourceLink[] = [
  { title: '2025 St Andrew Contest Material', url: 'https://youtube.com/playlist?list=PLQQZswSWPMShDdGg9OI1XnQP00ZIuL8Os&si=f3RQdu2gpguLg0R0', isNew: true },
  { title: '2024 St Andrews Concert YouTube Playlist', url: 'https://youtube.com/playlist?list=PLQQZswSWPMSihz8F97P4Xij7SJUM_CmPo' },
];

export const ARTICLES: ResourceLink[] = [
  { title: 'Checklist for a Comfortable Bagpipe', url: 'https://www.jhiggins.net/blog/checklist-for-a-comfortable-bagpipe/' },
  { title: 'Proper After-Session Care for your Bagpipes', url: 'https://www.jhiggins.net/blog/proper-aftersession-care-for-your-bagpipes/' },
  { title: '10 Tips for a more Fufilling Practice on your Bagpipes', url: 'https://www.jhiggins.net/blog/10-tips-for-a-more-fufilling-practice-on-your-bagpipes/' },
  { title: 'How does Temperature, Moisture, and Storage affect my Bagpipes?', url: 'https://www.jhiggins.net/blog/how-does-temperature-moisture-and-storage-affect-my-bagpipes/' },
  { title: 'How Should I Wear my Kilt Outfit?', url: 'https://www.jhiggins.net/blog/how-should-i-wear-my-kilt-outfit/' },
];

export const MODEL_FILES: ModelFile[] = [
  { title: 'Band Cap Badge 3D & Vector Files', download: 'assets/KCSAPB_Cap_Badge.zip', preview: 'assets/KCSAPB_Cap_Badge.stl' },
  { title: 'Band Kilt Pin 3D File', download: 'assets/KCSAPB_Kilt_Pin.stl', preview: 'assets/KCSAPB_Kilt_Pin.stl' },
];
