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
    id: 'latin-america',
    title: 'Continental Vegetation Mapping of Latin America',
    subtitle: 'Integrating Tessera embeddings with the SynTreeSys plot network to produce the first harmonised, AI-driven vegetation and habitat map of the Neotropics.',
    status: 'planned',
    statusLabel: 'Coming 2026',
    region: 'Neotropics',
    tags: ['SynTreeSys network', '10,000+ plots', 'IUCN aligned', 'Google Earth Engine'],
    description: 'Integrating Tessera foundation model embeddings with the SynTreeSys network \u2014 approximately 10,000 high-quality tropical forest plots spanning all major Neotropical biomes \u2014 to produce the first harmonised, AI-driven vegetation and habitat map of Latin America. The project will cover Amazon, Cerrado, Atlantic Forest, Chaco, Andes, and Mesoamerican biomes at 10\u201330 m resolution, aligned with IUCN habitat classification and WWF ecoregions.',
    team: ['james-ball', 'david-coomes', 'adriane-esquivel-muelbert', 'toby-pennington', 'karl-dexter'],
    hasDetailPage: false,
    fundingSources: ['epic'],
    partners: ['syntreesys'],
    timeline: 'Jan \u2013 Jul 2026',
  },
  {
    id: 'amazon',
    title: 'Amazon Functional Ecology at Continental Scale',
    subtitle: 'Three interconnected ecological questions powered by foundation model embeddings.',
    status: 'planned',
    statusLabel: 'Planned',
    region: 'Amazon Basin',
    tags: ['Functional traits', 'Ecosystem states', 'Tipping points', 'Hans ter Steege data'],
    description: 'Three interconnected ecological questions powered by foundation model embeddings: (1) Can embeddings recover continental-scale functional composition, mapping community-weighted wood density, SLA, and seed mass continuously at 10\u201330 m? (2) Are ecosystems discrete states or continuous manifolds in embedding space \u2014 revisiting the century-old Clements vs. Gleason debate with modern AI? (3) Do forests shift predictably along functional axes under disturbance, offering early warning signals for tipping points?',
    team: ['james-ball', 'david-coomes'],
    hasDetailPage: false,
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
  {
    id: 'spain-nz',
    title: 'Change Detection with Field Datasets',
    subtitle: 'Evaluating Tessera\u2019s ability to detect gradual ecological changes and abrupt disturbances.',
    status: 'planned',
    statusLabel: 'Planned',
    region: 'Spain & New Zealand',
    tags: ['Change detection', 'Ecosystem recovery', 'Disturbance'],
    description: 'Leveraging outstanding field datasets from Spain and New Zealand to evaluate Tessera\u2019s ability to detect gradual ecological changes (ecosystem recovery) and abrupt disturbances (fire, storm damage). A fundamental test of foundation model sensitivity to temporal ecological dynamics.',
    team: ['jovana-knezevic'],
    hasDetailPage: false,
  },
  {
    id: 'ecoregions',
    title: 'Embeddings vs Ecoregions',
    subtitle: 'Quantifying how effectively different landcover types separate within Tessera\u2019s latent embedding space.',
    status: 'planned',
    statusLabel: 'Planned',
    region: 'Global',
    tags: ['IUCN habitat types', 'Embedding analysis', 'GDM'],
    description: 'Quantifying how effectively different landcover types separate within Tessera\u2019s latent embedding space using Jung\u2019s 47 IUCN habitat types. Testing whether biome clustering, habitat integrity, and compositional coherence are encoded in the learned representations, using Generalised Dissimilarity Modelling.',
    team: ['jovana-knezevic'],
    hasDetailPage: false,
  },
  {
    id: 'global',
    title: 'Global Habitat Map',
    subtitle: 'A globally consistent habitat map by end of 2026, powered by the Global Plot Alliance.',
    status: 'planned',
    statusLabel: 'Planned',
    region: 'Global',
    tags: ['Global Plot Alliance', 'SPlot', '3.3M plots', 'Implicit labelling'],
    description: 'The ultimate goal: a globally consistent habitat map by end of 2026. Powered by the Global Plot Alliance \u2014 assembling a comprehensive database of vegetation plots worldwide, including access to 3.3 million plots through SPlot \u2014 and combining foundation-model embeddings with implicit labelling approaches for scalable habitat classification.',
    team: ['david-coomes', 'lucy-watson'],
    hasDetailPage: false,
    partners: ['splot', 'bien', 'unep-wcmc'],
  },
  {
    id: 'uk-national',
    title: 'UK National Habitat Condition Mapping',
    subtitle: 'Next generation habitat condition mapping systems for the UK, integrating Tessera with EUNIS classification.',
    status: 'planned',
    statusLabel: 'Planned',
    region: 'United Kingdom',
    tags: ['EUNIS', 'Habitat condition', 'UK-CEH', 'DEFRA'],
    description: 'Developing the next generation of habitat condition mapping systems for the UK, integrating Tessera with EUNIS classification standards. Moving beyond broad land cover categories to fine-scale habitat condition monitoring \u2014 distinguishing, for example, between overgrazed and undergrazed grasslands. Partnership with UK-CEH and DEFRA.',
    team: [],
    hasDetailPage: false,
    partners: ['uk-ceh'],
    timeline: 'Postdoc starting March\u2013April 2026, completion by May 2027',
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
