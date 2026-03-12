export const siteConfig = {
  title: 'TESSERA',
  subtitle: 'A pixel-wise earth observation foundation model',
  social: {
    github: 'https://github.com/ucam-eo',
    twitter: 'https://twitter.com/avsm',
    bluesky: 'https://bsky.app/profile/eeg.cl.cam.ac.uk',
  },
  tasks: [
    { name: 'Classification', tag: 'classification', description: 'Categorize land cover types from satellite embeddings' },
    { name: 'Segmentation', tag: 'segmentation', description: 'Detect and outline specific features in imagery' },
    { name: 'Change Detection', tag: 'change-detection', description: 'Monitor landscape changes over time' },
    { name: 'Canopy Height', tag: 'canopy-height', description: 'Estimate vegetation height from embeddings' },
    { name: 'Land Cover', tag: 'land-cover', description: 'Map land use and land cover at scale' },
    { name: 'Crop Mapping', tag: 'crop-mapping', description: 'Identify and classify agricultural crops' },
    { name: 'Solar Panels', tag: 'solar', description: 'Detect solar panel installations from space' },
  ] as const,
  docs: 'https://geotessera.readthedocs.io/',
  map: {
    catalogUrl: 'https://dl2.geotessera.org/zarr/v1/catalog.json',
    globalPreviewUrl: 'https://dl2.geotessera.org/zarr/v1/global_rgb_2025.zarr',
    initialCenter: [0.1218, 52.2053] as [number, number],
    initialZoom: 12,
    cambridgeCenter: [0.1218, 52.2053] as [number, number],
    cambridgeZoom: 12,
    ukCenter: [-2, 54] as [number, number],
    ukZoom: 5,
  },
} as const;

export type TaskConfig = (typeof siteConfig.tasks)[number];
