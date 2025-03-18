
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
  fileUrl?: string;
  fileType?: string;
  fileSize?: string;
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
