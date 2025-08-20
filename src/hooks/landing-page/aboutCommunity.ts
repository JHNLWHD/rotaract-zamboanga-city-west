import contentful from "../contentfulClient";
import type { EntrySkeletonType, EntryFieldTypes, Asset } from "contentful"; 

type LandingAboutCommunitySkeleton = EntrySkeletonType & {
    contentTypeId: "landingPageAboutCommunity"; 
    fields: {
        aboutCommunityBoxes: EntryFieldTypes.Array<
            EntryFieldTypes.EntryLink<AboutCommunityBoxesSkeleton>
        >; 

        sideInformation: EntryFieldTypes.EntryLink<SideInformationSkeleton>; 

        aboutImage: EntryFieldTypes.AssetLink; 
    }
} 

type SideInformationSkeleton = EntrySkeletonType & {
    contentTypeId: "sideInformation"; 
    fields: {
        number: EntryFieldTypes.Symbol;  
		description: EntryFieldTypes.Text;
		iconName: EntryFieldTypes.Symbol;  
    }
}

type AboutCommunityBoxesSkeleton = EntrySkeletonType & {
    contentTypeId: "aboutCommunityBoxes"; 
    fields: {
		number: EntryFieldTypes.Symbol;  
		description: EntryFieldTypes.Text;
		iconName: EntryFieldTypes.Symbol;  
    }
} 

export type SideInformation = {
    number: string; 
    description: string; 
    iconName: string; 
}

export type AboutCommunityBoxes = {
    number: string;  
    description: string; 
    iconName: string; 
} 

export type LandingAboutFields = {
    aboutCommunityBoxes: AboutCommunityBoxes[]; 
    sideInformation: SideInformation; 
    aboutImage?: ContentfulImage;
}

export type ContentfulImage = {
    url: string;
    title?: string;
    description?: string;
}

const DEFAULT_ABOUT_COMMUNITY_ENTRY_ID = "5uyW4S1SOEH4aiIBZA8yQ9";  

export async function fetchAboutCommunity(entryId?: string): Promise<LandingAboutFields | null>{
    try {
        const entry = await contentful.client.getEntry<LandingAboutCommunitySkeleton>(entryId || DEFAULT_ABOUT_COMMUNITY_ENTRY_ID);

        const f = entry.fields;

        // Fetch aboutCommunityBoxes entries
        const aboutCommunityBoxes: AboutCommunityBoxes[] = await Promise.all(
            (f.aboutCommunityBoxes || []).map(async (boxlink) => {
                const cardEntry = await contentful.client.getEntry<AboutCommunityBoxesSkeleton>(boxlink.sys.id); 
                return {
                    number: cardEntry.fields.number ?? "",
                    description: cardEntry.fields.description ?? "",
                    iconName: cardEntry.fields.iconName ?? "Award",  
                }; 
            }) 
        ); 

        let aboutImage: ContentfulImage | undefined;
        if (f.aboutImage) {
            const imageAsset = await contentful.client.getAsset(f.aboutImage.sys.id);
            aboutImage = {
                url: imageAsset.fields.file?.url ? `https:${imageAsset.fields.file.url}` : "",
                title: imageAsset.fields.title || "",
                description: imageAsset.fields.description || "",
            };
        }

        // Fetch sideInformation entry (single reference)
        let sideInformation: SideInformation = {
            number: "",
            description: "",
            iconName: "Award"
        };
        
        if (f.sideInformation) {
            const sideEntry = await contentful.client.getEntry<SideInformationSkeleton>(f.sideInformation.sys.id);
            sideInformation = {
                number: sideEntry.fields.number ?? "",
                description: sideEntry.fields.description ?? "",
                iconName: sideEntry.fields.iconName ?? "Award",  
            };
        } 

        const result = {
            aboutCommunityBoxes,
            aboutImage, 
            sideInformation,
        };
        
        return result; 

    } catch (error) {
        return null; 
    }
}