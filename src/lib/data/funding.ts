export interface FundingSource {
  id: string;
  name: string;
  shortName?: string;
  grantRef?: string;
  description?: string;
  url?: string;
}

// Alphabetical, synced from the acknowledgements in the Tessera HPC report (22 September 2026).
// Grant references are shown on the site as plain text so funders' search tools can index them.
export const fundingSources: FundingSource[] = [
  {
    id: 'amd',
    name: 'AMD',
    url: 'https://www.amd.com',
  },
  {
    id: 'aws-open-data',
    name: 'AWS Open Data',
  },
  {
    id: 'bernstein',
    name: 'John Bernstein',
  },
  {
    id: 'dclimate',
    name: 'dClimate',
  },
  {
    id: 'google',
    name: 'Google',
  },
  {
    id: 'intel',
    name: 'Intel',
  },
  {
    id: 'jane-street',
    name: 'Jane Street',
    url: 'https://www.janestreet.com',
  },
  {
    id: 'mantle-labs',
    name: 'Mantle Labs',
  },
  {
    id: 'microsoft-ai-for-good',
    name: 'Microsoft AI for Good Lab',
    url: 'https://www.microsoft.com/en-us/research/group/ai-for-good-research-lab/',
  },
  {
    id: 'clr',
    name: 'NERC Centre for Landscape Regeneration',
    shortName: 'CLR',
    url: 'https://www.clr.conservation.cam.ac.uk/about-centre',
  },
  {
    id: 'nvidia',
    name: 'NVIDIA',
  },
  {
    id: 'sansom',
    name: 'Dr Robert Sansom',
  },
  {
    id: 'source-coop',
    name: 'Source Coop',
    url: 'https://source.coop/',
  },
  {
    id: 'dirac',
    name: 'STFC Durham DiRAC HPC Facility',
  },
  {
    id: 'tarides',
    name: 'Tarides',
    url: 'https://tarides.com',
  },
  {
    id: 'ukri',
    name: 'UK Research and Innovation',
  },
  {
    id: 'airr-dawn-zenith',
    name: 'UK Research and Innovation AI Research Resource: Dawn and Zenith',
    grantRef: 'ST/Z000890/1',
    description: 'Operated by the University of Cambridge and funded by the Department for Business, Innovation, Science and Trade (BSIT) and UKRI as part of the UK AI Research Resource, and the National Compute Resource, delivered in partnership with Dell Technologies and AMD.',
  },
  {
    id: 'airr-isambard',
    name: 'UK Research and Innovation AI Research Resource: Isambard-AI',
    grantRef: 'ST/AIRR/I-A-I/1023',
    description: 'Operated by the Bristol Centre for Supercomputing.',
  },
  {
    id: 'epic',
    name: 'UKRI Cross Research Council Responsive Mode: EPIC',
    shortName: 'UKRI EPIC',
    description: 'Creating foundation systems for environmental planetary intelligence.',
    url: 'https://www.ukri.org/news/first-projects-from-ukris-new-interdisciplinary-scheme-announced/',
  },
  {
    id: 'vultr',
    name: 'Vultr',
    url: 'https://www.vultr.com',
  },
];
