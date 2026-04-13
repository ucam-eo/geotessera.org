export type ProjectStatus = 'completed' | 'in-progress' | 'planned';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  status: ProjectStatus;
  statusLabel: string;
  region: string;
  tags: string[];
  description: string;
  team: string[];
  stats?: { label: string; value: string }[];
  links?: { label: string; url: string }[];
  hasDetailPage: boolean;
  fundingSources?: string[];
  partners?: string[];
  timeline?: string;
}

export const projects: Project[] = [
  {
    id: 'trentino',
    title: 'High-Resolution Species Mapping in the Italian Alps',
    subtitle: 'Foundation-model embeddings enable species-level tree mapping across 6,200 km\u00B2 of mountainous terrain, substantially outperforming conventional satellite approaches.',
    status: 'completed',
    statusLabel: 'Completed',
    region: 'Trentino, Italy',
    tags: ['Tessera', 'AlphaEarth', '18 species', '10 m resolution', 'Label distillation'],
    description: 'Our flagship project evaluates two geospatial foundation models (Tessera and AlphaEarth) for tree species classification across 6,200 km\u00B2 of the Autonomous Province of Trento. Using parcel-level forest inventories as reference data, we demonstrate that FM embeddings substantially outperform conventional satellite approaches, achieving higher accuracy with far fewer training labels while preserving ecologically meaningful structure aligned with functional and taxonomic groupings.',
    team: ['james-ball', 'jana-wicklein', 'zhengpeng-feng', 'jovana-knezevic', 'clement-atzberger', 'michele-dalponte', 'david-coomes'],
    stats: [
      { label: 'Species classes', value: '18' },
      { label: 'Spatial resolution', value: '10 m' },
      { label: 'Area', value: '6,200 km\u00B2' },
    ],
    links: [
      { label: 'View full results', url: '/projects/trentino' },
      { label: 'Read preprint', url: 'https://doi.org/10.64898/2026.02.23.707022' },
      { label: 'Code on GitHub', url: 'https://github.com/PatBall1/trentino-trees' },
    ],
    hasDetailPage: true,
    fundingSources: ['epic'],
    partners: ['fmach', 'unitn'],
  },
  {
    id: 'cumbria',
    title: 'Mapping Landscape Recovery in Cumbria',
    subtitle: 'Establishing baseline habitat maps across approximately 86,500 hectares encompassing Cumbria\u2019s Landscape Recovery schemes.',
    status: 'in-progress',
    statusLabel: 'In Progress',
    region: 'Cumbria, UK',
    tags: ['86,500 hectares', 'Landscape Recovery', 'CLR funded', 'National Trust'],
    description: 'Establishing baseline habitat maps across approximately 86,500 hectares encompassing Cumbria\u2019s five Landscape Recovery schemes, the Cumbria Connect initiative, and National Trust estates. Using Tessera to classify natural, semi-natural, and farmed habitats from 2017 to 2025, providing essential reference points for tracking 20\u201330 year restoration outcomes. Cumbria accounts for roughly 20% of the total Landscape Recovery area nationally.',
    team: ['amandine-debus', 'barbara-neto-bradley', 'jess-williams', 'david-coomes'],
    hasDetailPage: false,
    fundingSources: ['clr'],
    partners: ['nerc-clr'],
  },
  {
    id: 'cairngorms',
    title: 'Evaluating Rewilding in the Cairngorms',
    subtitle: 'Supporting an ambitious 200-year vision for rewilding across the Cairngorms with Tessera and LiDAR.',
    status: 'in-progress',
    statusLabel: 'In Progress',
    region: 'Cairngorms, Scotland',
    tags: ['Tessera + LiDAR', 'Rewilding', 'CLR funded', '3D habitat mapping'],
    description: 'Supporting the Cairngorm Connect initiative \u2014 an ambitious 200-year vision for rewilding across the Cairngorms \u2014 by integrating Tessera embeddings with Scotland\u2019s National LIDAR Programme. The combination of continuous spectral-temporal monitoring with structural 3D data enables automated assessment of ecosystem recovery trajectories, distinguishing between spectrally similar but structurally distinct habitats.',
    team: ['amandine-debus', 'barbara-neto-bradley', 'jess-williams', 'david-coomes'],
    hasDetailPage: false,
    fundingSources: ['clr'],
    partners: ['nerc-clr'],
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function getFeaturedProjects(count = 3): Project[] {
  const order: ProjectStatus[] = ['completed', 'in-progress', 'planned'];
  return [...projects]
    .sort((a, b) => order.indexOf(a.status) - order.indexOf(b.status))
    .slice(0, count);
}
