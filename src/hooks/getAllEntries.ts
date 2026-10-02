import type { EntrySkeletonType } from 'contentful';
import contentful from './contentfulClient';

export async function getAllEntries<T extends EntrySkeletonType>(
  query: Record<string, string | number>
) {
  const first = await contentful.client.getEntries<T>(query);
  if (query.limit) return first;

  const items = [...first.items];
  while (items.length < first.total) {
    const page = await contentful.client.getEntries<T>({
      ...query,
      skip: items.length,
    });
    if (!page.items.length)
      throw new Error('Contentful returned an incomplete collection');
    items.push(...page.items);
  }
  return { ...first, items };
}
