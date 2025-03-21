
import { AdData } from '../types';
import { mockAds } from './mock/ads';

export const fetchAds = async (
  category?: string,
  position?: 'inline' | 'sidebar' | 'footer',
  limit: number = 2
): Promise<AdData[]> => {
  // Simulate network delay for realism
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let filteredAds = [...mockAds];
  
  // Filter by category if provided
  if (category) {
    filteredAds = filteredAds.filter(ad => 
      ad.categories.some(cat => cat.toLowerCase().includes(category.toLowerCase()))
    );
  }
  
  // Filter by position if provided
  if (position) {
    filteredAds = filteredAds.filter(ad => ad.position === position);
  }
  
  // If no ads match the filters, return random ads from the position
  if (filteredAds.length === 0 && position) {
    filteredAds = mockAds.filter(ad => ad.position === position);
  }
  
  // If still no ads, just return random ads
  if (filteredAds.length === 0) {
    filteredAds = [...mockAds];
  }
  
  // Shuffle the ads to get random selection
  const shuffled = filteredAds.sort(() => 0.5 - Math.random());
  
  // Return limited number of ads
  return shuffled.slice(0, limit);
};
