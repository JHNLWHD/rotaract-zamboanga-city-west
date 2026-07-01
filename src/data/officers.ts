export interface Officer {
  name: string;
  position: string;
  term: string;
  responsibilities: string;
  category: 'Executive' | 'Director' | 'Advisor';
  email?: string;
  phone?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export interface PastPresident {
  term: string;
  name: string;
  status?: 'current' | 'president_elect' | 'future';
}

export const boardOfDirectors: Officer[] = [
  {
    name: 'Darylle Sanghanan',
    position: 'President',
    term: '2026-2027',
    responsibilities: 'Overall leadership and strategic direction of the club',
    category: 'Executive',
    email: 'sanghanandarylle@gmail.com',
    phone: '9275427653',
  },
  {
    name: 'Criseline Barredo',
    position: 'Vice President / President-Elect',
    term: '2026-2027',
    responsibilities: 'Assists president and prepares for next term leadership',
    category: 'Executive',
    email: 'barredo1995@gmail.com',
    phone: '9060873795',
  },
  {
    name: 'Precious Ann C. Gabiazon',
    position: 'President-Nominee',
    term: '2026-2027',
    responsibilities:
      'Prepares for future club leadership under the presidential succession track',
    category: 'Executive',
    email: 'annecarrillo10@gmail.com',
    phone: '9972987832',
  },
  {
    name: 'Velithelen Yves S. Abduhasad',
    position: 'Secretary',
    term: '2026-2027',
    responsibilities: 'Meeting minutes, correspondence, and club documentation',
    category: 'Executive',
    email: 'velithelenyves@gmail.com',
    phone: '9056330352',
  },
  {
    name: 'Rizzandra Manubay',
    position: 'Assistant Secretary',
    term: '2026-2027',
    responsibilities:
      'Assists the Secretary in documentation and correspondence',
    category: 'Executive',
  },
  {
    name: 'Jie J. Conturno-Wahid',
    position: 'Assistant Secretary',
    term: '2026-2027',
    responsibilities:
      'Assists the Secretary in documentation and correspondence',
    category: 'Executive',
  },
  {
    name: 'Jessa Dello',
    position: 'Finance Director',
    term: '2026-2027',
    responsibilities: 'Financial management, budgeting, and fiscal oversight',
    category: 'Executive',
    email: 'dellojessa5@gmail.com',
    phone: '9355031378',
  },
  {
    name: 'Jason Justin Lim',
    position: 'Assistant Finance Director',
    term: '2026-2027',
    responsibilities: 'Assists the Finance Director in financial matters',
    category: 'Executive',
    email: 'limjasonjustin@gmail.com',
    phone: '9058081085',
  },
  {
    name: 'Angelica Dimaano',
    position: 'Auditor',
    term: '2026-2027',
    responsibilities:
      'Reviews club finances and ensures fiscal accountability and compliance',
    category: 'Executive',
    email: 'anglcsmbjn@gmail.com',
    phone: '9367688300',
  },
];

export const directors: Officer[] = [
  {
    name: 'Rence Delos Santos',
    position: 'Public Image Chair',
    term: '2026-2027',
    responsibilities: 'Marketing, communications, and social media management',
    category: 'Director',
  },
  {
    name: 'Sarah Saavedra',
    position: 'Club Service Director',
    term: '2026-2027',
    responsibilities: 'Internal club activities and member engagement',
    category: 'Director',
    email: 'Saavedra.sarah.p@gmail.com',
    phone: '9943712539',
  },
  {
    name: 'Ayesha Alih',
    position: 'Assistant Club Service Director',
    term: '2026-2027',
    responsibilities: 'Assists the Club Service Director in member engagement',
    category: 'Director',
  },
  {
    name: 'Hash Ibrahim',
    position: 'International Service Chair',
    term: '2026-2027',
    responsibilities: 'Global projects and international partnerships',
    category: 'Director',
    email: 'hash.asaali.ibrahim@gmail.com',
    phone: '9977038137',
  },
  {
    name: 'Nick Paira',
    position: 'Assistant International Service Director',
    term: '2026-2027',
    responsibilities:
      'Assists the International Service Director in global projects',
    category: 'Director',
    email: 'oneilnickpaira@gmail.com',
    phone: '9565527855',
  },
  {
    name: 'Mark Vincent Faith A. Item',
    position: 'Membership Chair',
    term: '2026-2027',
    responsibilities: 'Recruitment, retention, and new member orientation',
    category: 'Director',
    email: 'mvitem5@gmail.com',
    phone: '9153337290',
  },
  {
    name: 'Jhoenil Wahid',
    position: 'Assistant Membership Chair',
    term: '2026-2027',
    responsibilities:
      'Assists the Membership Chair in recruitment and retention',
    category: 'Director',
    email: 'aljhoenilw@gmail.com',
    phone: '9068484821',
  },
  {
    name: 'Dave Ramos',
    position: 'Professional Development Director',
    term: '2026-2027',
    responsibilities:
      'Organizes career development and skill-building activities',
    category: 'Director',
  },
  {
    name: 'April Sultan',
    position: 'Assistant Professional Development Director',
    term: '2026-2027',
    responsibilities:
      'Assists the Professional Development Director in activities',
    category: 'Director',
    email: 'sultanaprilmay@gmail.com',
    phone: '9569304826',
  },
  {
    name: 'Precious Ann C. Gabiazon',
    position: 'Community Service Director',
    term: '2026-2027',
    responsibilities:
      'Coordinates community service projects and volunteer activities',
    category: 'Director',
    email: 'annecarrillo10@gmail.com',
    phone: '9972987832',
  },
  {
    name: 'Aldwin Felipe',
    position: 'Assistant Community Service Director',
    term: '2026-2027',
    responsibilities: 'Assists the Community Service Director in projects',
    category: 'Director',
    email: 'aaldwinfelipe@gmail.com',
    phone: '9919334592',
  },
  {
    name: 'Remo Varquez',
    position: 'TRF Chair',
    term: '2026-2027',
    responsibilities: 'Leads The Rotary Foundation initiatives',
    category: 'Director',
    email: 'removarquez@gmail.com',
    phone: '9661569172',
  },
  {
    name: 'Nick Paira',
    position: 'Assistant TRF Director',
    term: '2026-2027',
    responsibilities: 'Assists the TRF Director in foundation initiatives',
    category: 'Director',
    email: 'oneilnickpaira@gmail.com',
    phone: '9565527855',
  },
];

export const advisors: Officer[] = [
  {
    name: 'Nick Paira',
    position: 'Club Advisor',
    term: '2026-2027',
    responsibilities: 'Provides guidance and mentorship to the club',
    category: 'Advisor',
    email: 'oneilnickpaira@gmail.com',
    phone: '9565527855',
  },
  {
    name: 'Lanelle Banez',
    position: 'Club Learning Facilitator',
    term: '2026-2027',
    responsibilities: 'Facilitates learning and development for club members',
    category: 'Advisor',
    email: 'lanelle.cbanez@gmail.com',
    phone: '9354578924',
  },
];

export const allOfficers: Officer[] = [
  ...boardOfDirectors,
  ...directors,
  ...advisors,
];

export const pastPresidents: PastPresident[] = [
  {
    term: '2009-2010',
    name: 'Hermie Duterte',
  },
  {
    term: '2010-2011',
    name: 'Wenceslao Medina',
  },
  {
    term: '2011-2012',
    name: 'Aldimin Kalli',
  },
  {
    term: '2012-2013',
    name: 'Bryan Callao',
  },
  {
    term: '2013-2014',
    name: 'Deminic Bontia',
  },
  {
    term: '2014-2015',
    name: 'Philip Vega',
  },
  {
    term: '2015-2016',
    name: 'Edilwaleed Hairon',
  },
  {
    term: '2016-2017',
    name: "O'Neil Nick F. Paira",
  },
  {
    term: '2017-2018',
    name: 'Kevin Simbajon',
  },
  {
    term: '2018-2019',
    name: 'Arwald A. Candido',
  },
  {
    term: '2019-2020',
    name: 'April May D. Sultan',
  },
  {
    term: '2020-2021',
    name: 'Kayenne Delos Reyes',
  },
  {
    term: '2021-2022',
    name: 'Remo J. Varquez',
  },
  {
    term: '2022-2023',
    name: 'Ernan S. Natividad',
  },
  {
    term: '2023-2024',
    name: 'Ma. Theresa Lanelle C. Bañez',
  },
  {
    term: '2024-2025',
    name: 'Mark Vincent Faith A. Item',
  },
  {
    term: '2025-2026',
    name: 'Hazra A. Ibrahim',
  },
  {
    term: '2026-2027',
    name: 'Darylle B. Sanghanan',
    status: 'current',
  },
  {
    term: '2027-2028',
    name: 'Criseline T. Barredo',
    status: 'president_elect',
  },
  {
    term: '2028-2029',
    name: 'Precious Ann C. Gabiazon',
    status: 'future',
  },
];

// Helper functions
export const getExecutiveBoard = () =>
  allOfficers.filter(officer => officer.category === 'Executive');
export const getCurrentDirectors = () =>
  allOfficers.filter(officer => officer.category === 'Director');
export const getAdvisors = () =>
  allOfficers.filter(officer => officer.category === 'Advisor');
export const getCurrentTerm = () => '2026-2027';
