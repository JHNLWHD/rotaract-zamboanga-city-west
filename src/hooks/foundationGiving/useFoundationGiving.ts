import { useQuery } from '@tanstack/react-query';
import { foundationGivingQuery } from '../contentQueries';

export function useFoundationGiving() {
  return useQuery(foundationGivingQuery);
}
