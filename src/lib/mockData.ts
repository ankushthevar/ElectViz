export interface PartyResult {
  party: string;
  seats: number;
  voteShare: number;
  color: string;
}

export interface LeaderInfo {
  name: string;
  designation: string;
  party?: string;
  image?: string;
}

export interface GovernanceData {
  national: {
    president: LeaderInfo;
    primeMinister: LeaderInfo;
    cabinet: LeaderInfo[];
  };
}

export interface ElectionData {
  totalSeats: number;
  declaredSeats: number;
  lastUpdated: string;
  results: PartyResult[];
  governance: GovernanceData;
  rajyaSabha?: {
    totalSeats: number;
    results: PartyResult[];
  };
}

// Using high-res Wikimedia URLs directly
export const mockLiveData: ElectionData = {
  totalSeats: 543,
  declaredSeats: 543,
  lastUpdated: new Date().toISOString(),
  results: [
    { party: 'BJP', seats: 240, voteShare: 36.6, color: '#FF9933' },
    { party: 'INC', seats: 99, voteShare: 21.2, color: '#19AAED' },
    { party: 'SP', seats: 37, voteShare: 4.5, color: '#27AE60' },
    { party: 'TMC', seats: 29, voteShare: 4.3, color: '#20B2AA' },
    { party: 'DMK', seats: 22, voteShare: 2.1, color: '#FF0000' },
    { party: 'OTH', seats: 116, voteShare: 31.3, color: '#A9A9A9' },
  ],
  governance: {
    national: {
      president: { 
        name: 'Droupadi Murmu', 
        designation: 'President of India',
        image: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Droupadi_Murmu_official_portrait_2022.jpg'
      },
      primeMinister: { 
        name: 'Narendra Modi', 
        designation: 'Prime Minister', 
        party: 'BJP',
        image: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Narendra_Modi_Official_Portrait_2022.jpg'
      },
      cabinet: [
        { 
          name: 'Amit Shah', 
          designation: 'Home Minister', 
          party: 'BJP',
          image: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Amit_Shah_2023.jpg'
        },
        { 
          name: 'Nirmala Sitharaman', 
          designation: 'Finance Minister', 
          party: 'BJP',
          image: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Smt._Nirmala_Sitharaman%2C_Hon%27ble_Finance_Minister_of_India.jpg'
        },
        { 
          name: 'S. Jaishankar', 
          designation: 'External Affairs', 
          party: 'BJP',
          image: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/S._Jaishankar_official_portrait%2C_2023.jpg'
        },
      ]
    }
  },
  rajyaSabha: {
    totalSeats: 245,
    results: [
      { party: 'BJP', seats: 96, voteShare: 39.2, color: '#FF9933' },
      { party: 'INC', seats: 27, voteShare: 11.0, color: '#19AAED' },
      { party: 'TMC', seats: 13, voteShare: 5.3, color: '#20B2AA' },
      { party: 'AAP', seats: 10, voteShare: 4.1, color: '#00ADEE' },
      { party: 'DMK', seats: 10, voteShare: 4.1, color: '#FF0000' },
      { party: 'OTH', seats: 89, voteShare: 36.3, color: '#A9A9A9' },
    ]
  }
};

export const mockHistoricalData = [
  { year: 2014, BJP: 282, INC: 44, OTH: 217 },
  { year: 2019, BJP: 303, INC: 52, OTH: 188 },
  { year: 2024, BJP: 240, INC: 99, OTH: 204 },
];

export interface ConstituencyResult {
  id: string;
  name: string;
  party: string;
  candidate: string;
  margin: number;
  status: 'won' | 'leading';
}

export interface StateGovernance {
  chiefMinister: LeaderInfo;
  deputyCMs?: LeaderInfo[];
  cabinet: LeaderInfo[];
}

export interface StateDetail {
  id: string;
  name: string;
  totalSeats: number;
  results: PartyResult[];
  constituencies: ConstituencyResult[];
  governance?: StateGovernance;
}

