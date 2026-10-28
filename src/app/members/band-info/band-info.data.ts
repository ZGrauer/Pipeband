export interface Officer {
  name: string;
  roles: string[];
  email: string;
}

export interface BandDocument {
  title: string;
  description: string;
  file: string;
  icon: string;
  viewable: boolean; // PDFs open in the viewer; other formats download only
}

export const OFFICERS: Officer[] = [
  { name: 'Iain McKee', roles: ['Pipe Major'], email: 'iain.j.mckee@gmail.com' },
  { name: 'Griffin Hall', roles: ['Pipe Sergeant', 'Drum Major'], email: 'griffinthepiper@gmail.com' },
  { name: 'Kyle Womelduff', roles: ['Drum Sergeant'], email: 'kyle.womelduff@gmail.com' },
  { name: 'Mary McGinley', roles: ['President'], email: 'marymcginley68@gmail.com' },
  { name: 'Mark Spengler', roles: ['Treasurer'], email: 'mspengler@comcast.net' },
  { name: 'Rory McKee', roles: ['Business Manager'], email: 'rory.j.mckee@gmail.com' },
  { name: 'Kevin Regan', roles: ['Public Relations Manager'], email: 'thefirm@reganlawfirm.com' },
  { name: 'Rydel Van Dyke', roles: ['Quartermaster'], email: 'rydel.vandyke@gmail.com' },
];

export const DOCUMENTS: BandDocument[] = [
  {
    title: 'Band Constitution',
    description: 'Band rules, structure, and procedures',
    file: 'assets/Kansas_City_St_Andrew_Pipe_Band_CONSTITUTION.pdf',
    icon: 'gavel',
    viewable: true,
  },
  {
    title: 'Drum Major Manual',
    description: 'Reference manual for the drum major',
    file: 'assets/drum_major_manual.pdf',
    icon: 'menu_book',
    viewable: true,
  },
  {
    title: 'Band Roster',
    description: 'Active, associate, and student members with contact information (Excel)',
    file: 'assets/Band_Roster.xlsx',
    icon: 'table_chart',
    viewable: false,
  },
  {
    title: 'Competition Travel Reimbursement Policy',
    description: 'How to get reimbursed for hotel and fuel when traveling to competitions (Word)',
    file: 'assets/KCSA Travel Reimbursement Policy 03.03.23.docx',
    icon: 'receipt_long',
    viewable: false,
  },
];
