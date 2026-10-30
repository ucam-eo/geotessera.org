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
  // 'community' marks projects led by groups outside the Cambridge team.
  // They render in a separate section of the Projects page. Defaults to 'cambridge'.
  origin?: 'cambridge' | 'community';
  leadInstitution?: string;
}

export const projects: Project[] = [
  {
    id: 'trentino',
    title: 'High-resolution species mapping in the Italian Alps',
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
      { label: 'Read the story', url: '/news/2026-07-29-trentino-tree-species' },
      { label: 'Read the paper', url: 'https://doi.org/10.1016/j.srs.2026.100466' },
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
    statusLabel: 'In progress',
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
    title: 'Evaluating rewilding in the Cairngorms',
    subtitle: 'Supporting an ambitious 200-year vision for rewilding across the Cairngorms with Tessera and LiDAR.',
    status: 'in-progress',
    statusLabel: 'In progress',
    region: 'Cairngorms, Scotland',
    tags: ['Tessera + LiDAR', 'Rewilding', 'CLR funded', '3D habitat mapping'],
    description: 'Supporting the Cairngorm Connect initiative \u2014 an ambitious 200-year vision for rewilding across the Cairngorms \u2014 by integrating Tessera embeddings with Scotland\u2019s National LIDAR Programme. The combination of continuous spectral-temporal monitoring with structural 3D data enables automated assessment of ecosystem recovery trajectories, distinguishing between spectrally similar but structurally distinct habitats.',
    team: ['amandine-debus', 'barbara-neto-bradley', 'jess-williams', 'david-coomes'],
    hasDetailPage: false,
    fundingSources: ['clr'],
    partners: ['nerc-clr'],
  },
  {
    id: 'weather-downscaling',
    title: 'Sharpening local weather predictions',
    subtitle: 'Tessera embeddings describe the land surface for probabilistic weather downscaling, improving temperature and wind speed predictions at precise off-grid locations.',
    status: 'in-progress',
    statusLabel: 'In progress',
    region: 'Global',
    tags: ['Tessera', 'Weather downscaling', 'Five regions', 'Off-grid prediction', 'ConvCNP'],
    description: 'Weather forecasts come on coarse grids of roughly 25 km, yet conditions vary sharply within a single cell. Downscaling corrects that forecast down to a precise off-grid point, guided by a descriptor of the surface there. Led by first-year PhD student Pedro Sousa in collaboration with Richard Turner\u2019s group in the Department of Engineering, this project uses a Tessera embedding as that descriptor, in place of the coarse ERA5 surface fields that had stood in as rough proxies and alongside the existing elevation descriptor. Preliminary results show improvements in both 2 m temperature and 10 m wind speed, across five climatically diverse regions.',
    // 'Will Tebbutt' and 'Richard E. Turner' are Department of Engineering collaborators
    // not yet in people.ts; the names render as written until entries are added there.
    team: ['pedro-sousa', 'Will Tebbutt', 'sadiq-jaffer', 'robin-young', 'anil-madhavapeddy', 'Richard E. Turner'],
    stats: [
      { label: 'Temperature skill (CRPS)', value: '+11.5%' },
      { label: 'Wind speed skill (CRPS)', value: '+6.2%' },
    ],
    links: [
      { label: 'Read the paper', url: 'https://arxiv.org/abs/2608.12271' },
      { label: 'Read the explainer', url: 'https://anil.recoil.org/notes/weather-downscaling-tessera' },
    ],
    hasDetailPage: false,
  },
  {
    id: 'garimpo-monitoring',
    title: 'Mapping illegal gold mining in the Amazon',
    subtitle: 'Monitoring garimpo activity with geospatial embeddings',
    status: 'in-progress',
    statusLabel: 'PhD research',
    region: 'Tapaj\u00F3s River Basin, Par\u00E1, Brazil',
    tags: ['Mining', 'Indigenous lands', 'Segmentation', 'Sentinel-1/2'],
    description: 'Informal gold mining (garimpo) is clearing forest and poisoning rivers with mercury across the Brazilian Amazon, including inside Indigenous Territories where it is banned. Focusing on Munduruku lands in the Tapaj\u00F3s River Basin, this Strathclyde PhD project uses Tessera embeddings to refine 30 m MapBiomas mining labels into 10 m pseudo-labels. U-Net models trained on these labels trace mining boundaries more accurately than MapBiomas, by up to 5.4 percentage points in intersection over union.',
    // External collaborators: entered as literal names, not people.ts ids, so they stay off the About page.
    team: ['Cameron Fergus-Allen', 'Astrid Werkmeister', 'Malcolm Macdonald'],
    stats: [
      { label: 'IoU over MapBiomas', value: '+5.4 pp' },
      { label: 'Label resolution', value: '30 m \u2192 10 m' },
    ],
    links: [
      // TODO: switch to 'Read the paper' and add the recorded talk once SPIE proceedings are published.
      { label: 'Read the abstract', url: 'https://spie.org/spie-sensors-imaging/presentation/Monitoring-garimpo-activity-in-the-Brazilian-Amazon-with-geospatial-embeddings/14283-39' },
    ],
    hasDetailPage: false,
    // Literal strings rather than funding.ts / partners.ts ids, so these don't appear
    // in Tessera's own Funding and Partner institutions lists.
    fundingSources: ['EPSRC', 'AAC Clyde Space'],
    partners: ['Applied Space Technology Laboratory, University of Strathclyde'],
    origin: 'community',
    leadInstitution: 'University of Strathclyde',
  },
  {
    id: 'paraguay-crop-monitoring',
    // Proposed site-style title. GMV's own title: 'Paraguay Earth Observation Monitoring Crop Mapping and Early Warning System'.
    title: 'Mapping rice and soybean across Paraguay',
    subtitle: 'Crop mapping and early warning for Paraguay\u2019s agricultural sector',
    status: 'in-progress',
    statusLabel: 'In progress',
    region: 'Paraguay',
    // Proposed tags, to confirm.
    tags: ['Crop mapping', 'Rice', 'Soybean', 'Early warning'],
    // Condensed from the text GMV supplied by email (Enes Hisam, 9 Sep 2026).
    description: 'Paraguay\u2019s agricultural sector is highly exposed to climate variability. This project tests Tessera embeddings for distinguishing rice and soybean parcels across the country from 2017 to 2025, as a scalable and reproducible basis for satellite-based crop monitoring. Parcel-level crop maps feed into planned information products, including historical and projected production estimates to support credit assessment, and early warnings of crop disease risk based on recent weather and crop phenology.',
    // External collaborators: literal names, not people.ts ids.
    team: ['Carlos Domenech', 'Patricia Ram\u00EDrez', 'David de la Fuente', 'Enes Hisam', 'Joao Vitorino', 'Alexandra Stavarescu', 'Susana Romao'],
    hasDetailPage: false,
    fundingSources: ['World Bank Group'],
    // GMV also listed as a partner in their text; shown as lead institution instead.
    partners: ['Vizzuality'],
    origin: 'community',
    leadInstitution: 'GMV',
  },
  {
    id: 'kenya-coffee-mapping',
    title: 'Mapping coffee across Kenya',
    subtitle: 'A national coffee probability map to support EUDR compliance',
    status: 'in-progress',
    statusLabel: 'In progress',
    region: 'Kenya',
    tags: ['Coffee mapping', 'EUDR', 'Deforestation monitoring', 'National mapping'],
    // Wording approved by Kasimir Orlowski (JRC), 27 Oct 2026. "TESSERA" changed to sentence case per house style.
    description: 'Under the EU Deforestation Regulation (EUDR), coffee, as well as other commodities, placed on the EU market must not be produced on land deforested after 31 December 2020. To support EUDR compliance, a team comprising Kenyan national institutions (DRSRS and KFS), the Regional Centre for Mapping of Resources for Development (RCMRD), the European Forest Institute (EFI) and the European Commission\u2019s Joint Research Centre (JRC) is developing a national coffee probability map for 2020 using Tessera satellite embeddings. This will be the first nationally produced coffee probability map of its kind in Kenya.',
    // External collaborators: literal names, not people.ts ids.
    team: ['Kasimir Orlowski', 'Carlos Riano', 'Teresa De Marzo', 'Vincent Imala', 'Jotham Ayanga', 'Leah Kamene', 'Nicholas Kimeu', 'Derrick Ongere', 'Shadrack Kipkirui', 'Edith Kinyua', 'Kevin Murimi', 'Victoria Oliech'],
    hasDetailPage: false,
    // Literal strings rather than partners.ts ids, so they stay out of Tessera's own Partner institutions list.
    partners: ['Directorate of Resource Surveys and Remote Sensing (DRSRS)', 'Kenya Forest Service (KFS)', 'Regional Centre for Mapping of Resources for Development (RCMRD)', 'European Forest Institute (EFI)', 'European Commission Joint Research Centre (JRC)'],
    origin: 'community',
    leadInstitution: 'DRSRS, JRC, EFI',
  },
  {
    id: 'ghana-gold-mining',
    title: 'Artisanal gold mine mapping in Ghana',
    subtitle: 'Mapping small-scale gold mines with Tessera embeddings',
    status: 'in-progress',
    statusLabel: 'In progress',
    region: 'Western and Ashanti regions, Ghana',
    tags: ['Mining', 'Artisanal gold', 'Land-use change', 'AlphaEarth comparison'],
    // Wording signed off by Leonie Hodel (Oct 2026), with David Edwards added as a researcher at her request.
    description: 'In Ghana, artisanal gold mining has expanded across forest and farmland, yet its small, irregular and spectrally ambiguous pits are poorly captured by existing satellite-based mine maps. This project uses Tessera embeddings and a mine density estimation approach to produce annual maps of mining extent for 2017 to 2022, and tests how well the approach transfers across years and regions. Tessera is compared against AlphaEarth Foundations and standard baselines.',
    // External collaborators: literal names, not people.ts ids.
    team: ['Leonie Hodel', 'David Edwards'],
    hasDetailPage: false,
    // Literal strings rather than funding.ts / partners.ts ids, so they stay out of Tessera's own lists.
    fundingSources: ['Swiss National Science Foundation'],
    partners: ['Department of Plant Sciences, University of Cambridge'],
    origin: 'community',
    leadInstitution: 'Cambridge Conservation Research Institute, University of Cambridge',
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
