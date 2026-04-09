export interface FundingSource {
  id: string;
  name: string;
  shortName?: string;
  description: string;
  url?: string;
}

export const fundingSources: FundingSource[] = [
  {
    id: 'epic',
    name: 'UKRI Cross Research Council / EPIC',
    description: 'The UKRI Cross Research Council Responsive Mode Pilot Scheme grant "Creating foundation systems for environmental planetary intelligence" (EPIC) funds the core postdoctoral research on geospatial foundation models for habitat mapping, supporting the Trentino species mapping project and Latin America vegetation mapping work.',
    url: 'https://www.ukri.org/news/first-projects-from-ukris-new-interdisciplinary-scheme-announced/',
  },
  {
    id: 'clr',
    name: 'NERC Centre for Landscape Regeneration',
    shortName: 'CLR',
    description: 'A \u00A310M programme funding UK-focused habitat mapping and landscape restoration monitoring work in Cumbria, the Cairngorms, the Fens, and national-scale habitat condition mapping.',
  },
  {
    id: '4c',
    name: '4C Programme',
    description: 'Supports PhD studentships contributing to the change detection and global habitat mapping components of the research programme.',
    url: 'https://4c.cst.cam.ac.uk',
  },
  {
    id: 'cambridge',
    name: 'University of Cambridge',
    description: 'Institutional support through the Department of Plant Sciences and the Department of Computer Science and Technology.',
  },
];
