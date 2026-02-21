import contentful from '../contentfulClient';
import type { EntrySkeletonType, EntryFieldTypes } from 'contentful';

type StatItemSkeleton = EntrySkeletonType & {
  contentTypeId: 'statItem';
  fields: {
    value: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.Symbol;
  };
};

type HomepageHeroSectionSkeleton = EntrySkeletonType & {
  contentTypeId: 'homepageHeroSection';
  fields: {
    badgeText: EntryFieldTypes.Symbol;
    subTitle: EntryFieldTypes.Text;
    stats: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<StatItemSkeleton>>;
  };
};

export type StatItem = {
  value: string;
  description: string;
};

export type HomepageHeroSection = {
  badgeText?: string;
  subTitle?: string;
  stats: StatItem[];
};

export async function fetchHeroContent(): Promise<HomepageHeroSection | null> {
  try {
    // Query for the first homepageHeroSection entry instead of using hardcoded ID
    const entries =
      await contentful.client.getEntries<HomepageHeroSectionSkeleton>({
        content_type: 'homepageHeroSection',
        limit: 1,
      });

    if (entries.items.length === 0) {
      console.warn('No homepage hero section found');
      return null;
    }

    const entry = entries.items[0];
    const f = entry.fields;

    const stats: StatItem[] = await Promise.all(
      (f.stats || []).map(async statLink => {
        const statEntry = await contentful.client.getEntry<StatItemSkeleton>(
          statLink.sys.id
        );
        return {
          value: statEntry.fields.value,
          description: statEntry.fields.description,
        };
      })
    );

    return {
      badgeText: f.badgeText,
      subTitle: f.subTitle,
      stats,
    };
  } catch (error) {
    console.error('Error fetching homepage hero section:', error);
    return null;
  }
}
