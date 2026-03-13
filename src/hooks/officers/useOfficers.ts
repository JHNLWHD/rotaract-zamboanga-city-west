import { useQuery } from '@tanstack/react-query';
import {
  fetchAllOfficers,
  fetchPastPresidents,
  type Officer,
  type PastPresident,
} from './fetchOfficers';

export const useOfficers = (term?: string) => {
  return useQuery({
    queryKey: ['officers', term],
    queryFn: () => fetchAllOfficers(term),
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });
};

export const usePastPresidents = () => {
  return useQuery({
    queryKey: ['pastPresidents'],
    queryFn: fetchPastPresidents,
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });
};
