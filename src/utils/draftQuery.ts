import type { DehydratedState, QueryKey } from '@tanstack/react-query';

// Hosted draft reviews read their build snapshot, never a browser preview token.
export function draftQuery<T>(key: QueryKey, fetchRecord: () => Promise<T>) {
  return async (): Promise<T> => {
    if (import.meta.env.MODE !== 'draft-review' || import.meta.env.SSR) {
      return fetchRecord();
    }
    const snapshot = document.getElementById('page-state')?.textContent;
    const query = snapshot
      ? (JSON.parse(snapshot) as DehydratedState).queries.find(
          item => JSON.stringify(item.queryKey) === JSON.stringify(key)
        )
      : undefined;
    if (query?.state.status !== 'success') {
      throw new Error('This record is missing from the draft review snapshot.');
    }
    return query.state.data as T;
  };
}
