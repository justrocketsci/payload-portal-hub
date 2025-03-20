export interface PayloadGuide {
  id: string;
  title: string;
  company: string;
  description: string;
  thumbnail: string;
  category: string;
  tags: string[];
  publishedDate: string;
  lastUpdated: string;
  fileUrl: string;  // Making fileUrl required now
  fileType: string; // Making fileType required now
  fileSize: string; // Making fileSize required now
  externalUrl?: string; // New field for external links to guides
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  website: string;
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  company?: string;
  role: 'user' | 'company' | 'admin';
  avatar?: string;
}

export interface FilterOptions {
  categories: string[];
  companies: string[];
  tags: string[];
  dateRange?: {
    from: Date | null;
    to: Date | null;
  };
}

export interface AdData {
  id: string;
  imageUrl: string;
  title: string;
  description?: string;
  companyName: string;
  targetUrl: string;
  size: 'small' | 'medium' | 'large';
  position?: 'inline' | 'sidebar' | 'footer';
  categories: string[];
}
