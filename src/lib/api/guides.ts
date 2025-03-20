
import { PayloadGuide, FilterOptions } from '../types';
import { mockPayloadGuides } from './mock/guides';

export const fetchPayloadGuides = async (): Promise<PayloadGuide[]> => {
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
