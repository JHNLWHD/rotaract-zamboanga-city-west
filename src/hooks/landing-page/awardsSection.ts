import contentful from '../contentfulClient';
import type { Entry, EntrySkeletonType, EntryFieldTypes } from 'contentful';
import { getAllEntries } from '../getAllEntries';

type AwardsSkeleton = EntrySkeletonType<{
  name: EntryFieldTypes.Symbol;
  shortDescription: EntryFieldTypes.Symbol;
  description: EntryFieldTypes.Symbol;
  icon: EntryFieldTypes.Symbol;
  yearReceived: EntryFieldTypes.Symbol;
  issuingOrganization?: EntryFieldTypes.Symbol;
  sourceUrl?: EntryFieldTypes.Symbol;
  isFeatured: EntryFieldTypes.Boolean;
  image: EntryFieldTypes.AssetLink;
  dateReceived: EntryFieldTypes.Date;
  color: EntryFieldTypes.Symbol;
}> & { contentTypeId: 'cardsAwards' };

type HomepageAwardsSectionSkeleton = EntrySkeletonType<{
  cards: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<AwardsSkeleton>>;
}> & { contentTypeId: 'homepageAwardsSection' };

export type Image = {
  url: string;
  title?: string;
  description?: string;
};

export type Award = {
  name: string;
  shortDescription: string;
  description: string;
  icon: string;
  yearReceived: string;
  issuingOrganization: string;
  sourceUrl: string;
  color: string;
  dateReceived: string;
  isFeatured: boolean;
  image: Image;
};

export type HomepageAwardsSection = {
  awards: Award[];
};

async function mapAwardEntry(
  cardEntry: Entry<AwardsSkeleton, undefined>
): Promise<Award> {
  let image: Image | undefined;
  if (cardEntry.fields.image) {
    const imageAsset = await contentful.client.getAsset(
      cardEntry.fields.image.sys.id
    );
    image = {
      url: imageAsset.fields.file?.url || '',
      title: imageAsset.fields.title,
      description: imageAsset.fields.description,
    };
  }

  return {
    name: cardEntry.fields.name ?? '',
    shortDescription: cardEntry.fields.shortDescription ?? '',
    description: cardEntry.fields.description ?? '',
    icon: cardEntry.fields.icon ?? 'award',
    yearReceived: cardEntry.fields.yearReceived ?? '',
    issuingOrganization: cardEntry.fields.issuingOrganization ?? '',
    sourceUrl: cardEntry.fields.sourceUrl ?? '',
    color: cardEntry.fields.color ?? 'blue',
    dateReceived: cardEntry.fields.dateReceived ?? '',
    isFeatured: cardEntry.fields.isFeatured ?? false,
    image: image || { url: '', title: '', description: '' },
  };
}

export async function fetchAwards(): Promise<HomepageAwardsSection | null> {
  try {
    // Query for the first homepageAwardsSection entry instead of using hardcoded ID
    const entries =
      await contentful.client.getEntries<HomepageAwardsSectionSkeleton>({
        content_type: 'homepageAwardsSection',
        limit: 1,
      });

    if (entries.items.length === 0) {
      console.warn('No homepage awards section found');
      return null;
    }

    const entry = entries.items[0];
    const awardsField = entry.fields.cards || [];

    const awards: Award[] = await Promise.all(
      awardsField.map(async link => {
        const cardEntry = await contentful.client.getEntry<AwardsSkeleton>(
          link.sys.id
        );
        return mapAwardEntry(cardEntry);
      })
    );

    return { awards };
  } catch (error) {
    console.error('Error fetching awards:', error);
    return null;
  }
}

export async function fetchAllAwards(): Promise<HomepageAwardsSection | null> {
  try {
    const entries = await getAllEntries<AwardsSkeleton>({
      content_type: 'cardsAwards',
      order: '-fields.dateReceived',
    });

    return {
      awards: await Promise.all(entries.items.map(mapAwardEntry)),
    };
  } catch (error) {
    console.error('Error fetching all awards:', error);
    throw error;
  }
}
