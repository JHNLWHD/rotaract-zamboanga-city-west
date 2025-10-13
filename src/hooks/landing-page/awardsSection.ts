import contentful from "../contentfulClient";
import type { EntrySkeletonType, EntryFieldTypes } from "contentful";

type AwardsSkeleton = EntrySkeletonType<{
  name: EntryFieldTypes.Symbol;
  shortDescription: EntryFieldTypes.Symbol;
  description: EntryFieldTypes.Symbol;
  icon: EntryFieldTypes.Symbol;
  yearReceived: EntryFieldTypes.Symbol;
  isFeatured: EntryFieldTypes.Boolean;
  image: EntryFieldTypes.AssetLink;
  dateReceived: EntryFieldTypes.Date;
  color: EntryFieldTypes.Symbol;
}> & { contentTypeId: "cardsAwards" };

type HomepageAwardsSectionSkeleton = EntrySkeletonType<{
  cards: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<AwardsSkeleton>>;
}> & { contentTypeId: "homepageAwardsSection" };


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
  color: string;
  dateReceived: string;
  isFeatured: boolean;
  image: Image;
};

export type HomepageAwardsSection = {
  awards: Award[];
};


const DEFAULT_AWARDS_COMMUNITY_ENTRY_ID = "ovJoUiaQ4vdIjTj6L2UZP";

export async function fetchAwards(
  entryId?: string
): Promise<HomepageAwardsSection | null> {
  try {
    const entry = await contentful.client.getEntry<HomepageAwardsSectionSkeleton>(
      entryId || DEFAULT_AWARDS_COMMUNITY_ENTRY_ID
    );

    const awardsField = entry.fields.cards || [];

    const awards: Award[] = await Promise.all(
      awardsField.map(async (link) => {
        const cardEntry = await contentful.client.getEntry<AwardsSkeleton>(link.sys.id);

        const imageAsset = await contentful.client.getAsset(cardEntry.fields.image.sys.id);

        return {
          name: cardEntry.fields.name ?? "",
          shortDescription: cardEntry.fields.shortDescription ?? "",
          description: cardEntry.fields.description ?? "",
          icon: cardEntry.fields.icon ?? "Award",
          yearReceived: cardEntry.fields.yearReceived ?? "",
          color: cardEntry.fields.color ?? "blue",
          dateReceived: cardEntry.fields.dateReceived ?? "",
          isFeatured: cardEntry.fields.isFeatured ?? false,
          image: {
            url: imageAsset.fields.file.url,
            title: imageAsset.fields.title,
            description: imageAsset.fields.description,
          },
        };
      })
    );

    return { awards };
  } catch (error) {
    console.error("Error fetching awards:", error);
    return null;
  }
}
