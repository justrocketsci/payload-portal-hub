
import { AdData } from '../types';
import { mockAds } from './mock/ads';

export const fetchAds = async (
  category?: string,
  position?: 'inline' | 'sidebar' | 'footer',
  limit: number = 2
): Promise<AdData[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let filteredAds = [...mockAds];
  
  if (category) {
    filteredAds = filteredAds.filter(ad => 
      ad.categories.some(cat => cat.toLowerCase().includes(category.toLowerCase()))
    );
  }
  
  if (position) {
    filteredAds = filteredAds.filter(ad => ad.position === position);
  }
  
  // Shuffle the ads to get random selection
  const shuffled = filteredAds.sort(() => 0.5 - Math.random());
  
  // Return limited number of ads
  return shuffled.slice(0, limit);
};
