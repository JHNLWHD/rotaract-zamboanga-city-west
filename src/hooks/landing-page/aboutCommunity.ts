import contentful from "../contentfulClient";
import type { EntrySkeletonType, EntryFieldTypes } from "contentful"; 

type StatItemSkeleton = EntrySkeletonType & {
  contentTypeId: "statItem";
  fields: {
    value: EntryFieldTypes.Symbol; 
    description: EntryFieldTypes.Symbol; 
    icon: EntryFieldTypes.Symbol; 
  };
};

type HomepageAboutSectionSkeleton = EntrySkeletonType & {
  contentTypeId: "homepageAboutSection"; 
  fields: {
    stats: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<StatItemSkeleton>>; 
    outStory: EntryFieldTypes.Text; 
    image: EntryFieldTypes.AssetLink; 
  };
};

export type Stat = {
  value: string;  
  description: string; 
  icon: string; 
};

export type ImageData = {
  url: string;
  title?: string;
  description?: string;
};

export type HomepageAboutSection = {
  stats: Stat[];
  outStory: string; 
  image?: ImageData;
};

const DEFAULT_ABOUT_SECTION_ENTRY_ID = "5s0nfiDYTuRS7wbQ5Y3lqI";  

export async function fetchAboutCommunity(entryId?: string): Promise<HomepageAboutSection | null> {
  try {
    const entry = await contentful.client.getEntry<HomepageAboutSectionSkeleton>(
      entryId || DEFAULT_ABOUT_SECTION_ENTRY_ID
    );

    const f = entry.fields;

    const stats: Stat[] = await Promise.all(
      (f.stats || []).map(async (statLink) => {
        const statEntry = await contentful.client.getEntry<StatItemSkeleton>(statLink.sys.id);
        return {
          value: statEntry.fields.value ?? "",
          description: statEntry.fields.description ?? "",
          icon: statEntry.fields.icon ?? "",
        };
      })
    );

    let image: ImageData | undefined;
    if (f.image) {
      const imageAsset = await contentful.client.getAsset(f.image.sys.id);
      image = {
        url: imageAsset.fields.file?.url ? `https:${imageAsset.fields.file.url}` : "",
        title: imageAsset.fields.title || "",
        description: imageAsset.fields.description || "",
      };
    }

    const result: HomepageAboutSection = {
      stats,
      outStory: f.outStory || "",
      image,
    };

    return result; 

  } catch (error) {
    console.error("Error fetching About Community section:", error);
    return null; 
  }
}
