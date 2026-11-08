import { useQuery } from '@tanstack/react-query';
import { officersQuery, pastPresidentsQuery } from '../contentQueries';

export const useOfficers = (term?: string) => {
  return useQuery(officersQuery(term));
};

export const usePastPresidents = () => {
  return useQuery(pastPresidentsQuery);
};
