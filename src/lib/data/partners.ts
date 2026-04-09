export interface Partner {
  id: string;
  name: string;
  shortName?: string;
  url: string;
  programmes?: string[];
}

export const partners: Partner[] = [
  { id: 'plantsci', name: 'Department of Plant Sciences, University of Cambridge', shortName: 'Plant Sciences', url: 'https://www.plantsci.cam.ac.uk/', programmes: ['tessera', 'habitat-mapping'] },
  { id: 'cst', name: 'Department of Computer Science and Technology, University of Cambridge', shortName: 'CST', url: 'https://www.cst.cam.ac.uk/', programmes: ['tessera', 'habitat-mapping'] },
  { id: 'fmach', name: 'Fondazione Edmund Mach', url: 'https://www.fmach.it/eng', programmes: ['habitat-mapping'] },
  { id: 'unitn', name: 'University of Trento', url: 'https://www.unitn.it/en', programmes: ['habitat-mapping'] },
  { id: 'syntreesys', name: 'SynTreeSys', shortName: 'SynTreeSys', url: '#', programmes: ['habitat-mapping'] },
  { id: 'splot', name: 'SPlot', shortName: 'SPlot', url: '#', programmes: ['habitat-mapping'] },
  { id: 'nerc-clr', name: 'NERC Centre for Landscape Regeneration', shortName: 'CLR', url: '#', programmes: ['habitat-mapping', 'clr'] },
  { id: 'unep-wcmc', name: 'UNEP-WCMC', shortName: 'UNEP-WCMC', url: '#', programmes: ['habitat-mapping'] },
  { id: 'bien', name: 'Botanical Information & Ecology Network', shortName: 'BIEN', url: '#', programmes: ['habitat-mapping'] },
  { id: 'uk-ceh', name: 'UK Centre for Ecology & Hydrology', shortName: 'UK-CEH', url: '#', programmes: ['habitat-mapping'] },
];