export const mockStateDetails: Record<string, StateDetail> = {
  'UP': {
    id: 'UP',
    name: 'Uttar Pradesh',
    totalSeats: 80,
    results: [
      { party: 'SP', seats: 37, voteShare: 33.5, color: '#27AE60' },
      { party: 'BJP', seats: 33, voteShare: 41.3, color: '#FF9933' },
      { party: 'INC', seats: 6, voteShare: 9.4, color: '#19AAED' },
      { party: 'OTH', seats: 4, voteShare: 15.8, color: '#A9A9A9' },
    ],
    governance: {
      chiefMinister: { 
        name: 'Yogi Adityanath', 
        designation: 'Chief Minister', 
        party: 'BJP',
        image: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Yogi_Adityanath_Official_Portrait.jpg'
      },
      deputyCMs: [
        { name: 'Keshav Prasad Maurya', designation: 'Deputy CM', party: 'BJP' },
        { name: 'Brajesh Pathak', designation: 'Deputy CM', party: 'BJP' },
      ],
      cabinet: [
        { name: 'Suresh Kumar Khanna', designation: 'Finance & Parliamentary Affairs', party: 'BJP' },
        { name: 'Surya Pratap Shahi', designation: 'Agriculture', party: 'BJP' },
        { name: 'Swatantra Dev Singh', designation: 'Jal Shakti', party: 'BJP' },
        { name: 'Baby Rani Maurya', designation: 'Women Welfare', party: 'BJP' },
      ]
    },
    constituencies: [
      { id: 'UP-1', name: 'Varanasi', party: 'BJP', candidate: 'Narendra Modi', margin: 152513, status: 'won' },
      { id: 'UP-2', name: 'Raebareli', party: 'INC', candidate: 'Rahul Gandhi', margin: 390030, status: 'won' },
      { id: 'UP-3', name: 'Lucknow', party: 'BJP', candidate: 'Rajnath Singh', margin: 135159, status: 'won' },
      { id: 'UP-4', name: 'Kannauj', party: 'SP', candidate: 'Akhilesh Yadav', margin: 170922, status: 'won' },
      { id: 'UP-5', name: 'Amethi', party: 'INC', candidate: 'Kishori Lal', margin: 167196, status: 'won' },
    ]
  },
  'MH': {
    id: 'MH',
    name: 'Maharashtra',
    totalSeats: 48,
    results: [
      { party: 'INC', seats: 13, voteShare: 16.9, color: '#19AAED' },
      { party: 'BJP', seats: 9, voteShare: 26.1, color: '#FF9933' },
      { party: 'SS(UBT)', seats: 9, voteShare: 16.7, color: '#F39C12' },
      { party: 'NCP(SP)', seats: 8, voteShare: 10.3, color: '#2ECC71' },
      { party: 'OTH', seats: 9, voteShare: 30.0, color: '#A9A9A9' },
    ],
    governance: {
      chiefMinister: { 
        name: 'Devendra Fadnavis', 
        designation: 'Chief Minister', 
        party: 'BJP',
        image: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Devendra_Fadnavis_2019_Official_Portrail.jpg'
      },
      deputyCMs: [
        { name: 'Eknath Shinde', designation: 'Deputy CM', party: 'SHS' },
        { name: 'Ajit Pawar', designation: 'Deputy CM', party: 'NCP' },
      ],
      cabinet: [
        { name: 'Chandrashekhar Bawankule', designation: 'Minister', party: 'BJP' },
        { name: 'Radhakrishna Vikhe Patil', designation: 'Minister', party: 'BJP' },
        { name: 'Uday Samant', designation: 'Minister', party: 'SHS' },
        { name: 'Hasan Mushrif', designation: 'Minister', party: 'NCP' },
      ]
    },
    constituencies: [
      { id: 'MH-1', name: 'Nagpur', party: 'BJP', candidate: 'Nitin Gadkari', margin: 137603, status: 'won' },
      { id: 'MH-2', name: 'Baramati', party: 'NCP(SP)', candidate: 'Supriya Sule', margin: 158333, status: 'won' },
    ]
  }
};

