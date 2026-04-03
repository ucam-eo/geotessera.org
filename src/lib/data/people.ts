export type PersonRole = 'faculty' | 'researcher' | 'collaborator';

export interface Person {
  id: string;
  name: string;
  role: PersonRole;
  title: string;
  affiliation: string;
  url?: string;
  initials: string;
  email?: string;
  programmes?: string[];
}

export const people: Person[] = [
  // Lead Faculty
  {
    id: 'srinivasan-keshav',
    name: 'Srinivasan Keshav',
    role: 'faculty',
    title: 'Robert Sansom Professor of Computer Science',
    affiliation: 'Department of Computer Science and Technology, Cambridge',
    url: 'https://www.cst.cam.ac.uk/people/sk818',
    initials: 'SK',
    programmes: ['tessera', 'habitat-mapping'],
  },
  {
    id: 'david-coomes',
    name: 'David A. Coomes',
    role: 'faculty',
    title: 'Professor of Forest Ecology',
    affiliation: 'Department of Plant Sciences, Cambridge',
    url: 'https://coomeslab.org/research-group/current-members/professor-david-coomes/',
    initials: 'DC',
    email: 'dac18@cam.ac.uk',
    programmes: ['tessera', 'habitat-mapping'],
  },
  {
    id: 'anil-madhavapeddy',
    name: 'Anil Madhavapeddy',
    role: 'faculty',
    title: 'Professor of Planetary Computing',
    affiliation: 'Department of Computer Science and Technology, Cambridge',
    url: 'https://anil.recoil.org/',
    initials: 'AM',
    programmes: ['tessera', 'habitat-mapping'],
  },
  {
    id: 'sadiq-jaffer',
    name: 'Sadiq Jaffer',
    role: 'faculty',
    title: 'Assistant Research Professor',
    affiliation: 'Department of Computer Science and Technology, Cambridge',
    url: 'https://toao.com',
    initials: 'SJ',
    programmes: ['tessera'],
  },

  // Researchers
  {
    id: 'zhengpeng-feng',
    name: 'Zhengpeng Feng',
    role: 'researcher',
    title: 'PhD student and lead researcher',
    affiliation: 'Department of Computer Science and Technology, Cambridge',
    url: 'https://www.cst.cam.ac.uk/people/zf281',
    initials: 'ZF',
    programmes: ['tessera', 'habitat-mapping'],
  },
  {
    id: 'robin-young',
    name: 'Robin Young',
    role: 'researcher',
    title: 'PhD student',
    affiliation: 'Department of Computer Science and Technology, Cambridge',
    url: 'https://www.cst.cam.ac.uk/people/ray25',
    initials: 'RY',
    programmes: ['tessera'],
  },
  {
    id: 'jovana-knezevic',
    name: 'Jovana Knezevic',
    role: 'researcher',
    title: '4C PhD Student',
    affiliation: 'Department of Computer Science, Cambridge',
    initials: 'JK',
    programmes: ['tessera', 'habitat-mapping'],
  },
  {
    id: 'madeline-lisaius',
    name: 'Madeline C. Lisaius',
    role: 'researcher',
    title: 'Graduated PhD student',
    affiliation: 'Department of Computer Science and Technology, Cambridge',
    url: 'https://mlisaius.github.io/',
    initials: 'ML',
    programmes: ['tessera'],
  },
  {
    id: 'pedro-sousa',
    name: 'Pedro Sousa',
    role: 'researcher',
    title: 'PhD student',
    affiliation: 'Department of Computer Science and Technology, Cambridge',
    initials: 'PS',
    programmes: ['tessera'],
  },
  {
    id: 'james-ball',
    name: 'James Ball',
    role: 'researcher',
    title: 'EPIC Postdoc',
    affiliation: 'Department of Plant Sciences, Cambridge',
    url: 'https://patball1.github.io',
    initials: 'JB',
    email: 'jgcb3@cam.ac.uk',
    programmes: ['tessera', 'habitat-mapping'],
  },
  {
    id: 'jon-ludlam',
    name: 'Jon Ludlam',
    role: 'researcher',
    title: 'Assistant Research Professor',
    affiliation: 'Department of Computer Science and Technology, Cambridge',
    url: 'https://jon.recoil.org',
    initials: 'JL',
    programmes: ['tessera'],
  },
  {
    id: 'mark-elvers',
    name: 'Mark Elvers',
    role: 'researcher',
    title: 'Senior software engineer',
    affiliation: 'Department of Computer Science and Technology, Cambridge',
    url: 'https://tunbury.org',
    initials: 'ME',
    programmes: ['tessera'],
  },
  {
    id: 'michael-dales',
    name: 'Michael W. Dales',
    role: 'researcher',
    title: 'Assistant Research Professor',
    affiliation: 'Department of Computer Science and Technology, Cambridge',
    url: 'https://digitalflapjack.com',
    initials: 'MD',
    programmes: ['tessera'],
  },
  {
    id: 'jana-wicklein',
    name: 'Jana Wicklein',
    role: 'researcher',
    title: 'Researcher',
    affiliation: 'Fondazione Edmund Mach / University of Trento',
    initials: 'JW',
    programmes: ['habitat-mapping'],
  },
  {
    id: 'amandine-debus',
    name: 'Amandine Debus',
    role: 'researcher',
    title: 'CLR Postdoc',
    affiliation: 'Centre for Landscape Regeneration',
    initials: 'AD',
    programmes: ['habitat-mapping', 'clr'],
  },
  {
    id: 'barbara-neto-bradley',
    name: 'Barbara Neto-Bradley',
    role: 'researcher',
    title: 'CLR Postdoc',
    affiliation: 'Centre for Landscape Regeneration',
    initials: 'BN',
    programmes: ['habitat-mapping', 'clr'],
  },
  {
    id: 'felipe-begliomini',
    name: 'Felipe Begliomini',
    role: 'researcher',
    title: '4C PhD Student',
    affiliation: 'University of Cambridge',
    initials: 'FB',
    programmes: ['habitat-mapping'],
  },
  {
    id: 'lucy-watson',
    name: 'Lucy Watson',
    role: 'researcher',
    title: 'Coordinator',
    affiliation: 'University of Cambridge',
    initials: 'LW',
    programmes: ['habitat-mapping'],
  },
  {
    id: 'jess-williams',
    name: 'Jess Williams',
    role: 'researcher',
    title: 'CLR Coordinator',
    affiliation: 'Centre for Landscape Regeneration',
    initials: 'JW',
    programmes: ['habitat-mapping', 'clr'],
  },

  // Collaborators
  {
    id: 'silja-sormunen',
    name: 'Silja Sormunen',
    role: 'collaborator',
    title: 'Researcher',
    affiliation: '',
    url: 'https://www.researchgate.net/scientific-contributions/Silja-Sormunen-2168369578',
    initials: 'SS',
    programmes: ['tessera'],
  },
  {
    id: 'toby-jackson',
    name: 'Toby Jackson',
    role: 'collaborator',
    title: 'Senior research associate',
    affiliation: 'University of Bristol',
    url: 'https://www.bristol.ac.uk/people/person/Toby-Jackson-0f0cc27a-9b35-479c-b2a6-7459834ca871/',
    initials: 'TJ',
    programmes: ['tessera'],
  },
  {
    id: 'andrew-blake',
    name: 'Andrew Blake',
    role: 'collaborator',
    title: 'Samsung AI Centre',
    affiliation: '',
    url: 'https://royalsociety.org/people/andrew-blake-11097/',
    initials: 'AB',
    programmes: ['tessera'],
  },
  {
    id: 'clement-atzberger',
    name: 'Clement Atzberger',
    role: 'collaborator',
    title: 'Cyclops.AI',
    affiliation: '',
    url: 'https://scholar.google.com/citations?user=lBhFXdIAAAAJ',
    initials: 'CA',
    programmes: ['tessera', 'habitat-mapping'],
  },
  {
    id: 'markus-immitzer',
    name: 'Markus Immitzer',
    role: 'collaborator',
    title: 'Cyclops.AI',
    affiliation: '',
    url: 'https://scholar.google.at/citations?user=VwtoQ70AAAAJ',
    initials: 'MI',
    programmes: ['tessera'],
  },
  {
    id: 'michele-dalponte',
    name: 'Michele Dalponte',
    role: 'collaborator',
    title: 'Forest remote sensing and species classification',
    affiliation: 'Fondazione Edmund Mach',
    initials: 'MD',
    programmes: ['habitat-mapping'],
  },
  {
    id: 'adriane-esquivel-muelbert',
    name: 'Adriane Esquivel-Muelbert',
    role: 'collaborator',
    title: 'SynTreeSys consortium lead for Latin America',
    affiliation: 'University of Cambridge',
    initials: 'AE',
    programmes: ['habitat-mapping'],
  },
  {
    id: 'toby-pennington',
    name: 'Toby Pennington',
    role: 'collaborator',
    title: 'Neotropical phylogenetics and biogeography',
    affiliation: 'University of Exeter',
    initials: 'TP',
    programmes: ['habitat-mapping'],
  },
  {
    id: 'karl-dexter',
    name: 'Karl Dexter',
    role: 'collaborator',
    title: 'Tropical forest ecology and habitat mapping',
    affiliation: 'University of Edinburgh',
    initials: 'KD',
    programmes: ['habitat-mapping'],
  },
  {
    id: 'evie-huhtala',
    name: 'Evie Huhtala',
    role: 'collaborator',
    title: 'CLR PhD student',
    affiliation: 'University of Cambridge',
    initials: 'EH',
    programmes: ['habitat-mapping', 'clr'],
  },
];

export function getPeopleByRole(role: PersonRole): Person[] {
  return people.filter((p) => p.role === role);
}

export function getPeopleByProgramme(programme: string): Person[] {
  return people.filter((p) => p.programmes?.includes(programme));
}

export function getPersonById(id: string): Person | undefined {
  return people.find((p) => p.id === id);
}

export function getPersonByName(name: string): Person | undefined {
  return people.find((p) => p.name === name);
}

export interface ResolvedAuthor {
  name: string;
  person?: Person;
}

/** Split a comma-separated author string and resolve each against the people database. */
export function resolveAuthors(authorStr: string): ResolvedAuthor[] {
  return authorStr.split(/,\s*/).map((name) => {
    const trimmed = name.trim();
    return { name: trimmed, person: getPersonByName(trimmed) };
  });
}
