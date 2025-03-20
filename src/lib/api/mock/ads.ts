
import { AdData } from '../../types';

export const mockAds: AdData[] = [
  {
    id: 'ad1',
    imageUrl: 'https://images.unsplash.com/photo-1636819488524-1f019c4e1c44?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    title: 'Advanced Composite Materials for Space',
    description: 'Lightweight carbon fiber solutions for spacecraft structures and thermal protection systems',
    companyName: 'AeroMaterials',
    targetUrl: 'https://example.com/aerospace-materials',
    size: 'medium',
    position: 'inline',
    categories: ['materials', 'spacecraft']
  },
  {
    id: 'ad2',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    title: 'Satellite Communication Systems',
    description: 'Next-generation ground segment solutions for reliable satellite communications',
    companyName: 'OrbitComms',
    targetUrl: 'https://example.com/satellite-communications',
    size: 'large',
    position: 'sidebar',
    categories: ['communications', 'satellites']
  },
  {
    id: 'ad3',
    imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    title: 'Space Propulsion Technologies',
    description: 'High-efficiency ion thrusters and hall effect propulsion systems',
    companyName: 'ThrustTech',
    targetUrl: 'https://example.com/space-propulsion',
    size: 'medium',
    position: 'footer',
    categories: ['propulsion', 'spacecraft']
  },
  {
    id: 'ad4',
    imageUrl: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    title: 'Spacecraft Attitude Control',
    description: 'Precision reaction wheels and control moment gyroscopes',
    companyName: 'AttitudeX',
    targetUrl: 'https://example.com/attitude-control',
    size: 'small',
    position: 'inline',
    categories: ['control-systems', 'spacecraft']
  },
  {
    id: 'ad5',
    imageUrl: 'https://images.unsplash.com/photo-1581922819941-6ab31ab79afc?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    title: 'Space Launch Insurance',
    description: 'Comprehensive coverage for your mission from pre-launch to on-orbit operations',
    companyName: 'SpaceSure',
    targetUrl: 'https://example.com/launch-insurance',
    size: 'small',
    position: 'sidebar',
    categories: ['services', 'launch']
  }
];
