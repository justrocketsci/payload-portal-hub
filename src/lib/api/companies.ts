
import { Company } from '../types';
import { mockCompanies } from './mock/companies';

export const fetchCompanies = async (): Promise<Company[]> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  return mockCompanies;
};
