
import { PayloadGuide, Company, FilterOptions } from './types';

// Mock data for initial development
export const mockPayloadGuides: PayloadGuide[] = [
  {
    id: '1',
    title: 'Falcon 9 Payload User's Guide',
    company: 'SpaceX',
    description: 'This user guide provides information for users of the Falcon 9 launch vehicle.',
    thumbnail: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Launch Vehicles',
    tags: ['falcon 9', 'spacex', 'orbital', 'commercial'],
    publishedDate: '2023-04-15',
    lastUpdated: '2023-09-10',
    fileType: 'PDF',
    fileSize: '12.4 MB'
  },
  {
    id: '2',
    title: 'Ariane 6 User Manual',
    company: 'Arianespace',
    description: 'The Ariane 6 User Manual provides essential information for mission planning and payload integration.',
    thumbnail: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
    category: 'Launch Vehicles',
    tags: ['ariane', 'esa', 'europe', 'gto'],
    publishedDate: '2022-11-30',
    lastUpdated: '2023-07-22',
    fileType: 'PDF',
    fileSize: '24.6 MB'
  },
  {
    id: '3',
    title: 'Dragon Spacecraft Payload User's Guide',
    company: 'SpaceX',
    description: 'This document provides information on spacecraft systems, interfaces, and requirements for payload developers.',
    thumbnail: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    category: 'Spacecraft',
    tags: ['dragon', 'spacex', 'cargo', 'iss'],
    publishedDate: '2023-01-05',
    lastUpdated: '2023-08-18',
    fileType: 'PDF',
    fileSize: '18.2 MB'
  },
  {
    id: '4',
    title: 'Electron Payload User\'s Guide',
    company: 'Rocket Lab',
    description: 'Details for users planning missions on Rocket Lab\'s Electron launch vehicle.',
    thumbnail: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80',
    category: 'Launch Vehicles',
    tags: ['electron', 'rocket lab', 'small satellite', 'leo'],
    publishedDate: '2022-09-12',
    lastUpdated: '2023-06-30',
    fileType: 'PDF',
    fileSize: '9.7 MB'
  },
  {
    id: '5',
    title: 'ISS Payload Integration Guide',
    company: 'NASA',
    description: 'Comprehensive information for integrating payloads with the International Space Station.',
    thumbnail: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80',
    category: 'Space Stations',
    tags: ['iss', 'nasa', 'research', 'microgravity'],
    publishedDate: '2023-02-28',
    lastUpdated: '2023-05-15',
    fileType: 'PDF',
    fileSize: '32.1 MB'
  },
  {
    id: '6',
    title: 'Vega-C User\'s Manual',
    company: 'Arianespace',
    description: 'User manual for the Vega-C launch vehicle, covering performance, environments, and interfaces.',
    thumbnail: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Launch Vehicles',
    tags: ['vega', 'arianespace', 'europe', 'small satellite'],
    publishedDate: '2022-12-10',
    lastUpdated: '2023-09-01',
    fileType: 'PDF',
    fileSize: '15.8 MB'
  }
];

export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'SpaceX',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/SpaceX_logo_black.svg/320px-SpaceX_logo_black.svg.png',
    website: 'https://www.spacex.com',
    description: 'SpaceX designs, manufactures and launches advanced rockets and spacecraft.'
  },
  {
    id: '2',
    name: 'Arianespace',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Arianespace-logo-2021.png/320px-Arianespace-logo-2021.png',
    website: 'https://www.arianespace.com',
    description: 'Arianespace is a European company providing launch services for all types of satellites.'
  },
  {
    id: '3',
    name: 'Rocket Lab',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Rocket_Lab_logo.svg/320px-Rocket_Lab_logo.svg.png',
    website: 'https://www.rocketlabusa.com',
    description: 'Rocket Lab is a leading launch provider and space systems company.'
  },
  {
    id: '4',
    name: 'NASA',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/320px-NASA_logo.svg.png',
    website: 'https://www.nasa.gov',
    description: 'NASA is the United States government agency responsible for space program, aeronautics and aerospace research.'
  }
];

// Simulated API functions
export const fetchPayloadGuides = async (): Promise<PayloadGuide[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockPayloadGuides;
};

export const fetchPayloadGuideById = async (id: string): Promise<PayloadGuide | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  return mockPayloadGuides.find(guide => guide.id === id);
};

export const searchPayloadGuides = async (query: string): Promise<PayloadGuide[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  if (!query) return mockPayloadGuides;
  
  const lowercaseQuery = query.toLowerCase();
  return mockPayloadGuides.filter(guide => {
    return (
      guide.title.toLowerCase().includes(lowercaseQuery) ||
      guide.description.toLowerCase().includes(lowercaseQuery) ||
      guide.company.toLowerCase().includes(lowercaseQuery) ||
      guide.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  });
};

export const filterPayloadGuides = async (options: FilterOptions): Promise<PayloadGuide[]> => {
  await new Promise(resolve => setTimeout(resolve, 700));
  
  return mockPayloadGuides.filter(guide => {
    // Filter by categories
    if (options.categories?.length && !options.categories.includes(guide.category)) {
      return false;
    }
    
    // Filter by companies
    if (options.companies?.length && !options.companies.includes(guide.company)) {
      return false;
    }
    
    // Filter by tags (if any tag matches)
    if (options.tags?.length && !guide.tags.some(tag => options.tags.includes(tag))) {
      return false;
    }
    
    // Filter by date range
    if (options.dateRange) {
      const guideDate = new Date(guide.publishedDate);
      if (options.dateRange.from && guideDate < options.dateRange.from) {
        return false;
      }
      if (options.dateRange.to && guideDate > options.dateRange.to) {
        return false;
      }
    }
    
    return true;
  });
};

export const fetchCompanies = async (): Promise<Company[]> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  return mockCompanies;
};

export const submitPayloadGuide = async (
  guideData: Omit<PayloadGuide, 'id' | 'publishedDate' | 'lastUpdated'>
): Promise<{ success: boolean; message: string }> => {
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  // Simulate success (in a real app, this would send to a backend)
  console.log('Guide submitted:', guideData);
  return { 
    success: true, 
    message: 'Your payload guide has been submitted successfully and is pending review.' 
  };
};
