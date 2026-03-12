/** External link posts for the blog — these link offsite rather than to local content. */
export interface BlogLink {
  id: string;
  title: string;
  date: string;
  author: string;
  description: string;
  url: string;
  tags: string[];
}

export const blogLinks: BlogLink[] = [
  {
    id: 'streaming-tessera-w10',
    title: 'Streaming TESSERA working, biodiversity action papers, and FPL takes off',
    date: '2026-03-08',
    author: 'Anil Madhavapeddy',
    description: 'A browser-based streaming interface for TESSERA satellite embeddings performing client-side analysis using WebGPU and WebAssembly.',
    url: 'https://anil.recoil.org/notes/2026w10',
    tags: ['engineering', 'web'],
  },
  {
    id: 'browser-tessera-w9',
    title: 'Browser TESSERA, package management and Docker in the CACM',
    date: '2026-03-01',
    author: 'Anil Madhavapeddy',
    description: 'Progress on TESSERA with Zarr streaming support enabling browser-based ML pipelines, plus a Docker paper making the CACM cover.',
    url: 'https://anil.recoil.org/notes/2026w9',
    tags: ['engineering', 'web'],
  },
  {
    id: 'tessera-pipeline',
    title: 'Tessera Pipeline',
    date: '2026-02-25',
    author: 'Mark Elvers',
    description: 'A technical walkthrough of the Tessera pipeline, processing Sentinel-1 and Sentinel-2 satellite imagery to generate machine learning embeddings.',
    url: 'https://www.tunbury.org/2026/02/25/teserra-pipeline/',
    tags: ['engineering'],
  },
  {
    id: 'first-tessera-hackathon',
    title: '1st TESSERA/CoRE hackathon at the Indian AI Summit',
    date: '2026-02-19',
    author: 'Anil Madhavapeddy',
    description: 'The inaugural TESSERA hackathon at the Indian AI Impact Summit in Delhi, exploring integration with IIT-Delhi\'s CoRE Stack for environmental monitoring.',
    url: 'https://anil.recoil.org/notes/first-tessera-hackathon',
    tags: ['community', 'hackathon'],
  },
  {
    id: 'ocaml-tessera',
    title: 'Tessera pipeline in OCaml',
    date: '2026-02-15',
    author: 'Mark Elvers',
    description: 'An OCaml implementation of the Tessera pipeline achieving 9.5x faster inference than the Python CPU baseline with GPU acceleration.',
    url: 'https://www.tunbury.org/2026/02/15/ocaml-tessera/',
    tags: ['engineering', 'ocaml'],
  },
  {
    id: 'lcz-weekly-notes',
    title: 'Weekly Notes: Local Climate Zones and road mapping with TESSERA',
    date: '2026-02-15',
    author: 'Andres C. Zuniga-Gonzalez',
    description: 'Work on Local Climate Zone classification using satellite imagery, challenges with dataset labeling, and progress on OpenStreetMap road mapping.',
    url: 'https://ancazugo.github.io/posts/2026-02-15-weekly-notes.html',
    tags: ['research', 'classification'],
  },
  {
    id: 'vivas-aria-w6',
    title: 'Vivas, ARIA and interviews',
    date: '2026-02-08',
    author: 'Anil Madhavapeddy',
    description: 'A doctoral viva, presenting research projects at ARIA, media coverage of conservation evidence work, and a CACM video interview.',
    url: 'https://anil.recoil.org/notes/2026w6',
    tags: ['community'],
  },
  {
    id: 'red-pill-conservation',
    title: 'Discussing effective conservation with all the UK Chief Scientists',
    date: '2026-02-03',
    author: 'Anil Madhavapeddy',
    description: 'Hosting UK nature conservation body leaders at Pembroke to present TESSERA, focusing on evidence-based approaches and transparent AI for conservation.',
    url: 'https://anil.recoil.org/notes/red-pill-conservation',
    tags: ['conservation', 'community'],
  },
  {
    id: 'solar-farms-tiny-model',
    title: 'Earth Observation on a Budget: Finding Solar Farms with a 42k-Parameter Model',
    date: '2026-01-14',
    author: 'Sadiq Jaffer',
    description: 'Detecting and mapping solar farms across the UK using satellite imagery and a compact 42k-parameter neural network, leveraging pre-trained TESSERA embeddings.',
    url: 'https://toao.com/blog/earth-observation-budget-solar-farms-tiny-model',
    tags: ['research', 'classification'],
  },
  {
    id: 'brambles-from-space',
    title: 'Can a model trained on satellite data really find brambles on the ground?',
    date: '2025-09-24',
    author: 'Sadiq Jaffer',
    description: 'A field validation study testing whether a machine learning model using TESSERA embeddings can accurately predict bramble locations from satellite imagery.',
    url: 'https://toao.com/blog/can-we-really-see-brambles-from-space',
    tags: ['research', 'conservation'],
  },
];
