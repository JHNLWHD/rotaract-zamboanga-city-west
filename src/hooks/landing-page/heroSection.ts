import contentful from "../contentfulClient";
import type { EntrySkeletonType, EntryFieldTypes } from "contentful";

type StatItemSkeleton = EntrySkeletonType & {
  contentTypeId: "statItem";
  fields: {
    value: EntryFieldTypes.Symbol; 
    description: EntryFieldTypes.Symbol; 
  };
};

type HomepageHeroSectionSkeleton = EntrySkeletonType & {
  contentTypeId: "homepageHeroSection";
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


const DEFAULT_HERO_ENTRY_ID = "7iiwiewk0D0T1NlMFEByWu";

export async function fetchHeroContent(
  entryId?: string
): Promise<HomepageHeroSection | null> {
  try {

    const entry = await contentful.client.getEntry<HomepageHeroSectionSkeleton>(
      entryId || DEFAULT_HERO_ENTRY_ID
    );

    const f = entry.fields;


    const stats: StatItem[] = await Promise.all(
      (f.stats || []).map(async (statLink) => {
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
    console.error("Error fetching homepage hero section:", error);
    return null;
  }
}
