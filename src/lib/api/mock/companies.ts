
import { Company } from '../../types';

export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'SpaceX',
    logo: './assets/logos/spacex-logo.png',
    website: 'https://www.spacex.com',
    description: 'SpaceX designs, manufactures and launches advanced rockets and spacecraft.'
  },
  {
    id: '2',
    name: 'Apex Space',
    logo: './assets/logos/apex-logo.svg',
    website: 'https://www.apexspace.com/',
    description: 'Standard satellite bus platforms from 100 to 500kg, configurable to your mission needs, delivered in weeks.'
  },
  {
    id: '3',
    name: 'Rocket Lab',
    logo: './assets/logos/rocketlab-logo.png',
    website: 'https://www.rocketlabusa.com',
    description: 'Rocket Lab is a leading launch provider and space systems company.'
  },
  {
    id: '4',
    name: 'NASA',
    logo: './assets/logos/nasa-logo.png',
    website: 'https://www.nasa.gov',
    description: 'NASA is the United States government agency responsible for space program, aeronautics and aerospace research.'
  }
];
