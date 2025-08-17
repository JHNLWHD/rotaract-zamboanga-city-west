import contentful from "./contentfulClient";
import type { EntrySkeletonType, EntryFieldTypes } from "contentful";

type LandingHeroSkeleton = EntrySkeletonType & {
	contentTypeId: "landingPageHeroSection";
	fields: { 
		heroHeading: EntryFieldTypes.Symbol;
		heroBox: EntryFieldTypes.Array<
			EntryFieldTypes.EntryLink<HeroBoxSkeleton> 
		>; 
	};
};

type HeroBoxSkeleton = EntrySkeletonType & {
	contentTypeId: "heroBox"; 
	fields: {
		number: EntryFieldTypes.Integer;
		description: EntryFieldTypes.Text;	
	}
}

export type HeroBox = {
	number: number; 
	description: string; 
}

export type LandingHeroFields = {
	heroHeading?: string;
	heroBox: HeroBox[];  
}; 


const DEFAULT_HERO_ENTRY_ID = "5O1VUbXjkEBa0NJTYlDqd7";

export async function fetchHeroContent(entryId?: string): Promise<LandingHeroFields | null> {
	try {
		const entry = await contentful.client.getEntry<LandingHeroSkeleton>(entryId || DEFAULT_HERO_ENTRY_ID);

		const f = entry.fields; 

    	// Fetch heroBox entries
		const heroBox: HeroBox[] = await Promise.all(
			(f.heroBox || []).map(async (boxLink) => {
			const boxEntry = await contentful.client.getEntry<HeroBoxSkeleton>(boxLink.sys.id);
			return {
				number: boxEntry.fields.number,
				description: boxEntry.fields.description,
			};
			})
		);

		return {
			heroHeading: f.heroHeading ?? "",
			heroBox, 
		};
	} catch (error) {
		console.error("Error fetching landing page hero section:", error);
		return null;
	}
}