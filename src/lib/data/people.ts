export type PersonRole = 'faculty' | 'researcher' | 'affiliate' | 'collaborator';

export interface Person {
  id: string;
  name: string;
  role: PersonRole;
  title: string;
  affiliation: string;
  url?: string;
  initials: string;
  /** Relative path under /people/ to a cropped square portrait, e.g. '/people/jane-doe.jpg'. */
  photo?: string;
  /** Other spellings of this person's name as they appear in paper or blog
   *  author strings, so getPersonByName()/resolveAuthors() still resolve them. */
  aliases?: string[];
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
    photo: '/people/srinivasan-keshav.jpg',
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
    photo: '/people/david-coomes.jpg',
    aliases: ['David Coomes'],
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
    photo: '/people/anil-madhavapeddy.jpg',
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
    photo: '/people/sadiq-jaffer.jpg',
    programmes: ['tessera'],
  },

  // Researchers (sorted A-Z by surname)
  {
    id: 'james-ball',
    name: 'James Ball',
    role: 'researcher',
    title: 'EPIC Postdoc',
    affiliation: 'Department of Plant Sciences, Cambridge',
    url: 'https://patball1.github.io',
    initials: 'JB',
    photo: '/people/james-ball.jpg',
    aliases: ['James G.C. Ball', 'James G. C. Ball'],
    email: 'jgcb3@cam.ac.uk',
    programmes: ['tessera', 'habitat-mapping'],
  },
  {
    id: 'felipe-begliomini',
    name: 'Felipe Begliomini',
    role: 'researcher',
    title: '4C PhD Student',
    affiliation: 'Department of Plant Sciences, Cambridge',
    initials: 'FB',
    photo: '/people/felipe-begliomini.jpg',
    aliases: ['Felipe Nincao Begliomini'],
    programmes: ['habitat-mapping'],
  },
  {
    id: 'michael-dales',
    name: 'Michael W. Dales',
    role: 'researcher',
    title: 'Assistant Research Professor',
    affiliation: 'Department of Computer Science and Technology, Cambridge',
    url: 'https://digitalflapjack.com',
    initials: 'MD',
    photo: '/people/michael-dales.jpg',
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
    photo: '/people/mark-elvers.jpg',
    programmes: ['tessera'],
  },
  {
    id: 'zhengpeng-feng',
    name: 'Zhengpeng Feng',
    role: 'researcher',
    title: 'PhD student and lead researcher',
    affiliation: 'Department of Computer Science and Technology, Cambridge',
    url: 'https://www.cst.cam.ac.uk/people/zf281',
    initials: 'ZF',
    photo: '/people/zhengpeng-feng.jpg',
    aliases: ['Frank Feng', 'Zhengpeng (Frank) Feng'],
    programmes: ['tessera', 'habitat-mapping'],
  },
  {
    id: 'jovana-knezevic',
    name: 'Jovana Knezevic',
    role: 'researcher',
    title: '4C PhD Student',
    affiliation: 'Department of Computer Science and Technology, Cambridge',
    initials: 'JK',
    photo: '/people/jovana-knezevic.jpg',
    programmes: ['tessera', 'habitat-mapping'],
  },
  {
    id: 'jingtao-li',
    name: 'Jingtao Li',
    role: 'researcher',
    title: 'Research Associate',
    affiliation: 'Department of Computer Science and Technology, Cambridge',
    url: 'https://jingtao-li-cver.github.io/home_page/',
    initials: 'JL',
    photo: '/people/jingtao-li.jpg',
    programmes: ['tessera'],
  },
  {
    id: 'jon-ludlam',
    name: 'Jon Ludlam',
    role: 'researcher',
    title: 'Assistant Research Professor',
    affiliation: 'Department of Computer Science and Technology, Cambridge',
    url: 'https://jon.recoil.org',
    initials: 'JL',
    photo: '/people/jon-ludlam.jpg',
    programmes: ['tessera'],
  },
  {
    id: 'aneesh-naik',
    name: 'Aneesh Naik',
    role: 'researcher',
    title: 'Postdoctoral Research Associate',
    affiliation: 'Department of Plant Sciences, Cambridge',
    url: 'https://www.aneeshnaik.com/',
    initials: 'AN',
    photo: '/people/aneesh-naik.jpg',
    programmes: ['tessera'],
  },
  {
    id: 'yihang-she',
    name: 'Yihang She',
    role: 'researcher',
    title: 'PhD student',
    affiliation: 'Department of Computer Science and Technology, Cambridge',
    initials: 'YS',
    photo: '/people/yihang-she.jpg',
    programmes: ['tessera'],
  },
  {
    id: 'silja-sormunen',
    name: 'Silja Sormunen',
    role: 'researcher',
    title: 'Research Associate',
    affiliation: 'Department of Computer Science and Technology, Cambridge',
    url: 'https://scholar.google.com/citations?user=v3HaAnUAAAAJ&hl=en',
    initials: 'SS',
    photo: '/people/silja-sormunen.jpg',
    programmes: ['tessera'],
  },
  {
    id: 'pedro-sousa',
    name: 'Pedro Sousa',
    role: 'researcher',
    title: 'PhD student',
    affiliation: 'Department of Computer Science and Technology, Cambridge',
    initials: 'PS',
    photo: '/people/pedro-sousa.jpg',
    programmes: ['tessera'],
  },
  {
    id: 'robin-young',
    name: 'Robin Young',
    role: 'researcher',
    title: 'PhD student',
    affiliation: 'Department of Computer Science and Technology, Cambridge',
    url: 'https://www.cst.cam.ac.uk/people/ray25',
    initials: 'RY',
    photo: '/people/robin-young.jpg',
    programmes: ['tessera'],
  },

  // Research Affiliates (sorted A-Z by surname)
  {
    id: 'clement-atzberger',
    name: 'Clement Atzberger',
    role: 'affiliate',
    title: 'Cyclops.AI',
    affiliation: '',
    url: 'https://scholar.google.com/citations?user=lBhFXdIAAAAJ',
    initials: 'CA',
    photo: '/people/clement-atzberger.jpg',
    programmes: ['tessera', 'habitat-mapping'],
  },
  {
    id: 'andrew-blake',
    name: 'Andrew Blake',
    role: 'affiliate',
    title: 'Samsung AI Centre',
    affiliation: '',
    url: 'https://royalsociety.org/people/andrew-blake-11097/',
    initials: 'AB',
    photo: '/people/andrew-blake.jpg',
    programmes: ['tessera'],
  },
  {
    id: 'amandine-debus',
    name: 'Amandine Debus',
    role: 'affiliate',
    title: 'CLR Postdoc',
    affiliation: 'Centre for Landscape Regeneration',
    initials: 'AD',
    programmes: ['habitat-mapping', 'clr'],
  },
  {
    id: 'kyle-gao',
    name: 'Kyle Gao',
    role: 'affiliate',
    title: 'Visiting Assistant Professor',
    affiliation: 'Department of Computer Science and Technology, Cambridge',
    url: 'https://www.linkedin.com/in/yi-lin-kyle-gao',
    initials: 'KG',
    photo: '/people/kyle-gao.jpg',
    email: 'ylg23@cam.ac.uk',
    programmes: ['tessera'],
  },
  {
    id: 'madeline-lisaius',
    name: 'Madeline C. Lisaius',
    role: 'affiliate',
    title: 'Graduated PhD student',
    affiliation: 'Department of Computer Science and Technology, Cambridge',
    url: 'https://mlisaius.github.io/',
    initials: 'ML',
    photo: '/people/madeline-lisaius.jpg',
    programmes: ['tessera'],
  },
  {
    id: 'barbara-neto-bradley',
    name: 'Barbara Neto-Bradley',
    role: 'affiliate',
    title: 'CLR Postdoc',
    affiliation: 'Centre for Landscape Regeneration',
    initials: 'BN',
    programmes: ['habitat-mapping', 'clr'],
  },
  {
    id: 'lucy-watson',
    name: 'Lucy Watson',
    role: 'affiliate',
    title: 'Coordinator',
    affiliation: 'Department of Plant Sciences, Cambridge',
    initials: 'LW',
    programmes: ['habitat-mapping'],
  },
  {
    id: 'jana-wicklein',
    name: 'Jana Wicklein',
    role: 'affiliate',
    title: 'Researcher',
    affiliation: 'Fondazione Edmund Mach / University of Trento',
    initials: 'JW',
    aliases: ['Jana Annika Wicklein'],
    programmes: ['habitat-mapping'],
  },
  {
    id: 'jess-williams',
    name: 'Jess Williams',
    role: 'affiliate',
    title: 'CLR Coordinator',
    affiliation: 'Centre for Landscape Regeneration',
    initials: 'JW',
    programmes: ['habitat-mapping', 'clr'],
  },

  // Project Collaborators — rendered as a plain single-column list of names +
  // institution only (no photo, no job title). The role string stays
  // 'collaborator' so About.svelte and any other getPeopleByRole('collaborator')
  // caller keeps working unchanged.
  {
    id: 'petr-baldrian',
    name: 'Petr Baldrian',
    role: 'collaborator',
    title: '',
    affiliation: 'Institute of Microbiology of the Czech Academy of Sciences',
    initials: 'PB',
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
    id: 'karl-dexter',
    name: 'Karl Dexter',
    role: 'collaborator',
    title: 'Tropical forest ecology and habitat mapping',
    affiliation: 'University of Edinburgh',
    initials: 'KD',
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
    id: 'evie-huhtala',
    name: 'Evie Huhtala',
    role: 'collaborator',
    title: 'CLR PhD student',
    affiliation: 'University of Cambridge',
    initials: 'EH',
    programmes: ['habitat-mapping', 'clr'],
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
    id: 'toby-kiers',
    name: 'E. Toby Kiers',
    role: 'collaborator',
    title: '',
    affiliation: 'Society for the Protection of Underground Networks (SPUN)',
    initials: 'TK',
  },
  {
    id: 'petr-kohout',
    name: 'Petr Kohout',
    role: 'collaborator',
    title: '',
    affiliation: 'Institute of Microbiology of the Czech Academy of Sciences',
    initials: 'PK',
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
    id: 'niall-robinson',
    name: 'Niall Robinson',
    role: 'collaborator',
    title: '',
    affiliation: 'NVIDIA',
    initials: 'NR',
  },
  {
    id: 'ira-shokar',
    name: 'Ira Shokar',
    role: 'collaborator',
    title: '',
    affiliation: 'NVIDIA',
    initials: 'IS',
  },
  {
    id: 'will-tebbutt',
    name: 'Will Tebbutt',
    role: 'collaborator',
    title: '',
    affiliation: 'Department of Engineering, Cambridge',
    initials: 'WT',
    programmes: ['tessera'],
  },
  {
    id: 'richard-turner',
    name: 'Richard E. Turner',
    role: 'collaborator',
    title: '',
    affiliation: 'Department of Engineering, Cambridge',
    initials: 'RT',
    programmes: ['tessera'],
  },
  {
    id: 'michael-van-nuland',
    name: 'Michael E. Van Nuland',
    role: 'collaborator',
    title: '',
    affiliation: 'Society for the Protection of Underground Networks (SPUN)',
    initials: 'MV',
  },
  {
    id: 'tomas-vetrovsky',
    name: 'Tomáš Větrovský',
    role: 'collaborator',
    title: '',
    affiliation: 'Institute of Microbiology of the Czech Academy of Sciences',
    initials: 'TV',
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
  return people.find((p) => p.name === name || p.aliases?.includes(name));
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
