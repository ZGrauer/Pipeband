export interface ResultFile {
  path: string;
  name: string;
}

export interface ResultElement {
  date: Date;
  highlandGames: string;
  grade: number;
  event: string;
  place: number;
  totalPoints: number;
  pipingJudge1: number;
  pipingJudge2: number;
  drummingJudge: number;
  ensembleJudge: number;
  files: ResultFile[];
}

// Data for the competition results table
export const RESULT_DATA: ResultElement[] = [
  {
    date: new Date('2026-07-18 00:00:00'),
    highlandGames: 'Minnesota',
    grade: 4,
    event: 'Medley',
    place: 1,
    totalPoints: 5,
    pipingJudge1: 1,
    pipingJudge2: 1,
    drummingJudge: 2,
    ensembleJudge: 1,
    files: [ 
      {
        path: 'assets/score-sheets/2026-mn_band_results.pdf',
        name: 'Band Results',
      },
      {
        path: 'assets/score-sheets/2026_MN_G4_Medley_KC_St_Andrew_Pipes_Drums_DJ Drumming Judge 01.mp3',
        name: 'Drumming MP3',
      },
      {
        path: 'assets/score-sheets/2026_MN_G4_Medley_KC_St_Andrew_Pipes_Drums_EJ Ensemble Judge 01.mp3',
        name: 'Ensemble MP3',
      },
      {
        path: 'assets/score-sheets/2026_MN_G4_Medley_KC_St_Andrew_Pipes_Drums_PJ01 Piping Judge 01.mp3',
        name: 'Piping 1 MP3',
      },
      {
        path: 'assets/score-sheets/2026_MN_G4_Medley_KC_St_Andrew_Pipes_Drums_PJ02 Piping Judge 02.mp3',
        name: 'Piping 2 MP3',
      },
     ],
  },{
    date: new Date('2026-07-18 00:00:00'),
    highlandGames: 'Minnesota',
    grade: 4,
    event: 'MSR',
    place: 1,
    totalPoints: 5,
    pipingJudge1: 2,
    pipingJudge2: 1,
    drummingJudge: 1,
    ensembleJudge: 1,
    files: [ 
      {
        path: 'assets/score-sheets/2026-mn_band_results.pdf',
        name: 'Band Results',
      },
      {
        path: 'assets/score-sheets/2026_MN_G4_MSR_KC_St_Andrew_Pipes_Drums_DJ Drumming Judge 01.mp3',
        name: 'Drumming MP3',
      },
      {
        path: 'assets/score-sheets/2026_MN_G4_MSR_KC_St_Andrew_Pipes_Drums_EJ Ensemble Judge 01.mp3',
        name: 'Ensemble MP3',
      },
      {
        path: 'assets/score-sheets/2026_MN_G4_MSR_KC_St_Andrew_Pipes_Drums_PJ01 Piping Judge 01.mp3',
        name: 'Piping 1 MP3',
      },
      {
        path: 'assets/score-sheets/2026_MN_G4_MSR_KC_St_Andrew_Pipes_Drums_PJ02 Piping Judge 02.mp3',
        name: 'Piping 2 MP3',
      },
     ],
  },{
    date: new Date('2026-06-13 00:00:00'),
    highlandGames: 'Chicago',
    grade: 4,
    event: 'Medley',
    place: 5,
    totalPoints: 26,
    pipingJudge1: 5,
    pipingJudge2: 9,
    drummingJudge: 8,
    ensembleJudge: 4,
    files: [ 
      {
        path: 'assets/score-sheets/2026-chg-band_results.pdf',
        name: 'Band Results',
      },
      {
        path: 'assets/score-sheets/2026_Chicago_G4_Medley_KC_St_Andrew_Pipes_Drums_DJ Drumming Judge 01.mp3',
        name: 'Drumming MP3',
      },
      {
        path: 'assets/score-sheets/2026_Chicago_G4_Medley_KC_St_Andrew_Pipes_Drums_EJ Ensemble Judge 01.mp3',
        name: 'Ensemble MP3',
      },
      {
        path: 'assets/score-sheets/2026_Chicago_G4_Medley_KC_St_Andrew_Pipes_Drums_PJ01 Piping Judge 01.mp3',
        name: 'Piping 1 MP3',
      },
      {
        path: 'assets/score-sheets/2026_Chicago_G4_Medley_KC_St_Andrew_Pipes_Drums_PJ02 Piping Judge 02.mp3',
        name: 'Piping 2 MP3',
      },
     ],
  },{
    date: new Date('2026-05-16 00:00:00'),
    highlandGames: 'St. Louis',
    grade: 4,
    event: 'Medley',
    place: 1,
    totalPoints: 4,
    pipingJudge1: 1,
    pipingJudge2: 1,
    drummingJudge: 1,
    ensembleJudge: 1,
    files: [ 
      {
        path: 'assets/score-sheets/2026-stl_band_results.pdf',
        name: 'Band Results',
      },
      {
        path: 'assets/score-sheets/2026_St_Louis_G4_Medley_KC_St_Andrew_Pipes_Drums_DJ Drumming Judge 01.mp3',
        name: 'Drumming MP3',
      },
      {
        path: 'assets/score-sheets/2026_St_Louis_G4_Medley_KC_St_Andrew_Pipes_Drums_EJ Ensemble Judge 01.mp3',
        name: 'Ensemble MP3',
      },
      {
        path: 'assets/score-sheets/2026_St_Louis_G4_Medley_KC_St_Andrew_Pipes_Drums_PJ01 Piping Judge 01.mp3',
        name: 'Piping 1 MP3',
      },
      {
        path: 'assets/score-sheets/2026_St_Louis_G4_Medley_KC_St_Andrew_Pipes_Drums_PJ02 Piping Judge 02.mp3',
        name: 'Piping 2 MP3',
      },
     ],
  },{
    date: new Date('2026-05-16 00:00:00'),
    highlandGames: 'St. Louis',
    grade: 4,
    event: 'MSR',
    place: 1,
    totalPoints: 4,
    pipingJudge1: 1,
    pipingJudge2: 1,
    drummingJudge: 1,
    ensembleJudge: 1,
    files: [ 
      {
        path: 'assets/score-sheets/2026-stl_band_results.pdf',
        name: 'Band Results',
      },
      {
        path: 'assets/score-sheets/2026_St_Louis_G4_MSR_KC_St_Andrew_Pipes_Drums_DJ Drumming Judge 01.mp3',
        name: 'Drumming MP3',
      },
      {
        path: 'assets/score-sheets/2026_St_Louis_G4_MSR_KC_St_Andrew_Pipes_Drums_EJ Ensemble Judge 01.mp3',
        name: 'Ensemble MP3',
      },
      {
        path: 'assets/score-sheets/2026_St_Louis_G4_MSR_KC_St_Andrew_Pipes_Drums_PJ01 Piping Judge 01.mp3',
        name: 'Piping 1 MP3',
      },
      {
        path: 'assets/score-sheets/2026_St_Louis_G4_MSR_KC_St_Andrew_Pipes_Drums_PJ02 Piping Judge 02.mp3',
        name: 'Piping 2 MP3',
      },
     ],
  },{
    date: new Date('2025-07-19 00:00:00'),
    highlandGames: 'Minnesota',
    grade: 4,
    event: 'MSR',
    place: 1,
    totalPoints: 6,
    pipingJudge1: 2,
    pipingJudge2: 2,
    drummingJudge: 1,
    ensembleJudge: 1,
    files: [ 
      {
        path: 'assets/score-sheets/2025-mn_band_results.pdf',
        name: 'Band Results',
      },
      {
        path: 'assets/score-sheets/MWPBA 1 MN G4 MSR    Kansas City St  Andrew Pipes   Drums DJ Drumming Judge 01.mp3',
        name: 'Drumming MP3',
      },
      {
        path: 'assets/score-sheets/MWPBA 1 MN G4 MSR    Kansas City St  Andrew Pipes   Drums EJ Ensemble Judge 01.mp3',
        name: 'Ensemble MP3',
      },
      {
        path: 'assets/score-sheets/MWPBA 1 MN G4 MSR    Kansas City St  Andrew Pipes   Drums PJ01 Piping Judge 01.mp3',
        name: 'Piping 1 MP3',
      },
      {
        path: 'assets/score-sheets/MWPBA 1 MN G4 MSR    Kansas City St  Andrew Pipes   Drums PJ02 Piping Judge 02.mp3',
        name: 'Piping 2 MP3',
      },
     ],
  },{
    date: new Date('2025-07-19 00:00:00'),
    highlandGames: 'Minnesota',
    grade: 4,
    event: 'Medley',
    place: 1,
    totalPoints: 7,
    pipingJudge1: 2,
    pipingJudge2: 3,
    drummingJudge: 1,
    ensembleJudge: 1,
    files: [ 
      {
        path: 'assets/score-sheets/2025-mn_band_results.pdf',
        name: 'Band Results',
      },
      {
        path: 'assets/score-sheets/MWPBA 4 MN G4 Medley    Kansas City St  Andrew Pipes   Drums DJ Drumming Judge 01.mp3',
        name: 'Drumming MP3',
      },
      {
        path: 'assets/score-sheets/MWPBA 4 MN G4 Medley    Kansas City St  Andrew Pipes   Drums EJ Ensemble Judge 01.mp3',
        name: 'Ensemble MP3',
      },
      {
        path: 'assets/score-sheets/MWPBA 4 MN G4 Medley    Kansas City St  Andrew Pipes   Drums PJ01 Piping Judge 01.mp3',
        name: 'Piping 1 MP3',
      },
      {
        path: 'assets/score-sheets/MWPBA 4 MN G4 Medley    Kansas City St  Andrew Pipes   Drums PJ02 Piping Judge 02.mp3',
        name: 'Piping 2 MP3',
      },
     ],
  },{
    date: new Date('2025-06-14 00:00:00'),
    highlandGames: 'Chicago',
    grade: 4,
    event: 'Medley',
    place: 2,
    totalPoints: 12,
    pipingJudge1: 2,
    pipingJudge2: 2,
    drummingJudge: 3,
    ensembleJudge: 5,
    files: [ 
      {
        path: 'assets/score-sheets/2025_Chicago_G4_Results.jpg',
        name: 'Band Results',
      },
      {
        path: 'assets/score-sheets/2025_Chicago_G4_Medley_KC_St_Andrew_PC_Drumming_Judge.mp3',
        name: 'Drumming MP3',
      },
      {
        path: 'assets/score-sheets/2025_Chicago_G4_Medley_KC_St_Andrew_PC_Ensemble_Judge.mp3',
        name: 'Ensemble MP3',
      },
      {
        path: 'assets/score-sheets/2025_Chicago_G4_Medley_KC_St_Andrew_PC_Piping_Judge_1.mp3',
        name: 'Piping 1 MP3',
      },
      {
        path: 'assets/score-sheets/2025_Chicago_G4_Medley_KC_St_Andrew_PC_Piping_Judge_2.mp3',
        name: 'Piping 2 MP3',
      },
     ],
  },{
    date: new Date('2024-09-14 00:00:00'),
    highlandGames: 'Tulsa',
    grade: 5,
    event: 'QMM',
    place: 1,
    totalPoints: 5,
    pipingJudge1: 1,
    pipingJudge2: 1,
    drummingJudge: 2,
    ensembleJudge: 1,
    files: [ 
      {
        path: 'assets/score-sheets/2024_Tulsa_Games_Results.pdf',
        name: 'PDF',
      },
     ],
  },{
    date: new Date('2024-07-13 00:00:00'),
    highlandGames: 'Minnesota',
    grade: 5,
    event: 'QMM',
    place: 1,
    totalPoints: 5,
    pipingJudge1: 1,
    pipingJudge2: 1,
    drummingJudge: 2,
    ensembleJudge: 1,
    files: [
      {
        path: 'assets/score-sheets/2024_Minnesota_G5_QMM_KC_St_Andrew_Drumming_Judge_1.mp3',
        name: 'Drumming MP3',
      },
      {
        path: 'assets/score-sheets/2024_Minnesota_G5_QMM_KC_St_Andrew_Ensemble_Judge_1.mp3',
        name: 'Ensemble MP3',
      },
      {
        path: 'assets/score-sheets/2024_Minnesota_G5_QMM_KC_St_Andrew_Piping_Judge_1.mp3',
        name: 'Piping 1 MP3',
      },
      {
        path: 'assets/score-sheets/2024_Minnesota_G5_QMM_KC_St_Andrew_Piping_Judge_2.mp3',
        name: 'Piping 2 MP3',
      },
    ],
  },{
    date: new Date('2024-06-15 00:00:00'),
    highlandGames: 'Chicago',
    grade: 5,
    event: 'QMM',
    place: 1,
    totalPoints: 11,
    pipingJudge1: 1,
    pipingJudge2: 1,
    drummingJudge: 6,
    ensembleJudge: 3,
    files: [
      {
        path: 'assets/score-sheets/2024_Chicago_G5_QMM_KC_St_Andrew_PC_Drumming_Judge.mp3',
        name: 'Drumming MP3',
      },
      {
        path: 'assets/score-sheets/2024_Chicago_G5_QMM_KC_St_Andrew_PC_Ensemble_Judge.mp3',
        name: 'Ensemble MP3',
      },
      {
        path: 'assets/score-sheets/2024_Chicago_G5_QMM_KC_St_Andrew_PC_Piping_Judge_1.mp3',
        name: 'Piping 1 MP3',
      },
      {
        path: 'assets/score-sheets/2024_Chicago_G5_QMM_KC_St_Andrew_PC_Piping_Judge_2.mp3',
        name: 'Piping 2 MP3',
      },
    ],
  },{
    date: new Date('2024-05-11 00:00:00'),
    highlandGames: 'St Louis',
    grade: 5,
    event: 'QMM',
    place: 1,
    totalPoints: 5,
    pipingJudge1: 2,
    pipingJudge2: 1,
    drummingJudge: 1,
    ensembleJudge: 1,
    files: [
      {
        path: 'assets/score-sheets/2024_St_Louis_G5_QMM_KC_St_Andrew_PD_Drumming_Judge.mp3',
        name: 'Drumming MP3',
      },
      {
        path: 'assets/score-sheets/2024_St_Louis_G5_QMM_KC_St_Andrew_PD_Ensemble_Judge.mp3',
        name: 'Ensemble MP3',
      },
      {
        path: 'assets/score-sheets/2024_St_Louis_G5_QMM_KC_St_Andrew_PD_Piping_Judge_1.mp3',
        name: 'Piping 1 MP3',
      },
      {
        path: 'assets/score-sheets/2024_St_Louis_G5_QMM_KC_St_Andrew_PD_Piping_Judge_2.mp3',
        name: 'Piping 2 MP3',
      },
    ],
  },
  {
    date: new Date('2023-09-16 00:00:00'),
    highlandGames: 'Tulsa',
    grade: 5,
    event: 'QMM',
    place: 2,
    totalPoints: 7,
    pipingJudge1: 3,
    pipingJudge2: 2,
    drummingJudge: 1,
    ensembleJudge: 1,
    files: [
      {
        path: 'assets/score-sheets/2023_Tulsa_Games_Results.pdf',
        name: 'PDF',
      },
    ],
  },
  {
    date: new Date('2023-06-17 00:00:00'),
    highlandGames: 'Chicago',
    grade: 5,
    event: 'QMM',
    place: 6,
    totalPoints: 25,
    pipingJudge1: 9,
    pipingJudge2: 9,
    drummingJudge: 3,
    ensembleJudge: 4,
    files: [
      {
        path: 'assets/score-sheets/2023_Chicago_Games_Results.pdf',
        name: 'PDF',
      },
    ],
  },
];
