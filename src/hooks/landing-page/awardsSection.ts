import contentful from "../contentfulClient";
import type { EntrySkeletonType, EntryFieldTypes, Asset } from "contentful";  

type LandingAwardsSkeleton = EntrySkeletonType & {
    contentTypeId: "landingPageAwardsSection"
    fields: {
        awardCards: EntryFieldTypes.Array<
            EntryFieldTypes.EntryLink<awardCardsContainerSkeleton>
        >; 
    } 
} 

type awardCardsContainerSkeleton = EntrySkeletonType & {
    contentTypeId: "awardCards"
    fields: {
        title: EntryFieldTypes.Symbol; 
        shortDes: EntryFieldTypes.Symbol; 
        iconName: EntryFieldTypes.Symbol; 
        year: EntryFieldTypes.Symbol; 
        color: EntryFieldTypes.Symbol; 
    } 
} 

export type landingAwardFields = {
    awardCards: awardCards[]; 
} 

export type awardCards = {
    title: string; 
    shortDes: string;  
    iconName: string; 
    year: string;
    color: string; 
}

const DEFAULT_AWARDS_COMMUNITY_ENTRY_ID = "4MjYd0Gx80SH5ZeeEJZ73o"; 

export async function fetchAwards(entryId?: string): Promise<landingAwardFields | null>{
    try {
        const entry = await contentful.client.getEntry<LandingAwardsSkeleton>(entryId ||DEFAULT_AWARDS_COMMUNITY_ENTRY_ID); 

        const f = entry.fields; 

        //Fetch awardContainers 
        const awardCards: awardCards[] = await Promise.all(
            (f.awardCards || []).map(async (boxlink) => {
                const cardEntry = await contentful.client.getEntry<awardCardsContainerSkeleton>(boxlink.sys.id); 
                return {
                    title: cardEntry.fields.title ?? "", 
                    shortDes: cardEntry.fields.shortDes ?? "",
                    iconName: cardEntry.fields.iconName ?? "Award", 
                    year: cardEntry.fields.year ?? "Error", 
                    color: cardEntry.fields.color ?? "blue", 
                }
            })
        ) 

        const result = {
            awardCards, 
        } 

        return result; 

    } catch {
        return null; 
    }
}