export const stateWiseResults = [
  { id: 'UP', name: 'Uttar Pradesh', totalSeats: 80, BJP: 33, INC: 6, SP: 37, OTH: 4, leading: 'SP' },
  { id: 'MH', name: 'Maharashtra', totalSeats: 48, BJP: 9, INC: 13, SS: 16, OTH: 10, leading: 'INC' },
  { id: 'WB', name: 'West Bengal', totalSeats: 42, BJP: 12, TMC: 29, INC: 1, OTH: 0, leading: 'TMC' },
  { id: 'BR', name: 'Bihar', totalSeats: 40, BJP: 12, JD: 12, RJD: 4, OTH: 12, leading: 'BJP' },
  { id: 'TN', name: 'Tamil Nadu', totalSeats: 39, BJP: 0, DMK: 22, INC: 9, OTH: 8, leading: 'DMK' },
  { id: 'MP', name: 'Madhya Pradesh', totalSeats: 29, BJP: 29, INC: 0, OTH: 0, leading: 'BJP' },
  { id: 'KA', name: 'Karnataka', totalSeats: 28, BJP: 17, INC: 9, JD: 2, OTH: 0, leading: 'BJP' },
  { id: 'GJ', name: 'Gujarat', totalSeats: 26, BJP: 25, INC: 1, OTH: 0, leading: 'BJP' },
  { id: 'RJ', name: 'Rajasthan', totalSeats: 25, BJP: 14, INC: 8, OTH: 3, leading: 'BJP' },
  { id: 'AP', name: 'Andhra Pradesh', totalSeats: 25, TDP: 16, YSRCP: 4, BJP: 3, OTH: 2, leading: 'TDP' },
  { id: 'OR', name: 'Odisha', totalSeats: 21, BJP: 20, BJD: 0, INC: 1, OTH: 0, leading: 'BJP' },
  { id: 'KL', name: 'Kerala', totalSeats: 20, INC: 14, CPM: 1, BJP: 1, OTH: 4, leading: 'INC' },
  { id: 'TS', name: 'Telangana', totalSeats: 17, INC: 8, BJP: 8, AIMIM: 1, OTH: 0, leading: 'INC' },
  { id: 'AS', name: 'Assam', totalSeats: 14, BJP: 9, INC: 3, OTH: 2, leading: 'BJP' },
  { id: 'JH', name: 'Jharkhand', totalSeats: 14, BJP: 8, JMM: 3, INC: 2, OTH: 1, leading: 'BJP' },
  { id: 'PB', name: 'Punjab', totalSeats: 13, INC: 7, AAP: 3, SAD: 1, OTH: 2, leading: 'INC' },
  { id: 'CT', name: 'Chhattisgarh', totalSeats: 11, BJP: 10, INC: 1, OTH: 0, leading: 'BJP' },
  { id: 'HR', name: 'Haryana', totalSeats: 10, BJP: 5, INC: 5, OTH: 0, leading: 'BJP' },
  { id: 'UT', name: 'Uttarakhand', totalSeats: 5, BJP: 5, INC: 0, OTH: 0, leading: 'BJP' },
  { id: 'HP', name: 'Himachal Pradesh', totalSeats: 4, BJP: 4, INC: 0, OTH: 0, leading: 'BJP' },
  { id: 'TR', name: 'Tripura', totalSeats: 2, BJP: 2, INC: 0, OTH: 0, leading: 'BJP' },
  { id: 'AR', name: 'Arunachal Pradesh', totalSeats: 2, BJP: 2, INC: 0, OTH: 0, leading: 'BJP' },
  { id: 'GA', name: 'Goa', totalSeats: 2, BJP: 1, INC: 1, OTH: 0, leading: 'BJP' },
  { id: 'MN', name: 'Manipur', totalSeats: 2, INC: 2, BJP: 0, OTH: 0, leading: 'INC' },
  { id: 'ML', name: 'Meghalaya', totalSeats: 2, VPP: 1, INC: 1, OTH: 0, leading: 'VPP' },
  { id: 'SK', name: 'Sikkim', totalSeats: 1, SKM: 1, OTH: 0, leading: 'SKM' },
  { id: 'MZ', name: 'Mizoram', totalSeats: 1, ZPM: 1, OTH: 0, leading: 'ZPM' },
  { id: 'NL', name: 'Nagaland', totalSeats: 1, INC: 1, OTH: 0, leading: 'INC' },
];
